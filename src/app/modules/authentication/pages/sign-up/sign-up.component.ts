import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/common/models/user.model';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [MessageService],
})
export class SignUpComponent {
  user: User = new User();
  logo = '../../../assets/images/logo.PNG';
  googleLogo =
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg';
  microsoftLogo =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png';

  userData = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.required]),
    agreement: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly translateService: TranslateService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  async signup() {
    const result = await this.userService.signup(this.user);
    if (result) {
      this.messageService.add({
        severity: 'success',
        summary: this.translateService.instant('AUTH.SUCCESS'),
        detail: this.translateService.instant('AUTH.SIGNUP_SUCCESS'),
      });
      this.router.navigate(['/authentication/signin']);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant('AUTH.FAIL'),
        detail: this.translateService.instant('AUTH.ALREADY_EMAIL'),
      });
    }
  }
  invalidSignUp() {
    if (
      this.userData.invalid ||
      (this.userData.get('email').invalid &&
        this.userData.get('password').invalid)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
