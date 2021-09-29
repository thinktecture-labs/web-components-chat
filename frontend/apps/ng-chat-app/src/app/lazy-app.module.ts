import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppLazyRoutingModule } from './app-lazy-routing.module';
import { RootLazyComponent } from './components/root-lazy/root-lazy.component';


@NgModule({
  declarations: [
    RootLazyComponent
  ],
  imports: [
    FontAwesomeModule,
    AppLazyRoutingModule
  ],
  providers: [


  ],
  bootstrap: [RootLazyComponent],
})
export class LazyAppModule {
}
