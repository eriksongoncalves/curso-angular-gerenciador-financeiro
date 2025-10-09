import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoginFacadeService } from '../../services/facades/login';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly _router = inject(Router);
  private readonly _loginFacadeService = inject(LoginFacadeService);

  form = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submit(): void {
    if (this.form.valid) {
      const user: string = this.form.value.user!;
      const password: string = this.form.value.password!;

      this._loginFacadeService.login({ user, password }).subscribe({
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
