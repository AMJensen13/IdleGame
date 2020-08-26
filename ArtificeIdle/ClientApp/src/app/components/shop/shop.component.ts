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
import { ShopUpgrade } from 'src/app/models/Shop/ShopUpgrade';
import { WoodcuttingUpgrade, FishingUpgrade } from 'src/app/models/Upgrades';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  shops: Shop[] = [
    {
        name: "Lumberjack",
        items: [ ],
        upgrades: [
          {
            name: "Iron Axe",
            icon: "ironaxe",
            skill: SkillEnum.Woodcutting,
            levelRequired: 5,
            upgrade: WoodcuttingUpgrade.IronAxe,
            previousUpgrade: null,
            cost:
            {
              currency: 100,
              items: [ { itemId: 10, quantity: 5 }, { itemId: 0, quantity: 5 } ]
            }
          },
          {
            name: "Steel Axe",
            icon: "ironaxe",
            skill: SkillEnum.Woodcutting,
            levelRequired: 15,
            upgrade: WoodcuttingUpgrade.SteelAxe,
            previousUpgrade: WoodcuttingUpgrade.IronAxe,
            cost:
            {
              currency: 0,
              items: [ { itemId: 10, quantity: 5 }, { itemId: 15, quantity: 5 }, { itemId: 1, quantity: 5 } ]
            }
          }
        ]
    },
    {
        name: "Angler",
        items: [ ],
        upgrades: [
          {
            name: "Medium Net",
            icon: "fishing",
            skill: SkillEnum.Fishing,
            levelRequired: 1,
            upgrade: FishingUpgrade.MediumNet,
            previousUpgrade: null,
            cost:
            {
              currency: 100,
              items: []
            }
          },
          {
            name: "Large Net",
            icon: "fishing",
            skill: SkillEnum.Fishing,
            levelRequired: 1,
            upgrade: FishingUpgrade.LargeNet,
            previousUpgrade: FishingUpgrade.MediumNet,
            cost:
            {
              currency: 100,
              items: []
            }
          },
          {
            name: "Fishing Rod",
            icon: "fishing",
            skill: SkillEnum.Fishing,
            levelRequired: 1,
            upgrade: FishingUpgrade.FishingRod,
            previousUpgrade: null,
            cost:
            {
              currency: 100,
              items: []
            }
          },
          {
            name: "Harpoon",
            icon: "fishing",
            skill: SkillEnum.Fishing,
            levelRequired: 15,
            upgrade: FishingUpgrade.Harpoon,
            previousUpgrade: FishingUpgrade.FishingRod,
            cost:
            {
              currency: 0,
              items: [ { itemId: 10, quantity: 5 }, { itemId: 15, quantity: 5 }, { itemId: 1, quantity: 5 } ]
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

  ShowUpgrade(upgrade: ShopUpgrade){
    let showUpgrade = true;

    if (upgrade.previousUpgrade !== null) {
      showUpgrade = this.playerService.HasUpgrade(upgrade.previousUpgrade, upgrade.skill);
    }

    return showUpgrade && !this.playerService.HasUpgrade(upgrade.upgrade, upgrade.skill);
  }

  BuyUpgrade(upgrade: ShopUpgrade) {
    if (upgrade.levelRequired && this.skillService.GetSkillLevelById(upgrade.skill) < upgrade.levelRequired) {
        this.ShowErrorDialog('You do not meet the requirements to purchase this.');
        return;
    }
    
    if (!this.HasAllItems(upgrade.cost)) {
      this.ShowErrorDialog('You do not meet the requirements to purchase this.');
      return;
    }

    let dialogRef = this.dialog.open(BuyItemDialog, { data: { item: upgrade } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.RemoveItems(upgrade.cost);

        this.store.dispatch(new PlayerActions.AddUpgrade({upgrade: upgrade.upgrade, skill: upgrade.skill}));
      }
    });
  }

  BuyItem(item: ShopItem, quantity: number = 1) {
    if (!this.HasAllItems(item.cost)) {
      this.ShowErrorDialog('You do not meet the requirements to purchase this.');
      return;
    }

    let dialogRef = this.dialog.open(BuyItemDialog, { data: { item: item } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.RemoveItems(item.cost);

        this.store.dispatch(new BankActions.AddItem({itemId: item.itemId, quantity: quantity}));
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