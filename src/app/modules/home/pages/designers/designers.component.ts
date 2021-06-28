import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { Designer } from 'src/common/models/designers.model';
import { Product } from 'src/common/models/product.model';
import { ProductsTableComponent } from '../../components/products-table/products-table.component';

@Component({
  selector: 'app-designers',
  templateUrl: './designers.component.html',
  styleUrls: ['./designers.component.css'],
})
export class DesignersComponent implements OnInit {
  products: Product[];
  designers: Designer[] = [];
  constructor(private dataService: DataService) {}

  async ngOnInit() {
    this.designers = await this.dataService.getDesigners();

    this.designers = this.designers.reduce((designers, item) => {
      return designers.includes(item) ? designers : [...designers, item];
    }, []);

    this.products = await this.dataService.getProducts();
  }
}
