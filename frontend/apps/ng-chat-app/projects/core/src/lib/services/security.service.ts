import { BehaviorSubject, Observable } from 'rxjs';
import { SocketService } from './socket.service';

export class SecurityService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private internalUsername: string; // TODO

  constructor(private readonly socketService: SocketService) {
  }

  get username(): string {
    return this.internalUsername;
  }

  login(username: string): Observable<void> {
    return new Observable<void>(observer => {
      this.socketService.send('register', username, error => {
        if (error) {
          return observer.error();
        }

        this.internalUsername = username;
        this.isAuthenticatedSubject.next(true);
        observer.next();
        observer.complete();

      });
    });
  }

  logout() {
    this.socketService.disconnect();
    this.isAuthenticatedSubject.next(false);
  }
}
