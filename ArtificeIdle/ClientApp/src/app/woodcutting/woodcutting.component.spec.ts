import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodcuttingComponent } from './woodcutting.component';

describe('WoodcuttingComponent', () => {
  let component: WoodcuttingComponent;
  let fixture: ComponentFixture<WoodcuttingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoodcuttingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoodcuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
