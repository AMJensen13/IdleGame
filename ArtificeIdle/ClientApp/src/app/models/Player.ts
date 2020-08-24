export class Player {
    id: number
    name: string;
    currency: number = 0;
    upgrades: boolean[];

    constructor(name: string){
        this.name = name;
        this.upgrades = new Array<boolean>();
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