
class Item {
    constructor(id, name, value){
        this.id = id;
        this.name = name;
        this.value = value;
    }
}

var items = [ new Item(1, "Logs", 12) ];

class BankItem {
    constructor(item, quantity){
        this.item = item
        this.quantity = quantity;
    }

    GetCurrentValue(){
        return this.item.value;
    }
}

class Bank {
    constructor(slotCount, items){
        this.slotCount = slotCount;
        this.items = items;
    }

    AddItem(id){
        var itemInBank = this.items.find(item => item.item.id === id);
        
        if (itemInBank) {
            itemInBank.quantity += 1;
        } else {
            var itemDef = items.find(item => item.id == id);
            var itemToAdd = new Item(itemDef.id, itemDef.name, itemDef.value);
            items.push(new BankItem(itemToAdd, 1));
        }
        this.UpdateBankValue();
    }

    GetBankValue(){
        var totalValue = 0;
        this.items.forEach(item => {
            totalValue += item.GetCurrentValue() * item.quantity;
        });

        return totalValue;
    }

    UpdateBankValue(){
        document.getElementById('currentBankValue').innerHTML = player.bank.GetBankValue();
    }
}

class Player {
    constructor(bank, gp){
        this.bank = bank;
        this.gp = gp;
    }

    UpdateGPValue(){
        document.getElementById('currentGP').innerHTML = this.gp;
    }
}

function MakeALog() {
    player.bank.AddItem(1);
}

function loadPage(){
    player.bank.UpdateBankValue()
    player.UpdateGPValue();
}

var log = new BankItem(items[0], 1);
var bank = new Bank(1, [ log ]);


var player = new Player(bank, 4000);

