import { BankActions, BankActionTypes } from "./actions";
import { BankItem } from '../../models/Item';

export let initialState: BankItem[] = [];

export function bankReducer(state=initialState, action: BankActions) {
    switch(action.type) {
        case BankActionTypes.ADD_ITEM:
            let itemIndex = state.findIndex((x: BankItem) => x.itemId === action.payload.itemId);

            if (itemIndex >= 0) {
                let quantity = state[itemIndex].quantity + action.payload.quantity;
                const newState = [...state];
                newState.splice(itemIndex, 1, new BankItem(state[itemIndex].itemId, quantity));
                return newState;
            } else {
                return [...state, action.payload];
            }
        case BankActionTypes.LOAD_BANK:
            return [...state, ...action.payload];
        default:
            return state;
    }
}