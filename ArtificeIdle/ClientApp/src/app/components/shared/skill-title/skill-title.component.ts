import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-skill-title',
  templateUrl: './skill-title.component.html',
  styleUrls: ['./skill-title.component.scss']
})
export class SkillTitleComponent implements OnInit {
  @Output() toggleNav: EventEmitter<any> = new EventEmitter();
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }
}
