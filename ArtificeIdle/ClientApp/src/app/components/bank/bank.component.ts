import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { PlayerService } from 'src/app/services/player/player.service';
import { Observable, of, Subscription } from 'rxjs';
import { BankItem } from 'src/app/models/Item';
import { Store } from '@ngrx/store';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Bank } from 'src/app/models/Bank';
import * as BankActions from 'src/app/store/actions/actions';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  @Output() toggleNav = new EventEmitter<any>();
  pageTitle: string = "Bank";
  maxColCount: number = 6;
  bankItems$: Observable<BankItem[]>;
  bankItemsSubscription: Subscription;

  constructor(private dbService: NgxIndexedDBService, private store: Store<any>) 
  { 
  }

  ngOnInit(): void {
    this.dbService.getByID('bank', 1).then((bank: Bank) => {
        if (!bank) {
            let items = new Array<BankItem>();
            this.store.dispatch(new BankActions.LoadItems(items));
            return;
        }
        
        this.store.dispatch(new BankActions.LoadItems(bank.items));
    });
    this.bankItems$ = this.store.select('bank');
    this.bankItemsSubscription = this.bankItems$.subscribe(x => 
        {
            if (x) {
                this.dbService.update('bank', {items: x, id: 1});
            }
        }
    );
  }

  trackBy(index: number, item: BankItem) {
      return index;
  }

}
