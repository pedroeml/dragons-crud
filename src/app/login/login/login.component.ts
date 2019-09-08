import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, first, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isLoading: boolean = false;
  public error: string = '';

  constructor(
    private service: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.service.logout();
  }

  public submit(): void {
    const username: string = this.form.controls['username'].value;
    const password: string = this.form.controls['password'].value;
    this.isLoading = true;
    this.service.login(username, password).pipe(
      first(),
      delay(500),
      tap(() => { this.isLoading = false; }),
      tap(() => { this.router.navigateByUrl('/home'); })
    ).subscribe(
      data => { },
      error => {
        this.error = error.error.message;
        this.isLoading = false;
      });
  }
}
