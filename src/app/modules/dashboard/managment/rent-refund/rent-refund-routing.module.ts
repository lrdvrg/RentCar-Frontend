import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultComponent } from '../rent-refund/consult/consult.component';
import { CreateComponent } from '../rent-refund/create/create.component';


const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'consult',
    component: ConsultComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentRefundRoutingModule { }
