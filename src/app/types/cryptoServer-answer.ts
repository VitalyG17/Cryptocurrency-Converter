export class AnswerCryptoGecko {
  public id: string;
  public symbol: string;
  public name: string;
  public image: string;
  public current_price: number;
  public high_24h: number;
  public low_24h: number;

  constructor(
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number,
    high_24h: number,
    low_24h: number,
  ) {
    this.id = id;
    this.symbol = symbol;
    this.name = name;
    this.image = image;
    this.current_price = current_price;
    this.high_24h = high_24h;
    this.low_24h = low_24h;
  }
}
