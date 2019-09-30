import { BehaviorSubject, merge, Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { map, mapTo, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Message } from '../models/message';
import { ChatHistoryService } from './chat-history.service';
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
  private activeChats = new Map<string, ReplaySubject<Message>>();

  private userJoinSubject = new Subject<string>();
  userJoin$ = this.userJoinSubject.asObservable(); // Currently not used by design

  private userLeaveSubject = new Subject<string>();
  userLeave$ = this.userLeaveSubject.asObservable(); // Currently not used by design

  private usersSubject = new BehaviorSubject<string[]>([]);
  onlineUsers$: Observable<string[]> = this.usersSubject.asObservable();

  private subscription = Subscription.EMPTY;

  constructor(
    private readonly socketService: SocketService,
    private readonly chatHistoryService: ChatHistoryService,
  ) {
  }

  initialize() {
    const onlineUsers$: Observable<string[]> = this.socketService.fromEvent('all-users').pipe(
      map(({ usernames }: { usernames: string[] }) => {
        const users = [...usernames];
        this.usersSubject.next(users);
        return users;
      }),
    );

    const userLeave$ = this.socketService.fromEvent('user-leave').pipe(
      map(({ username }) => username),
      withLatestFrom(this.onlineUsers$),
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
      withLatestFrom(this.onlineUsers$),
      tap(([username, allUsers]: [string, string[]]) => {
        const users = [...allUsers];
        users.push(username);
        this.usersSubject.next(users);
        this.userJoinSubject.next(username);
      }),
    );

    const privateMessage$ = this.socketService.fromEvent('private-message').pipe(
      switchMap(({ message, timestamp, from }: IncomingMessage) =>
        this.getOrAddHistory$(from).pipe(
          map(subject => {
            const m = { isSent: false, message, timestamp };
            subject.next(m);
            return m;
          }),
          switchMap(m => this.chatHistoryService.addHistory$(from, m)),
        ),
      ),
    );

    this.subscription = merge(onlineUsers$, userLeave$, userJoin$, privateMessage$).subscribe();
  }

  destroy() {
    this.subscription.unsubscribe();
  }

  chatsForUser$(username: string): Observable<Message> {
    return this.getOrAddHistory$(username).pipe(switchMap(subject => subject.asObservable()));
  }

  sendMessage$(chat: OutgoingMessage): Observable<void> {
    return new Observable<Message>(observer => {
      this.socketService.send('private-message', { ...chat }, errorOrTimestamp => {
        if (!Number.isInteger(errorOrTimestamp)) {
          return observer.error();
        }

        observer.next({ isSent: true, message: chat.message, timestamp: errorOrTimestamp });
        observer.complete();
      });
    }).pipe(
      switchMap(message => this.getOrAddHistory$(chat.to).pipe(
        tap(subject => subject.next(message)),
        mapTo(message),
      )),
      switchMap(message => this.chatHistoryService.addHistory$(chat.to, message)),
    );
  }

  private getOrAddHistory$(username: string): Observable<ReplaySubject<Message>> {
    return new Observable<ReplaySubject<Message>>(observer => {
      if (this.activeChats.has(username)) {
        observer.next(this.activeChats.get(username));
        observer.complete();

        return;
      }

      const subject = new ReplaySubject<Message>();
      this.activeChats.set(username, subject);
      this.chatHistoryService.loadHistory$(username).pipe(
        tap(messages => {
          if (!messages || !messages.length) {
            messages = [{ timestamp: Date.now(), isSent: true, message: `New chat with ${username}` }]; // TODO: translation
          }

          messages.forEach(message => subject.next(message));
        }),
      ).subscribe(() => {
        observer.next(this.activeChats.get(username));
        observer.complete();
      });
    });
  }
}
