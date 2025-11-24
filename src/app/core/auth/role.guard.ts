// src/app/core/auth/role.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID, inject } from '@angular/core';

import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';

export const roleGuard = (allowed: string[]): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const auth = inject(AuthService);
    const platformId = inject(PLATFORM_ID);

    if (!isPlatformBrowser(platformId)) {
      return true; // ✅ don't decide roles on the server
    }

    if (auth.isAuthenticated() && auth.hasRole(allowed)) return true;
    return router.createUrlTree(['/dashboard']);
  };
};
