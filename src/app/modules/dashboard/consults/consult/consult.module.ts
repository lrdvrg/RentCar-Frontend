import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultRoutingModule } from './consult-routing.module';
import { ConsultComponent } from './consult.component';
import { MaterialModule } from '../../../../material.module';


@NgModule({
  declarations: [ConsultComponent],
  imports: [
    CommonModule,
    ConsultRoutingModule,
    MaterialModule
  ]
})
export class ConsultModule { }
