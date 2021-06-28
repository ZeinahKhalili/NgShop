import { Injectable } from '@angular/core';
import { CardInfo } from 'src/common/models/card.model';
import { Country } from 'src/common/models/country.model';
import { Designer } from 'src/common/models/designers.model';
import { Product } from 'src/common/models/product.model';
import { rootURL } from '../../../assets/data/globals';
import { headers } from '../../../assets/data/globals';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private userService: UserService) {}

  async getProducts(): Promise<Product[]> {
    const products: Product[] = await this.userService.fetchData('products');
    return products;
  }

  addToCart = async (product: Product, country: Country) => {
    const user = await this.userService.getUserInfo();
    const productExistInCart = user.cart.find(
      ({ name }) => name === product.name
    );

    if (!productExistInCart) {
      product.status = 'cart';
      product.country = country;
      user.cart.push(product);
      const data = user;
      await fetch(`${rootURL}/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: headers,
      });
      return true;
    } else {
      return false;
    }
  };

  getCartProducts = async (): Promise<Product[]> => {
    const user = await this.userService.getUserInfo();

    return user.cart;
  };

  async removeProduct(product: Product): Promise<Product[]> {
    const user = await this.userService.getUserInfo();
    const filteredProducts = user.cart.filter((item) => {
      return item.name !== product.name;
    });

    user.cart = filteredProducts;
    const data = user;
    await fetch(`${rootURL}/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: headers,
    });
    return user.cart;
  }
  async setRate(rateValue: number, product: Product) {
    product.rating = rateValue;

    const data = product;
    await fetch(`${rootURL}/products/${product.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: headers,
    });
  }

  async buyProducts(
    productsForCheckOut: Product[],
    paymentMethod: number
  ): Promise<boolean> {
    const user = await this.userService.getUserInfo();
    productsForCheckOut.forEach((product) => {
      user.cart = user.cart.filter((item) => {
        return item.name !== product.name;
      });
      product.status = 'un Shipped';
      user.cart.push(product);
    });

    productsForCheckOut.forEach(async (product) => {
      product.stock = product.stock - product.quantity;
      if (product.stock == 0) {
        product.inStock = false;
      }
      product.checked = false;
      product.quantity = 0;

      const dataProduct = product;
      await fetch(`${rootURL}/products/${product.id}`, {
        method: 'PUT',
        body: JSON.stringify(dataProduct),
        headers: headers,
      });
    });
    const data = user;
    await fetch(`${rootURL}/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: headers,
    });
    return true;
  }

  async getLatestProducts(): Promise<Product[]> {
    const products: Product[] = await this.userService.fetchData('products');
    let latestProducts: Product[] = [];
    products.forEach((product) => {
      const date = new Date(product.releaseDate);
      const currentDate = new Date();
      if (date.getFullYear() >= currentDate.getFullYear() - 2) {
        latestProducts.push(product);
      }
    });
    return latestProducts;
  }

  async getBrands(): Promise<string[]> {
    const products: Product[] = await this.userService.fetchData('products');
    let brands: string[] = [];
    products.forEach((product) => {
      brands.push(product.brand);
    });
    return brands;
  }

  async getDesigners(): Promise<Designer[]> {
    const designers: Designer[] = await this.userService.fetchData('designers');

    return designers;
  }

  async addCard(card: CardInfo) {
    const user = await this.userService.getUserInfo();
    user.cards.push(card);
    const data = user;
    await fetch(`${rootURL}/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: headers,
    });
  }

  async getCountries(): Promise<Country[]> {
    const countries: Country[] = await this.userService.fetchData('countries');
    return countries;
  }
}
