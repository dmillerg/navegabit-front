import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModel } from 'src/app/core/generic-button/model/button-model';

@Component({
  selector: 'app-confirm-worker-modal',
  templateUrl: './confirm-worker-modal.component.html',
  styleUrls: ['./confirm-worker-modal.component.scss']
})
export class ConfirmWorkerModalComponent {
  buttons: ButtonModel[] = [];
  text: string = '';

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    this.generateButtons();
    this.text = config.data.text;
  }

  generateButtons() {
    this.buttons = [
      {
        label: 'Accept',
        icon: 'pi-check',
        function: () => {
          this.ref.close('accept');
        }
      },
      {
        label: 'Cancel',
        icon: 'pi-times',
        function: () => {
          this.ref.close();
        }
      },
    ]
  }
}
