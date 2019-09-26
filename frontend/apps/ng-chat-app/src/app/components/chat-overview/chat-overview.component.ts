import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatHistoryService, ChatService, SecurityService } from '@wc-demo/core';
import { from, Observable } from 'rxjs';
import { distinctUntilChanged, filter, flatMap, map, switchMap, toArray } from 'rxjs/operators';
import { ChatUser } from './chat-user';

@Component({
  selector: 'chat-chat-overview',
  templateUrl: './chat-overview.component.html',
  styleUrls: ['./chat-overview.component.scss'],
})
export class ChatOverviewComponent implements OnInit {
  users$: Observable<ChatUser[]>;

  constructor(
    private readonly router: Router,
    private readonly chatService: ChatService,
    private readonly chatHistoryService: ChatHistoryService,
    private readonly securityService: SecurityService,
  ) {
  }

  selectContact(username: string) {
    this.router.navigate(['/chat', username]);
  }

  ngOnInit(): void {
    this.users$ = this.chatHistoryService.allUsers$().pipe(
      switchMap(users => this.chatService.onlineUsers$.pipe(
        flatMap(onlineUsers => from([...users, ...onlineUsers].sort()).pipe(
          distinctUntilChanged(),
          filter(user => user !== this.securityService.username),
          map(user => ({
            username: user,
            isOnline: onlineUsers.includes(user),
          } as ChatUser)),
          toArray(),
        )),
      )),
    );
  }
}
