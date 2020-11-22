import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StChartSettingComponent } from './st-chart-setting.component';

describe('StChartSettingComponent', () => {
  let component: StChartSettingComponent;
  let fixture: ComponentFixture<StChartSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StChartSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StChartSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
