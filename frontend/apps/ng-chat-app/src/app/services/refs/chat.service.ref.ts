import { Injectable, OnDestroy } from '@angular/core';
import { ChatService, SocketService } from '@wc-demo/core';

@Injectable()
export class ChatServiceRef extends ChatService implements OnDestroy {
  constructor(socketService: SocketService) {
    super(socketService);
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
