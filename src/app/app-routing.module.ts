import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [{
  path: 'login',
  loadChildren: './login/login.module#LoginModule',
}, {
  path: 'home',
  canActivate: [AuthGuard],
  loadChildren: './home/home.module#HomeModule',
}, {
  path: 'dragons',
  canActivate: [AuthGuard],
  loadChildren: './dragons/dragons.module#DragonsModule',
}, {
  path: '',
  redirectTo: '/login',
  pathMatch: 'full',
}];

@NgModule({
  imports: [AuthModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
