import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { PlayerService } from 'src/app/services/player/player.service';
import { Observable, of, Subscription } from 'rxjs';
import { BankItem, Item } from 'src/app/models/Item';
import Items from '../../../assets/Items.json';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  @Output() toggleNav = new EventEmitter<any>();
  pageTitle: string = "Bank";
  playerService: PlayerService;
  maxColCount: number = 6;
  bankItems$: Observable<BankItem[]>;

  constructor(playerService: PlayerService) 
  { 
    this.playerService = playerService;
  }

  ngOnInit(): void {
    this.bankItems$ = of(this.playerService.playerSave.bank.items);
  }

  GetBankItems() {
      return this.playerService.playerSave.bank.items;
  }

  trackBy(index: number, item: BankItem) {
      return `${item.itemId}:${item.quantity}`;
  }

  GetItemName(itemId: number) {
    return Items[itemId].name;
  }

  GetItemIcon(itemId: number) {
      return Items[itemId].icon;
  }

  GetItemValue(itemId: number) {
      return Items[itemId].value;
  }

  GetDisplayQuantity(value: number){
      if (value <= 9999){
          return `${value}`;
      } else if(value >= 10000 && value <= 999999){
          let thousandValue = value / 1000;
          return `${this.truncateDecimals(thousandValue)}k`;
      } else {
        let milValue = value / 1000000;
        return `${this.truncateDecimals(milValue)}M`;
      }
  }

  private truncateDecimals(value: number) {
    return value.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0];
  }

}
