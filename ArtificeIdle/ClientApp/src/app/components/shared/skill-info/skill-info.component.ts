import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/models/Skill';
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

  constructor(private store: Store<any>, private skillService: SkillService) { }

  ngOnInit(): void {
      this.store.select('skills').subscribe((skills: PlayerSkill[]) => {
        let currentSkill = skills.find(x=> x.skillId === this.skill.id);

        if (!currentSkill) return;
        this.loaded = true

        if (this.currentXP === currentSkill.experience){
            return;
        }

        this.currentXP = currentSkill.experience;
        this.currentLevelXP = this.skillService.GetCurrentLevelXP(this.currentXP);

        var updatedLevel = this.skillService.GetSkillLevel(this.currentXP);
        if (updatedLevel === this.currentLevel) {
            return;
        }

        this.currentLevel = updatedLevel;
        this.nextLevelXP = this.skillService.GetNextLevelXP(this.currentXP);
      });
  }

  GetCurrentLevelUpProgress() {
      return `${(((this.currentXP-this.currentLevelXP)/(this.nextLevelXP-this.currentLevelXP)) * 100)}%`;
  }
}
