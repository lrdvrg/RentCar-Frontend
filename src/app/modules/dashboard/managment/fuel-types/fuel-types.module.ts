import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuelTypesRoutingModule } from './fuel-types-routing.module';
import { ConsultComponent } from './consult/consult.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [ConsultComponent, CreateComponent],
  imports: [
    CommonModule,
    FuelTypesRoutingModule
  ]
})
export class FuelTypesModule { }
