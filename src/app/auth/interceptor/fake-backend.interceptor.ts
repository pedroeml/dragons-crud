import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { UserModel } from '../model/user.model';
import { UserResponse } from './../integration/user.response';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  private readonly users: UserModel[];
  private readonly token: string;

  constructor() {
    this.users = [new UserModel({ id: 1, username: 'john', password: '123', firstName: 'John', lastName: 'Doe' })];
    this.token = 'fake-token';
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(undefined).pipe(
      mergeMap(() => {
        if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
          return this.handleAuthRequest(request);
        } else if (request.url.endsWith('/home') && request.method === 'GET') {
          return this.handleUsersRequest(request);
        }

        return next.handle(request);
      }),
      materialize(),
      delay(1000),
      dematerialize()
    );
  }

  private findUserFromRequestBody(request: HttpRequest<any>): UserModel {
    if (isNullOrUndefined(request.body)) {
      return undefined;
    }

    const user: UserResponse = request.body;
    return this.users.find(u => u.username === user.username && u.password === user.password);
  }

  private handleAuthRequest(request: HttpRequest<any>): Observable<HttpResponse<UserResponse>> {
    const user: UserModel = this.findUserFromRequestBody(request);

    if (isNullOrUndefined(user)) {
      const errorResponse: HttpErrorResponse = new HttpErrorResponse({
        status: 400,
        error: {
          message: 'Username or password is wrong'
        }
      });
      return throwError(errorResponse);
    }

    const body: UserResponse = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      token: this.token
    };
    const response: HttpResponse<UserResponse> = new HttpResponse<UserResponse>({ status: 200, body });

    return of(response);
  }

  private handleUsersRequest(request: HttpRequest<any>): Observable<HttpResponse<UserResponse[]>> {
    const authHeader: string = request.headers.get('Authorization');
    const isLoggedIn: boolean = !isNullOrUndefined(authHeader) && authHeader.startsWith(this.token);

    if (!isLoggedIn) {
      const errorResponse: HttpErrorResponse = new HttpErrorResponse({
        status: 401,
        error: {
          message: 'Unauthorized'
        }
      });
      return throwError(errorResponse);
    }

    const body: UserResponse[] = this.users;
    const response: HttpResponse<UserResponse[]> = new HttpResponse<UserResponse[]>({ status: 200, body });
    return of(response);
  }
}
