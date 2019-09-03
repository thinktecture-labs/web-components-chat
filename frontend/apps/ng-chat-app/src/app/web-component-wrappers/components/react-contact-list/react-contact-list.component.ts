import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'chat-react-contact-list',
  templateUrl: './react-contact-list.component.html',
  styleUrls: ['./react-contact-list.component.scss'],
})
export class ReactContactListComponent {
  sampleNames = ['frido', 'herbert'];

  constructor() {
  }
}
