import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

import { LogoutFacadeService } from '../../../auth/services/facades/logout';
import { LoggedInUserStoreService } from '../../../auth/stores/logged-in-user-store';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly _router = inject(Router);
  private readonly _logoutFacadeService = inject(LogoutFacadeService);
  private readonly _loggedInUserStoreService = inject(LoggedInUserStoreService);

  isLoggedIn = computed(() => this._loggedInUserStoreService.isLoggedIn());

  logout(): void {
    this._logoutFacadeService.logout().subscribe({
      next: () => {
        this._router.navigate(['/auth/login']);
      },
    });
  }
}
