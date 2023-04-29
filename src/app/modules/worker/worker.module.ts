import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerComponent } from './worker.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { GenericTableComponent } from 'src/app/core/generic-table/generic-table.component';
import { GenericButtonComponent } from 'src/app/core/generic-button/generic-button.component';
import { DialogService } from 'primeng/dynamicdialog';
import { NewWorkerModalComponent } from './modals/new-worker-modal/new-worker-modal.component';
import { ConfirmWorkerModalComponent } from './modals/confirm-worker-modal/confirm-worker-modal.component';
import { ImportDataComponent } from './modals/import-data/import-data.component';



@NgModule({
  declarations: [
    WorkerComponent,
    NewWorkerModalComponent,
    ConfirmWorkerModalComponent,
    ImportDataComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    GenericTableComponent,
    GenericButtonComponent,
  ],
  providers: [DialogService]
})
export class WorkerModule { }
