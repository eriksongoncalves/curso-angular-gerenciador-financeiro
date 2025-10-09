import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../services/auth';
import { AuthTokenStorageService } from '../../services/auth-token-storage';
import { LoggedInUserStoreService } from '../../stores/logged-in-user-store';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _authTokenStorageService = inject(AuthTokenStorageService);
  private readonly _loggedInUserStoreService = inject(LoggedInUserStoreService);

  form = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submit(): void {
    if (this.form.valid) {
      const user: string = this.form.value.user!;
      const password: string = this.form.value.password!;

      this._authService
        .login({ user, password })
        .pipe(
          tap((response) => {
            this._authTokenStorageService.set(response.token);
          }),
          switchMap((response) => this._authService.getCurrentUser(response.token)),
          tap((user) => this._loggedInUserStoreService.setUser(user)),
        )
        .subscribe({
          next: () => this._router.navigate(['/']),
          error: (error: HttpErrorResponse) => {
            console.log('>>> error', error);
            this.form.setErrors({
              wrongCredentials: true,
            });
          },
        });
    }
  }
}
