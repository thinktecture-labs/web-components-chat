import { Component, OnInit } from '@angular/core';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocketService, SocketState } from '../../services/socket.service';

@Component({
  selector: 'chat-online-state-icon',
  templateUrl: './online-state-icon.component.html',
  styleUrls: ['./online-state-icon.component.scss'],
})
export class OnlineStateIconComponent implements OnInit {
  state$: Observable<SocketState>;
  stateClass$: Observable<string[]>;
  faWifi = faWifi;

  constructor(private readonly socketService: SocketService) {
  }

  ngOnInit() {
    this.state$ = this.socketService.state$;
    this.stateClass$ = this.state$.pipe(map(state => [state]));
  }

}
