import { SocketService } from '@wc-demo/core';

export function socketServiceInitializerFactory(socketService: SocketService): () => boolean {
  return () => {
    socketService.connect();
    return true;
  };
}

export const socketServiceInitializerFactoryDeps = [SocketService];
