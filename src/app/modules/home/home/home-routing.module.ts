import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsComponent } from '../pages/brands/brands.component';
import { CartComponent } from '../pages/cart/cart.component';
import { DesignersComponent } from '../pages/designers/designers.component';
import { LatestProductsComponent } from '../pages/latest-products/latest-products.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { ShopComponent } from '../pages/shop/shop.component';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'shop', component: ShopComponent },
      { path: 'cart', component: CartComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'latest-products', component: LatestProductsComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'designers', component: DesignersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
