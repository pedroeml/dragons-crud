import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragonsListComponent } from './dragons-list/dragons-list.component';

const routes: Routes = [{
  path: '',
  component: DragonsListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DragonsRoutingModule { }
