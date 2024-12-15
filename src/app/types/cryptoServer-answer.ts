import {BankInfo} from './bank-info';

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

export function isAnswerCryptoGecko(item: BankInfo | AnswerCryptoGecko): item is AnswerCryptoGecko {
  return (
    'id' in item &&
    'symbol' in item &&
    'name' in item &&
    'image' in item &&
    'current_price' in item &&
    typeof item.current_price === 'number'
  );
}
