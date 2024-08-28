import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BankInfo} from '../../types/bank-info';
import {AnswerCryptoGecko} from '../../types/cryptoServer-answer';

@Component({
  selector: 'app-list-item-ui',
  templateUrl: './list-item-ui.component.html',
  styleUrls: ['./list-item-ui.component.scss'],
})
export class ListItemUiComponent {
  @Input() public items: BankInfo[] | AnswerCryptoGecko[] = [];
  @Input() public isCrypto: boolean = true;
  @Output() public itemSelected: EventEmitter<BankInfo | AnswerCryptoGecko> = new EventEmitter<
    BankInfo | AnswerCryptoGecko
  >();

  protected selectedItem: BankInfo | AnswerCryptoGecko | null = null;

  protected onItemClick(item: BankInfo | AnswerCryptoGecko): void {
    this.selectedItem = item;
    this.itemSelected.emit(item);
  }

  protected checkCrypto(item: BankInfo | AnswerCryptoGecko): item is AnswerCryptoGecko {
    return item && 'current_price' in item && 'symbol' in item;
  }
}
