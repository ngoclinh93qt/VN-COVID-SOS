import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCardComponent } from './request-card.component';

describe('RequestCardComponent', () => {
  let component: RequestCardComponent;
  let fixture: ComponentFixture<RequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
