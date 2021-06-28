import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MessageService } from 'primeng/api';
import { User } from 'src/common/models/user.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent {
  user: User = new User();
  logo = '../../assets/images/logo.PNG';
  googleLogo =
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg';
  microsoftLogo =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png';
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private translate: TranslateService
  ) {}

  userData = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.userService.isValidUser(this.user).then((data) => {
      if (data) {
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('AUTH.SUCCESS'),
          detail: this.translate.instant('AUTH.LOGIN_SUCCESS'),
        });
        this.router.navigate(['/home']);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('AUTH.FAIL'),
          detail: this.translate.instant('AUTH.LOGIN_FAIL'),
        });
      }
    });
    this.router.navigate(['/home']);
  }
}
