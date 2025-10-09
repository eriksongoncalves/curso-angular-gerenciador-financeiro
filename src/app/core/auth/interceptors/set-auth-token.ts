import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { LoggedInUserStoreService } from '../stores/logged-in-user-store';
import { AuthTokenStorageService } from '../services/auth-token-storage';

export const setAuthTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _loggedInUserStoreService = inject(LoggedInUserStoreService);
  const _authTokenStorageService = inject(AuthTokenStorageService);

  if (_loggedInUserStoreService.isLoggedIn()) {
    const token = _authTokenStorageService.get();

    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });

    return next(newReq);
  }

  return next(req);
};
