import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalSidenavComponent } from './hospital-sidenav.component';

describe('HospitalSidenavComponent', () => {
  let component: HospitalSidenavComponent;
  let fixture: ComponentFixture<HospitalSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HospitalSidenavComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
