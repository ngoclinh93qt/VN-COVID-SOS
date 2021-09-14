import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMemberComponent } from './delete-member.component';

describe('DeleteMemberComponent', () => {
  let component: DeleteMemberComponent;
  let fixture: ComponentFixture<DeleteMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
