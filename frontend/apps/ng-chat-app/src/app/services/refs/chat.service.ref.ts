import { Injectable, OnDestroy } from '@angular/core';
import { ChatHistoryService, ChatService, SocketService } from '@wc-demo/core';

@Injectable()
export class ChatServiceRef extends ChatService implements OnDestroy {
  constructor(socketService: SocketService, chatHistoryService: ChatHistoryService) {
    super(socketService, chatHistoryService);
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
