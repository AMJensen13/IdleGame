import { Action } from '@ngrx/store'

export enum SkillActionTypes {
    ADD_XP = 'ADD_XP',
    LOAD_SKILLS = 'LOAD_SKILLS',
    UPDATE_LEVEL = 'UPDATE_LEVEL'
}

export class AddXp implements Action {
    readonly type = SkillActionTypes.ADD_XP;
    constructor(public payload: any) {}
}

export class LoadSkills implements Action {
    readonly type = SkillActionTypes.LOAD_SKILLS;
    constructor(public payload: any) {}
}

export class UpdateLevel implements Action {
    readonly type = SkillActionTypes.UPDATE_LEVEL;
    constructor(public payload: any) {}
}

export type SkillActions = AddXp | LoadSkills | UpdateLevel;