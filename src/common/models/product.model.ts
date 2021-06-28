import { Country } from './country.model';

export class Product {
  constructor(
    public id: number,
    public stock: number,
    public imageURL: string,
    public name: string,
    public description: string,
    public category: string,
    public price: number,
    public quantity: number,
    public rating: number,
    public inStock: boolean,
    public discount: number,
    public totalCost: number,
    public releaseDate: string,
    public brand: string,
    public designerName: string,
    public status: string,
    public color: string,
    public colors: string[],
    public country: Country,
    public checked: boolean
  ) {}
}
