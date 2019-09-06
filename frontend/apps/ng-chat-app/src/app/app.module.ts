import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocketService } from '@wc-demo/core';
import { AppRoutingModule } from './app-routing.module';
import { ChatOverviewComponent } from './components/chat-overview/chat-overview.component';
import { ChatComponent } from './components/chat/chat.component';
import { HeaderComponent } from './components/header/header.component';
import { NoChatSelectedComponent } from './components/no-chat-selected/no-chat-selected.component';
import { OnlineStateIconComponent } from './components/online-state-icon/online-state-icon.component';
import { RootComponent } from './components/root/root.component';
import { SocketServiceRef } from './services/refs/socket.service.ref';
import { socketServiceInitializerFactory, socketServiceInitializerFactoryDeps } from './services/socket-service.initializer';
import { WebComponentWrappersModule } from './web-component-wrappers/web-component-wrappers.module';

@NgModule({
  declarations: [
    RootComponent,
    OnlineStateIconComponent,
    HeaderComponent,
    ChatOverviewComponent,
    ChatComponent,
    NoChatSelectedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebComponentWrappersModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: socketServiceInitializerFactory,
      deps: socketServiceInitializerFactoryDeps,
      multi: true,
    },
    { provide: SocketService, useClass: SocketServiceRef },
  ],
  bootstrap: [RootComponent],
})
export class AppModule {
}
