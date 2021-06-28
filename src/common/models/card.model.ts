export class CardInfo {
  constructor(
    public cardNumber: number,
    public month: number,
    public year: number,
    public securityCode: number,
    public cardHolder: string
  ) {}
}
