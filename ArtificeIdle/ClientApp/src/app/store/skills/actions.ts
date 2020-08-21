import { Action } from '@ngrx/store'

export enum SkillActionTypes {
    ADD_XP = 'ADD_XP',
    LOAD_SKILLS = 'LOAD_SKILLS'
}

export class AddXp implements Action {
    readonly type = SkillActionTypes.ADD_XP;
    constructor(public payload: any) {}
}

export class LoadSkills implements Action {
    readonly type = SkillActionTypes.LOAD_SKILLS;
    constructor(public payload: any) {}
}

export type SkillActions = AddXp | LoadSkills;