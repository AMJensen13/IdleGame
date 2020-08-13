import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/models/Skill';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-skill-info',
  templateUrl: './skill-info.component.html',
  styleUrls: ['./skill-info.component.scss']
})
export class SkillInfoComponent implements OnInit {
  @Input() skill: Skill;
  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }

  GetLevel(){
      return this.playerService.GetSkillLevel(this.skill.id);
  }

  GetCurrentLevelXP() {
    return this.playerService.GetCurrentLevelXP(this.skill.id);
  }

  GetNextLevelXP() {
      return this.playerService.GetNextLevelXP(this.skill.id);
  }

  GetCurrentXP() {
      return this.playerService.GetCurrentXP(this.skill.id);
  }

  GetCurrentLevelUpProgress() {
      var currentLevelXP = this.GetCurrentLevelXP();

      return `${(((this.GetCurrentXP()-currentLevelXP)/(this.GetNextLevelXP()-currentLevelXP)) * 100)}%`;
  }
}
