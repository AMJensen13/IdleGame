export class Player {
    id: number
    name: string;
    currency: number = 0;

    constructor(name: string){
        this.name = name;
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

export class PlayerSkillsEntity {
    id: number;
    skills: PlayerSkill[];
}