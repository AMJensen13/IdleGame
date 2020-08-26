import { Component, OnInit, EventEmitter, Output, ViewChildren, ElementRef, QueryList, Input, ViewChild } from '@angular/core';
import Skills from '../../../assets/Skills.json';
import { SkillService } from 'src/app/services/skill/skill.service';
import { Skill, SkillEnum, SkillAction } from '../../models/Skill';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/services/player/player.service';
import { UpgradeService } from 'src/app/services/upgrade/upgrade.service';
import { MatGridList } from '@angular/material/grid-list';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { BankItem, Item, ItemTypes } from 'src/app/models/Item';
import { ItemService } from 'src/app/services/item/item.service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-gathering-skill',
  templateUrl: './gathering-skill.component.html',
  styleUrls: ['./gathering-skill.component.scss']
})
export class GatheringSkillComponent implements OnInit {
  @Input() skillEnum: SkillEnum;
  @Input() pageTitle: string;
  @Output() toggleNav: EventEmitter<any> = new EventEmitter();
  @ViewChildren('actionProgress') progressBars: QueryList<ElementRef>;
  @ViewChild('grid') grid: MatGridList;
  @ViewChild('baitSelect') baitSelect: MatSelect;
  skill: Skill;
  bait: Item[];
  selectedBait: Item;
  baitSubscription: Subscription;
  actionSubscription: Subscription;
  Math: Math;

  gridByBreakpoint = {
    xl: 4,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1
  }

  constructor(private skillService: SkillService, 
              private playerService: PlayerService, 
              private upgradeService: UpgradeService, 
              private itemService: ItemService,
              private mediaObserver: MediaObserver,
              private store: Store<any>) 
  {
  }

  ngOnInit(): void 
  { 
    this.skill = Skills[this.skillEnum];
    this.Math = Math;

    if (this.skillEnum === SkillEnum.Fishing) {
      this.baitSubscription = this.store.select('bank').subscribe((x: BankItem[]) => {
        this.bait = new Array<Item>();
  
        for(let item of x) {
          var itemDef = this.itemService.GetById(item.itemId);
  
          if (itemDef.type === ItemTypes.Bait) {
            this.bait.push(itemDef);
          }
        }
      });
    }
  }

  ngAfterContentInit() {
    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }

  ngDoCheck() {
    if (this.selectedBait && !this.skillService.currentBait) {
      this.selectedBait = undefined;
    }
  }

  isFishing() {
    return this.skillEnum === SkillEnum.Fishing;
  }

  setBait(event) {
    this.skillService.SetBait(event.value);
    if (this.skillService.currentAction && !this.skillService.currentAction.isBait){
      let currentAction = Object.assign({}, this.skillService.currentAction);
      this.ToggleGathering(currentAction);
      this.ToggleGathering(currentAction);
    } 
  }

  GetBait() {
    return this.bait;
  }

  GetActionInterval(action: SkillAction) {
    var latestUpgrade = this.playerService.GetLatestSkillUpgrade(this.skill.id as SkillEnum)

    let actionInterval = action.baseInterval;

    if (latestUpgrade) {
        
        var upgradeDef = this.upgradeService.GetUpgradeDefinition(latestUpgrade);
        actionInterval = actionInterval * upgradeDef.intervalReduction;
    }

    return actionInterval/1000;
  }

  ToggleGathering(action: SkillAction)
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

    let started = this.skillService.StartAction(this.skill, action);
    if (started) {
      this.actionSubscription = this.skillService.currentActionInterval$.subscribe(() => this.ProcessGathering());
      this.animateProgressBar();
    }
  }

  ProcessGathering(){
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
