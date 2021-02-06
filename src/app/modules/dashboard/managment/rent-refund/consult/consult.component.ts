import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {
  columns = {
    definition: ['Id', 'employee', 'vehicle', 'client', 'rentDate', 'refundDate', 'description', 'amountPerDay', 'days', 'status', 'Comentario', 'actions'],
    titles: ['Código', 'Empleado', 'Vehículo', 'Cliente', 'Fecha de Renta', 'Fecha de Devolución', 'Monto por Día', 'Cantidad de Días', 'Comentario', 'Estado', 'Acciones']
  }

  data = []

  constructor() { }

  ngOnInit(): void {
  }

}
