import { Injectable } from '@angular/core';
import { SocketService } from '@wc-demo/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private readonly socketService: SocketService) {
  }

  login(username: string): Observable<void> {
    return new Observable<void>(observer => {
      this.socketService.send('register', username, result => {
        if (result) {
          this.isAuthenticatedSubject.next(true);
          observer.next();
          observer.complete();
          return;
        }

        observer.error();
      });
    });
  }

  logout() {
    this.socketService.disconnect();
    this.isAuthenticatedSubject.next(false);
  }
}
