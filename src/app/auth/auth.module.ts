import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthRestService } from './service/auth-rest.service';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [AuthRoutingModule],
  providers: [AuthRestService, AuthService]
})
export class AuthModule { }
