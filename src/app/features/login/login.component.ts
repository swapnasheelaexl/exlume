// import { Component, OnInit, inject, signal } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from '../../core/auth/auth.service';
// import { ButtonModule } from 'primeng/button';
// import { CardModule } from 'primeng/card';
// import { IconFieldModule } from 'primeng/iconfield';
// import { CheckboxModule } from 'primeng/checkbox';
// import { InputTextModule } from 'primeng/inputtext';
// import { PasswordModule } from 'primeng/password';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   standalone: true,
//   selector: 'app-login',
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     InputTextModule,
//     PasswordModule,
//     ButtonModule,
//     CheckboxModule,
//     IconFieldModule,
//     CardModule,
//   ],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent implements OnInit {
//   loadingEmail = signal(false);     // Spinner for email field
//   loadingPassword = signal(false);  // Spinner for password field
//   submitting = signal(false);       // Spinner for login button

//   private fb = inject(FormBuilder);
//   private auth = inject(AuthService);
//   private router = inject(Router);

//   form = this.fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', Validators.required],
//     rememberMe: [false],
//   });

//   imgPath = 'assets/img/logo.png';

//   ngOnInit() {
//     const rememberedEmail = localStorage.getItem('rememberEmail');
//     if (rememberedEmail) {
//       this.form.patchValue({ email: rememberedEmail, rememberMe: true });
//     }
//   }

//   /** Called on blur or input to simulate async validation/loading */
//   checkEmail() {
//     if (this.form.get('email')?.invalid) return;
//     this.loadingEmail.set(true);

//     // Simulate async check (e.g., server validation)
//     setTimeout(() => {
//       this.loadingEmail.set(false);
//     }, 1000);
//   }

//   checkPassword() {
//     if (this.form.get('password')?.invalid) return;
//     this.loadingPassword.set(true);

//     // Simulate async validation
//     setTimeout(() => {
//       this.loadingPassword.set(false);
//     }, 1000);
//   }

//   submit() {
//     if (this.form.invalid) return;
//     this.submitting.set(true);

//     const { email, password, rememberMe } = this.form.value as any;

//     this.auth.login(email, password).subscribe({
//       next: ({ token }) => {
//         this.auth.storeToken(token);

//         // Remember me
//         if (rememberMe) localStorage.setItem('rememberEmail', email);
//         else localStorage.removeItem('rememberEmail');

//         const roles = this.auth.getRoles();
//         if (roles.includes('admin')) this.router.navigateByUrl('/admin');
//         else if (roles.includes('manager')) this.router.navigateByUrl('/manager');
//         else this.router.navigateByUrl('/dashboard');
//       },
//       error: () => this.submitting.set(false),
//       complete: () => this.submitting.set(false),
//     });
//   }
// }





// -------do not delete old code ------

























import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { debounceTime, map, switchMap, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    IconFieldModule,
    CardModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  usingSSO = signal(false);

  loadingEmail = signal(false);
  loadingPassword = signal(false);
  submitting = signal(false);

  imgPath = 'assets/img/logo.png';

  // form = this.fb.group({
  //   email: [
  //     '',
  //     {
  //       validators: [Validators.required, Validators.email],
  //       asyncValidators: [this.emailExistsValidator()],
  //       updateOn: 'blur',
  //     },
  //   ],
  //   password: [
  //     '',
  //     {
  //       validators: [
  //         Validators.required,
  //         Validators.minLength(8),
  //         this.passwordComplexityValidator(),
  //       ],
  //       asyncValidators: [this.passwordStrengthValidator()],
  //       updateOn: 'blur',
  //  updateOn: 'change',
  //     },
  //   ],
  //   rememberMe: [false],
  // });

  form = this.fb.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
         updateOn: 'change',
        // updateOn: 'blur',
      },
    ],
    password: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(8),
          this.passwordComplexityValidator(),
        ],
        asyncValidators: [this.passwordStrengthValidator()],
        //  updateOn: 'change',
        updateOn: 'blur',
      },
    ],
    rememberMe: [false],
  });

  ngOnInit() {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    if (rememberedEmail) {
      this.form.patchValue({ email: rememberedEmail, rememberMe: true });
    }
  }

  // ================= Async Validators =================

  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value || control.invalid) return of(null);
      this.loadingEmail.set(true);
      return of(control.value).pipe(
        debounceTime(500),
        switchMap((email) => this.auth.checkEmailExists(email)),
        map((res) => {
          this.loadingEmail.set(false);
          return res.exists ? null : { emailNotFound: true };
        }),
        catchError(() => {
          this.loadingEmail.set(false);
          return of({ emailNotFound: true });
        })
      );
    };
  }

  passwordStrengthValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value || control.invalid) return of(null);
      this.loadingPassword.set(true);
      return of(control.value).pipe(
        debounceTime(500),
        switchMap((password) => this.auth.checkPasswordStrength(password)),
        map((res) => {
          this.loadingPassword.set(false);
          return res.strong ? null : { weakPassword: true };
        }),
        catchError(() => {
          this.loadingPassword.set(false);
          return of({ weakPassword: true });
        })
      );
    };
  }

  // ================= Synchronous Custom Validators =================

  passwordComplexityValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      if (!value) return null;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*]/.test(value);
      const noSpace = /^\S+$/.test(value);
      return hasUpper && hasLower && hasNumber && hasSpecial && noSpace
        ? null
        : { complexity: true };
    };
  }

  // ================= Form Submission =================

  submit() {
    if (this.form.invalid) return;
    this.submitting.set(true);

    const { email, password, rememberMe } = this.form.value as any;

    this.auth.login(email, password).subscribe({
      next: ({ token }) => {
        this.auth.storeToken(token);

        // Remember me
        if (rememberMe) localStorage.setItem('rememberEmail', email);
        else localStorage.removeItem('rememberEmail');

        const roles = this.auth.getRoles();
        if (roles.includes('admin')) this.router.navigateByUrl('/admin');
        else if (roles.includes('manager')) this.router.navigateByUrl('/manager');
        else this.router.navigateByUrl('/dashboard');
      },
      error: () => this.submitting.set(false),
      complete: () => this.submitting.set(false),
    });
  }

  //=====================signInWithSSO======================

  signInWithSSO() {
    if (!this.form.value.email) return; // stop if no email

    this.usingSSO.set(true); // user is logging in via SSO
    this.submitting.set(true);

    const payload = { email: this.form.value.email };

    this.auth.registerSSO(payload).subscribe({
      next: (res: any) => {
        if (res.token) {
          this.auth.storeToken(res.token);
          const roles = this.auth.getRoles();
          if (roles.includes('admin')) this.router.navigateByUrl('/admin');
          else if (roles.includes('manager')) this.router.navigateByUrl('/manager');
          else this.router.navigateByUrl('/dashboard');
        }
      },
      error: (err) => console.error('SSO login failed', err),
      complete: () => this.submitting.set(false),
    });
  }

  // signInWithSSO() {
  //   this.submitting.set(true); // show spinner on button if needed
  //   const email = this.form.value.email;
  //   if (!email) return; // stop if no email

  //   const payload = { email };

  //   // const payload = {
  //   //   email: this.form.value.email, // or SSO payload as required
  //   //   // any additional fields your SSO API requires
  //   // };

  //   this.auth.registerSSO(payload).subscribe({
  //     next: (res: any) => {
  //       // if API returns token, store it
  //       if (res.token) {
  //         this.auth.storeToken(res.token);

  //         const roles = this.auth.getRoles();
  //         if (roles.includes('admin')) this.router.navigateByUrl('/admin');
  //         else if (roles.includes('manager')) this.router.navigateByUrl('/manager');
  //         else this.router.navigateByUrl('/dashboard');
  //       }
  //     },
  //     error: (err) => {
  //       console.error('SSO login failed', err);
  //       // optionally show a toast/error message
  //     },
  //     complete: () => this.submitting.set(false),
  //   });
  // }
}
