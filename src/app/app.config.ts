import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from "@angular/core";
import {
  provideClientHydration,
  withEventReplay
} from "@angular/platform-browser";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";

import Aura from '@primeuix/themes/aura';
import { jwtInterceptor } from "./core/auth/jwt.interceptor";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { providePrimeNG } from "primeng/config";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
     provideHttpClient(withFetch(),withInterceptors([jwtInterceptor])),
    provideAnimationsAsync(),
     providePrimeNG({
      theme: {
        preset: Aura
      },
      ripple: true
    })
  ]
};
