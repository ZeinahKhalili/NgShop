import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DataService } from '../../../../core/services/data.service';
import { Product } from 'src/common/models/product.model';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/common/models/user.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: Product[];
  faSadTear = faSadTear;
  faShippingFast = faShippingFast;
  orderConfirm: boolean = false;
  payments: number[] = [];
  paymentMethod: number;
  productsForCheckOut: Product[] = [];
  user: User;
  filteredKeys = ['NAME', 'PRICE', 'QUANTITY', 'COLOR'];
  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private translate: TranslateService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.dataService.getCartProducts();
    this.products.forEach((product) => {
      product.price = +(
        product.price -
        (product.price * product.discount) / 100
      ).toFixed(2);
      if (product.status != 'cart') {
        this.products = this.products.filter((item) => {
          return item.name !== product.name;
        });
      }
    });
    this.user = await this.userService.getUserInfo();
    this.user.cards.forEach((card) => {
      this.payments.push(card.cardNumber);
    });
  }
  removingProduct = this.removeProduct.bind(this);
  async removeProduct(product: Product) {
    this.products = await this.dataService.removeProduct(product);
  }

  async buy() {
    const result = await this.dataService.buyProducts(
      this.productsForCheckOut,
      this.paymentMethod
    );
    if (result) {
      this.messageService.add({
        severity: 'success',
        summary: this.translate.instant('CART.PROCCESS_SUCCEEDED'),
        detail: this.translate.instant('CART.BOUGHT_SUCCESSFULLY'),
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('CART.PROCESS_FAILED'),
        detail: this.translate.instant('CART.PRODUCT_OUT_OF_STOCK'),
      });
    }
    this.products = await this.dataService.getCartProducts();
    this.orderConfirm = false;
  }
  selectingProduct = this.selectProduct.bind(this);

  selectProduct(product: Product) {
    if (product.quantity > product.stock && product.checked) {
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('CART.processFailed'),
        detail: this.translate.instant('CART.productOutOfStock'),
      });
    } else {
      if (product.checked) {
        this.productsForCheckOut.push(product);
      } else {
        this.productsForCheckOut = this.productsForCheckOut.filter(function (
          item
        ) {
          return item.name !== product.name;
        });
      }
    }
  }

  checkOut() {
    this.orderConfirm = true;
  }

  handlePayment(e) {
    this.paymentMethod = e.value;
  }

  checkAddress(user: User): boolean {
    if (
      user?.address.city == ' ' ||
      user?.address.street == ' ' ||
      user?.address.zipcode == 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  confirmCheck() {
    if (
      this.productsForCheckOut.length == 0 ||
      this.paymentMethod == undefined ||
      this.user?.address.city == ' ' ||
      this.user?.address.street == ' ' ||
      this.user?.address.zipcode == 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  changing(e, product) {
    product.totalPrice = +e;
  }
}
