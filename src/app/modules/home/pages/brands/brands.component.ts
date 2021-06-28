import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DataService } from '../../../../core/services/data.service';
import { Country } from 'src/common/models/country.model';
import { Product } from 'src/common/models/product.model';
import { ProductComponent } from '../product/product.component';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  brands: string[];
  array = [];
  products: Product[];
  countries: Country[];
  filterProducts = ['name', 'price', 'imageUrl'];
  constructor(
    private dataService: DataService,
    private translateService: TranslateService,
    private dialogService: DialogService
  ) {}

  async ngOnInit() {
    this.brands = await this.dataService.getBrands();
    this.brands = this.brands.reduce((brands, item) => {
      return brands.includes(item) ? brands : [...brands, item];
    }, []);

    this.products = await this.dataService.getProducts();

    this.countries = await this.dataService.getCountries();
  }

  async addToCart(product: Product) {
    const ref = this.dialogService.open(ProductComponent, {
      data: {
        product: product,
        countries: this.countries,
      },
      header: this.translateService.instant('SHOP.CONFIRM_ADD_TO_CART'),
      width: '50%',
    });
  }
}
