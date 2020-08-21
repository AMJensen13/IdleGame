import { BankItem } from './Item'

export class Bank {
    id: number;
    items: Array<BankItem>;

    constructor() {
        this.items = new Array<BankItem>();
    }
}