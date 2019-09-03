import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';
import { environment } from '../../environments/environment';
import Socket = SocketIOClient.Socket;

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  private socket: Socket;

  constructor() {
    this.socket = socketIo(environment.backendUrl);
  }

  connect() {
    this.disconnect();
    this.socket.connect();
  }

  fromEvent<T>(name: string): Observable<T> {
    return new Observable<T>(observer => {
      this.socket.on(name, (data: T) => observer.next(data));

      return () => this.socket.removeListener(name);
    }).pipe(share());
  }

  disconnect() {
    this.socket.disconnect();
  }

  ngOnDestroy() {
    this.disconnect();
  }
}
