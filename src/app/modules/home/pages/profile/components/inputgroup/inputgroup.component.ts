import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-inputgroup',
  templateUrl: './inputgroup.component.html',
  styleUrls: ['./inputgroup.component.css'],
})
export class InputgroupComponent {
  @Input() icon: string;
  @Input() type: string;
  @Input() model: any;
  @Input() disabled: any;
  @Input() user;

  @Output() updateUser = new EventEmitter();

  updateUserDetails(e) {
    this.user[this.model] = e;
    this.updateUser.emit(this.user);
  }
}
