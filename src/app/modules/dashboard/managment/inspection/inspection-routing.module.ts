import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultComponent } from '../inspection/consult/consult.component';
import { CreateComponent } from '../inspection/create/create.component';


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
export class InspectionRoutingModule { }
