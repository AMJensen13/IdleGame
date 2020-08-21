import { Component, OnInit, ViewChildren, Output, EventEmitter, QueryList, ElementRef } from '@angular/core';
import { SkillService } from 'src/app/services/skill/skill.service';
import { SkillAction, Skill, SkillEnum } from 'src/app/models/Skill';
import { Subscription } from 'rxjs';
import Skills from '../../../assets/Skills.json';

@Component({
  selector: 'app-foraging',
  templateUrl: './foraging.component.html',
  styleUrls: ['./foraging.component.scss']
})
export class ForagingComponent implements OnInit {
    @Output() toggleNav: EventEmitter<any> = new EventEmitter();
    @ViewChildren('actionProgress') progressBars: QueryList<ElementRef>; 
    pageTitle: string = 'Foraging';
    actionSubscription: Subscription;
    skill: Skill;
    Math: Math;
    
    constructor(private skillService: SkillService) {
      this.skill = Skills[SkillEnum.Foraging];
      this.Math = Math;
     }

  ngOnInit(): void {
  }
  
  ToggleForaging(action: SkillAction)
  {
    if (this.skillService.hasActiveAction && this.skill.id === this.skillService.currentSkill.id && this.skillService.currentAction.id === action.id)
    {
      this.actionSubscription.unsubscribe();
      this.stopProgressBar();
      this.skillService.StopAction();
      return;
    } else if (this.skillService.hasActiveAction && (this.skillService.currentAction.id !== action.id || this.skillService.currentAction.id === this.skill.id)) 
    {
        if (this.actionSubscription && !this.actionSubscription.closed) this.actionSubscription.unsubscribe();
        this.stopProgressBar();
        this.skillService.StopAction();
    }

    this.skillService.StartAction(this.skill, action);
    this.actionSubscription = this.skillService.currentActionInterval.subscribe(() => this.ProcessForaging());
    this.animateProgressBar();
  }

  ProcessForaging(){
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
    currentProgress.nativeElement.animate([{width: '0%'}, { width: '100%' }], {duration: action.baseInterval, easing: 'linear'});
  }

  stopProgressBar() {
    let action = this.skillService.currentAction;
    var currentProgress = this.progressBars.find(x => x.nativeElement.id === `action${action.id}`);
    currentProgress.nativeElement.getAnimations().forEach(animation => animation.cancel());
    currentProgress.nativeElement.animate([{ width: '100%' }, {width: '0%'}], {duration: 0, easing: 'linear'});
  }
}
