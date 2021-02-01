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
      iconString: 'medical_services',
      expanded: false,
      subItems: [
        {
          name: 'Tipos de Vehiculos',
          iconString: 'library_add_check',
          expanded: false,
          subItems: [
            { name: 'Crear', url: 'dashboard/managment/vehicles-type/create' },
            { name: 'Consultar', url: 'dashboard/managment/vehicles-type/consult' },
          ]
        },

      ],
    },
    {
      name: 'Otro',
      iconString: 'checkroom'
    }
  ]

  constructor(public router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.menuItems);

  }

}

export interface MenuItems {
  name: string;
  url?: string;
  iconString?: string;
  subItems?: MenuItems[];
  expanded?: boolean;
}
