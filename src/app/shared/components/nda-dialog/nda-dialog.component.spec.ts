import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NdaDialogComponent } from './nda-dialog.component';

describe('NdaDialogComponent', () => {
  let component: NdaDialogComponent;
  let fixture: ComponentFixture<NdaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NdaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NdaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
