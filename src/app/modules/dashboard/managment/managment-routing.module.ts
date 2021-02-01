import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'vehicles-type',
    loadChildren: () => import('./vehicles-type/vehicles-type.module').then((m) => m.VehiclesTypeModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagmentRoutingModule { }
