import {  BreadcrumbComponent } from './../../shared/components/breadcrumb/breadcrumb';
import { TopbarComponent } from './../../shared/components/topbar/topbar.component';
import * as Highcharts from 'highcharts';

import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { CardModule } from 'primeng/card';
import { ColDef } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProductList } from "../product-list/product-list";
import { Router, RouterOutlet } from '@angular/router';

// import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
   CommonModule, TopbarComponent, BreadcrumbComponent, RouterOutlet
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ temporary fallback
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {}

  //  onProductSelected(productId: number) {
  //   this.router.navigate(['/product', productId]);
  // }
}
