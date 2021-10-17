import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicCardDetailComponent } from './clinic-card-detail.component';

describe('ClinicCardDetailComponent', () => {
  let component: ClinicCardDetailComponent;
  let fixture: ComponentFixture<ClinicCardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicCardDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
