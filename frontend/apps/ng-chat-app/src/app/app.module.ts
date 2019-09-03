import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './components/root/root.component';
import { WebComponentWrappersModule } from './web-component-wrappers/web-component-wrappers.module';

@NgModule({
  declarations: [
    RootComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebComponentWrappersModule,
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class AppModule {
}
