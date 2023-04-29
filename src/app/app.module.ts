import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenericTableComponent } from './core/generic-table/generic-table.component';
import { GenericButtonComponent } from './core/generic-button/generic-button.component';
import { WorkerModule } from './modules/worker/worker.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    WorkerModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    GenericTableComponent,
    GenericButtonComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
