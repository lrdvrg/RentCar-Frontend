import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRefundRoutingModule } from './rent-refund-routing.module';
import { ConsultComponent } from './consult/consult.component';
import { CreateComponent } from './create/create.component';
import { ManagmentModule } from '../managment.module';


@NgModule({
  declarations: [ConsultComponent, CreateComponent],
  imports: [
    CommonModule,
    RentRefundRoutingModule,
    ManagmentModule
  ]
})
export class RentRefundModule { }
