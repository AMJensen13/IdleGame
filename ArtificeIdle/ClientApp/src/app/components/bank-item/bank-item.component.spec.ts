import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankItemComponent } from './bank-item.component';

describe('BankItemComponent', () => {
  let component: BankItemComponent;
  let fixture: ComponentFixture<BankItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
