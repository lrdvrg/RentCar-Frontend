import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ConsultComponent } from './consult/consult.component';
import { GeneralEditResolverService } from '../shared/services/general-edit-resolver.service';


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
export class VehiclesTypeRoutingModule { }
