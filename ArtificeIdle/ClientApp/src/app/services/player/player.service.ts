import { Injectable } from '@angular/core';
import { Player, PlayerSkill } from '../../models/Player';
import { SkillEnum } from 'src/app/models/Skill';
import { NgxIndexedDBService } from 'ngx-indexed-db';

const SAVE_KEY = 'userAccount';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  public playerSave: Player;
  
  constructor(private dbService: NgxIndexedDBService) 
  { 
    this.loadPlayerData();
  }

  updatePlayerData(){
    this.dbService.update('player', this.playerSave).catch((ex) => { console.log(ex)});
  }

  savePlayerData() {
      this.dbService.add('player', this.playerSave).catch((ex) => {console.log(ex)});
  }

  private async loadPlayerData(){
    this.dbService.getByID('player', 1).then((player: Player) => {
        if (player)
        {
          this.playerSave = player;
        } else {
          this.createPlayerSave();
        }
    });
  }

  private createPlayerSave(){
    this.playerSave = new Player("test");
    this.savePlayerData();
  }
}
