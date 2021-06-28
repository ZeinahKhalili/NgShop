import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Product } from 'src/common/models/product.model';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductComponent } from '../product/product.component';
import { Country } from 'src/common/models/country.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  faShippingFast = faShippingFast;
  products: Product[];
  shipCost: number = 0;
  productsFiltered: Product[];
  faSadTear = faSadTear;
  countries: Country[];
  items: MenuItem[];
  countriesList: MenuItem[] = [];
  categoryList: MenuItem[] = [];

  countryItem: MenuItem;
  categoryItem: MenuItem;
  categories: string[] = [];

  constructor(
    private dataService: DataService,
    private translateService: TranslateService,
    private dialogService: DialogService
  ) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.dataService.getProducts();
    this.countries = await this.dataService.getCountries();
    this.productsFiltered = this.products;

    this.products.forEach((product) => {
      this.categories.push(product.category);
    });

    this.categories = this.categories.reduce((categories, item) => {
      return categories.includes(item) ? categories : [...categories, item];
    }, []);

    this.categoryList.push({
      label: 'All',
      command: () => this.filterOnCategory('All'),
    });

    this.categories.forEach((category) => {
      this.categoryItem = {
        label: category,
        command: () => this.filterOnCategory(category),
      };
      this.categoryList.push(this.categoryItem);
    });

    this.getItems();

    this.countries.forEach((country) => {
      this.countryItem = {
        label: country.name,
        command: () => this.ship(country),
      };

      this.countriesList.push(this.countryItem);
    });

    this.translateService.onLangChange.subscribe(() => {
      this.getItems();
    });
  }

  getItems() {
    return (this.items = [
      {
        label: this.translateService.instant('HOME.SHOP'),
      },
      {
        separator: true,
      },
      {
        label: this.translateService.instant('SHOP.CATEGORY'),
        items: this.categoryList,
      },
      {
        label: this.translateService.instant('SHOP.PRICE_RANGE'),
        items: [
          {
            label: this.translateService.instant('SHOP.ALL'),
            command: () => this.filterOnPrice(0, 0),
          },
          {
            label: '0-100$',
            command: () => this.filterOnPrice(0, 100),
          },
          {
            label: '100-200$',
            command: () => this.filterOnPrice(100, 200),
          },
        ],
      },
      {
        label: this.translateService.instant('SHOP.SHIPPING'),
        items: this.countriesList,
      },
      {
        label: this.translateService.instant('SHOP.RATED'),
        command: () => this.filterOnRate(5),
      },
    ]);
  }

  filterOnCategory(category: string) {
    if (category == 'All') {
      this.productsFiltered = this.products;
    } else {
      this.productsFiltered = this.products;
      this.productsFiltered = this.productsFiltered.filter((product) => {
        if (product.category == category) {
          return product;
        }
      });
    }
  }

  filterOnPrice(leftside: number, rightside: number) {
    if (leftside == 0 && rightside == 0) {
      this.productsFiltered = this.products;
    } else {
      this.productsFiltered = this.products;
      this.productsFiltered = this.productsFiltered.filter((product) => {
        if (leftside < product.price && product.price < rightside) {
          return product;
        }
      });
    }
  }
  rating = this.rate.bind(this);
  rate(e, product: Product) {
    this.dataService.setRate(e.value, product);
  }

  filterOnRate(rate: number) {
    this.productsFiltered = this.products.filter((product) => {
      if (product.rating == rate) {
        return product;
      }
    });
  }

  ship(country: Country) {
    this.shipCost = country.cost;
  }

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
}
