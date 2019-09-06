import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService, SecurityService } from '@wc-demo/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'chat-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.scss'],
})
export class ChatOverviewComponent implements OnInit {
  users$: Observable<string[]>;

  constructor(
    private readonly router: Router,
    private readonly chatService: ChatService,
    private readonly securityService: SecurityService,
  ) {
  }

  selectContact(username: string) {
    this.router.navigate(['/chat', username]);
  }

  ngOnInit() {
    this.users$ = this.chatService.users$.pipe(
      map(users => {
        const indexToDelete = users.findIndex(p => p === this.securityService.username);
        if (indexToDelete >= 0) {
          users.splice(indexToDelete, 1);
        }
        return users;
      }),
    );
  }
}
