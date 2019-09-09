import { Component } from '@angular/core';
import { Message } from './web-components/models/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sampleMessages: Message[] = [
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

  messageClick(message: Message) {
    console.log(message);
  }
}
