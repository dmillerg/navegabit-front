import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmWorkerModalComponent } from './confirm-worker-modal.component';

describe('ConfirmWorkerModalComponent', () => {
  let component: ConfirmWorkerModalComponent;
  let fixture: ComponentFixture<ConfirmWorkerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmWorkerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmWorkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
