import { Address } from './address.model';
import { CardInfo } from './card.model';
import { Product } from './product.model';

export class User {
  constructor(
    public id?: number,
    public email?: string,
    public password?: string,
    public username?: string,
    public address: Address = { city: ' ', street: ' ', zipcode: 0 },
    public cards: CardInfo[] = [],
    public cart: Product[] = []
  ) {}
}
