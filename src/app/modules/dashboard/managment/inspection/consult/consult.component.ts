import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {

  columns = {
    definition: ['Id', 'vehicle', 'client', 'haveGrated', 'fuel', 'replacementTyre', 'jack', 'windowCrack', 'flTyre', 'frTyre', 'rlTyre', 'rrTyre', 'comentary', 'date', 'employee', 'status', 'actions'],
    titles: ['Código', 'Vehículo', 'Cliente', 'Ralladuras', 'Cantidad de Combustible', 'Goma de Respuesta', 'Roturas de Cristal', 'Estado (Delantera izquierda)',
      'Estado (Delantera derecha)', 'Estado (Trasera izquierda)', 'Estado (Trasera derecha)', 'Comentario', 'Fecha', 'Empleado', 'Estado', 'Acciones']
  }

  data = []

  constructor() { }

  ngOnInit(): void {
  }

}
