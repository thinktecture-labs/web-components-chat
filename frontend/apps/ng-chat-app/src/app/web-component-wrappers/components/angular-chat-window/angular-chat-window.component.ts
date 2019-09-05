import { Component, Input } from '@angular/core';

// TODO: Currently copied from the WebComponent -> can we create a .d.ts for that?
export interface Message {
  isSent: boolean;
  timestamp: number;
  message: string;
}


@Component({
  selector: 'chat-angular-chat-window',
  templateUrl: './angular-chat-window.component.html',
  styleUrls: ['./angular-chat-window.component.scss'],
})
export class AngularChatWindowComponent {
  @Input()  sampleMessages: Message[] = [
    {
      isSent: true,
      message: 'Hello!',
      timestamp: Date.now() - 1500000,
    },
    {
      isSent: true,
      message: 'How are you?',
      timestamp: Date.now() - 1200000,
    },
    {
      isSent: false,
      message: 'Fine thx, how about you?',
      timestamp: Date.now() - 1100000,
    },
    {
      isSent: true,
      message: 'Same here!',
      timestamp: Date.now() - 1000000,
    },
    {
      isSent: false,
      message: 'perfect. Btw. have you heard of webcomponents.org? It\'s such a nice website!',
      timestamp: Date.now() - 900000,
    },
    {
      isSent: true,
      message: 'Yep, I am currently creating web web-components. ' +
        'Take a look at https://tt-web-components-chat-ng.azurewebsites.net for my current sample',
      timestamp: Date.now() - 400000,
    },
    {
      isSent: false,
      message: 'Damn! That is really awesome. I need to take a look at the code!',
      timestamp: Date.now() - 100000,
    },
  ];
}
