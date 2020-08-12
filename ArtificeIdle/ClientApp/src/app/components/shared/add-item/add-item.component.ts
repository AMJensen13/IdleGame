import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Item } from 'src/app/models/Item';
import Items from '../../../../assets/Items.json';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddItemComponent implements OnInit {
  item: Item;
  quantity: number;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) 
  { 
    this.item = Items.find(x => x.id === data.productId);
    this.quantity = data.quantity;
  }

  ngOnInit(): void {
  }

}
