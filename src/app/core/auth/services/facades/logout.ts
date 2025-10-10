import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../auth';
import { AuthTokenStorageService } from '../auth-token-storage';
import { LoggedInUserStoreService } from '../../stores/logged-in-user-store';

@Injectable({
  providedIn: 'root',
})
export class LogoutFacadeService {
  private readonly _authService = inject(AuthService);
  private readonly _authTokenStorageService = inject(AuthTokenStorageService);
  private readonly _loggedInUserStoreService = inject(LoggedInUserStoreService);

  logout(): Observable<unknown> {
    return this._authService.logout().pipe(
      tap(() => this._authTokenStorageService.remove()),
      tap(() => this._loggedInUserStoreService.loggout()),
    );
  }
}
