import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
import { Message } from '../models/message';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent {
  @Input() messages: Message[];
  @Output() messageClick = new EventEmitter<Message>();

  constructor() {
  }

  trackByTimestamp(): TrackByFunction<Message> {
    return (index, item) => item.timestamp;
  }
}
