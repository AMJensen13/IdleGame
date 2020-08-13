import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { PlayerService } from 'src/app/services/player/player.service';
import { Observable, of, Subscription } from 'rxjs';
import { BankItem } from 'src/app/models/Item';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankComponent implements OnInit {
  @Output() toggleNav = new EventEmitter<any>();
  pageTitle: string = "Bank";
  playerService: PlayerService;
  maxColCount: number = 6;
  bankItems$: Observable<BankItem[]>;

  constructor(playerService: PlayerService) 
  { 
    this.playerService = playerService;
  }

  ngOnInit(): void {
    this.bankItems$ = of(this.playerService.playerSave.bank.items);
  }

  trackBy(index: number, item: any) {
      return index;
  }

}
