import { Component, Input, ViewChild, isDevMode, enableProdMode } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";
import { SkillService } from './services/skill/skill.service';
import { SkillTitleComponent } from './components/shared/skill-title/skill-title.component';
import { Subscription } from 'rxjs';
import { PlayerService } from './services/player/player.service';
import { Store } from '@ngrx/store';
import { PlayerSkill, Player } from './models/Player';
import { SkillEnum, Skill } from './models/Skill';
import * as BankActions from './store/bank/actions';
import * as PlayerActions from './store/player/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() navColor = 'accent-light';
  @ViewChild(SkillTitleComponent) titleBar: SkillTitleComponent;
  title = 'ArtificeIdle';
  isHandset$ = false;
  opened = true;
  currentPage: string = 'Shop';
  toggleNavSubscription: Subscription;
  playerCurrencySubscription: Subscription;
  playerCurrency: number;
  skillLevelSubscription: Subscription;
  skillLevels: { [id: number]: number } = {};
  skillEnums = SkillEnum;
  isDevMode;

  // Dev Form
  idToAdd: number;
  quantityToAdd: number;
  currencyToAdd: number;

  constructor(private skillService: SkillService,
              private store: Store<any>,
              private playerService: PlayerService)
  {
    this.isDevMode = isDevMode();
  }

  AddItem() {
    this.store.dispatch(new BankActions.AddItem({itemId: +this.idToAdd, quantity: +this.quantityToAdd}));
  }

  AddCurrency() {
    this.store.dispatch(new PlayerActions.AddCurrency(+this.currencyToAdd));
  }

  ngOnInit(){
    this.playerCurrency = 0;
    this.skillLevelSubscription = this.store.select('skills').subscribe((skills : PlayerSkill[]) => {
        for(let skill of skills) {
            this.skillLevels[skill.skillId] = this.skillService.GetSkillLevel(skill.experience);
        }
    });

    this.playerCurrencySubscription = this.store.select('player').subscribe((player: Player) => {
        if (player.currency !== undefined) this.playerCurrency = player.currency;
    })
  }

  ngAfterViewInit() {
    this.toggleNavSubscription = this.titleBar.toggleNav.subscribe(() => {
        this.opened = !this.opened;
    });
  }

  ngOnDestroy(): void{
    this.skillService.StopAction();
    this.toggleNavSubscription.unsubscribe();
    this.skillLevelSubscription.unsubscribe();
    this.playerCurrencySubscription.unsubscribe();
  }

  SetCurrentPage(page: string){
    this.currentPage = page;
  }

  GetPageDisplay(page: string) {
      if (this.currentPage === page) {
          return '';
      } else {
          return 'none';
      }
  }

  GetCurrencyDisplay(){
    let value = this.playerCurrency;
    if (value <= 9999){
        return `${value}`;
    } else if(value >= 10000 && value <= 999999){
        let thousandValue = value / 1000;
        return `${this.truncateDecimals(thousandValue)}k`;
    } else {
      let milValue = value / 1000000;
      return `${this.truncateDecimals(milValue)}M`;
    }
  }

  private truncateDecimals(value: number) {
    return value.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0];
  }
}
