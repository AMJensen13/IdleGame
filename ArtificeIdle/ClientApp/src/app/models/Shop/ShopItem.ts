import { Cost } from "./Cost";
import { SkillEnum } from '../Skill';

export class ShopItem {
    name: string;
    icon: string;
    itemId?: number;
    cost: Cost;
}