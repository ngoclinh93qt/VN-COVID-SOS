import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicContainerComponent } from './clinic-container.component';

describe('ClinicContainerComponent', () => {
  let component: ClinicContainerComponent;
  let fixture: ComponentFixture<ClinicContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
