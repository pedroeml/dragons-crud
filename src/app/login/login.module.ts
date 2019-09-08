import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { AuthModule } from '../auth/auth.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [AuthModule, CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule, LoginRoutingModule],
  providers: [],
})
export class LoginModule { }
