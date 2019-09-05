import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactContactListComponent } from './components/react-contact-list/react-contact-list.component';
import { VueLoginComponent } from './components/vue-login/vue-login.component';
import { AngularChatWindowComponent } from './components/angular-chat-window/angular-chat-window.component';

@NgModule({
  declarations: [ReactContactListComponent, VueLoginComponent, AngularChatWindowComponent],
  exports: [
    ReactContactListComponent,
    AngularChatWindowComponent,
  ],
  imports: [
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebComponentWrappersModule {
}
