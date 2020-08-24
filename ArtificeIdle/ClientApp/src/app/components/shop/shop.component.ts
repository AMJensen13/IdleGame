import { Component, OnInit, Inject } from '@angular/core';
import { Shop } from 'src/app/models/Shop/Shop';
import { ItemCost, Cost } from 'src/app/models/Shop/Cost';
import { ShopItem } from 'src/app/models/Shop/ShopItem';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { BankService } from 'src/app/services/bank/bank.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { Store } from '@ngrx/store';
import * as BankActions from 'src/app/store/bank/actions';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ErrorComponent } from '../shared/error/error.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  shops: Shop[] = [
    {
        name: "Lumberjack",
        items: [
            {
                name: "Iron Axe",
                icon: "ironaxe",
                isUpgrade: true,
                upgradeId: 0,
                cost: 
                {
                    currency: 100,
                    items: [ { itemId: 10, quantity: 5 }, { itemId: 0, quantity: 5 }]
                }
            }
        ]
    }
  ];

  constructor(private dialog: MatDialog, 
              private bankService: BankService,  
              private playerService: PlayerService, 
              private store: Store<any>,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  BuyItemCheck(item: ShopItem) {
    if (!this.HasAllItems(item.cost)) {
      this.ShowMissingItemsDialog();
      return;
    }

    let dialogRef = this.dialog.open(BuyItemDialog, { data: { item: item } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //remove items

        if (item.isUpgrade){
          alert('Add the freaking upgrade!!!');
        } else
        {
          alert('Add the freaking Item!!!');
        }
      }
    })
  }

  HasAllItems(cost: Cost): boolean {
    if (this.playerService.GetPlayerCurrency() < cost.currency){
      return false;
    }

    for(let item of cost.items) {
      if (!this.bankService.HasItem(item.itemId, item.quantity)){
        return false;
      }
    }

    return true;
  }

  ShowMissingItemsDialog() {
    let snackConfig = new MatSnackBarConfig();
    snackConfig.panelClass = ['background-red'];
    snackConfig.duration = 1500;
    snackConfig.data = { message: 'You do not meet the requirements to purchase this.' };
    this.snackBar.openFromComponent(ErrorComponent, snackConfig);
  }

}

@Component({
  selector: "but-item-dialog",
  templateUrl: "buy-item-dialog.html"
})
export class BuyItemDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}