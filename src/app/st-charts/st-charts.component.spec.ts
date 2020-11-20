import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StChartsComponent } from './st-charts.component';

describe('StChartsComponent', () => {
  let component: StChartsComponent;
  let fixture: ComponentFixture<StChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
