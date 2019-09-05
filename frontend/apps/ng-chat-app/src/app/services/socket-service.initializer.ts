import { SocketService } from './socket.service';

export function socketServiceInitializerFactory(socketService: SocketService): () => boolean {
  return () => {
    socketService.connect();
    return true;
  };
}

export const socketServiceInitializerFactoryDeps = [SocketService];
