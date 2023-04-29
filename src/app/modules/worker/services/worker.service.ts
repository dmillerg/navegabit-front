import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { Worker } from './../model/worker';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient) { }

  getWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(enviroment.workerURL);
  }

  addWorker(worker: Worker) {
    return this.http.post<any>(enviroment.workerURL, worker);
  }

  addWorkers(worker: Worker[]) {
    const data = {bulk: worker}
    console.log(data);
    
    return this.http.post<any>(`${enviroment.workerURL}/bulk`, data);
  }

  updateWorker(worker: Worker, id: number) {
    return this.http.patch<any>(`${enviroment.workerURL}/${id}`, worker);
  }

  deleteWorker(id: number) {
    return this.http.delete(`${enviroment.workerURL}/${id}`)
  }

}
