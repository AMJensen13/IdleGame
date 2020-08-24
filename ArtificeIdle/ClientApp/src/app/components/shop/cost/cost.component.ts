import { Component, OnInit, Input } from '@angular/core';
import { Cost } from 'src/app/models/Shop/Cost';
import { ItemService } from 'src/app/services/item/item.service';
import tippy from 'tippy.js';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss']
})
export class CostComponent implements OnInit {
  @Input('cost') cost: Cost;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let self = this;
    tippy('[itemTippy]', 
    {
        content(reference) {
            const id = +reference.getAttribute('itemTippy');
            return self.itemService.GetItemName(id);
        },
        arrow: false,
        placement: 'bottom',
        theme: 'light',
        duration: 0
    });
  }

  GetItemIcon(itemId: number){
    return this.itemService.GetItemIcon(itemId);
  }
}


