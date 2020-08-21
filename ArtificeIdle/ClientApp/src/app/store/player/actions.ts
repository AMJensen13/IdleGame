import { Action } from '@ngrx/store'

export enum PlayerActionTypes {
    LOAD_PLAYER = 'LOAD_PLAYER'
}

export class LoadPlayer implements Action {
    readonly type = PlayerActionTypes.LOAD_PLAYER;
    constructor(public payload: any) {}
}

export type PlayerActions = LoadPlayer;