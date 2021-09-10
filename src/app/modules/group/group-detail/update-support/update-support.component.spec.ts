import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSupportComponent } from './update-support.component';

describe('UpdateSupportComponent', () => {
  let component: UpdateSupportComponent;
  let fixture: ComponentFixture<UpdateSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
