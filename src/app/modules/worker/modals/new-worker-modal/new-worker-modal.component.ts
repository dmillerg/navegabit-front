import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModel } from 'src/app/core/generic-button/model/button-model';

@Component({
  selector: 'app-new-worker-modal',
  templateUrl: './new-worker-modal.component.html',
  styleUrls: ['./new-worker-modal.component.scss']
})
export class NewWorkerModalComponent {

  form: any;
  buttons: ButtonModel[]=[];
  prioritys: any[]=[
    {code: 0, name: 'low'},
    {code: 1, name: 'medium'},
    {code: 2, name: 'high'},
  ]

  constructor(private fb: FormBuilder, private config: DynamicDialogConfig) {
    this.form = config.data.form;
    this.buttons = config.data.buttons;
  }
}
