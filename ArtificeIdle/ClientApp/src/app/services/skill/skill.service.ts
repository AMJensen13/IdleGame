import { Injectable } from '@angular/core';
import { SkillAction, Skill, SkillEnum } from 'src/app/models/Skill';
import { Observable, interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { AddItemComponent } from 'src/app/components/shared/add-item/add-item.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Store } from '@ngrx/store';
import { PlayerSkill, PlayerSkillsEntity } from 'src/app/models/Player';
import * as SkillActions from 'src/app/store/skills/actions';
import Items from '../../../assets/Items.json';
import { Item, BankItem } from 'src/app/models/Item';
import * as Bank from 'src/app/store/bank/actions';

const XP_CONSTANT = 1313;

@Injectable({
  providedIn: 'root'
})
export class SkillService {
    currentSkill: Skill;
    currentAction: SkillAction;
    currentActionInterval: Observable<any>;
    currentActionSubscriber: Subscription;
    hasActiveAction: boolean;
    skillsSubscription: Subscription;
    items: Array<Item>;
    skillLevels: number[];

    constructor(private _snackBar: MatSnackBar, 
                private dbService: NgxIndexedDBService, 
                private store: Store<any>) 
    { 
        this.items = Items;
        this.skillLevels = new Array<number>();
        this.dbService.getByID('skills', 1).then((skills: PlayerSkillsEntity) => {
            let pSkills = new Array<PlayerSkill>();

            if (skills) {
                pSkills = skills.skills;
            }

            Object.keys(SkillEnum).map(x => {
                var idNum = Number(x);
                if (!(idNum >= 0)) return;
                if (!pSkills.find(pSkill => pSkill.skillId === idNum)){
                    pSkills.push(new PlayerSkill(idNum));
                }
            })
            
            this.store.dispatch(new SkillActions.LoadSkills(pSkills));
        });
        
        this.skillsSubscription = this.store.select('skills').subscribe((skills: Array<PlayerSkill>) => 
            {
                if (skills && skills.length >= 0) {
                    this.dbService.update('skills', { skills, id: 1});
                    
                    this.UpdateSkillLevels(skills);
                }
            }
        );
    }

    ToggleAction(skill: Skill, action: SkillAction) {
        if (!this.hasActiveAction) {
            this.StartAction(skill, action);
            return true;
        }

        if (this.currentSkill.id === skill.id) {
            if (this.currentAction.id === action.id) {
                this.StopAction();
                return false;
            }
            
            this.StopAction();
            this.StartAction(skill, action);
            return true;
        }

        this.StopAction();
        this.StartAction(skill, action);
        return true;
    }

    StartAction(skill: Skill, action: SkillAction){
        if (!this.hasRequiredLevel(skill, action)) {
            return this.ShowError(skill, 'You do not meet the level requirement to do this action.');
        }

        this.currentAction = action;
        this.currentSkill = skill;
        this.currentActionInterval = interval(action.baseInterval).pipe(takeWhile(() => skill.id === this.currentSkill.id && action.id === this.currentAction.id));
        this.currentActionSubscriber = this.currentActionInterval.subscribe(() => this.ExecuteAction(skill, action));
        this.hasActiveAction = true;
    }

    ExecuteAction(skill: Skill, action: SkillAction) {
        if (this.currentSkill.id === skill.id && this.currentAction.id === action.id){
            this.addXP(this.currentSkill.id, action.baseExperience);
            this.addItemToBank(action.productId, 1);
            this._snackBar.openFromComponent(AddItemComponent, { data: {productId: action.productId, quantity: 1} });
        }
    }

    hasRequiredLevel (skill: Skill, action: SkillAction) {
        return this.skillLevels[skill.id] >= action.levelRequirement;
    }

    UpdateSkillLevels(skills: PlayerSkill[]) {
        for (let skill of skills) {
            this.skillLevels[skill.skillId] = this.GetSkillLevel(skill.experience) + 1;
        }
    }

    ShowError(skill: Skill, message: string) {
        const snackConfig = new MatSnackBarConfig();
        snackConfig.panelClass = ['background-red'];
        snackConfig.duration = 1500;
        this._snackBar.open(message, null, snackConfig);
    }

    addXP(id: number, xp: number) {
        this.store.dispatch(new SkillActions.AddXp({ skillId: id, experience: xp }));
    }

    addItemToBank(id: number, quantity: number){
        let item = this.items.find(x => x.id === id);
        if (!item){
        console.error("Invalid Item Id");
        return;
        }

        this.store.dispatch(new Bank.AddItem(new BankItem(id, quantity)));
    }

    StopAction(){
        if (this.currentActionSubscriber) this.currentActionSubscriber.unsubscribe();
        this.currentActionSubscriber = null;
        this.currentActionInterval = null;
        this.currentAction = null;
        this.currentSkill = null;
        this.hasActiveAction = false;
    }

    GetSkillLevel(xp: number) {
        var level = Math.floor((Math.sqrt((XP_CONSTANT*XP_CONSTANT)+(4*XP_CONSTANT*xp))-XP_CONSTANT)/(2*XP_CONSTANT));

        return level;
    }

    GetCurrentLevelXP(xp: number){
        var currentLevel = this.GetSkillLevel(xp);

        return XP_CONSTANT*currentLevel*(1+currentLevel);
    }

    GetNextLevelXP(xp: number) {
        var currentLevel = this.GetSkillLevel(xp);

        return Math.floor(XP_CONSTANT*(currentLevel+1)*(currentLevel+2));
    }
}
