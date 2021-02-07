import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultComponent } from '../clients/consult/consult.component';
import { CreateComponent } from '../clients/create/create.component';
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
export class ClientsRoutingModule { }
