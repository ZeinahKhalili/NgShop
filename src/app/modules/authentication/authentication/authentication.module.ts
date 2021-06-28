import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';

import { LoginComponent } from '../pages/login/login.component';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { LanguageService } from 'src/app/core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AuthenticationComponent, LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    ToastModule,
    DropdownModule,
  ],
  providers: [MessageService, LanguageService],
})
export class AuthenticationModule {}
