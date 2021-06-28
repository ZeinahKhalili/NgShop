import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataService } from '../../../../core/services/data.service';
import { Country } from 'src/common/models/country.model';
import { Product } from 'src/common/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: Product;
  country: Country;
  countryNames: string[] = [];
  countries: Country[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dataService: DataService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.product = this.config.data.product;
    this.countries = this.config.data.countries;
    this.countries.forEach((country) => {
      this.countryNames.push(country.name);
    });
  }

  handleShippment(e) {
    this.country = this.countries.find((x) => x.name === e.value);
  }

  handleColors(e) {
    this.product.color = e.value;
  }

  async addToCart() {
    if (this.product.quantity > this.product.stock) {
      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant('CART.processFailed'),
        detail: this.translateService.instant('CART.productOutOfStock'),
      });
    } else {
      const added = this.dataService.addToCart(this.product, this.country);
      if (await added) {
        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('SHOP.ADDED_SUCCESS_TITLE'),
          detail: this.translateService.instant(
            'SHOP.ADDED_SUCCESS_DESCRIPTION'
          ),
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('SHOP.ADDED_FAIL_TITLE'),
          detail: this.translateService.instant('SHOP.ADDED_FAIL_DESCRIPTION'),
        });
      }
    }
  }
  doneCheck(product: Product) {
    if (
      product.quantity == undefined ||
      product.color == undefined ||
      this.country == undefined ||
      !product.inStock
    ) {
      return true;
    } else {
      return false;
    }
  }
}
