import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BankItem } from 'src/app/models/Item';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  bankItemsSubscription: Subscription;
  bankItems: BankItem[];

  constructor(private store: Store<any>) { 
    this.bankItemsSubscription = this.store.select('bank').subscribe((x: BankItem[]) => 
        {
            this.bankItems = x;
        }
    );
  }

  HasItem(itemId: number, quantity?: number): boolean{
    let item = this.bankItems.find(x => x.itemId === itemId);

    if (quantity){
      return item && item.quantity >= quantity;
    }

    return item !== undefined && item !== null;
  }
}
