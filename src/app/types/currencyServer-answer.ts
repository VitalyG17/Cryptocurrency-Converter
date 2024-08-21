export class AnswerCurrency {
  public result: string;
  public documentation: string;
  public terms_of_use: string;
  public time_last_update_unix: bigint;
  public time_last_update_utc: string;
  public time_next_update_unix: bigint;
  public time_next_update_utc: string;
  public base_code: string;
  public conversion_rates: {[key: string]: number};

  constructor(
    result: string,
    documentation: string,
    terms_of_use: string,
    time_last_update_unix: bigint,
    time_last_update_utc: string,
    time_next_update_unix: bigint,
    time_next_update_utc: string,
    base_code: string,
    conversion_rates: {[key: string]: number},
  ) {
    this.result = result;
    this.documentation = documentation;
    this.terms_of_use = terms_of_use;
    this.time_last_update_unix = time_last_update_unix;
    this.time_last_update_utc = time_last_update_utc;
    this.time_next_update_unix = time_next_update_unix;
    this.time_next_update_utc = time_next_update_utc;
    this.base_code = base_code;
    this.conversion_rates = conversion_rates;
  }
}
