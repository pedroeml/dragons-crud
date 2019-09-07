import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DragonListItemModel } from '../model/dragon-list-item.model';
import { DragonsService } from '../service/dragons.service';

@Component({
  selector: 'app-dragons-list',
  templateUrl: './dragons-list.component.html',
  styleUrls: ['./dragons-list.component.css'],
})
export class DragonsListComponent {
  private dragons: DragonListItemModel[];

  constructor(private readonly service: DragonsService) {
    this.service.getDragonsList().pipe(
      tap(dragons => { this.dragons = dragons; }),
    ).subscribe();
  }

}
