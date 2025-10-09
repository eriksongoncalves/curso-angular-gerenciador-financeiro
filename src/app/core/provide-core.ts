import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { provideAuth } from './auth/provide-auth';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { setAuthTokenInterceptor } from './auth/interceptors/set-auth-token';

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
  ]);
}
