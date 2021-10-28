import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestForComponent } from './suggest-for.component';

describe('SuggestForComponent', () => {
  let component: SuggestForComponent;
  let fixture: ComponentFixture<SuggestForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestForComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
