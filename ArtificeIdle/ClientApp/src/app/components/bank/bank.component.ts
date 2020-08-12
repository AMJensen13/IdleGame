import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { PlayerService } from 'src/app/services/player/player.service';

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
