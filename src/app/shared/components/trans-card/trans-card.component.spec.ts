import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransCardComponent } from './trans-card.component';

describe('PostCardComponent', () => {
  let component: TransCardComponent;
  let fixture: ComponentFixture<TransCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
