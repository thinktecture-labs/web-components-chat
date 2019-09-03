import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactContactListComponent } from './components/react-contact-list/react-contact-list.component';

@NgModule({
  declarations: [ReactContactListComponent],
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
