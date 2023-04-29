import { Component, Input } from '@angular/core';
import { ButtonModel, ButtonPosition } from './model/button-model';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule]
})
export class GenericButtonComponent {

  @Input() buttons: ButtonModel[] = [];
  @Input() position: ButtonPosition = 'justify-content-end';
  @Input() value?: any;

  constructor() {
  }

  ngAfterViewInit(): void {
    console.log(this.buttons)
  }

  emit(fun: Function){
    fun(this.value);
  }
}