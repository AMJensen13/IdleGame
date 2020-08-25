import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatheringSkillComponent } from './gathering-skill.component';

describe('GatheringSkillComponent', () => {
  let component: GatheringSkillComponent;
  let fixture: ComponentFixture<GatheringSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatheringSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatheringSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
