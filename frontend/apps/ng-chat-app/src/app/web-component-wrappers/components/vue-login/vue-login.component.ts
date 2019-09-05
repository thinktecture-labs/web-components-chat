import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'chat-vue-login',
  templateUrl: './vue-login.component.html',
  styleUrls: ['./vue-login.component.scss'],
})
export class VueLoginComponent {
  error: boolean;

  constructor(
    private readonly securityService: SecurityService,
    private readonly router: Router,
  ) {
  }

  submit(event: CustomEvent) {
    const username = event.detail[0].name;

    this.error = false;
    this.securityService.login(username).subscribe(
      () => this.router.navigate(['/chat-overview']),
      () => this.error = true,
    );
  }
}
