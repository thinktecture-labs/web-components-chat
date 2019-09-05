import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ChatMessageComponent } from './web-components/chat-message/chat-message.component';
import { TimestampFormatPipe } from './web-components/chat-message/timestamp-format.pipe';
import { ChatWindowComponent } from './web-components/chat-window/chat-window.component';
import { MessageOrderByTimestampPipe } from './web-components/chat-window/message-order-by-timestamp.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatWindowComponent,
    ChatMessageComponent,
    MessageOrderByTimestampPipe,
    TimestampFormatPipe,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: environment.production ? [] : [AppComponent],
  entryComponents: [ChatWindowComponent],
})
export class ComponentsModule implements DoBootstrap {
  constructor(private readonly injector: Injector) {
  }

  ngDoBootstrap() {
    const chatWindowCustomElement = createCustomElement(ChatWindowComponent, { injector: this.injector });
    window.customElements.define('angular-chat-window', chatWindowCustomElement);
  }
}
