import { Component, OnInit, Inject } from '@angular/core';
import { Shop } from 'src/app/models/Shop/Shop';
import { ItemCost, Cost } from 'src/app/models/Shop/Cost';
import { ShopItem } from 'src/app/models/Shop/ShopItem';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { BankService } from 'src/app/services/bank/bank.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { Store } from '@ngrx/store';
import * as BankActions from 'src/app/store/bank/actions';
import * as PlayerActions from 'src/app/store/player/actions';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ErrorComponent } from '../shared/error/error.component';
import { SkillService } from 'src/app/services/skill/skill.service';
import { SkillEnum } from 'src/app/models/Skill';

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
                levelRequirement: 1,
                skill: SkillEnum.Woodcutting,
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
              private skillService: SkillService, 
              private store: Store<any>,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  ShowItem(item: ShopItem){
    if (item.isUpgrade){
      return !this.playerService.HasUpgrade(item.upgradeId);
    }

    return true;
  }

  BuyItemCheck(item: ShopItem, quantity: number = 1) {
    if (item.isUpgrade && item.levelRequirement && this.skillService.GetSkillLevelById(item.skill) != item.levelRequirement) {
        this.ShowErrorDialog('You do not meet the requirements to purchase this.');
        return;
    }

    if (!this.HasAllItems(item.cost)) {
      this.ShowErrorDialog('You do not meet the requirements to purchase this.');
      return;
    }

    let dialogRef = this.dialog.open(BuyItemDialog, { data: { item: item } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.RemoveItems(item.cost);

        if (item.isUpgrade) {
          this.store.dispatch(new PlayerActions.AddUpgrade({upgradeId: item.upgradeId}));
        } 
        else
        {
          this.store.dispatch(new BankActions.AddItem({itemId: item.itemId, quantity: quantity}))
        }
      }
    })
  }

  RemoveItems(cost: Cost) {
    this.store.dispatch(new PlayerActions.RemoveCurrency(cost.currency));

    for (let item of cost.items) {
      let itemToRemove = { itemId: item.itemId, quantity: item.quantity };
      this.store.dispatch(new BankActions.RemoveItem(itemToRemove));
    }
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

  ShowErrorDialog(message: string) {
    let snackConfig = new MatSnackBarConfig();
    snackConfig.panelClass = ['background-red'];
    snackConfig.duration = 1500;
    snackConfig.data = { message: message };
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