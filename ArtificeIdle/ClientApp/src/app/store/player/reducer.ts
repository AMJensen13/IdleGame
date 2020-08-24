import { PlayerActions, PlayerActionTypes } from "./actions";
import { Player } from '../../models/Player';

export let initialState: Player = new Player("");

export function playerReducer(state=initialState, action: PlayerActions) {
    switch(action.type) {
        case PlayerActionTypes.LOAD_PLAYER:
            return action.payload;
        case PlayerActionTypes.ADD_CURRENCY:
            return Object.assign({}, state, { currency: state.currency + action.payload });
        case PlayerActionTypes.REMOVE_CURRENCY:
            return Object.assign({}, state, { currency: state.currency - action.payload });
        case PlayerActionTypes.ADD_UPGRADE:
            var newUpgrades = [...state.upgrades];

            newUpgrades[action.payload.upgradeId] = true;

            return Object.assign({}, state, { upgrades: newUpgrades });
        default:
            return state;
    }
}