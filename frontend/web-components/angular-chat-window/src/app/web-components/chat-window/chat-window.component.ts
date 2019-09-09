import { Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
import { Message } from '../models/message';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent {
  @Input() messages: Message[];
  @Input() apiEndpoint: string;
  @Output() messageClick = new EventEmitter<Message>();

  trackByTimestamp(): TrackByFunction<Message> {
    return (index, item) => item.timestamp;
  }
}
