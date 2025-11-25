import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  RouterModule,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { filter } from 'rxjs';
interface Breadcrumb {
  label: string;
  url: string;
}
@Component({
  selector: 'app-breadcrumb',
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
    RouterModule,
  ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  routeLabelMapping: { [key: string]: string } = {
    dashboard: 'Dashboard',
    admin: 'Admin',
    manager: 'Manager',
    login: 'Login',
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.router.events, 'this.router.events');
    console.log(this.route, 'this.route');
    console.log(this.breadcrumbs, 'this.breadcrumbs');
    console.log(this.generateBreadcrumbs(), 'this.generateBreadcrumbs()');

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.generateBreadcrumbs();
    });
  }

  private generateBreadcrumbs() {
    const rootSnapshot = this.router.routerState.snapshot.root;
    const breadcrumbs: Breadcrumb[] = [];

    let url = '';
    let currentSnapshot: ActivatedRouteSnapshot | null = rootSnapshot;

    while (currentSnapshot) {
      // Combine URL segments
      const routeURL = currentSnapshot.url.map((s) => s.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
        const label = this.routeLabelMapping[routeURL] || this.formatLabel(routeURL);
        breadcrumbs.push({ label, url });
      }
      currentSnapshot = currentSnapshot.firstChild;
    }

    this.breadcrumbs = [...breadcrumbs];
  }

  private formatLabel(str: string): string {
    if (!str) return '';
    return str
      .replace(/_/g, ' ') // replace underscores with spaces
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
