import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
interface DashboardItem {
  id: number;
  title: string;
  image: string;
  name: string;
}
@Component({
  selector: 'app-product-list',
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
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  @Output() productSelected = new EventEmitter<number>();
  products: DashboardItem[] = [
    { id: 1, name :"universal_life" ,title: 'Universal Life', image: 'assets/img/product list/product (8).png' },
    { id: 2,name :"term" , title: 'Term', image: 'assets/img/product list/product (7).png' },
    { id: 3,name :"variable_universal_life" , title: 'Variable Universal Life', image: 'assets/img/product list/product (6).png' },
    { id: 4,name :"deferred_annuities" , title: 'Deferred Annuities', image: 'assets/img/product list/product (5).png' },
    { id: 5,name :"immediate_annuities" , title: 'Immediate Annuities', image: 'assets/img/product list/product (4).png' },
    { id: 6,name :"whole_life" , title: 'Whole Life', image: 'assets/img/product list/product (3).png' },
  ];

  data: DashboardItem[] = [
    { id: 7,name :"master_data_library" , title: 'Master Data Library', image: 'assets/img/product list/product (2).png' },
  ];

  assumption: DashboardItem[] = [
    { id: 8,name :"master_assumption_library" , title: 'Master Assumption Library', image: 'assets/img/product list/product (1).png' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  // selectProduct(ProductObject: DashboardItem) {
  //   console.log('Selected Product:', ProductObject);
  //   const formattedProductName = ProductObject.title.toLowerCase().replace(/ /g, '_');
  //   this.router.navigate([`/dashboard/${formattedProductName}`], { relativeTo: this.route });
  // }

  goToProduct(product: any) {
  this.router.navigate(['/dashboard', product.name]).then(success => {
    if (success) {
      console.log('Navigation successful');
    } else {
      console.error('Navigation failed');
    }
  });
}
}
