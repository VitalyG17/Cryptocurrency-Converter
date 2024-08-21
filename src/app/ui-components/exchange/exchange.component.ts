import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

interface IExchangeForm {
  give: FormControl<string | null>;
  receive: FormControl<string | null>;
}

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent {
  public readonly exchangeForm: FormGroup<IExchangeForm> = new FormGroup<IExchangeForm>({
    give: new FormControl(null),
    receive: new FormControl(null),
  });
}
