import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeRequestComponent } from './propose-request.component';

describe('ProposeRequestComponent', () => {
  let component: ProposeRequestComponent;
  let fixture: ComponentFixture<ProposeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposeRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
