import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { DragonRequest } from '../integration/dragon.request';
import { DragonsService } from '../service/dragons.service';

@Component({
  selector: 'app-dragon-add',
  templateUrl: './dragon-add.component.html',
  styleUrls: ['./dragon-add.component.css'],
})
export class DragonAddComponent {
  public isLoading: boolean;

  constructor(
    private readonly service: DragonsService,
    private readonly router: Router) {
    this.isLoading = false;
  }

  get isMobileDevice(): boolean {
    return screen.width < 650;
  }

  public addDragon(newDragon: DragonRequest): void {
    if (!isNullOrUndefined(newDragon)) {
      this.isLoading = true;
      this.service.addDragon(newDragon).pipe(
        tap(() => { this.isLoading = false; }),
        tap(() => { this.router.navigateByUrl('/dragons'); }),
      ).subscribe();
    } else {
      this.router.navigateByUrl('/dragons');
    }
  }
}
