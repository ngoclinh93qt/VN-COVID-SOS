import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransFormComponent } from './trans-form.component';

describe('TransFormComponent', () => {
  let component: TransFormComponent;
  let fixture: ComponentFixture<TransFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
