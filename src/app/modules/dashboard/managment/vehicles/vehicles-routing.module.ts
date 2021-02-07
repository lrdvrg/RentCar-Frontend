import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralEditResolverService } from '../shared/services/general-edit-resolver.service';
import { ConsultComponent } from '../vehicles/consult/consult.component';
import { CreateComponent } from '../vehicles/create/create.component';


const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'edit',
    component: CreateComponent,
    resolve: {
      data: GeneralEditResolverService
    }
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
export class VehiclesRoutingModule { }
