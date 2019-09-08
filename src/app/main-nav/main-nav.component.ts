import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from './../auth/service/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnDestroy {
  private readonly unsubscribe$: Subject<void>;
  public readonly isHandset$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router) {
    this.unsubscribe$ = new Subject<void>();
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      takeUntil(this.unsubscribe$),
      map(result => result.matches),
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
