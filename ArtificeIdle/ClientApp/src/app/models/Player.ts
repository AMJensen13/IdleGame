export class Player {
    id: number
    name: string;

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

export class PlayerSkills {
    id: number;
    skills: PlayerSkill[];
}