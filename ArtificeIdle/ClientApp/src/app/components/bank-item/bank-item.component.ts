import { Component, OnInit, Input } from '@angular/core';
import { BankItem } from 'src/app/models/Item';

import Items from '../../../assets/Items.json';
import tippy from 'tippy.js';

@Component({
  selector: 'app-bank-item',
  templateUrl: './bank-item.component.html',
  styleUrls: ['./bank-item.component.scss']
})
export class BankItemComponent implements OnInit {
  @Input('bankItem') bankItem: BankItem;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let self = this;
    tippy('[bankTippy]', 
    {
        content(reference) {
            const id = +reference.getAttribute('bankTippy');
            var itemName = self.GetItemName(id);
            var itemValue = self.GetItemValue(id);
            return `<div><span>${itemName} : ${itemValue}gp</span></div>`;
        },
        arrow: false,
        placement: 'bottom',
        theme: 'material',
        allowHTML: true
    });
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
