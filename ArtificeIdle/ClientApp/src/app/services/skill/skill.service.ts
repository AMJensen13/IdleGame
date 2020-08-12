import { Injectable } from '@angular/core';
import { SkillAction, Skill } from 'src/app/models/Skill';
import { Observable, interval, Subscription } from 'rxjs';
import { PlayerService } from '../player/player.service';
import { AddItemComponent } from 'src/app/components/shared/add-item/add-item.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  currentSkill: Skill;
  currentAction: SkillAction;
  currentActionInterval: Observable<any>;
  currentActionSubscriber: Subscription;
  hasActiveAction: boolean;

  constructor(private playerService: PlayerService, private _snackBar: MatSnackBar) { }

  StartAction(skill: Skill, action: SkillAction){
    this.currentAction = action;
    this.currentSkill = skill;
    this.currentActionInterval = interval(action.baseInterval);
    this.currentActionSubscriber = this.currentActionInterval.subscribe(() => this.ExecuteAction(action));
    this.hasActiveAction = true;
  }

  ExecuteAction(action: SkillAction) {
    this.playerService.addXP(action.baseExperience, this.currentSkill.id);
    this.playerService.addItemToBank(action.productId, 1);
    this._snackBar.openFromComponent(AddItemComponent, { data: {productId: action.productId, quantity: 1} });
  }

  StopAction(){
    if (this.currentActionSubscriber) this.currentActionSubscriber.unsubscribe();
    this.currentActionSubscriber = null;
    this.currentActionInterval = null;
    this.currentAction = null;
    this.currentSkill = null;
    this.hasActiveAction = false;
  }
}
