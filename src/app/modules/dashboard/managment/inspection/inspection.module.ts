import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionRoutingModule } from './inspection-routing.module';
import { CreateComponent } from './create/create.component';
import { ConsultComponent } from './consult/consult.component';
import { ManagmentModule } from '../managment.module';


@NgModule({
  declarations: [CreateComponent, ConsultComponent],
  imports: [
    CommonModule,
    InspectionRoutingModule,
    ManagmentModule
  ]
})
export class InspectionModule { }
