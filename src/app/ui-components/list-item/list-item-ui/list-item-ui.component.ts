import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {BankInfo} from '../../../types/bank-info';
import {AnswerCryptoGecko, isAnswerCryptoGecko} from '../../../types/cryptoServer-answer';

@Component({
  selector: 'app-list-item-ui',
  templateUrl: './list-item-ui.component.html',
  styleUrls: ['./list-item-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemUiComponent {
  @Input() public items: BankInfo[] | AnswerCryptoGecko[] = [];

  @Input() public isCrypto: boolean = true;

  @Output() public itemSelected: EventEmitter<BankInfo | AnswerCryptoGecko> = new EventEmitter<
    BankInfo | AnswerCryptoGecko
  >();

  protected readonly isAnswerCryptoGecko = isAnswerCryptoGecko;

  protected activeItem: BankInfo | AnswerCryptoGecko | null = null;

  protected onItemClick(item: BankInfo | AnswerCryptoGecko): void {
    this.activeItem = item;
    this.itemSelected.emit(item);
  }
}
