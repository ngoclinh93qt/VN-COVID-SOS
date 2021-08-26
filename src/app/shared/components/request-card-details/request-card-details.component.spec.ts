import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCardDetailsComponent } from './request-card-details.component';

describe('RequestCardDetailsComponent', () => {
  let component: RequestCardDetailsComponent;
  let fixture: ComponentFixture<RequestCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestCardDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
