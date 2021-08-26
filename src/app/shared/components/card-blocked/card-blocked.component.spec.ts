import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBlockedComponent } from './card-blocked.component';

describe('CardBlockedComponent', () => {
  let component: CardBlockedComponent;
  let fixture: ComponentFixture<CardBlockedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardBlockedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
