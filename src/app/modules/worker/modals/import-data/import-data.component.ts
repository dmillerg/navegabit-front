import { Component } from '@angular/core';
import { ButtonModel } from 'src/app/core/generic-button/model/button-model';
import { TableModel } from 'src/app/core/generic-table/model/table-model';
import { utils, read, writeFile } from 'xlsx';
import { WorkerService } from '../../services/worker.service';
import { take } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent {

  tableData!: TableModel;
  allChecked: boolean = false;
  selecteds: any[] = [];
  messageService: any[]=[];
  buttons: ButtonModel[] = [];

  constructor(private workerService: WorkerService, private ref: DynamicDialogRef) {
    this.generateButtons()
  }

  onSelect(event: any) {
    console.log(event)
    const files = event.files;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {
      // this.imageToShow = fileReader.result
      // this.fun(this.imageToShow)
    }
  }

  csvImport($event: any) {

    const files = $event.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event?.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.generateTable(rows);
          console.log(rows);

        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  generateTable(worker: any[], check: boolean = false) {
    this.tableData = {
      header: [{
        label: '',
        field: 'check',
        type: 'boolean',
        orderIcon: true,
        allSelected: check
      },
      {
        label: 'Name',
        field: 'name',
        type: 'text',
        filter: {
          type: "text",
          isDropdown: false,
        }
      }, {
        label: 'Company Name',
        field: 'company',
        type: 'text',
        filter: {
          type: "text",
          isDropdown: false,
        }
      }, {
        label: 'Priority',
        field: 'priority',
        type: 'text',
        filter: {
          type: "text",
          isDropdown: false,
        }
      }, {
        label: 'Country',
        field: 'country',
        type: 'text',
        filter: {
          type: "text",
          isDropdown: false,
        }
      }, {
        label: 'Phone Number',
        field: 'phone',
        type: 'text',
        filter: {
          type: "text",
          isDropdown: false,
        }
      }, {
        label: 'Email Address',
        field: 'email',
        type: 'text',
        filter: {
          type: "text",
          isDropdown: false,
        }
      }
      ],
      rowCond: (element?: any) => {
        return false;
      },
      cellCond: (element: any, header: string) => {
        return false;
      },
      cellAction: (element?: any, header?: string) => {
        if (header == 'todo' && element == 'check') {
          this.selecteds = worker
          this.allChecked = !this.allChecked
          this.generateTable(worker.map(e => {
            e.check = this.allChecked;
            return e;
          }), this.allChecked);
        }
        else if (this.selecteds.filter((e) => e.id == element.id).length == 0)
          this.selecteds.push(element);
        else {
          this.selecteds = this.selecteds.filter((e) => e.id != element.id)
        }
      },
      values: worker,
      noDataText: 'No representatives found workers with these search criteria',
    };
  }

  import() {
    if (this.selecteds.length > 0) {
      this.workerService.addWorkers(this.selecteds).pipe(take(1)).subscribe(response => {
        this.ref.close('ready');
      })
    } else this.messageService=[{severity: 'warn', summary: 'please select at least one'}]
  }

  generateButtons() {
    this.buttons = [
      {
        label: 'Import',
        icon: 'pi-plus',
        function: () => {
          this.import()
        }
      }
    ]
  }
}
