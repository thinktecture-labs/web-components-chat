import { Component } from '@angular/core';
import { ChatHistoryService, SecurityService } from '@wc-demo/core';
import { tap } from 'rxjs/operators';
import { faBan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'chat-purge',
  templateUrl: './purge.component.html',
  styleUrls: ['./purge.component.scss'],
})
export class PurgeComponent {
  readonly faBan = faBan;

  constructor(
    private readonly chatHistoryService: ChatHistoryService,
    private readonly securityService: SecurityService,
  ) {
  }

  purge() {
    this.chatHistoryService.purge().pipe(
      tap(() => this.securityService.logout()),
    ).subscribe(() => window.location.reload());
  }
}
