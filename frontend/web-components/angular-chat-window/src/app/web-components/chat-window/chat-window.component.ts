import { Component, ElementRef, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
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
  debug: boolean;

  constructor(elementRef: ElementRef<HTMLElement>) {
    // tslint:disable-next-line:one-variable-per-declaration
    let border, margin, padding;
    // Debug
    window.addEventListener('message', event => {
      if (event.data) {
        this.debug = !!event.data.expose;

        if (event.data.expose) {
          border = elementRef.nativeElement.style.border;
          margin = elementRef.nativeElement.style.margin;
          padding = elementRef.nativeElement.style.padding;
          elementRef.nativeElement.style.border = '5px dashed black';
          elementRef.nativeElement.style.margin = elementRef.nativeElement.style.padding = '0.5rem';
        } else {
          elementRef.nativeElement.style.border = border;
          elementRef.nativeElement.style.margin = margin;
          elementRef.nativeElement.style.padding = padding;
        }
      }
    });
  }

  trackByTimestamp(): TrackByFunction<Message> {
    return (index, item) => item.timestamp;
  }
}
