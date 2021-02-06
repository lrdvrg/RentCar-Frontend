import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ConsultComponent } from './consult/consult.component';
import { CreateComponent } from './create/create.component';
import { ManagmentModule } from '../managment.module';


@NgModule({
  declarations: [ConsultComponent, CreateComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ManagmentModule
  ]
})
export class ClientsModule { }
