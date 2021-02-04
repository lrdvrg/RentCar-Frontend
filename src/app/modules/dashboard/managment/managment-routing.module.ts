import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'vehicles-type',
    loadChildren: () => import('./vehicles-type/vehicles-type.module').then((m) => m.VehiclesTypeModule)
  },
  {
    path: 'brand',
    loadChildren: () => import('./brand/brand.module').then((m) => m.BrandModule)
  },
  {
    path: 'models',
    loadChildren: () => import('./models/models.module').then((m) => m.ModelsModule)
  },
  {
    path: 'fuel-types',
    loadChildren: () => import('./fuel-types/fuel-types.module').then((m) => m.FuelTypesModule)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./vehicles/vehicles.module').then((m) => m.VehiclesModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then((m) => m.ClientsModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then((m) => m.EmployeesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagmentRoutingModule { }
