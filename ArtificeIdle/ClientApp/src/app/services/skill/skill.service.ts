import { Injectable } from '@angular/core';
import { SkillAction, Skill, SkillEnum } from 'src/app/models/Skill';
import { Observable, interval, Subscription } from 'rxjs';
import { takeWhile, min } from 'rxjs/operators';
import { AddItemComponent } from 'src/app/components/shared/add-item/add-item.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Store } from '@ngrx/store';
import { PlayerSkill, PlayerSkillsEntity } from 'src/app/models/Player';
import * as SkillActions from 'src/app/store/skills/actions';
import { BankItem, Item } from 'src/app/models/Item';
import * as Bank from 'src/app/store/bank/actions';
import { ItemService } from '../item/item.service';
import { ErrorComponent } from 'src/app/components/shared/error/error.component';
import { UpgradeService } from '../upgrade/upgrade.service';
import { PlayerService } from '../player/player.service';
import { FishingUpgrade } from 'src/app/models/Upgrades';
import { BankService } from '../bank/bank.service';

const XP_CONSTANT = 1313;

@Injectable({
  providedIn: 'root'
})
export class SkillService {
    currentSkill: Skill;
    currentAction: SkillAction;
    actionInterval: number;
    currentActionInterval$: Observable<any>;
    currentActionSubscriber: Subscription;
    hasActiveAction: boolean;
    skillsSubscription: Subscription;
    skills: PlayerSkill[];
    currentBait: Item;

    constructor(private _snackBar: MatSnackBar, 
                private dbService: NgxIndexedDBService, 
                private store: Store<any>,
                private itemService: ItemService,
                private upgradeService: UpgradeService,
                private playerService: PlayerService,
                private bankService: BankService) 
    { 
        this.dbService.getByID('skills', 1).then((skills: PlayerSkillsEntity) => {
            let pSkills = new Array<PlayerSkill>();

            if (skills && skills.skills) {
                pSkills = skills.skills;
            }

            Object.keys(SkillEnum).map(x => {
                var idNum = Number(x);
                if (!(idNum >= 0)) return;
                if (!pSkills.find(pSkill => pSkill.skillId === idNum)){
                    var newSkill = new PlayerSkill(idNum);
                    newSkill.nextLevelXp = SkillService.GetNextLevelXP(newSkill.level);
                    pSkills.push(newSkill);
                }
            });
            
            this.store.dispatch(new SkillActions.LoadSkills(pSkills));
            this.skillsSubscription = this.store.select('skills').subscribe((skills: Array<PlayerSkill>) => 
                {
                    if (skills && skills.length >= 0) {
                        this.dbService.update('skills', { skills: skills, id: 1});
                        this.skills = skills;
                    }
                }
            );
        });
        
    }

    StartAction(skill: Skill, action: SkillAction){
        if (!this.hasRequiredLevel(skill, action)) {
            this.ShowError(skill, 'You do not meet the level required to do this action.');
            return false;
        }

        this.actionInterval = action.baseInterval;

        if (skill.id === SkillEnum.Fishing) {
            return this.StartFishing(skill, action);
        }

        var latestUpgrade = this.playerService.GetLatestSkillUpgrade(skill.id as SkillEnum)

        if (latestUpgrade) {
            var upgradeDef = this.upgradeService.GetUpgradeDefinition(latestUpgrade);
            this.actionInterval = this.actionInterval * upgradeDef.intervalReduction;
        }

        this.currentAction = action;
        this.currentSkill = skill;
        this.currentActionInterval$ = interval(this.actionInterval).pipe(takeWhile(() => skill.id === this.currentSkill?.id && action.id === this.currentAction?.id));
        this.currentActionSubscriber = this.currentActionInterval$.subscribe(() => this.ExecuteAction(skill, action));
        this.hasActiveAction = true;
        return true;
    }

    ExecuteAction(skill: Skill, action: SkillAction) {
        if (this.currentSkill.id === skill.id && this.currentAction.id === action.id){
            this.addXP(this.currentSkill.id, action.baseExperience);
            this.addItemToBank(action.productId, 1);

            let snackConfig = new MatSnackBarConfig();
            snackConfig.panelClass = ['addItemContainer'];
            snackConfig.duration = 1000;
            snackConfig.data = {productId: action.productId, quantity: 1};

            this._snackBar.openFromComponent(AddItemComponent, snackConfig);
        }
    }

    StartFishing(skill: Skill, action: SkillAction){
        if (action.requiredUpgrade && !this.playerService.HasUpgrade(action.requiredUpgrade as FishingUpgrade, SkillEnum.Fishing)) {
            this.ShowError(skill, 'You do not have the required upgrade to fish here.');
            return false;
        }

        if (!action.isBait && this.currentBait) {
            this.actionInterval = this.actionInterval * this.currentBait.intervalMod;
        }

        this.currentAction = action;
        this.currentSkill = skill;
        this.currentActionInterval$ = interval(this.actionInterval).pipe(takeWhile(() => skill.id === this.currentSkill?.id && action.id === this.currentAction?.id));
        this.currentActionSubscriber = this.currentActionInterval$.subscribe(() => this.ExecuteFishing(skill, action));
        this.hasActiveAction = true;
        return true;
    }

    ExecuteFishing(skill: Skill, action: SkillAction) {
        if (this.currentSkill.id === skill.id && this.currentAction.id === action.id){
            let maxQuantity = 3; // Modify this for bigger bait nets
            let minQuantity = 1;

            if (this.playerService.HasUpgrade(FishingUpgrade.MediumNet, skill.id as SkillEnum)){
                maxQuantity = 6;
                minQuantity = 4;
            }

            if (this.playerService.HasUpgrade(FishingUpgrade.LargeNet, skill.id as SkillEnum)){
                maxQuantity = 9;
                minQuantity = 7;
            }

            let quantity = action.isBait ? Math.floor(Math.random() * (maxQuantity - minQuantity + 1)) + minQuantity : 1;
            
            // run out of bait check
            if (!this.removeBait()) return;

            this.addXP(this.currentSkill.id, action.baseExperience);
            this.addItemToBank(action.productId, quantity);

            let snackConfig = new MatSnackBarConfig();
            snackConfig.panelClass = ['addItemContainer'];
            snackConfig.duration = 1000;
            snackConfig.data = {productId: action.productId, quantity: quantity};

            this._snackBar.openFromComponent(AddItemComponent, snackConfig);
        }
    }

    SetBait(bait: Item) {
        this.currentBait = bait;
    }

    RestartAction(skillEnum: SkillEnum) {
        if (this.currentAction.isBait) {
            return;
        }

        if (this.currentSkill.id !== skillEnum) {
            return;
        }

        let action = Object.assign({}, this.currentAction);
        let skill = Object.assign({}, this.currentSkill);

        this.StopAction();
        this.StartAction(skill, action);
    }

    hasRequiredLevel (skill: Skill, action: SkillAction) {
        return this.skills[skill.id].level >= action.levelRequirement;
    }

    ShowError(skill: Skill, message: string) {
        let snackConfig = new MatSnackBarConfig();
        snackConfig.panelClass = ['background-red'];
        snackConfig.duration = 1500;
        snackConfig.data = { message: message };
        this._snackBar.openFromComponent(ErrorComponent, snackConfig);
    }

    addXP(id: number, xp: number) {
        this.store.dispatch(new SkillActions.AddXp({ skillId: id, experience: xp }));
    }

    addItemToBank(id: number, quantity: number){
        let item = this.itemService.GetById(id);
        if (!item){
            console.error("Invalid Item Id");
            return;
        }

        this.store.dispatch(new Bank.AddItem(new BankItem(id, quantity)));
    }

    removeBait(){
        if (!this.currentBait) return true;

        if (!this.bankService.HasItem(this.currentBait.id, 1)) {
            this.StopAction();
            this.ShowError(this.currentSkill, `You have run out of ${this.currentBait.name}.`);
            this.currentBait = null;
            return false;
        }
        
        this.store.dispatch(new Bank.RemoveItem(new BankItem(this.currentBait.id, 1)));
        return true;
    }

    StopAction(){
        if (this.currentActionSubscriber) this.currentActionSubscriber.unsubscribe();
        this.currentActionSubscriber = null;
        this.currentActionInterval$ = null;
        this.currentAction = null;
        this.currentSkill = null;
        this.hasActiveAction = false;
    }

    GetSkillLevelById(skill: SkillEnum) {
        return this.skills[skill].level;
    }

    static GetXpForLevel(level: number){
        var summation = 0;

        for(let i = 1; i < level; i++) {
            summation += 230 * Math.pow(i, 3);
        }

        return Math.floor(64 + (summation/333));
    }

    static GetNextLevelXP(currentLevel: number) {
        return this.GetXpForLevel(currentLevel + 1);
    }

    GetSkillInfo(id: number){
        return this.skills[id];
    }
}
