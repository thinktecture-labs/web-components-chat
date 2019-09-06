import { ChatService, SocketService } from '@wc-demo/core';

export function chatServiceInitializerFactory(chatService: ChatService): () => boolean {
  return () => {
    chatService.initialize();
    return true;
  };
}

export const chatServiceInitializerFactoryDeps = [ChatService];
