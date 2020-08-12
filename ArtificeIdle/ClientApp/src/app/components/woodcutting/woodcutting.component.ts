import { Component, OnInit, EventEmitter, Output, ViewChildren, ElementRef, QueryList, Renderer2 } from '@angular/core';
import Skills from '../../../assets/Skills.json';
import { PlayerService } from '../../services/player/player.service';
import { SkillService } from 'src/app/services/skill/skill.service';
import { Skill, SkillEnum, SkillAction } from '../../models/Skill';
import { interval, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddItemComponent } from 'src/app/components/shared/add-item/add-item.component';

@Component({
  selector: 'app-woodcutting',
  templateUrl: './woodcutting.component.html',
  styleUrls: ['./woodcutting.component.scss']
})
export class WoodcuttingComponent implements OnInit {
  @Output() toggleNav: EventEmitter<any> = new EventEmitter();
  @ViewChildren('actionProgress') progressBars: QueryList<ElementRef>;
  pageTitle: string = 'Woodcutting';
  woodSkill: Skill;
  actionSubscription: Subscription;

  constructor(private skillService: SkillService) 
  {
    this.woodSkill = Skills[SkillEnum.Woodcutting];
  }

  ngOnInit(): void {
    if (this.skillService.hasActiveAction && this.skillService.currentSkill.id === this.woodSkill.id) {
      this.actionSubscription = this.skillService.currentActionInterval.subscribe(() => this.ProcessWoodcutting());
    }
  }

  ToggleWoodcutting(action: SkillAction)
  {
    if (this.skillService.hasActiveAction)
    {
      this.actionSubscription.unsubscribe();
      this.stopProgressBar();
      this.skillService.StopAction();
      return;
    }

    this.skillService.StartAction(this.woodSkill, action);
    this.actionSubscription = this.skillService.currentActionInterval.subscribe(() => this.ProcessWoodcutting());
    this.animateProgressBar();
  }

  ProcessWoodcutting(){
    this.animateProgressBar();
  }

  animateProgressBar(){
    let action = this.skillService.currentAction;
    var currentProgress = this.progressBars.find(x => x.nativeElement.id === `action${action.id}`);
    currentProgress.nativeElement.animate([{ width: '100%' }, {width: '0%'}], {duration: 0, easing: 'linear'});
    currentProgress.nativeElement.animate([{width: '0%'}, { width: '100%' }], {duration: action.baseInterval, easing: 'linear'});
  }

  stopProgressBar() {
    let action = this.skillService.currentAction;
    var currentProgress = this.progressBars.find(x => x.nativeElement.id === `action${action.id}`);
    currentProgress.nativeElement.getAnimations().forEach(animation => animation.cancel());
    currentProgress.nativeElement.animate([{ width: '100%' }, {width: '0%'}], {duration: 0, easing: 'linear'});
  }

  isBeingCut(id: number){
    let currentAction = this.skillService.currentAction;
    if (currentAction && currentAction.id === id){
      return "true";
    }
    return "false";
  }

  ngOnDestroy(): void {
    if (this.actionSubscription) this.actionSubscription.unsubscribe();
  }
}
