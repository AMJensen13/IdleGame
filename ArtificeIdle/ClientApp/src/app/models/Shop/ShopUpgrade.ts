import { Cost } from './Cost';
import { WoodcuttingUpgrade } from '../Upgrades';
import { SkillEnum } from '../Skill';

export class ShopUpgrade {
    name: string;
    icon: string;
    upgrade: WoodcuttingUpgrade;
    previousUpgrade: WoodcuttingUpgrade;
    skill: SkillEnum;
    levelRequired?: number;
    cost: Cost;
}