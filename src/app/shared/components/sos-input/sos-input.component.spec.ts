import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SosInputComponent } from './sos-input.component';

describe('SosInputComponent', () => {
  let component: SosInputComponent;
  let fixture: ComponentFixture<SosInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SosInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SosInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
