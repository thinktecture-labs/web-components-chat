import { BehaviorSubject, merge, Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Message } from '../models/message';
import { SocketService } from './socket.service';

interface IncomingMessage {
  from: string;
  message: string;
  timestamp: number;
}

interface OutgoingMessage {
  to: string;
  message: string;
}

export class ChatService {
  private chatHistories = new Map<string, ReplaySubject<Message>>();

  private userJoinSubject = new Subject<string>();
  userJoin$ = this.userJoinSubject.asObservable();

  private userLeaveSubject = new Subject<string>();
  userLeave$ = this.userLeaveSubject.asObservable();

  private usersSubject = new BehaviorSubject<string[]>([]);
  users$ = this.usersSubject.asObservable();

  private subscription = Subscription.EMPTY;

  constructor(private readonly socketService: SocketService) {
  }

  initialize() {
    const allUsers$: Observable<string[]> = this.socketService.fromEvent('all-users').pipe(
      map(({ usernames }: { usernames: string[] }) => {
        const users = [...usernames];
        this.usersSubject.next(users);
        return users;
      }),
    );

    const userLeave$ = this.socketService.fromEvent('user-leave').pipe(
      map(({ username }) => username),
      withLatestFrom(this.users$),
      tap(([username, allUsers]: [string, string[]]) => {
        const users = [...allUsers];
        const indexToDelete = users.findIndex(p => p === username);
        if (indexToDelete >= 0) {
          users.splice(indexToDelete, 1);
        }
        this.usersSubject.next(users);
        this.userLeaveSubject.next(username);
      }),
    );

    const userJoin$ = this.socketService.fromEvent('user-join').pipe(
      map(({ username }) => username),
      withLatestFrom(this.users$),
      tap(([username, allUsers]: [string, string[]]) => {
        const users = [...allUsers];
        users.push(username);
        this.usersSubject.next(users);
        this.userLeaveSubject.next(username);
      }),
    );

    const privateMessage$ = this.socketService.fromEvent('private-message').pipe(
      tap(({ message, timestamp, from }: IncomingMessage) =>
        this.getOrAddHistory$(from).next({ isSent: false, message, timestamp }),
      ),
    );

    this.subscription = merge(allUsers$, userLeave$, userJoin$, privateMessage$).subscribe();
  }

  destroy() {
    this.subscription.unsubscribe();
  }

  chatsForUser$(username: string): Observable<Message> {
    return this.getOrAddHistory$(username).asObservable();
  }

  sendMessage$(chat: OutgoingMessage): Observable<void> {
    return new Observable<void>(observer => {
      this.socketService.send('private-message', { ...chat }, errorOrTimestamp => {
        if (!Number.isInteger(errorOrTimestamp)) {
          return observer.error();
        }

        this.getOrAddHistory$(chat.to).next({ isSent: true, message: chat.message, timestamp: errorOrTimestamp });
        observer.next();
        observer.complete();
      });
    });
  }

  private getOrAddHistory$(username: string): ReplaySubject<Message> {
    if (!this.chatHistories.has(username)) {
      const subject = new ReplaySubject<Message>();
      subject.next({timestamp: Date.now(), isSent: true, message: `New chat with ${username}`});
      this.chatHistories.set(username, subject);
    }

    return this.chatHistories.get(username);
  }
}
