import { Component, Input } from '@angular/core';
import { Message } from '@wc-demo/core';

@Component({
  selector: 'chat-angular-chat-window',
  templateUrl: './angular-chat-window.component.html',
  styleUrls: ['./angular-chat-window.component.scss'],
})
export class AngularChatWindowComponent {
  @Input() messages: Message[] = [];
}
