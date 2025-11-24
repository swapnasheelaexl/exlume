import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { App } from './app/app';
import Aura from '@primeuix/themes/aura'; // ✅ v20 preset source
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import { jwtInterceptor } from './app/core/auth/jwt.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
  //  providers: [
  //   provideRouter(routes),
  //   provideHttpClient(withInterceptors([jwtInterceptor])),
  //   provideAnimationsAsync(),
  //    providePrimeNG({
  //     theme: {
  //       preset: Aura
  //     },
  //     ripple: true
  //   })
  // ],
}).catch(err => console.error(err));
