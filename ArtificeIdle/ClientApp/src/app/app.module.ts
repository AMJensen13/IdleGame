import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { PlayerService } from './services/player/player.service';
import { WoodcuttingComponent } from './components/woodcutting/woodcutting.component';
import { SkillTitleComponent } from './components/shared/skill-title/skill-title.component';
import { BankComponent } from './components/bank/bank.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AddItemComponent } from './components/shared/add-item/add-item.component';
import { SkillInfoComponent } from './components/shared/skill-info/skill-info.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MiningComponent } from './components/mining/mining.component';
import { BankItemComponent } from './components/bank/bank-item/bank-item.component';
import { ForagingComponent } from './components/foraging/foraging.component';
import { OrderModule } from 'ngx-order-pipe';
import { InvocationComponent } from './components/invocation/invocation.component';
import { FishingComponent } from './components/fishing/fishing.component';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { StoreModule } from '@ngrx/store';
import { bankReducer } from './store/bank/reducer';
import { skillsReducer } from './store/skills/reducer';
import { playerReducer } from './store/player/reducer';
import { ShopComponent, BuyItemDialog } from './components/shop/shop.component';
import { CostComponent } from './components/shop/cost/cost.component';
import { ErrorComponent } from './components/shared/error/error.component';
import { FormsModule } from '@angular/forms';

const dbConfig: DBConfig = {
    name: "ArtificeDB",
    version: 1,
    objectStoresMeta: [
        {
            store: 'player',
            storeConfig: {keyPath: 'id', autoIncrement: true},
            storeSchema: []
        },
        {
            store: 'bank',
            storeConfig: {keyPath: 'id', autoIncrement: true},
            storeSchema: []
        },
        {
            store: 'skills',
            storeConfig: {keyPath: 'id', autoIncrement: true},
            storeSchema: []
        },
    ]
};

@NgModule({
  declarations: [
    AppComponent,
    WoodcuttingComponent,
    SkillTitleComponent,
    BankComponent,
    AddItemComponent,
    SkillInfoComponent,
    MiningComponent,
    BankItemComponent,
    InvocationComponent,
    FishingComponent,
    ForagingComponent,
    ShopComponent,
    CostComponent,
    BuyItemDialog,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    OrderModule,
    MatMenuModule,
    MatFormFieldModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    StoreModule.forRoot({ bank: bankReducer, skills: skillsReducer, player: playerReducer })
  ],
  providers: 
  [ 
    PlayerService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 1000, panelClass: ['snackBarInfo'] } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
