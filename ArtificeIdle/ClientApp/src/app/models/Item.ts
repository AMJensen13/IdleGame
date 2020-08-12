export class Item {
    id: number;
    name: string;
    value: number;
    icon: string;
}

export class BankItem {
    itemId: number;
    itemName: string;
    quantity: number;
    icon: string;

    constructor(item: Item, quantity: number){
        this.itemId = item.id;
        this.itemName = item.name;
        this.quantity = quantity;
        this.icon = item.icon;
    }
}