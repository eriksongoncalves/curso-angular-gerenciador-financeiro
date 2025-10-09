import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { provideLoggedInUser } from './initializers/provide-logged-in-user';

export function provideAuth(): EnvironmentProviders {
  return makeEnvironmentProviders([provideLoggedInUser()]);
}
