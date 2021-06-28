import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-address-inputgroup',
  templateUrl: './address-inputgroup.component.html',
  styleUrls: ['./address-inputgroup.component.css'],
})
export class AddressInputgroupComponent implements OnInit {
  @Input() icon;
  @Input() label;
  @Input() user;
  @Input() model;
  @Input() disabled;

  @Output() changeUserAddress = new EventEmitter();

  updateUser(e) {
    this.user.address[this.model] = e;
    this.changeUserAddress.emit(this.user);
  }
  ngOnInit(): void {}
}
