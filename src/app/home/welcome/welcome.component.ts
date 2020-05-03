import { Component } from '@angular/core';

import { first } from 'rxjs/operators';

import { UserModel } from '../../auth/model/user.model';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  public user: UserModel;

  constructor(private readonly authService: AuthService) {
    this.authService.user.pipe(
      first(),
    ).subscribe(
      user => { this.user = user; }
    );
  }
}
