import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from 'src/app/shared/layout/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './dashboard.component';
import { ManagmentModule } from './managment/managment.module';


const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'managment',
        loadChildren: () => import('./managment/managment.module').then((m) => m.ManagmentModule)
      },
      {
        path: 'consults',
        loadChildren: () => import('./consults/consults.module').then((m) => m.ConsultsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
