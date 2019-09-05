import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'chat-react-contact-list',
  templateUrl: './react-contact-list.component.html',
  styleUrls: ['./react-contact-list.component.scss'],
})
export class ReactContactListComponent {
  @Input() names: string[] = ['user1'];
  @Output() contactClick = new EventEmitter<string>();
}
