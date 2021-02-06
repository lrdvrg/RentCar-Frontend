import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagmentRoutingModule } from './managment-routing.module';
import { ConsultSharedComponent } from './shared/components/consult-shared/consult-shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [ConsultSharedComponent],
  imports: [
    CommonModule,
    ManagmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ], exports: [
    ConsultSharedComponent,
    MaterialModule,
    SharedModule
  ]
})
export class ManagmentModule { }
