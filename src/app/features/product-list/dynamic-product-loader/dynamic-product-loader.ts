// import { CommonModule } from '@angular/common';
// import { Component, ComponentRef, inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { productComponentMap } from '../../../core/routing-map/product-routing-map';

// @Component({
//   selector: 'app-dynamic-product-loader',
//    standalone: true,
//   imports: [CommonModule],
//   templateUrl: './dynamic-product-loader.html',
//   styleUrl: './dynamic-product-loader.scss',
// })
// export class DynamicProductLoader implements OnInit  {
// @ViewChild('container', { read: ViewContainerRef, static: true })
//   container!: ViewContainerRef;

//   private componentRef?: ComponentRef<any>;

//   constructor(private route: ActivatedRoute, private router: Router) {}

//   async ngOnInit() {
//     const id = this.route.snapshot.paramMap.get('id')!;
//     const loader = productComponentMap[id];
//     console.log(this.componentRef,"componentRef");

//     if (!loader) {
//       this.router.navigate(['/dashboard']);
//       return;
//     }

//     const component = await loader();
//     this.container.clear();
//     this.componentRef = this.container.createComponent(component);
//      console.log(this.componentRef,"componentRef");
//   }
// }


import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { productComponentMap } from '../../../core/routing-map/product-routing-map';

@Component({
  selector: 'app-dynamic-product-loader',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-container #container></ng-container>`,
})
export class DynamicProductLoader implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  private componentRef?: ComponentRef<any>;
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    const loader = productComponentMap[id];


    if (!loader) {

      this.router.navigate(['/dashboard']);
      return;
    }

    const component = await loader();

    this.container.clear();
    this.componentRef = this.container.createComponent(component);

  }


}
