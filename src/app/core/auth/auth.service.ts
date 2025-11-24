// import { Injectable, inject } from '@angular/core';

// import { HttpClient } from '@angular/common/http';
// import { JwtPayload } from '../models/jwt-payload';
// import { environment } from '../../../environments/environment.development';
// import {jwtDecode} from 'jwt-decode';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   checkEmailExists(email: any): any {
//     throw new Error('Method not implemented.');
//   }
//   checkPasswordStrength(password: any): any {
//     throw new Error('Method not implemented.');
//   }
//   private http = inject(HttpClient);
//   private tokenKey = 'exlume_token';

//   // login(email: string, password: string) {
//   //   return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, { email, password });
//   // }

//   login(email: string, password: string) {
//   const url = `${environment.apiUrl}/auth/login`; // -> http://localhost:3000/api/auth/login
//   console.log('POST', url);
//   return this.http.post<{ token: string }>(url, { email, password });
// }

// getRoles(): string[] {
//     const token = this.token;
//     if (!token) return [];
//     try {
//       const payload = jwtDecode<JwtPayload>(token);
//       return payload.roles ?? [];
//     } catch {
//       return [];
//     }
//   }

//   storeToken(token: string) {
//     localStorage.setItem(this.tokenKey, token);
//   }

//   get token(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   logout() {
//     localStorage.removeItem(this.tokenKey);
//   }

//   isAuthenticated(): boolean {
//     const token = this.token;
//     if (!token) return false;
//     try {
//       const payload = jwtDecode<JwtPayload>(token);
//       return !!payload && payload.exp * 1000 > Date.now();
//     } catch {
//       return false;
//     }
//   }

//   hasRole(roles: string[]): boolean {
//     const token = this.token;
//     if (!token) return false;
//     try {
//       const payload = jwtDecode<JwtPayload>(token);
//       return roles.some(r => payload.roles?.includes(r));
//     } catch {
//       return false;
//     }
//   }
// }

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtPayload } from '../models/jwt-payload';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokenKey = 'exlume_token';

  // ==================== SSO Register/Login ====================
  registerSSO(payload: { email: string }): Observable<{ token: string }> {
    // const url = `http://127.0.0.1:8000/api/auth/register/`;
    const url = `${environment.apiUrl}/auth/login`;
    return this.http.post<{ token: string }>(url, payload);
  }

  // ==================== Login ====================
  login(email: string, password: string) {
    const url = `${environment.apiUrl}/auth/login`;
    return this.http.post<{ token: string }>(url, { email, password });
  }

  // ==================== Client-side Password Strength ====================
  isPasswordStrong(password: string): boolean {
    // Minimum 8 chars, at least one uppercase, one lowercase, one number, one special char
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(password);
  }

  // Basic email format check
isEmailValid(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

checkPasswordStrength(password: string): Observable<{ strong: boolean }> {
  return of({ strong: this.isPasswordStrong(password) });
}

checkEmailExists(email: string): Observable<{ exists: boolean }> {
  return of({ exists: this.isEmailValid(email) });
}


  // // ==================== Async Validators ====================
  // checkEmailExists(email: string): Observable<{ exists: boolean }> {
  //   const url = `${environment.apiUrl}/auth/check-email?email=${email}`;
  //   return this.http.get<{ exists: boolean }>(url).pipe(
  //     catchError(() => of({ exists: false })) // fallback if API fails
  //   );
  // }

  // checkPasswordStrength(password: string): Observable<{ strong: boolean }> {
  //   const url = `${environment.apiUrl}/auth/check-password-strength`;
  //   return this.http.post<{ strong: boolean }>(url, { password }).pipe(
  //     catchError(() => of({ strong: false })) // fallback if API fails
  //   );
  // }

  // ==================== Token & Roles ====================
  storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRoles(): string[] {
    const token = this.token;
    if (!token) return [];
    try {
      const payload = jwtDecode<JwtPayload>(token);
      return payload.roles ?? [];
    } catch {
      return [];
    }
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.token;
    if (!token) return false;
    try {
      const payload = jwtDecode<JwtPayload>(token);
      return !!payload && payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  hasRole(roles: string[]): boolean {
    const token = this.token;
    if (!token) return false;
    try {
      const payload = jwtDecode<JwtPayload>(token);
      return roles.some((r) => payload.roles?.includes(r));
    } catch {
      return false;
    }
  }
}
