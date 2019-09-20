import { Component } from '@angular/core';
import { faSpider } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'chat-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
})
export class DebugComponent {
  faSpider = faSpider;
  private enabled: boolean;

  expose() {
    // Debug stuff
    this.enabled = !this.enabled;
    window.postMessage({ expose: this.enabled }, '*');
  }
}
