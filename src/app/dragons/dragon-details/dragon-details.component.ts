import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

import { DragonRequest } from '../integration/dragon.request';
import { DragonModel } from '../model/dragon.model';
import { DragonsService } from '../service/dragons.service';

@Component({
  selector: 'app-dragon-details',
  templateUrl: './dragon-details.component.html',
  styleUrls: ['./dragon-details.component.css'],
})
export class DragonDetailsComponent {
  private id: string;
  public dragon: DragonModel;
  public isLoading: boolean;
  public isUpdating: boolean;

  constructor(
    private readonly service: DragonsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
    this.isLoading = false;
    this.isUpdating = false;
    this.loadDragon().subscribe();
  }

  private loadDragon(): Observable<DragonModel> {
    return this.route.params.pipe(
      first(),
      tap(() => { this.isLoading = true; }),
      map((params: ParamMap) => params['id'] ? params['id'] : ''),
      tap(id => { this.id = id; }),
      switchMap(id => this.service.getDragon(id)),
      tap(dragon => {
        this.dragon = dragon;
        this.isLoading = false;

        if (!dragon) {
          this.router.navigateByUrl('/dragons');
        }
      }),
    );
  }

  get isMobileDevice(): boolean {
    return screen.width < 650;
  }

  public updateDragon(updatedDragon: DragonRequest): void {
    if (updatedDragon) {
      this.isUpdating = true;
      this.service.updateDragon(this.id, updatedDragon).subscribe(() => {
        this.isUpdating = false;
        this.router.navigateByUrl('/dragons');
      });
    } else {
      this.router.navigateByUrl('/dragons');
    }
  }

  public deleteDragon(): void {
    this.isUpdating = true;
    this.service.deleteDragon(this.id).subscribe(() => {
      this.isUpdating = true;
      this.router.navigateByUrl('/dragons');
    });
  }
}
