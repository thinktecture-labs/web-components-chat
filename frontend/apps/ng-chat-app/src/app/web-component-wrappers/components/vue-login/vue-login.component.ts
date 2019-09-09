import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '@wc-demo/core';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'chat-vue-login',
  templateUrl: './vue-login.component.html',
  styleUrls: ['./vue-login.component.scss'],
})
export class VueLoginComponent implements OnInit {
  error: boolean;

  constructor(
    private readonly securityService: SecurityService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  submit(event: CustomEvent) {
    const username = event.detail[0].name;

    this.error = false;
    this.securityService.login(username).pipe(
      switchMap(() => this.activatedRoute.queryParams.pipe(take(1))),
      map(params => params.redirectUri),
    ).subscribe(
      redirectUri => this.router.navigate([redirectUri || '/chat']),
      () => this.error = true,
    );
  }

  ngOnInit() {
    const name = localStorage.getItem('bypass-login');
    if (!environment.production && name) {
      this.submit({ detail: [{ name }] } as CustomEvent);
    }
  }
}
