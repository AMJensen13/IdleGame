import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTitleComponent } from './skill-title.component';

describe('SkillTitleComponent', () => {
  let component: SkillTitleComponent;
  let fixture: ComponentFixture<SkillTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
