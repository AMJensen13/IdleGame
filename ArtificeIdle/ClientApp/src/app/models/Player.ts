import { Skill } from './Skill';
import Skills from '../../assets/Skills.json';

export class Player {
    name: string;
    skills: Array<PlayerSkill>;

    constructor(name: string){
        this.name = name;
        this.skills = new Array<PlayerSkill>();

        Skills.forEach((skill: Skill) => {
            this.skills.push(new PlayerSkill(skill.id));
        });
    }
}

export class PlayerSkill {
    experience: number;
    skillId: number;

    constructor(skillId: number){
        this.experience = 0;
        this.skillId = skillId;
    }
}