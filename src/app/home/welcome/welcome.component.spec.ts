import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AuthModule } from '../../auth/auth.module';
import { UserModel } from '../../auth/model/user.model';
import { AuthService } from '../../auth/service/auth.service';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let fixture: ComponentFixture<WelcomeComponent>;
  let component: WelcomeComponent;
  let service: AuthService;

  const user: UserModel = new UserModel({
    id: 0,
    username: 'user',
    password: '123',
    firstName: 'User',
    lastName: 'Test',
    token: 'fake-jwt-token',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AuthModule,
        CommonModule,
        RouterTestingModule,
      ],
      declarations: [
        WelcomeComponent,
      ],
      providers: [
        { provide: AuthService, useClass: class { user: Observable<UserModel> = of(user); } },
      ],
    }).compileComponents().then(() => {
      service = TestBed.get(AuthService);
      fixture = TestBed.createComponent(WelcomeComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    });
  }));

  describe('Initializing component', () => {
    it('should be defined', () => {
      expect(component).toBeDefined();
    });

    it('should have a UserModel object property', () => {
      expect(component.user).toBe(user);
    });
  });
});
