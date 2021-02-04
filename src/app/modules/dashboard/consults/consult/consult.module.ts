import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultRoutingModule } from './consult-routing.module';
import { ConsultComponent } from './consult.component';


@NgModule({
  declarations: [ConsultComponent],
  imports: [
    CommonModule,
    ConsultRoutingModule
  ]
})
export class ConsultModule { }
