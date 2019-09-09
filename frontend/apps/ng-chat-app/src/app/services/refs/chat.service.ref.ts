import { Injectable, OnDestroy } from '@angular/core';
import { ChatService, SocketService } from '@wc-demo/core';
import { ChatHistoryService } from '../../../../projects/core/src/lib/services/chat-history.service';

@Injectable()
export class ChatServiceRef extends ChatService implements OnDestroy {
  constructor(socketService: SocketService, chatHistoryService: ChatHistoryService) {
    super(socketService, chatHistoryService);
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
