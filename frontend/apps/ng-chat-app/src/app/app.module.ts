import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebComponentWrappersModule } from './web-component-wrappers/web-component-wrappers.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebComponentWrappersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
