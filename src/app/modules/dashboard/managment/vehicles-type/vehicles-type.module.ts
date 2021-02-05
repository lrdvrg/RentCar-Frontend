import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesTypeRoutingModule } from './vehicles-type-routing.module';
import { ConsultComponent } from './consult/consult.component';
import { CreateComponent } from './create/create.component';
import { ManagmentModule } from '../managment.module';


@NgModule({
  declarations: [ConsultComponent, CreateComponent],
  imports: [
    CommonModule,
    VehiclesTypeRoutingModule,
    ManagmentModule,
  ]
})
export class VehiclesTypeModule { }
