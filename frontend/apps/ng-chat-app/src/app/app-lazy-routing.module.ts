import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootLazyComponent } from './components/root-lazy/root-lazy.component';


const routes: Routes = [
  {
    path: '',
    component: RootLazyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLazyRoutingModule { }