import {
  DEFAULT_CURRENCY_CODE,
  EnvironmentProviders,
  LOCALE_ID,
  makeEnvironmentProviders,
} from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { provideAuth } from './auth/provide-auth';
import { setAuthTokenInterceptor } from './auth/interceptors/set-auth-token';

registerLocaleData(ptBr);

export function provideCore(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(withInterceptors([setAuthTokenInterceptor])),
    provideEnvironmentNgxMask({
      thousandSeparator: '.',
      decimalMarker: ',',
    }),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
      } as MatSnackBarConfig,
    },
    provideAuth(),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: LOCALE_ID, useValue: 'pt' },
  ]);
}
