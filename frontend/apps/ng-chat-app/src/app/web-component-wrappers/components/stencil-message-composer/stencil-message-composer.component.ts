import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'chat-stencil-message-composer',
  templateUrl: './stencil-message-composer.component.html',
  styleUrls: ['./stencil-message-composer.component.scss'],
})
export class StencilMessageComposerComponent {
  @Output() messageComposed = new EventEmitter<string>();

  wcMessageComposed(event: CustomEvent) {
    event.stopPropagation();
    this.messageComposed.emit(event.detail);
  }
}
