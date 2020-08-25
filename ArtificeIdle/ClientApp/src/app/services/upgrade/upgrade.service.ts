import { Injectable } from '@angular/core';
import { WoodcuttingUpgrade } from 'src/app/models/Upgrades';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  constructor() { }

  GetUpgradeDefinition(upgradeName: string) {
    return upgradeDefinitions.find(x => x.upgradeName === upgradeName);
  }
}


const upgradeDefinitions = 
[
  {
    upgradeName: WoodcuttingUpgrade.IronAxe,
    intervalReduction: .9
  },
  {
    upgradeName: WoodcuttingUpgrade.SteelAxe,
    intervalReduction: .8
  }
]