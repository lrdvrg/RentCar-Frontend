import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {

  columns = {
    definition: ['Id', 'name', 'document', 'noCard', 'creditLimit', 'personType', 'status', 'actions'],
    titles: ['Código', 'Nombre', 'Cédula', 'No. Tarjeta CR', 'Límite de Credito', 'Tipo Persona', 'Estado', 'Acciones']
  }

  data = []

  constructor() { }

  ngOnInit(): void {
  }

}
