import { Component, OnInit } from '@angular/core';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { SocketService, SocketState } from '@wc-demo/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'chat-online-state-icon',
  templateUrl: './online-state-icon.component.html',
  styleUrls: ['./online-state-icon.component.scss'],
})
export class OnlineStateIconComponent implements OnInit {
  state$: Observable<SocketState>;
  stateClass$: Observable<string[]>;
  readonly faWifi = faWifi;

  constructor(private readonly socketService: SocketService) {
  }

  ngOnInit() {
    this.state$ = this.socketService.state$;
    this.stateClass$ = this.state$.pipe(map(state => [state]));
  }

}
