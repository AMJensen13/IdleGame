import { SkillActions, SkillActionTypes } from "./actions";
import { PlayerSkill } from '../../models/Player';

export let initialState: PlayerSkill[] = [];

export function skillsReducer(state=initialState, action: SkillActions) {
    switch(action.type) {
        case SkillActionTypes.ADD_XP:
            let skillIndex = state.findIndex((x: PlayerSkill) => x.skillId === action.payload.skillId);

            if (skillIndex >= 0) {
                let newXP = state[skillIndex].experience + action.payload.experience;
                const newState = [...state];
                newState.splice(skillIndex, 1, { skillId: state[skillIndex].skillId, experience: newXP });
                return newState;
            } else {
                return [...state, action.payload];
            }
        case SkillActionTypes.LOAD_SKILLS:
            return [...state, ...action.payload];
        default:
            return state;
    }
}