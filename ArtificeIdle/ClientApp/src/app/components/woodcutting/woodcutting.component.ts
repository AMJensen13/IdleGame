import { Component, OnInit, EventEmitter, Output, ViewChildren, ElementRef, QueryList } from '@angular/core';
import Skills from '../../../assets/Skills.json';
import { SkillService } from 'src/app/services/skill/skill.service';
import { Skill, SkillEnum, SkillAction } from '../../models/Skill';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/services/player/player.service';
import { UpgradeService } from 'src/app/services/upgrade/upgrade.service';

@Component({
  selector: 'app-woodcutting',
  templateUrl: './woodcutting.component.html',
  styleUrls: ['./woodcutting.component.scss']
})
export class WoodcuttingComponent implements OnInit {
  @Output() toggleNav: EventEmitter<any> = new EventEmitter();
  @ViewChildren('actionProgress') progressBars: QueryList<ElementRef>;
  pageTitle: string = 'Woodcutting';
  skill: Skill;
  actionSubscription: Subscription;
  Math: Math;

  constructor(private skillService: SkillService, private playerService: PlayerService, private upgradeService: UpgradeService) 
  {
    this.skill = Skills[SkillEnum.Woodcutting];
    this.Math = Math;
  }

  ngOnInit(): void { }

  GetActionInterval(action: SkillAction) {
    var latestUpgrade = this.playerService.GetLatestSkillUpgrade(this.skill.id as SkillEnum)

    let actionInterval = action.baseInterval;

    if (latestUpgrade) {
        
        var upgradeDef = this.upgradeService.GetUpgradeDefinition(latestUpgrade);
        actionInterval = actionInterval * upgradeDef.intervalReduction;
    }

    return actionInterval/1000;
  }

  ToggleWoodcutting(action: SkillAction)
  {
    if (this.skillService.hasActiveAction && this.skill.id === this.skillService.currentSkill.id && this.skillService.currentAction.id === action.id)
    {
      this.actionSubscription.unsubscribe();
      this.stopProgressBar();
      this.skillService.StopAction();
      return;
    } else if (this.skillService.hasActiveAction && (this.skillService.currentAction.id !== action.id || this.skillService.currentSkill.id === this.skill.id)) 
    {
        if (this.actionSubscription && !this.actionSubscription.closed) this.actionSubscription.unsubscribe();
        this.stopProgressBar();
        this.skillService.StopAction();
    }

    this.skillService.StartAction(this.skill, action);
    this.actionSubscription = this.skillService.currentActionInterval$.subscribe(() => this.ProcessWoodcutting());
    this.animateProgressBar();
  }

  ProcessWoodcutting(){
    if (this.skillService.currentSkill.id === this.skill.id){
        this.animateProgressBar();
    } else {
        this.actionSubscription.unsubscribe();
        this.stopProgressBar();
    }
  }

  animateProgressBar(){
    let action = this.skillService.currentAction;
    var currentProgress = this.progressBars.find(x => x.nativeElement.id === `action${action.id}`);
    currentProgress.nativeElement.getAnimations().forEach(animation => animation.cancel());
    currentProgress.nativeElement.animate([{ width: '100%' }, {width: '0%'}], {duration: 0, easing: 'linear'});
    currentProgress.nativeElement.animate([{width: '0%'}, { width: '100%' }], {duration: this.skillService.actionInterval, easing: 'linear'});
  }

  stopProgressBar() {
    let action = this.skillService.currentAction;
    var currentProgress = this.progressBars.find(x => x.nativeElement.id === `action${action.id}`);
    currentProgress.nativeElement.getAnimations().forEach(animation => animation.cancel());
    currentProgress.nativeElement.animate([{ width: '100%' }, {width: '0%'}], {duration: 0, easing: 'linear'});
  }

  ngOnDestroy(): void {
    if (this.actionSubscription) this.actionSubscription.unsubscribe();
  }
}
