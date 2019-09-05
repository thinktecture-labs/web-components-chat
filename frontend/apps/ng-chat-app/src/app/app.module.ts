import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './components/root/root.component';
import { socketServiceInitializerFactory, socketServiceInitializerFactoryDeps } from './services/socket-service.initializer';
import { WebComponentWrappersModule } from './web-component-wrappers/web-component-wrappers.module';
import { OnlineStateIconComponent } from './components/online-state-icon/online-state-icon.component';
import { HeaderComponent } from './components/header/header.component';
import { ChatOverviewComponent } from './components/chat-overview/chat-overview.component';
import { ChatComponent } from './components/chat/chat.component';
import { NoChatSelectedComponent } from './components/no-chat-selected/no-chat-selected.component';

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
  ],
  bootstrap: [RootComponent],
})
export class AppModule {
}
