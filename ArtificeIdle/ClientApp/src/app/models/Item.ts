export class Item {
    id: number;
    name: string;
    value: number;
    icon: string;
}

export class BankItem {
    itemId: number;
    quantity: number;

    constructor(item: Item, quantity: number){
        this.itemId = item.id;
        this.quantity = quantity;
    }
}