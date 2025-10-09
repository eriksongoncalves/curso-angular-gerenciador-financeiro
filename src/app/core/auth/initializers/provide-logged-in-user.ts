import { EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';
import { of } from 'rxjs';

import { AuthTokenStorageService } from '../services/auth-token-storage';
import { LoginFacadeService } from '../services/facades/login';

export function provideLoggedInUser(): EnvironmentProviders {
  return provideAppInitializer(() => {
    const _authTokenStorageService = inject(AuthTokenStorageService);
    const _loginFacadeService = inject(LoginFacadeService);

    if (_authTokenStorageService.has()) {
      return of();
    }

    const token = _authTokenStorageService.get()!;

    return _loginFacadeService.refreshToken(token);
  });
}
