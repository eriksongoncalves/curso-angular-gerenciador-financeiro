import { inject, Injectable } from '@angular/core';
import { Observable, pipe, switchMap, tap, UnaryFunction } from 'rxjs';

import { AuthService } from '../auth';
import { AuthTokenStorageService } from '../auth-token-storage';
import { LoggedInUserStoreService } from '../../stores/logged-in-user-store';
import { UserCredentials } from '../../interfaces/user-credentials';
import { User } from '../../interfaces/user';
import { LoginResponse } from '../../interfaces/login-response';

@Injectable({
  providedIn: 'root',
})
export class LoginFacadeService {
  private readonly _authService = inject(AuthService);
  private readonly _authTokenStorageService = inject(AuthTokenStorageService);
  private readonly _loggedInUserStoreService = inject(LoggedInUserStoreService);

  login(payload: UserCredentials): Observable<User> {
    return this._authService.login(payload).pipe(this.createUserSession());
  }

  refreshToken(token: string): Observable<User> {
    return this._authService.refreshToken(token).pipe(this.createUserSession());
  }

  private createUserSession(): UnaryFunction<Observable<LoginResponse>, Observable<User>> {
    return pipe(
      tap((response: LoginResponse) => {
        this._authTokenStorageService.set(response.token);
      }),
      switchMap((response) => this._authService.getCurrentUser(response.token)),
      tap((user) => this._loggedInUserStoreService.setUser(user)),
    );
  }
}
