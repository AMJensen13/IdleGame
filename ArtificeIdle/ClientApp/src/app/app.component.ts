import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";
import { PlayerService } from './services/player/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() navColor = 'accent-light';
  title = 'ArtificeIdle';
  isHandset$ = false;
  opened = true;

  constructor(private iconRegistry: MatIconRegistry, 
              private domSanitizer: DomSanitizer,
              private playerService: PlayerService)
  {
    this.iconRegistry.addSvgIcon('bank', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/bank.svg'));
  }

  onActivate(componentReference) {
    componentReference.toggleNav.subscribe(() => {
       this.opened = !this.opened;
    })
 }
}
