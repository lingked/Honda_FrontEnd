import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortTermItemComponent } from './short-term-item.component';

describe('ShortTermItemComponent', () => {
  let component: ShortTermItemComponent;
  let fixture: ComponentFixture<ShortTermItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortTermItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortTermItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
