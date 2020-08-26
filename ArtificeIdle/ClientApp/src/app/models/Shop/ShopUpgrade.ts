import { Cost } from './Cost';
import { WoodcuttingUpgrade, FishingUpgrade } from '../Upgrades';
import { SkillEnum } from '../Skill';

export class ShopUpgrade {
    name: string;
    icon: string;
    upgrade: WoodcuttingUpgrade | FishingUpgrade;
    previousUpgrade: WoodcuttingUpgrade | FishingUpgrade;
    skill: SkillEnum;
    levelRequired?: number;
    cost: Cost;
}