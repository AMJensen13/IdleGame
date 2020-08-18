import { Item } from './Item';

export class Skill {
    id: number;
    name: string;
    actions: Array<SkillAction>;
}

export class SkillAction {
    id: number;
    name: string;
    productId: number;
    levelRequirement: number;
    baseExperience: number;
    baseInterval: number;
    icon: string;
}

export enum SkillEnum {
    Woodcutting = 0,
    Mining = 1,
    Invocation = 2
}