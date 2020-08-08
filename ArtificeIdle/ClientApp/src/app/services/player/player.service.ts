import { Injectable, Inject } from '@angular/core';
import { Player } from '../../models/Player';
import { LocalStorageService } from 'angular-web-storage';
import { SkillEnum } from 'src/app/models/Skill';

const SAVE_KEY = 'userAccount';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  public playerSave: Player;

  constructor(private localStorage: LocalStorageService) 
  { 
    this.loadPlayerData();
  }

  hasLevel(skillId: number, levelRequired: number){

  }

  addXP(experience: number, skillId: SkillEnum){
    this.playerSave.skills[skillId].experience += experience;
  }

  private loadPlayerData(){
    var saveString = this.localStorage.get(SAVE_KEY);
    if (saveString)
    {
      this.playerSave = JSON.parse(saveString);
    } else {
      this.createPlayerSave();
    }
  }

  private createPlayerSave(){
    this.playerSave = new Player("test");
    this.localStorage.set(SAVE_KEY, JSON.stringify(this.playerSave));
  }
}
