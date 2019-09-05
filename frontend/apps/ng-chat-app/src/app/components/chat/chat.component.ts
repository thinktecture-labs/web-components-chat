import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'chat-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  username$: Observable<string>;

  constructor(private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.username$ = this.activatedRoute.params.pipe(
      map(params => params.username),
    );
  }

  sendMessage(message: string): void {
    console.log(message);
  }
}
