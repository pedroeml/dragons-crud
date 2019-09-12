import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DragonRequest } from '../integration/dragon.request';
import { DragonListItemModel } from '../model/dragon-list-item.model';
import { DragonModel } from '../model/dragon.model';
import { DragonsRestService } from './dragons-rest.service';

@Injectable()
export class DragonsService {
  constructor(private readonly restService: DragonsRestService) { }

  public getDragonsList(): Observable<DragonListItemModel[]> {
    return this.restService.getDragons().pipe(
      map(dragons => dragons.map(dragon => new DragonListItemModel(dragon))),
      catchError(() => of([])),
    );
  }

  public getDragon(id: string): Observable<DragonModel> {
    return this.restService.getDragon(id).pipe(
      map(dragon => new DragonModel(dragon)),
      catchError(() => of(undefined)),
    );
  }

  public updateDragon(id: string, dragonRequest: DragonRequest): Observable<DragonModel> {
    return this.restService.putDragon(id, dragonRequest).pipe(
      map(dragon => new DragonModel(dragon)),
      catchError(() => of(undefined)),
    );
  }

  public deleteDragon(id: string): Observable<DragonModel> {
    return this.restService.deleteDragon(id).pipe(
      map(dragon => new DragonModel(dragon)),
      catchError(() => of(undefined)),
    );
  }
}
