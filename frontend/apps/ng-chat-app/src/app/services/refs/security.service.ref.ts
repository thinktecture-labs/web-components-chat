import { Injectable } from '@angular/core';
import { SecurityService, SocketService } from '@wc-demo/core';

@Injectable()
export class SecurityServiceRef extends SecurityService {
  constructor(socketService: SocketService) {
    super(socketService);
  }
}
