import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordOtpFrameComponent } from './reset-password-otp-frame.component';

describe('ResetPasswordOtpFrameComponent', () => {
  let component: ResetPasswordOtpFrameComponent;
  let fixture: ComponentFixture<ResetPasswordOtpFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordOtpFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordOtpFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
