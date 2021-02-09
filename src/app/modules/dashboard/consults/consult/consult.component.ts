import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {

  subItems = [
    {
      name: 'Tipos de Vehículos',
      iconString: 'assignment',
      expanded: false,
      subItems: [
        { name: 'Consultar', url: 'dashboard/managment/vehicles-type/consult' },
      ]
    },
    {
      name: 'Marcas',
      iconString: 'copyright',
      expanded: false,
      subItems: [
        { name: 'Consultar', url: 'dashboard/managment/brand/consult' },
      ]
    },
    {
      name: 'Modelos',
      iconString: 'dns',
      expanded: false,
      subItems: [
        { name: 'Consultar', url: 'dashboard/managment/models/consult' },
      ]
    },
    {
      name: 'Tipos de Combustibles',
      iconString: 'filter_alt',
      expanded: false,
      subItems: [
        { name: 'Consultar', url: 'dashboard/managment/fuel-types/consult' },
      ]
    },
    {
      name: 'Vehículos',
      iconString: 'commute',
      expanded: false,
      subItems: [
        { name: 'Consultar', url: 'dashboard/managment/vehicles/consult' },
      ]
    },
    {
      name: 'Clientes',
      iconString: 'supervisor_account',
      expanded: false,
      subItems: [
        { name: 'Consultar', url: 'dashboard/managment/clients/consult' },
      ]
    },
    {
      name: 'Empleados',
      iconString: 'accessibility',
      expanded: false,
      subItems: [
        { name: 'Consultar', url: 'dashboard/managment/employees/consult' },
      ]
    },
    {
      name: 'Inspección',
      iconString: 'build',
      expanded: false,
      subItems: [
        { name: 'Consultar', url: 'dashboard/managment/inspection/consult' },
      ]
    },
    {
      name: 'Renta y Devolución',
      iconString: 'departure_board',
      expanded: false,
      subItems: [
        { name: 'Consultar', url: 'dashboard/managment/rent-return/consult' },
      ]
    },
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateTo(url) {
    console.log(url);
    this.router.navigateByUrl(url);
  }

}
