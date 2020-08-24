export class Cost {
    currency: number;
    items: ItemCost[];
}

export class ItemCost {
    itemId: number;
    quantity: number;
}