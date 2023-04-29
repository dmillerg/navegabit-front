import { Component } from '@angular/core';
import { ButtonModel } from 'src/app/core/generic-button/model/button-model';
import { TableModel } from 'src/app/core/generic-table/model/table-model';
import { DialogService } from 'primeng/dynamicdialog'
import { NewWorkerModalComponent } from './modals/new-worker-modal/new-worker-modal.component';
import { WorkerService } from './services/worker.service';
import { pipe, take } from 'rxjs';
import { Worker } from './model/worker'
import { ConfirmWorkerModalComponent } from './modals/confirm-worker-modal/confirm-worker-modal.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ImportDataComponent } from './modals/import-data/import-data.component';
import { utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent {
  tableData!: TableModel;
  buttons: ButtonModel[] = [];
  buttons2: ButtonModel[] = [];
  exportypes: any[] = [
    { codigo: '0', name: 'excel' },
    { codigo: '1', name: 'pdf' },
    { codigo: '2', name: 'csv' },
  ];
  selected: any = { codigo: '0', name: 'excel' };
  selecteds: Worker[] = []
  allChecked: boolean = false;

  constructor(
    private dialogService: DialogService,
    private workerService: WorkerService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.generateTable([]);
    this.generateButtons(true);
    this.loadWorkers();
    this.buttons2 = [{ label: 'export', icon: 'pi-download', function: () => this.export() }]
  }

  loadWorkers() {
    this.workerService.getWorkers().pipe(take(1)).subscribe(response => {
      this.generateTable(response.map(e => { return { ...e, check: false } }));
    }, error => {

    })
  }

  newWorker() {
    let ref: any;
    const form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      company: ['', Validators.required],
      country: ['', Validators.required],
      priority: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
    const button = [
      {
        label: 'Add',
        icon: 'pi-user-plus',
        function: () => {
          console.log(form);

          this.workerService.addWorker((form.getRawValue() as Worker)).subscribe(response => {
            this.loadWorkers()
          })
          ref.close()
        }
      },
      {
        label: 'Close',
        icon: 'pi-times',
        function: () => {
          ref.close();
        }
      },
    ]
    ref = this.dialogService.open(NewWorkerModalComponent,
      {
        width: '60%',
        header: 'Add New',
        data: {
          buttons: button,
          form: form
        }
      })
  }

  updateWorker(e: Worker) {
    let ref: any;
    const form = this.fb.group({
      id: [e.id, Validators.required],
      name: [e.name, Validators.required],
      company: [e.company, Validators.required],
      country: [e.country, Validators.required],
      priority: [e.priority, Validators.required],
      email: [e.email, Validators.required],
      phone: [e.phone, Validators.required],
    });
    const button = [
      {
        label: 'Update',
        icon: 'pi-pencil',
        function: () => {
          ref.close();
          this.workerService.updateWorker(form.getRawValue() as Worker, Number(form.get('id')?.value)).pipe(take(1)).subscribe(response => {
            this.loadWorkers();
          })
        }
      },
      {
        label: 'Close',
        icon: 'pi-times',
        function: () => {
          ref.close();
        }
      },
    ]
    ref = this.dialogService.open(NewWorkerModalComponent,
      {
        width: '60%',
        header: 'Update',
        data: {
          buttons: button,
          form: form
        }
      })
  }

  deleteWorker(worker: Worker) {
    const dialog = this.dialogService.open(ConfirmWorkerModalComponent, {
      width: '60%',
      header: 'Confirmation',
      data: {
        text: `Are you sure you want delete this: ${worker.name}`
      }
    });
    dialog.onClose.subscribe(result => {
      if (result)
        this.workerService.deleteWorker(worker.id).pipe(take(1)).subscribe(response => {
          this.selecteds = [];
          this.loadWorkers();
        }, error => {

        });
    })
  }

  uploadFile() {
    const ref = this.dialogService.open(ImportDataComponent, {
      width: '70%',
      header: 'Import Leads'
    })
    ref.onClose.subscribe(response => {
      this.loadWorkers();
    })
  }

  generateButtons(disabled: boolean = false) {
    this.buttons = [
      {
        label: 'refresh',
        icon: 'pi-refresh',
        function: () => {
          this.loadWorkers();
        }
      },
      {
        label: 'Add new',
        icon: 'pi-plus',
        function: () => {
          this.newWorker();
        },
      },
      {
        label: 'Update',
        icon: 'pi-pencil',
        disabled: disabled,
        function: () => {
          this.updateWorker(this.selecteds[0]);
        }
      },
      {
        label: 'Delete',
        icon: 'pi-trash',
        disabled: disabled,
        function: () => {
          this.deleteWorker(this.selecteds[0]);
        },
      },
      {
        label: 'Import',
        icon: 'pi-upload',
        function: () => {
          this.uploadFile();
        },
      }
    ]
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
        this.generateButtons(this.selecteds.length > 1);
      },
      values: worker,
      noDataText: 'No representatives found workers with these search criteria',
    };
  }

  export() {
    switch (this.selected.name) {
      case 'pdf':
        this.exportPDF(this.selecteds);
        break;
      case 'excel':
        this.exportEXCEL(this.selecteds, 'xlsx');
        break;
      case 'csv':
        this.exportEXCEL(this.selecteds, 'csv');
        break;
    }
  }

  exportEXCEL(rows: any[], extension:string) {
    const headings = [['ID', 'NAME', 'COMPANY', 'PRIORITY', 'COUNTRY', 'PHONE', 'EMAIL']];
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, rows, {
      origin: 'A2',
      skipHeader: true,
    });
    utils.book_append_sheet(wb, ws, 'Workers');
    writeFile(wb, `worker.${extension}`)
  }

  exportPDF(rows: any[]) {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable({
          head: [{id:'ID', name:'NAME', company:'COMPANY', priority:'PRIORITY', country:'COUNTRY', phone:'PHONE', email:'EMAIL'}],
          body: rows
        });
        doc.save('worker.pdf');
      });
    });
  }

}
