import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatOverviewComponent } from './components/chat-overview/chat-overview.component';
import { ChatComponent } from './components/chat/chat.component';
import { NoChatSelectedComponent } from './components/no-chat-selected/no-chat-selected.component';
import { VueLoginComponent } from './web-component-wrappers/components/vue-login/vue-login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chat',
  },
  {
    path: 'chat',
    component: ChatOverviewComponent,
    // canActivate: [IsAuthenticatedGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: NoChatSelectedComponent,
      },
      {
        path: ':username',
        component: ChatComponent,
      },
    ],
  },
  {
    path: 'login',
    component: VueLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
