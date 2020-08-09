import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { PlayerService } from 'src/app/services/player/player.service';
import { MatGridList } from '@angular/material/grid-list';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  @Output() toggleNav = new EventEmitter<any>();
  pageTitle: string = "Bank";
  playerService: PlayerService;
  maxColCount: number = 6;
  constructor(playerService: PlayerService) 
  { 
    this.playerService = playerService;
  }

  ngOnInit(): void {
    this.playerService.addItemToBank(0, 1);
    this.playerService.addItemToBank(1, 1);
    this.playerService.addItemToBank(2, 1);
    this.playerService.addItemToBank(3, 1);
    this.playerService.addItemToBank(4, 1);
  }

  GetColCount(){
    if (this.GetBankItems().length < this.maxColCount){
      return this.GetBankItems().length;
    }

    return this.maxColCount;
  }

  GetBankItems(){
    return this.playerService.getBankItems();
  }

}
