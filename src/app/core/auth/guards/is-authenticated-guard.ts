import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';

import { LoggedInUserStoreService } from '../stores/logged-in-user-store';

export const isAuthenticatedGuard: CanActivateFn = () => {
  const _router = inject(Router);
  const _loggedInUserStoreService = inject(LoggedInUserStoreService);

  if (_loggedInUserStoreService.isLoggedIn()) {
    return true;
  }

  const url = _router.parseUrl('/auth/login');
  return new RedirectCommand(url);
};
