import { EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';
import { of, switchMap, tap } from 'rxjs';

import { AuthService } from '../services/auth';
import { AuthTokenStorageService } from '../services/auth-token-storage';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store';

export function provideLoggedInUser(): EnvironmentProviders {
  return provideAppInitializer(() => {
    const _authService = inject(AuthService);
    const _authTokenStorageService = inject(AuthTokenStorageService);
    const _loggedInUserStoreService = inject(LoggedInUserStoreService);

    if (_authTokenStorageService.has()) {
      return of();
    }

    const token = _authTokenStorageService.get()!;

    return _authService.refreshToken(token).pipe(
      tap((response) => {
        _authTokenStorageService.set(response.token);
      }),
      switchMap((response) => _authService.getCurrentUser(response.token)),
      tap((user) => _loggedInUserStoreService.setUser(user)),
    );
  });
}
