import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { UserCredentials } from '../interfaces/user-credentials';
import { LoginResponse } from '../interfaces/login-response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(payload: UserCredentials): Observable<LoginResponse> {
    if (payload.user === 'admin' && payload.password === '123') {
      return of({ token: 'fake-token' });
    }

    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          statusText: 'Unauthorized',
        }),
    );
  }

  getCurrentUser(token: string): Observable<User> {
    return of({
      username: 'admin',
    });
  }
}
