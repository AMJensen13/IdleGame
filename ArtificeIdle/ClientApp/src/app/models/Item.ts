export class Item {
    id: number;
    name: string;
    value: number;
}

export class BankItem {
    itemId: number;
    itemName: string;
    quantity: number;

    constructor(item: Item, quantity: number){
        this.itemId = item.id;
        this.itemName = item.name;
        this.quantity = quantity;
    }
}