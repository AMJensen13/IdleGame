import { Injectable } from '@angular/core';
import { Player } from '../../models/Player';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as PlayerActions from 'src/app/store/player/actions';

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
        if (currentPlayer.upgrades === undefined) currentPlayer.upgrades = [];
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

  HasUpgrade(upgradeId: number) {
    return this.player?.upgrades[upgradeId] === true;
  }

  GetPlayerCurrency() {
    return this.playerCurrency;
  }
}
