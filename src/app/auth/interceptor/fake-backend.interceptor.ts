import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

import { UserResponse } from '../integration/user.response';
import { UserModel } from '../model/user.model';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  private readonly users: UserModel[];
  private readonly token: string;

  constructor() {
    const user: UserResponse = {
      id: 1,
      username: 'john',
      password: '123',
      firstName: 'John',
      lastName: 'Doe',
    };
    this.users = [new UserModel(user)];
    this.token = 'fake-token';
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(undefined).pipe(
      mergeMap(() => {
        const isAuthRequest: boolean = request.url.endsWith('/users/authenticate') && request.method === 'POST';
        return isAuthRequest ? this.handleAuthRequest(request) : next.handle(request);
      }),
      materialize(),
      delay(500),
      dematerialize(),
    );
  }

  private findUserFromRequestBody(request: HttpRequest<any>): UserModel {
    if (!request.body) {
      return undefined;
    }

    const user: UserResponse = request.body;
    return this.users.find(u => u.username === user.username && u.password === user.password);
  }

  private handleAuthRequest(request: HttpRequest<any>): Observable<HttpResponse<UserResponse>> {
    const user: UserModel = this.findUserFromRequestBody(request);

    if (!user) {
      const errorResponse: HttpErrorResponse = new HttpErrorResponse({
        status: 400,
        error: {
          message: 'Username or password is wrong',
        },
      });
      return throwError(errorResponse);
    }

    const body: UserResponse = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      token: this.token,
    };
    const response: HttpResponse<UserResponse> = new HttpResponse<UserResponse>({ status: 200, body });

    return of(response);
  }
}
