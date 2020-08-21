import { Injectable } from '@angular/core';
import { Player } from '../../models/Player';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as PlayerActions from 'src/app/store/player/actions';

const SAVE_KEY = 'userAccount';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  public player: Player;
  public player$: Observable<any>;
  public playerSubscription: Subscription;

  constructor(private dbService: NgxIndexedDBService, private store: Store<any>) 
  { 
    this.dbService.getByID('player', 1).then((x : Player) => {
        let currentPlayer = new Player("default");
        if (x) {
            currentPlayer = x;
        }

        this.store.dispatch(new PlayerActions.LoadPlayer(currentPlayer));
    })
    this.player$ = this.store.select('player');
    this.player$.subscribe(x => this.player = x);
    this.playerSubscription = this.player$.subscribe(x => {
        if (x && x.name !== '') {
            this.dbService.update('player', x);
        }
    })
  }
}
