import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('200ms ease-in-out')),
      transition('default => rotated', animate('200ms ease-in'))
    ]),
    trigger('menuItemExpandState', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DashboardLayoutComponent implements OnInit {
  opened = true;

  // Elementos del menu.
  menuItems: MenuItems[] = [
    {
      name: 'Gestión',
      iconString: 'article',
      expanded: false,
      subItems: [
        {
          name: 'Tipos de Vehículos',
          iconString: 'assignment',
          expanded: false,
          subItems: [
            { name: 'Crear', url: 'dashboard/managment/vehicles-type/create' },
            { name: 'Consultar', url: 'dashboard/managment/vehicles-type/consult' },
          ]
        },
        {
          name: 'Marcas',
          iconString: 'copyright',
          expanded: false,
          subItems: [
            { name: 'Crear', url: 'dashboard/managment/brand/create' },
            { name: 'Consultar', url: 'dashboard/managment/brand/consult' },
          ]
        },
        {
          name: 'Modelos',
          iconString: 'dns',
          expanded: false,
          subItems: [
            { name: 'Crear', url: 'dashboard/managment/models/create' },
            { name: 'Consultar', url: 'dashboard/managment/models/consult' },
          ]
        },
        {
          name: 'Tipos de Combustibles',
          iconString: 'filter_alt',
          expanded: false,
          subItems: [
            { name: 'Crear', url: 'dashboard/managment/fuel-types/create' },
            { name: 'Consultar', url: 'dashboard/managment/fuel-types/consult' },
          ]
        },
        {
          name: 'Vehículos',
          iconString: 'commute',
          expanded: false,
          subItems: [
            { name: 'Crear', url: 'dashboard/managment/vehicles/create' },
            { name: 'Consultar', url: 'dashboard/managment/vehicles/consult' },
          ]
        },
        {
          name: 'Clientes',
          iconString: 'supervisor_account',
          expanded: false,
          subItems: [
            { name: 'Crear', url: 'dashboard/managment/clients/create' },
            { name: 'Consultar', url: 'dashboard/managment/clients/consult' },
          ]
        },
        {
          name: 'Empleados',
          iconString: 'accessibility',
          expanded: false,
          subItems: [
            { name: 'Crear', url: 'dashboard/managment/employees/create' },
            { name: 'Consultar', url: 'dashboard/managment/employees/consult' },
          ]
        },
        {
          name: 'Inspección',
          iconString: 'build',
          expanded: false,
          subItems: [
            { name: 'Crear', url: 'dashboard/managment/inspection/create' },
            { name: 'Consultar', url: 'dashboard/managment/inspection/consult' },
          ]
        },
        {
          name: 'Renta y Devolución',
          iconString: 'departure_board',
          expanded: false,
          subItems: [
            { name: 'Crear', url: 'dashboard/managment/rent-return/create' },
            { name: 'Consultar', url: 'dashboard/managment/rent-return/consult' },
          ]
        },
      ],
    },
    {
      name: 'Consultas',
      iconString: 'inventory',
      expanded: false,
      subItems: [
        {
          name: 'Consulta',
          iconString: 'view_agenda',
          url: 'dashboard/consults/consult',
          expanded: false,
          subItems: []
        },
        {
          name: 'Reporte',
          iconString: 'mark_chat_read',
          url: 'dashboard/consults/report',
          expanded: false,
          subItems: []
        },
      ],
    }
  ]

  constructor(public router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.menuItems);

  }

  logoff() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('auth/login');
  }

}

export interface MenuItems {
  name: string;
  url?: string;
  iconString?: string;
  subItems?: MenuItems[];
  expanded?: boolean;
}
