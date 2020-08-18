import { Injectable } from '@angular/core';
import { Player, PlayerSkill } from '../../models/Player';
import { LocalStorageService } from 'angular-web-storage';
import { SkillEnum } from 'src/app/models/Skill';
import { BankItem, Item } from 'src/app/models/Item';
import Items from '../../../assets/Items.json';

const SAVE_KEY = 'userAccount';
const XP_CONSTANT = 25;

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  public playerSave: Player;
  public items: Array<Item>;
  
  constructor(private localStorage: LocalStorageService) 
  { 
    this.loadPlayerData();
    this.items = Items;
  }

  hasLevel(skillId: number, levelRequired: number){

  }

  GetCurrentXP(skillId: number){
      return this.playerSave.skills[skillId].experience;
  }

  GetSkillLevel(skillId: number) {
    var xp = this.GetCurrentXP(skillId);

    var level = Math.floor((Math.sqrt((XP_CONSTANT*XP_CONSTANT)+(4*XP_CONSTANT*xp))-XP_CONSTANT)/(2*XP_CONSTANT));

    // minimum level is 1 not 0
    return level;
  }

  GetCurrentLevelXP(skillId: number){
      var currentLevel = this.GetSkillLevel(skillId);

      return XP_CONSTANT*currentLevel*(1+currentLevel);
  }

  GetNextLevelXP(skillId: number) {
    var xp = this.GetCurrentXP(skillId);
    var currentLevel = this.GetSkillLevel(skillId);

    return Math.floor(XP_CONSTANT*(currentLevel+1)*(currentLevel+2));
  }
  
  getBankItems(){
    return this.playerSave.bank.items;
  }

  addItemToBank(id: number, quantity: number){
    let item = this.items.find(x => x.id === id);
    if (!item){
      console.error("Invalid Item Id");
      return;
    }

    var itemInBank = this.playerSave.bank.items.find(x => x.itemId === id);

    if (itemInBank){
      itemInBank.quantity += quantity;
    } else{
      this.playerSave.bank.items.push(new BankItem(item, quantity));
    }
    this.savePlayerData();
  }

  savePlayerData(){
    this.localStorage.set(SAVE_KEY, JSON.stringify(this.playerSave));
  }

  addXP(experience: number, skillId: SkillEnum){
    this.playerSave.skills[skillId].experience += experience;
    this.savePlayerData();
  }

  private loadPlayerData(){
    var saveString = this.localStorage.get(SAVE_KEY);
    if (saveString)
    {
      this.playerSave = JSON.parse(saveString);
      this.VerifyPlayerSave();
    } else {
      this.createPlayerSave();
    }
  }

  private VerifyPlayerSave(){
    Object.keys(SkillEnum).map(x => {
        if (!this.playerSave.skills.find(pSkill => pSkill.skillId === SkillEnum[x])){
            this.playerSave.skills.push(new PlayerSkill(SkillEnum[x]));
        }
    })
  }

  private createPlayerSave(){
    this.playerSave = new Player("test");
    this.savePlayerData();
  }
}
