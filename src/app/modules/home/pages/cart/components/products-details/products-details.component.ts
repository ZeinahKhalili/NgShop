import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/common/models/product.model';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent {
  @Input() title: string;
  @Input() value: string;
}
