import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'chat-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.scss'],
})
export class ChatOverviewComponent {
  constructor(private readonly router: Router) {
  }

  selectContact(username: string) {
    this.router.navigate(['/chat', username]);
  }
}
