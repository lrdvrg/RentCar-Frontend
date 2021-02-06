import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './components/select/select.component';



@NgModule({
  declarations: [DashboardLayoutComponent, InputComponent, SelectComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [DashboardLayoutComponent, InputComponent, SelectComponent]
})
export class SharedModule { }
