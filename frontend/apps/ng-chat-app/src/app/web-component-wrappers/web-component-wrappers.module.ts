import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactContactListComponent } from './components/react-contact-list/react-contact-list.component';
import { VueLoginComponent } from './components/vue-login/vue-login.component';

@NgModule({
  declarations: [ReactContactListComponent, VueLoginComponent],
  exports: [
    ReactContactListComponent,
  ],
  imports: [
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebComponentWrappersModule {
}
