import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/models/Skill';

@Component({
  selector: 'app-skill-info',
  templateUrl: './skill-info.component.html',
  styleUrls: ['./skill-info.component.scss']
})
export class SkillInfoComponent implements OnInit {
  @Input() skill: Skill;
  constructor() { }

  ngOnInit(): void {
  }

}
