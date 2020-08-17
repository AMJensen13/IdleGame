import { Component, Input, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";
import { SkillService } from './services/skill/skill.service';
import { SkillTitleComponent } from './components/shared/skill-title/skill-title.component';
import { Subscription } from 'rxjs';
import tippy from 'tippy.js';

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
  currentPage: string = 'Bank';
  toggleNavSubscription: Subscription;

  constructor(private iconRegistry: MatIconRegistry, 
              private domSanitizer: DomSanitizer,
              private skillService: SkillService)
  {
    this.iconRegistry.addSvgIcon('bank', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/bank.svg'));
    this.iconRegistry.addSvgIcon('tree', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/tree.svg'));
    this.iconRegistry.addSvgIcon('logs', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/logs.svg'));
    this.iconRegistry.addSvgIcon('rock', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/rock.svg'));

  }

  ngOnInit(){
  }

  ngAfterViewInit() {
    this.toggleNavSubscription = this.titleBar.toggleNav.subscribe(() => {
        this.opened = !this.opened;
    });
  }

  ngOnDestroy(): void{
    this.skillService.StopAction();
    this.toggleNavSubscription.unsubscribe();
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
