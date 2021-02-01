import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ], exports: [DashboardLayoutComponent]
})
export class SharedModule { }
