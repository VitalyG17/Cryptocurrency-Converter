export class AnswerCryptoGecko {
  public id: string;
  public symbol: string;
  public name: string;
  public image: string;
  public current_price: number;

  constructor(id: string, symbol: string, name: string, image: string, current_price: number) {
    this.id = id;
    this.symbol = symbol;
    this.name = name;
    this.image = image;
    this.current_price = current_price;
  }
}
