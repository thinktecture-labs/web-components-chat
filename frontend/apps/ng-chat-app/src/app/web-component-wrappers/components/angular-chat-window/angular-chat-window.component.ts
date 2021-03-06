import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Message } from '@wc-demo/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'chat-angular-chat-window',
  templateUrl: './angular-chat-window.component.html',
  styleUrls: ['./angular-chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularChatWindowComponent {
  @Input() messages: Message[] = [];

  apiEndpoint = `${environment.backendUrl}/api/link-preview`;
}
