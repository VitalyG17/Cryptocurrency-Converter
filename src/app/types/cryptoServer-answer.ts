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

export interface CryptoApiResponse {
  data: AnswerCrypto[];
  timestamp: number;
}

export class AnswerCrypto {
  public id: string;
  public rank: string;
  public symbol: string;
  public name: string;
  public supply: string;
  public maxSupply: string;
  public marketCapUsd: string;
  public volumeUsd24Hr: string;
  public priceUsd: string;
  public changePercent24Hr: string;
  public vwap24Hr: string;

  constructor(
    id: string,
    rank: string,
    symbol: string,
    name: string,
    supply: string,
    maxSupply: string,
    marketCapUsd: string,
    volumeUsd24Hr: string,
    priceUsd: string,
    changePercent24Hr: string,
    vwap24Hr: string,
  ) {
    this.id = id;
    this.rank = rank;
    this.symbol = symbol;
    this.name = name;
    this.supply = supply;
    this.maxSupply = maxSupply;
    this.marketCapUsd = marketCapUsd;
    this.volumeUsd24Hr = volumeUsd24Hr;
    this.priceUsd = priceUsd;
    this.changePercent24Hr = changePercent24Hr;
    this.vwap24Hr = vwap24Hr;
  }
}
