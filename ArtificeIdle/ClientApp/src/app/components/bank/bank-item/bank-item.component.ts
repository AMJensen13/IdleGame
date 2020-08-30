import { Component, OnInit, Input } from '@angular/core';
import { BankItem } from 'src/app/models/Item';

import tippy from 'tippy.js';
import { Store } from '@ngrx/store';
import * as BankActions from 'src/app/store/bank/actions';
import * as PlayerActions from 'src/app/store/player/actions';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-bank-item',
  templateUrl: './bank-item.component.html',
  styleUrls: ['./bank-item.component.scss']
})
export class BankItemComponent implements OnInit {
  @Input('bankItem') bankItem: BankItem;
  tooltip;

  constructor(private store: Store<any>, private itemService: ItemService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let self = this;
    this.tooltip = tippy('[bankTippy]', 
    {
        content(reference) {
            const id = +reference.getAttribute('bankTippy');
            var itemName = self.GetItemName(id);
            var itemValue = self.GetItemValue(id);
            return `<div><span>${itemName} : ${itemValue}gp</span></div>`;
        },
        arrow: false,
        placement: 'bottom',
        theme: 'light',
        duration: 0,
        allowHTML: true
    });
  }

  menuOpened() {
    if (this.tooltip && this.tooltip.length > 0){
      this.tooltip[0].hide();
    }
  }
  
  GetItemName(itemId: number) {
    return this.itemService.GetItemName(itemId);
  }

  GetItemIcon(itemId: number) {
      return this.itemService.GetItemIcon(itemId);
  }

  GetItemValue(itemId: number) {
      return this.itemService.GetItemValue(itemId);
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

  SellItem(quantity: number) {
      let itemId = this.bankItem.itemId;
      let currency = this.GetItemValue(itemId) * quantity;
      this.store.dispatch(new BankActions.RemoveItem({itemId, quantity}));
      this.store.dispatch(new PlayerActions.AddCurrency(currency));
  }

}
