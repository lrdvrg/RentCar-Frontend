import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {

  columns = {
    definition: ['Id', 'name', 'document', 'labour', 'comission', 'date', 'status', 'actions'],
    titles: ['Código', 'Nombre', 'Cédula', 'Tanda Labor', 'Porciento Comision', 'Fecha de Ingreso', 'Estado', 'Acciones']
  }

  data = []

  constructor() { }

  ngOnInit(): void {
  }

}
