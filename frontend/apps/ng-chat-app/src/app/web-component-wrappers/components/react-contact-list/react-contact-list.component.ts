import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatUser } from '../../../components/chat-overview/chat-user';

@Component({
  selector: 'chat-react-contact-list',
  templateUrl: './react-contact-list.component.html',
  styleUrls: ['./react-contact-list.component.scss'],
})
export class ReactContactListComponent {
  @Input() names: ChatUser[] = [];
  @Output() contactClick = new EventEmitter<string>();
}
