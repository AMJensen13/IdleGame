import { PlayerActions, PlayerActionTypes } from "./actions";
import { Player } from '../../models/Player';
import { SkillEnum } from 'src/app/models/Skill';

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
            switch(action.payload.skill) {
                case SkillEnum.Woodcutting:
                    let upgrades = new Map(state.woodCuttingUpgrades);
                    upgrades.set(action.payload.upgrade, true);
                    return Object.assign({}, state, { woodCuttingUpgrades: upgrades });
                default:
                    return state;
            }
        default:
            return state;
    }
}