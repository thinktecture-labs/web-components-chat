import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';
import { environment } from '../../environments/environment';
import Socket = SocketIOClient.Socket;

export enum SocketState {
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  Connected = 'connected'
}

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  private stateSubject = new BehaviorSubject<SocketState>(SocketState.Disconnected);
  state$ = this.stateSubject.asObservable();

  private socket: Socket;

  constructor() {
    this.socket = socketIo(environment.backendUrl);
  }

  connect(): void {
    this.disconnect();

    this.stateSubject.next(SocketState.Connecting);
    this.socket.on('connect', () => this.stateSubject.next(SocketState.Connected));
    this.socket.on('reconnect', () => this.stateSubject.next(SocketState.Connected));
    this.socket.on('connect_error', e => this.stateSubject.next(SocketState.Disconnected));
    this.socket.on('connect_timeout', e => this.stateSubject.next(SocketState.Disconnected));
    this.socket.on('disconnect', e => this.stateSubject.next(SocketState.Disconnected));
    this.socket.on('reconnecting', e => this.stateSubject.next(SocketState.Connecting));
    this.socket.on('reconnect_error', e => this.stateSubject.next(SocketState.Connecting));
    this.socket.on('reconnect_failed', e => this.stateSubject.next(SocketState.Disconnected));

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
