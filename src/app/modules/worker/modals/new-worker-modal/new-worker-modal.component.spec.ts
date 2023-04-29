import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkerModalComponent } from './new-worker-modal.component';

describe('NewWorkerModalComponent', () => {
  let component: NewWorkerModalComponent;
  let fixture: ComponentFixture<NewWorkerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWorkerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWorkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
