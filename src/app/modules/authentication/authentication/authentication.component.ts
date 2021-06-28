import { Component, OnInit } from '@angular/core';

import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent {
  constructor(private languageService: LanguageService) {}
  languages = this.languageService.languages;

  handleChange(e) {
    this.languageService.changeLangage(e.value.code);
  }
}
