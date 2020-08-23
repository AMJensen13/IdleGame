import { PlayerActions, PlayerActionTypes } from "./actions";
import { Player } from '../../models/Player';

export let initialState: Player = new Player("");

export function playerReducer(state=initialState, action: PlayerActions) {
    switch(action.type) {
        case PlayerActionTypes.LOAD_PLAYER:
            return action.payload;
        case PlayerActionTypes.ADD_CURRENCY:
            return {name: state.name, id: state.id, currency: state.currency + action.payload} as Player;
        default:
            return state;
    }
}