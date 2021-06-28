import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService, SharedModule } from 'primeng/api';
import { ShopComponent } from '../pages/shop/shop.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { CartComponent } from '../pages/cart/cart.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from '../pages/profile/profile.component';
import { DialogModule } from 'primeng/dialog';
import { HeaderComponent } from '../pages/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LatestProductsComponent } from '../pages/latest-products/latest-products.component';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { BrandsComponent } from '../pages/brands/brands.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { DesignersComponent } from '../pages/designers/designers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProductComponent } from '../pages/product/product.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ProductsDetailsComponent } from '../pages/cart/components/products-details/products-details.component';
import { InputgroupComponent } from '../pages/profile/components/inputgroup/inputgroup.component';
import { AddressInputgroupComponent } from '../pages/profile/components/address-inputgroup/address-inputgroup.component';
import { LanguageService } from 'src/app/core/services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { ProductsTableComponent } from '../components/products-table/products-table.component';

@NgModule({
  declarations: [
    HomeComponent,
    ShopComponent,
    CartComponent,
    ProfileComponent,
    HeaderComponent,
    LatestProductsComponent,
    BrandsComponent,
    DesignersComponent,
    ProductComponent,
    ProductsDetailsComponent,
    InputgroupComponent,
    AddressInputgroupComponent,
    ProductCardComponent,
    ProductsTableComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    SharedModule,
    TieredMenuModule,
    ToastModule,
    InputNumberModule,
    RatingModule,
    FormsModule,
    DialogModule,
    FontAwesomeModule,
    CarouselModule,
    DropdownModule,
    DataViewModule,
    TableModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    TranslateModule,
    CheckboxModule,
  ],
  exports: [CardModule, ProductCardComponent, ProductsTableComponent],
  providers: [TranslateService, LanguageService, DialogService, MessageService],
})
export class HomeModule {}
