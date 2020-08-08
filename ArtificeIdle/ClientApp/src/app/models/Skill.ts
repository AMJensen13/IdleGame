import { Item } from './Item';

export class Skill {
    id: number;
    name: string;
    actions: Array<SkillAction>;
}

export class SkillAction {
    id: number;
    name: string;
    product: Item;
    levelRequirement: number;
    baseExperience: number;
    baseInterval: number;
}

export enum SkillEnum {
    Woodcutting = 0
}