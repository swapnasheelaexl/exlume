// src/app/core/auth/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID, inject } from '@angular/core';

import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';

export const canActivate: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  // Don't block on the server; let the browser decide
  if (!isPlatformBrowser(platformId)) {
    return true; // ✅ prevents SSR from forcing /login
  }

  return auth.isAuthenticated()
    ? true
    : router.createUrlTree(['/login']); // ✅ return UrlTree (no side effects)
};
