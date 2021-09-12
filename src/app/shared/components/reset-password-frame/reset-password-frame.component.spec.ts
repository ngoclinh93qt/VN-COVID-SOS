import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordFrameComponent } from './reset-password-frame.component';

describe('ResetPasswordFrameComponent', () => {
  let component: ResetPasswordFrameComponent;
  let fixture: ComponentFixture<ResetPasswordFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
