import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-skill-title',
  templateUrl: './skill-title.component.html',
  styleUrls: ['./skill-title.component.scss']
})
export class SkillTitleComponent implements OnInit {
  @Output() toggleNav: EventEmitter<any> = new EventEmitter();
  @Input() name: string;
  showNavToggle: boolean

  constructor(private mediaObserver: MediaObserver) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.showNavToggle = change.mqAlias === 'sm' || change.mqAlias === 'xs';
    });
  }
}
