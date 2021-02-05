import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {

  columns = {
    definition: ['Id', 'description', 'status', 'actions'],
    titles: ['Código', 'Descripción', 'Estado', 'Acciones']
  }

  data = [
    { Id: '1', description: 'Descripcion', status: 'Estado' },
    { Id: '2', description: 'Descripcion', status: 'Estado' },
    { Id: '3', description: 'Descripcion', status: 'Estado' },
    { Id: '4', description: 'Descripcion', status: 'Estado' },
    { Id: '5', description: 'Descripcion', status: 'Estado' },
    { Id: '1', description: 'Descripcion', status: 'Estado' },
    { Id: '2', description: 'Descripcion', status: 'Estado' },
    { Id: '3', description: 'Descripcion', status: 'Estado' },
    { Id: '4', description: 'Descripcion', status: 'Estado' },
    { Id: '5', description: 'Descripcion', status: 'Estado' },
    { Id: '1', description: 'Descripcion', status: 'Estado' },
    { Id: '2', description: 'Descripcion', status: 'Estado' },
    { Id: '3', description: 'Descripcion', status: 'Estado' },
    { Id: '4', description: 'Descripcion', status: 'Estado' },
    { Id: '5', description: 'Descripcion', status: 'Estado' },
    { Id: '1', description: 'Descripcion', status: 'Estado' },
    { Id: '2', description: 'Descripcion', status: 'Estado' },
    { Id: '3', description: 'Descripcion', status: 'Estado' },
    { Id: '4', description: 'Descripcion', status: 'Estado' },
    { Id: '5', description: 'Descripcion', status: 'Estado' },
    { Id: '1', description: 'Descripcion', status: 'Estado' },
    { Id: '2', description: 'Descripcion', status: 'Estado' },
    { Id: '3', description: 'Descripcion', status: 'Estado' },
    { Id: '4', description: 'Descripcion', status: 'Estado' },
    { Id: '5', description: 'Descripcion', status: 'Estado' },
    { Id: '1', description: 'Descripcion', status: 'Estado' },
    { Id: '2', description: 'Descripcion', status: 'Estado' },
    { Id: '3', description: 'Descripcion', status: 'Estado' },
    { Id: '4', description: 'Descripcion', status: 'Estado' },
    { Id: '5', description: 'Descripcion', status: 'Estado' },
    { Id: '1', description: 'Descripcion', status: 'Estado' },
    { Id: '2', description: 'Descripcion', status: 'Estado' },
    { Id: '3', description: 'Descripcion', status: 'Estado' },
    { Id: '4', description: 'Descripcion', status: 'Estado' },
    { Id: '5', description: 'Descripcion', status: 'Estado' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
