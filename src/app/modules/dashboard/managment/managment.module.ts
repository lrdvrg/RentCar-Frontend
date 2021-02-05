import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagmentRoutingModule } from './managment-routing.module';
import { ConsultSharedComponent } from './shared/components/consult-shared/consult-shared.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';


@NgModule({
  declarations: [ConsultSharedComponent],
  imports: [
    CommonModule,
    ManagmentRoutingModule,
    FormsModule,
    MaterialModule
  ], exports: [
    ConsultSharedComponent
  ]
})
export class ManagmentModule { }
