import { Component, OnInit, Input } from '@angular/core';
import { Skill, SkillEnum } from 'src/app/models/Skill';
import { PlayerService } from 'src/app/services/player/player.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PlayerSkill } from 'src/app/models/Player';
import { SkillService } from 'src/app/services/skill/skill.service';

@Component({
  selector: 'app-skill-info',
  templateUrl: './skill-info.component.html',
  styleUrls: ['./skill-info.component.scss']
})
export class SkillInfoComponent implements OnInit {
  @Input() skill: Skill;
  skillInfoSub: Subscription;
  currentLevel: number;
  currentXP: number;
  currentLevelXP: number;
  nextLevelXP: number;
  loaded: boolean = false;

  constructor(private store: Store<any>, private skillService: SkillService, private playerService: PlayerService) { }

  ngOnInit(): void {
      this.store.select('skills').subscribe((skills: PlayerSkill[]) => {
        let currentSkill = skills.find(x=> x.skillId === this.skill.id);

        if (!currentSkill) return;
        this.loaded = true;


        this.currentLevel = currentSkill.level;
        this.currentXP = currentSkill.experience;
        this.nextLevelXP = currentSkill.nextLevelXp;
        this.currentLevelXP = SkillService.GetXpForLevel(this.currentLevel);
      });
  }

  GetUpgradeDisplay(){
    let currentUpgrade = this.playerService.GetLatestSkillUpgrade(this.skill.id as SkillEnum);

    if (!currentUpgrade) {
      return undefined;
    }

    return this.GetSkillText() + currentUpgrade;
  }

  GetSkillText() {
    switch(this.skill.id as SkillEnum){
      case SkillEnum.Woodcutting:
        return 'Current Axe: ';
    }
  }

  GetCurrentLevelUpProgress() {
      return `${(((this.currentXP-this.currentLevelXP)/(this.nextLevelXP-this.currentLevelXP)) * 100)}%`;
  }
}
