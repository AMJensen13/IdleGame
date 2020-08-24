import { Cost } from "./Cost";
import { SkillEnum } from '../Skill';

export class ShopItem {
    name: string;
    icon: string;
    isUpgrade: boolean;
    levelRequirement?: number;
    skill?: SkillEnum;
    itemId?: number;
    upgradeId?: number;
    cost: Cost;
}