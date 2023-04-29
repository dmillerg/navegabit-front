import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerComponent } from './modules/worker/worker.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'workers' },
  { path: 'workers', component: WorkerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
