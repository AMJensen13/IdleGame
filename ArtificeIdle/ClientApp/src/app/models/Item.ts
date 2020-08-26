export class Item {
    id: number;
    name: string;
    value: number;
    icon: string;
    type: ItemTypes;
    intervalMod: number;
}

export class BankItem {
    itemId: number;
    quantity: number;

    constructor(itemId: number, quantity: number){
        this.itemId = itemId;
        this.quantity = quantity;
    }
}

export enum ItemTypes {
    Bait = "bait"
}