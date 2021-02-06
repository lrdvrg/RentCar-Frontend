import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { ConsultComponent } from './consult/consult.component';
import { CreateComponent } from './create/create.component';
import { ManagmentModule } from '../managment.module';


@NgModule({
  declarations: [ConsultComponent, CreateComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ManagmentModule
  ]
})
export class EmployeesModule { }
