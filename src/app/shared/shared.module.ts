import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './components/select/select.component';
import { NumberComponent } from './components/number/number.component';
import { DateComponent } from './components/date/date.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';



@NgModule({
  declarations: [DashboardLayoutComponent, InputComponent, SelectComponent, NumberComponent, DateComponent, AlertDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [DashboardLayoutComponent, InputComponent, SelectComponent, NumberComponent, DateComponent, AlertDialogComponent]
})
export class SharedModule { }
