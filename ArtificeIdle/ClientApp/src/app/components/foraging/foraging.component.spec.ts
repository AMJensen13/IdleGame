import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForagingComponent } from './foraging.component';

describe('FishingComponent', () => {
  let component: ForagingComponent;
  let fixture: ComponentFixture<ForagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
