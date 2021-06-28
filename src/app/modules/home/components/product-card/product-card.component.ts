import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/common/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  @Input() source;
  @Input() icon?;
  @Input() shipCost?;

  @Input() showImage?: boolean = true;
  @Input() showTitle?: boolean = true;
  @Input() showPrice?: boolean = true;
  @Input() showDiscount?: boolean = false;
  @Input() showInStock?: boolean = false;
  @Input() showShippment?: boolean = false;
  @Input() showShippmentCost?: boolean = false;
  @Input() showDescription?: boolean = false;
  @Input() showRating?: boolean = false;
  @Input() showAddToCart?: boolean = false;
  @Input() showQuantity?: boolean = false;
  @Input() showTotalPrice?: boolean = false;
  @Input() showSelectProduct?: boolean = false;
  @Input() showRemoveProduct?: boolean = false;

  @Input() rate?: (e, product: Product) => void;
  @Input() selectProduct?: (product: Product) => void;
  @Input() removeProduct?: (product: Product) => void;

  @Output() totalChange = new EventEmitter();
  @Output() showAddToCartDialog? = new EventEmitter();

  priceAfterDiscount: number;
  total: number;
  showShortDesciption = true;

  alterDescriptionText() {
    this.showShortDesciption = !this.showShortDesciption;
  }

  ngOnInit(): void {
    this.priceAfterDiscount = +(
      this.product.price -
      (this.product.price * this.product.discount) / 100
    ).toFixed(2);
    if (this.source == 'cart') {
      this.changing(this.product);
    }
  }

  changing(product: Product) {
    this.total =
      +(product.quantity * this.priceAfterDiscount).toFixed(2) +
      product.country.cost;
    this.totalChange.emit(this.total.toString());
  }

  onShowAddToCartDialog() {
    this.showAddToCartDialog.emit(this.product);
  }
}
