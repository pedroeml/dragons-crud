import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DragonListItemModel } from '../model/dragon-list-item.model';
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
}