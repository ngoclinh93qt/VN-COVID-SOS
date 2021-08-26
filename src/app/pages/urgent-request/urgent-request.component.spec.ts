import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentRequestComponent } from './urgent-request.component';

describe('UrgentRequestComponent', () => {
  let component: UrgentRequestComponent;
  let fixture: ComponentFixture<UrgentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UrgentRequestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrgentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
