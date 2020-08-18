import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvocationComponent } from './invocation.component';

describe('InvocationComponent', () => {
  let component: InvocationComponent;
  let fixture: ComponentFixture<InvocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
