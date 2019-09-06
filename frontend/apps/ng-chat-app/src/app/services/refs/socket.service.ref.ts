import { Injectable } from '@angular/core';
import { SocketService } from '@wc-demo/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SocketServiceRef extends SocketService {
  constructor() {
    super(environment.backendUrl);
  }
}
