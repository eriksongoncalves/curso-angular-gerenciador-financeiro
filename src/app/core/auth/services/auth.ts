import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { UserCredentials } from '../interfaces/user-credentials';
import { LoginResponse } from '../interfaces/login-response';
import { RefreshTokenResponse } from '../interfaces/refresh-token-response';
import { User } from '../interfaces/user';

function gerarToken(tamanho = 20): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const arr = chars.split('').sort(() => 0.5 - Math.random());
  return arr.slice(0, tamanho).join('');
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(payload: UserCredentials): Observable<LoginResponse> {
    if (payload.user === 'admin' && payload.password === '123') {
      return of({ token: gerarToken() });
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

  refreshToken(token: string): Observable<RefreshTokenResponse> {
    return of({
      token: gerarToken(),
    });
  }
}
