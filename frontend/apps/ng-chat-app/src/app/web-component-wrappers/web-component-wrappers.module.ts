import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactContactListComponent } from './components/react-contact-list/react-contact-list.component';
import { VueLoginComponent } from './components/vue-login/vue-login.component';
import { AngularChatWindowComponent } from './components/angular-chat-window/angular-chat-window.component';
import { StencilMessageComposerComponent } from './components/stencil-message-composer/stencil-message-composer.component';

@NgModule({
  declarations: [ReactContactListComponent, VueLoginComponent, AngularChatWindowComponent, StencilMessageComposerComponent],
  exports: [
    ReactContactListComponent,
    AngularChatWindowComponent,
    StencilMessageComposerComponent,
  ],
  imports: [
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebComponentWrappersModule {
}
