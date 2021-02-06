import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {

  columns = {
    definition: ['Id', 'description', 'noChasis', 'noMotor', 'noPlate', 'vehicleType', 'brand', 'model', 'fuelType', 'status', 'actions'],
    titles: ['Código', 'Descripción', 'No. Chasis', 'No. Motor', 'No. Placa', 'Tipo de Vehiculo', 'Marca', 'Modelo', 'Tipo de Combustible', 'Estado', 'Acciones']
  }

  data = []

  constructor() { }

  ngOnInit(): void {
  }

}
