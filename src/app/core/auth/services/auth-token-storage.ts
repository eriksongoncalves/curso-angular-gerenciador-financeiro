import { inject, Injectable } from '@angular/core';

import { LocalStorageToken } from '../tokens/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenStorageService {
  private readonly KEY: string = 'auth-token';

  private readonly _localStorageToken = inject(LocalStorageToken);

  set(token: string): void {
    this._localStorageToken.setItem(this.KEY, token);
  }

  get(): string | null {
    return this._localStorageToken.getItem(this.KEY);
  }

  has(): boolean {
    return Boolean(this.get());
  }
}
