import { SkillActions, SkillActionTypes } from "./actions";
import { PlayerSkill } from '../../models/Player';
import { SkillService } from 'src/app/services/skill/skill.service';

export let initialState: PlayerSkill[] = [];

export function skillsReducer(state=initialState, action: SkillActions) {
    let skillIndex = -1;
    switch(action.type) {
        case SkillActionTypes.ADD_XP:
            skillIndex = state.findIndex((x: PlayerSkill) => x.skillId === action.payload.skillId);

            if (skillIndex >= 0) {
                let newXP = state[skillIndex].experience + action.payload.experience;
                let level = state[skillIndex].level;
                let nextLevelXp = state[skillIndex].nextLevelXp;

                if (newXP >= state[skillIndex].nextLevelXp) {

                    while(newXP >= nextLevelXp){
                        level = level += 1;
                        nextLevelXp = SkillService.GetNextLevelXP(level);
                    }
                }

                const newState = [...state];
                newState.splice(skillIndex, 1, Object.assign({}, state[skillIndex], { experience: newXP, level: level, nextLevelXp: nextLevelXp }) as PlayerSkill);
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