import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestContainerComponent } from './request-container.component';

describe('RequestContainerComponent', () => {
  let component: RequestContainerComponent;
  let fixture: ComponentFixture<RequestContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
