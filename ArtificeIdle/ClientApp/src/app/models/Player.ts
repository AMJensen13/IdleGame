import { Skill } from './Skill';
import Skills from '../../assets/Skills.json';
import { Bank } from './Bank';

export class Player {
    id: number
    name: string;
    skills: Array<PlayerSkill>;
    bank: Bank;

    constructor(name: string){
        this.name = name;
        this.bank = new Bank();
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