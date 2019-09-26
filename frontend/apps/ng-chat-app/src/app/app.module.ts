import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChatService, SecurityService, SocketService } from '@wc-demo/core';
import { ChatHistoryService } from '../../projects/core/src/lib/services/chat-history.service';
import { AppRoutingModule } from './app-routing.module';
import { ChatOverviewComponent } from './components/chat-overview/chat-overview.component';
import { ChatComponent } from './components/chat/chat.component';
import { HeaderComponent } from './components/header/header.component';
import { NoChatSelectedComponent } from './components/no-chat-selected/no-chat-selected.component';
import { OnlineStateIconComponent } from './components/online-state-icon/online-state-icon.component';
import { RootComponent } from './components/root/root.component';
import { chatServiceInitializerFactory, chatServiceInitializerFactoryDeps } from './services/chat-service.initializer';
import { ChatHistoryServiceRef } from './services/refs/chat-history.service.ref';
import { ChatServiceRef } from './services/refs/chat.service.ref';
import { SecurityServiceRef } from './services/refs/security.service.ref';
import { SocketServiceRef } from './services/refs/socket.service.ref';
import { socketServiceInitializerFactory, socketServiceInitializerFactoryDeps } from './services/socket-service.initializer';
import { WebComponentWrappersModule } from './web-component-wrappers/web-component-wrappers.module';
import { DebugComponent } from './components/debug/debug.component';
import { PurgeComponent } from './components/purge/purge.component';

@NgModule({
  declarations: [
    RootComponent,
    OnlineStateIconComponent,
    HeaderComponent,
    ChatOverviewComponent,
    ChatComponent,
    NoChatSelectedComponent,
    DebugComponent,
    PurgeComponent,
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
    {
      provide: APP_INITIALIZER,
      useFactory: chatServiceInitializerFactory,
      deps: chatServiceInitializerFactoryDeps,
      multi: true,
    },
    { provide: SocketService, useClass: SocketServiceRef },
    { provide: SecurityService, useClass: SecurityServiceRef },
    { provide: ChatService, useClass: ChatServiceRef },
    { provide: ChatHistoryService, useClass: ChatHistoryServiceRef },
  ],
  bootstrap: [RootComponent],
})
export class AppModule {
}
