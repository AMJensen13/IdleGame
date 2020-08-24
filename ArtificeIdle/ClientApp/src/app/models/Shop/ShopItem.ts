import { Cost } from "./Cost";

export class ShopItem {
    name: string;
    icon: string;
    isUpgrade: boolean;
    itemId?: number;
    upgradeId?: number;
    cost: Cost;
}