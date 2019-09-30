import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatHistoryService, ChatService, Message } from '@wc-demo/core';
import { forkJoin, from, Observable } from 'rxjs';
import { map, scan, switchMap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'chat-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  username$: Observable<string>;
  chats$: Observable<Message[]>;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly chatHistoryService: ChatHistoryService,
              private readonly chatService: ChatService) {
  }

  ngOnInit() {
    this.username$ = this.activatedRoute.params.pipe(
      map(params => params.username),
      switchMap(username => this.chatHistoryService.allUsers$().pipe(
        withLatestFrom(this.chatService.onlineUsers$),
        map(([historyUsers, onlineUsers]) => {
          const allUsers = [...historyUsers, ...onlineUsers];
          if (!allUsers.includes(username)) {
            this.router.navigate(['/chat']);
          }

          return username;
        }),
      )),
    );

    this.chats$ = this.username$.pipe(
      switchMap(username => this.chatService.chatsForUser$(username).pipe(
        scan((acc: Message[], value: Message) => [...acc, value], [])),
      ),
    );
  }

  sendMessage(message: string): void {
    from(this.username$).pipe(
      switchMap(username => this.chatService.sendMessage$({ message, to: username })),
    ).subscribe();
  }
}
