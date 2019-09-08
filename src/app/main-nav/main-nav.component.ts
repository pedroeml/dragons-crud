import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnDestroy {
  private readonly unsubscribe$: Subject<void>;
  public isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
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
}
