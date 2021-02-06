import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { ConsultComponent } from './consult/consult.component';
import { CreateComponent } from './create/create.component';
import { ManagmentModule } from '../managment.module';


@NgModule({
  declarations: [ConsultComponent, CreateComponent],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    ManagmentModule
  ]
})
export class VehiclesModule { }
