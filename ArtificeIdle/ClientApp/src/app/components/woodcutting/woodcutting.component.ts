import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import Skills from '../../../assets/Skills.json';
import { PlayerService } from '../../services/player/player.service';
import { Skill, SkillEnum } from '../../models/Skill';

@Component({
  selector: 'app-woodcutting',
  templateUrl: './woodcutting.component.html',
  styleUrls: ['./woodcutting.component.scss']
})
export class WoodcuttingComponent implements OnInit {
  @Output() toggleNav: EventEmitter<any> = new EventEmitter();
  pageTitle: string = "Woodcutting";
  playerService: PlayerService;
  woodSkill: Skill;

  constructor(playerService: PlayerService) 
  { 
    this.playerService = playerService;
    this.woodSkill = Skills[SkillEnum.Woodcutting];
  }

  ngOnInit(): void {
  }
}
