import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DragonAddComponent } from './dragon-add/dragon-add.component';
import { DragonDetailsComponent } from './dragon-details/dragon-details.component';
import { DragonsListComponent } from './dragons-list/dragons-list.component';

const routes: Routes = [{
  path: '',
  component: DragonsListComponent,
}, {
  path: 'add',
  component: DragonAddComponent,
}, {
  path: ':id',
  component: DragonDetailsComponent,
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class DragonsRoutingModule { }
