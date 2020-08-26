import { WoodcuttingUpgrade, FishingUpgrade } from './Upgrades';

export class Player {
    id: number
    name: string;
    currency: number = 0;
    woodCuttingUpgrades: Map<WoodcuttingUpgrade, boolean>;
    fishingUpgrades: Map<FishingUpgrade, boolean>;

    constructor(name: string){
        this.name = name;
        this.woodCuttingUpgrades = new Map<WoodcuttingUpgrade, boolean>();
        this.fishingUpgrades = new Map<FishingUpgrade, boolean>();
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