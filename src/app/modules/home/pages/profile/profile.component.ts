import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../../core/services/user.service';
import { User } from 'src/common/models/user.model';
import { faRoad } from '@fortawesome/free-solid-svg-icons';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/common/models/product.model';
import { DataService } from '../../../../core/services/data.service';
import { CardInfo } from 'src/common/models/card.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputgroupComponent } from './components/inputgroup/inputgroup.component';
import { AddressInputgroupComponent } from './components/address-inputgroup/address-inputgroup.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  faRoad = faRoad;
  faCity = faCity;
  faMailBulk = faMailBulk;

  enteredPassword: string;
  passwordConfirm: boolean = false;
  newCard: boolean = false;
  available: boolean = false;
  cardNumber: number;
  month: number;
  year: number;
  securityCode: number;
  cardHolder: string;
  user: User = new User();
  products: Product[];

  activeTab = 'profile';
  userPhoto = '../../assets/images/user.png';
  inputgroupList = [];
  addressInput = [];
  paymentInput = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private dataService: DataService,
    private translate: TranslateService
  ) {}

  async ngOnInit() {
    this.user = await this.userService.getUserInfo();
    this.products = await this.dataService.getCartProducts();
    this.products.forEach((product) => {
      if (product.status == 'cart') {
        this.products = this.products.filter((item) => {
          return item.name !== product.name;
        });
      }
    });

    this.inputgroupList = [
      {
        icon: 'user',
        type: 'text',
        model: 'username',

        disabled: () => {
          return !this.available;
        },
      },
      {
        icon: 'key',
        type: 'password',
        model: 'password',
        disabled: () => {
          return !this.available;
        },
      },
      {
        icon: 'globe',
        type: 'text',
        model: 'email',
        disabled: () => {
          return true;
        },
      },
    ];

    this.addressInput = [
      {
        icon: faCity,
        label: 'CITY',
        model: 'city',

        disabled: () => {
          return !this.available;
        },
      },
      {
        icon: faRoad,
        label: 'ROAD',
        model: 'street',

        disabled: () => {
          return !this.available;
        },
      },
      {
        icon: faMailBulk,
        label: 'ZIPCODE',
        model: 'zipcode',

        disabled: () => {
          return !this.available;
        },
      },
    ];
  }

  cardData = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    month: new FormControl('', [
      Validators.required,
      Validators.pattern('^(0?[1-9]|1[012])$'),
    ]),
    year: new FormControl('', [
      Validators.required,
      Validators.pattern('^[12][0-9]{3}$'),
    ]),
    securityCode: new FormControl('', [Validators.required]),
    cardHolder: new FormControl('', [Validators.required]),
  });

  async verifyPassword() {
    const verified = await this.userService.verifyPassword(
      this.enteredPassword
    );

    if (verified) {
      this.available = true;
      this.passwordConfirm = false;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('PROFILE.WRONG_PASSWORD_TITLE'),
        detail: this.translate.instant('PROFILE.WRONG_PASSWORD_DESC'),
      });
    }
    this.enteredPassword = '';
  }

  showDialog() {
    this.passwordConfirm = true;
  }

  showAddPaymentsDialog() {
    this.newCard = true;
  }

  editProfile() {
    this.userService.editUserInfo(this.user);
    this.available = false;
  }

  orderPage() {
    this.activeTab = 'order';
  }

  backToProfile() {
    this.activeTab = 'profile';
  }

  addressPage() {
    this.activeTab = 'address';
  }

  paymentsPage() {
    this.activeTab = 'payment';
  }

  async addToShipped(product: Product) {
    await this.dataService.removeProduct(product);
  }

  async removeProduct(product: Product) {
    this.products = await this.dataService.removeProduct(product);
  }

  async addCard() {
    const card = new CardInfo(
      this.cardNumber,
      this.month,
      this.year,
      this.securityCode,
      this.cardHolder
    );
    await this.dataService.addCard(card);
  }

  checkValidUser() {
    if (!this.user.password.length || this.user.password.trim().length === 0) {
      return true;
    } else {
      return false;
    }
  }
  checkAddress() {
    if (
      this.user.address.city.trim().length === 0 ||
      this.user.address.zipcode == 0 ||
      this.user.address.street.trim().length === 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  updateUser(e) {
    this.user = e;
  }
}
