import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService, Message } from '@wc-demo/core';
import { from, Observable } from 'rxjs';
import { map, scan, startWith, switchMap, withLatestFrom } from 'rxjs/operators';

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
              private readonly chatService: ChatService) {
  }

  ngOnInit() {
    this.username$ = this.activatedRoute.params.pipe(
      map(params => params.username),
      withLatestFrom(this.chatService.users$),
      map(([username, allUsers]: [string, string[]]) => {
        if (!allUsers.includes(username)) {
          this.router.navigate(['/chat']);
        }

        return username;
      }),
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
