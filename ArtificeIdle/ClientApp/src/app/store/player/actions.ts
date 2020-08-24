import { Action } from '@ngrx/store'

export enum PlayerActionTypes {
    LOAD_PLAYER = 'LOAD_PLAYER',
    ADD_CURRENCY = 'ADD_CURRENCY',
    REMOVE_CURRENCY = 'REMOVE_CURRENCY',
    ADD_UPGRADE = 'ADD_UPGRADE'
}

export class LoadPlayer implements Action {
    readonly type = PlayerActionTypes.LOAD_PLAYER;
    constructor(public payload: any) {}
}

export class AddCurrency implements Action {
    readonly type = PlayerActionTypes.ADD_CURRENCY;
    constructor(public payload: any) {}
}

export class RemoveCurrency implements Action {
    readonly type = PlayerActionTypes.REMOVE_CURRENCY;
    constructor(public payload: any) {}
}

export class AddUpgrade implements Action {
    readonly type = PlayerActionTypes.ADD_UPGRADE;
    constructor(public payload: any) {}
}

export type PlayerActions = LoadPlayer | AddCurrency | RemoveCurrency | AddUpgrade;