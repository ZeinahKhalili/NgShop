import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { User } from 'src/common/models/user.model';
import { LanguageService } from '../../../../core/services/language.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  user: User;
  logo = '../../assets/images/logo.PNG';
  userPhoto = '../../assets/images/user.png';
  constructor(
    private router: Router,
    private translateService: TranslateService,
    private languageService: LanguageService,
    private userService: UserService
  ) {}
  async ngOnInit() {
    this.user = await this.userService.getUserInfo();
    this.getItems();
    this.translateService.onLangChange.subscribe(() => {
      this.getItems();
    });
  }
  getItems() {
    return (this.items = [
      {
        label: this.translateService.instant('HOME.LATEST_PRODUCTS'),
        icon: 'pi pi-fw pi-star',
        routerLink: '/home/latest-products',
      },
      {
        label: this.translateService.instant('HOME.BRANDS'),
        icon: 'pi pi-fw pi-tag',
        routerLink: '/home/brands',
      },
      {
        label: this.translateService.instant('HOME.Shop'),
        icon: 'pi pi-fw pi-home',
        routerLink: '/home/shop',
      },
      {
        label: this.translateService.instant('HOME.Designers'),
        icon: 'pi pi-fw pi-pencil',
        routerLink: '/home/designers',
      },
      {
        label: this.translateService.instant('HOME.LANGUAGE'),
        icon: 'pi pi-fw pi-comments',
        items: [
          {
            label: 'English',
            command: () => this.languageService.changeLangage('en'),
          },
          {
            label: 'العربية',
            command: () => this.languageService.changeLangage('ar'),
          },
        ],
      },
      {
        label: this.translateService.instant('HOME.Logout'),
        icon: 'pi pi-fw pi-power-off',
        command: () => this.userService.logout(),
      },
    ]);
  }
}
