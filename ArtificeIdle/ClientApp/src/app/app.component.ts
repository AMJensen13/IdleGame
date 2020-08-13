import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";
import { SkillService } from './services/skill/skill.service';

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
  currentPage: string = 'home';

  constructor(private iconRegistry: MatIconRegistry, 
              private domSanitizer: DomSanitizer,
              private skillService: SkillService)
  {
    this.iconRegistry.addSvgIcon('bank', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/bank.svg'));
    this.iconRegistry.addSvgIcon('tree', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/tree.svg'));
    this.iconRegistry.addSvgIcon('logs', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/logs.svg'));
    this.iconRegistry.addSvgIcon('rock', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/rock.svg'));

  }

  onActivate(componentReference) {
    componentReference.toggleNav.subscribe(() => {
       this.opened = !this.opened;
    })
  }

  ngOnDestroy(): void{
    this.skillService.StopAction();
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
}
