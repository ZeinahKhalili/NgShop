import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DataService } from '../../../../core/services/data.service';
import { LanguageService } from '../../../../core/services/language.service';
import { Country } from 'src/common/models/country.model';
import { Product } from 'src/common/models/product.model';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrls: ['./latest-products.component.css'],
})
export class LatestProductsComponent implements OnInit {
  products: Product[];
  countries: Country[];

  responsiveOptions;

  constructor(
    private dataService: DataService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private languageService: LanguageService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  async ngOnInit(): Promise<void> {
    this.products = await this.dataService.getLatestProducts();
    this.countries = await this.dataService.getCountries();
  }
  rating = this.rate.bind(this);

  onShowAddToCartDialog(product: Product) {
    const ref = this.dialogService.open(ProductComponent, {
      data: {
        product: product,
        countries: this.countries,
      },
      header: this.translateService.instant('SHOP.CONFIRM_ADD_TO_CART'),
      width: '50%',
    });
  }

  rate(e, product: Product) {
    this.dataService.setRate(e.value, product);
  }
}
