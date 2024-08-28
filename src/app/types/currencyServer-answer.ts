export class AnswerCurrency {
  public result: string;
  public conversion_rates: {[key: string]: number};

  constructor(result: string, conversion_rates: {[key: string]: number}) {
    this.result = result;
    this.conversion_rates = conversion_rates;
  }
}
