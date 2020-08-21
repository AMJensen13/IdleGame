import { Action } from '@ngrx/store'

export enum BankActionTypes {
    ADD_ITEM = 'ADD_ITEM',
    LOAD_BANK = 'LOAD_BANK'
}

export class AddItem implements Action {
    readonly type = BankActionTypes.ADD_ITEM;
    constructor(public payload: any) {}
}

export class LoadItems implements Action {
    readonly type = BankActionTypes.LOAD_BANK;
    constructor(public payload: any) {}
}

export type BankActions = AddItem | LoadItems;