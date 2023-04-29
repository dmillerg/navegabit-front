import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { TableModel } from './model/table-model';
import { GenericButtonComponent } from '../generic-button/generic-button.component';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, GenericButtonComponent]
})
export class GenericTableComponent {
  @Input() tableModel!: TableModel;
  @Input() rows = 10;
  @Input() showFilter = false;
  @Input() header = '';
  @Input() paginationArray = [5, 10, 25, 50];
  @Input() advanceFilter = false;
  @Input() showActions = true;

  execute(callback: Function, value?: any, header?: any): void {
    value ? callback(value, header) : callback();
  }

}
