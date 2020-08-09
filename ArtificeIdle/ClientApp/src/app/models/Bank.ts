import { BankItem } from './Item'

export class Bank {
    items: Array<BankItem>;

    constructor() {
        this.items = new Array<BankItem>();
    }
}