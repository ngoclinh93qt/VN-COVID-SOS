import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicMapComponent } from './clinic-map.component';

describe('ClinicMapComponent', () => {
  let component: ClinicMapComponent;
  let fixture: ComponentFixture<ClinicMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
