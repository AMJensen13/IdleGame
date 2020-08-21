import { PlayerActions, PlayerActionTypes } from "./actions";
import { Player } from '../../models/Player';

export let initialState: Player = new Player("");

export function playerReducer(state=initialState, action: PlayerActions) {
    switch(action.type) {
        case PlayerActionTypes.LOAD_PLAYER:
            return action.payload;
        default:
            return state;
    }
}