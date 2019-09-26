import { Component } from '@angular/core';
import { Message } from './web-components/models/message';

const startDate = Date.now();

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
      timestamp: startDate - 1500000,
    },
    {
      isSent: true,
      message: 'How are you?',
      timestamp: startDate - 1200000,
    },
    {
      isSent: false,
      message: 'Fine thx, how about you?',
      timestamp: startDate - 1100000,
    },
    {
      isSent: true,
      message: 'Same here!',
      timestamp: startDate - 1000000,
    },
    {
      isSent: false,
      message: 'perfect. Btw. have you heard of webcomponents.org? It\'s such a nice website!',
      timestamp: startDate - 900000,
    },
    {
      isSent: true,
      message: 'Yep, I am currently creating web web-components. ' +
        'Take a look at https://tt-web-components-chat-ng.azurewebsites.net for my current sample',
      timestamp: startDate - 400000,
    },
    {
      isSent: false,
      message: 'Damn! That is really awesome. I need to take a look at the code!',
      timestamp: startDate - 100000,
    },
  ];

  messageClick(message: Message) {
    console.log(message);
  }

  newMessage() {
    this.sampleMessages.push({
      isSent: false,
      message: 'Test message',
      timestamp: startDate - 1000,
    });
  }
}
