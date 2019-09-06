import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

export enum SocketState {
    Disconnected = 'disconnected',
    Connecting = 'connecting',
    Connected = 'connected'
}

export class SocketService {
    private stateSubject = new BehaviorSubject<SocketState>(SocketState.Disconnected);
    state$ = this.stateSubject.asObservable();

    private socket: Socket;
    private isInitialized: boolean;

    constructor(backendUrl: string) {
        this.socket = io(backendUrl);
    }

    connect(): void {
        if (this.socket.connected) {
            return;
        }

        this.stateSubject.next(SocketState.Connecting);

        if (!this.isInitialized) {
            this.socket.on('connect', () => this.stateSubject.next(SocketState.Connected));
            this.socket.on('reconnect', () => this.stateSubject.next(SocketState.Connected));
            this.socket.on('connect_error', e => this.stateSubject.next(SocketState.Disconnected));
            this.socket.on('connect_timeout', e => this.stateSubject.next(SocketState.Disconnected));
            this.socket.on('disconnect', e => this.stateSubject.next(SocketState.Disconnected));
            this.socket.on('reconnecting', e => this.stateSubject.next(SocketState.Connecting));
            this.socket.on('reconnect_error', e => this.stateSubject.next(SocketState.Connecting));
            this.socket.on('reconnect_failed', e => this.stateSubject.next(SocketState.Disconnected));
            this.isInitialized = true;
        }

        this.socket.connect();
    }

    fromEvent<T>(name: string): Observable<T> {
        return new Observable<T>(observer => {
            this.socket.on(name, (data: T) => observer.next(data));

            return () => this.socket.removeListener(name);
        }).pipe(share());
    }

    send(event: string, ...payloadAndAck: any[]): void {
        this.socket.emit(event, ...payloadAndAck);
    }

    disconnect() {
        this.socket.disconnect();
    }
}
