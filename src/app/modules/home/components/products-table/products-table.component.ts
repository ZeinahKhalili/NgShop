import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/common/models/product.model';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit {
  headers = ['NAME', 'PRICE', 'CATEGORY', 'IMAGE'];
  @Input() products;
  @Input() brand?;
  @Input() designer?;
  @Input() model?;
  compared;
  ngOnInit(): void {
    if (this.designer != undefined) {
      this.compared = this.designer.name;
    } else if (this.brand != undefined) {
      this.compared = this.brand;
    }
  }
}
