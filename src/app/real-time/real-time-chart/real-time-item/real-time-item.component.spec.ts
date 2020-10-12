import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeItemComponent } from './real-time-item.component';

describe('RealTimeItemComponent', () => {
  let component: RealTimeItemComponent;
  let fixture: ComponentFixture<RealTimeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
