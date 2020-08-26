import { Injectable } from '@angular/core';
import { Player } from '../../models/Player';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as PlayerActions from 'src/app/store/player/actions';
import { WoodcuttingUpgrade, FishingUpgrade } from 'src/app/models/Upgrades';
import { SkillEnum } from 'src/app/models/Skill';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  public player: Player;
  public player$: Observable<any>;
  public playerSubscription: Subscription;
  playerCurrency: number;

  constructor(private dbService: NgxIndexedDBService, private store: Store<any>) 
  { 
    this.dbService.getByID('player', 1).then((x : Player) => {
        let currentPlayer = new Player("default");
        if (x) {
            currentPlayer = x;
        }
        
        if (currentPlayer.currency === undefined) currentPlayer.currency = 0;
        if (currentPlayer.woodCuttingUpgrades === undefined) currentPlayer.woodCuttingUpgrades = new Map<WoodcuttingUpgrade, boolean>();
        if (currentPlayer.fishingUpgrades === undefined) currentPlayer.fishingUpgrades = new Map<FishingUpgrade, boolean>();
        this.store.dispatch(new PlayerActions.LoadPlayer(currentPlayer));
    });
    this.playerSubscription = this.store.select('player').subscribe((x: Player) => {
        if (x && x.name !== '') {
            this.dbService.update('player', x);
            this.player = x;
            this.playerCurrency = x.currency;
        }
    });
    
  }

  GetLatestSkillUpgrade(skill: SkillEnum) {
    switch(skill) {
      case SkillEnum.Woodcutting:
        if (!this.player?.woodCuttingUpgrades) return undefined;
        var woodUpgrades = Array.from(this.player.woodCuttingUpgrades);
        if (woodUpgrades.length > 0) {
          return woodUpgrades[this.player.woodCuttingUpgrades.size-1][0];
        }
        return undefined;
    }
  }

  HasUpgrade(upgrade: string, skill: SkillEnum) {
    let hasUpgrade = false;
    switch(skill) {
      case SkillEnum.Woodcutting:
        hasUpgrade = this.player?.woodCuttingUpgrades.get(upgrade as WoodcuttingUpgrade) === true;
        break;
      case SkillEnum.Fishing: 
      hasUpgrade = this.player?.fishingUpgrades.get(upgrade as FishingUpgrade) === true
    }

    return hasUpgrade;
  }

  GetPlayerCurrency() {
    return this.playerCurrency;
  }
}
