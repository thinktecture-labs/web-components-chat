import { SocketService } from '@wc-demo/core';
import { environment } from '../../../environments/environment';

export class SocketServiceRef extends SocketService {
  constructor() {
    super(environment.backendUrl);
  }
}
