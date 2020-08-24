import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/Item';
import Items from '../../../assets/Items.json';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Item[];

  constructor() 
  { 
      this.items = Items;
  }

  GetById(id: number) {
    return this.items.find(x => x.id === id);
  }

  GetItemIcon(id: number) {
    let item = this.GetById(id);
    return item ? item.icon : null;
  }

  GetItemName(id: number) {
    let item = this.GetById(id);
    return item ? item.name : null;
  }
  
  GetItemValue(id: number) {
    let item = this.GetById(id);
    return item ? item.value : null;
  }
}
