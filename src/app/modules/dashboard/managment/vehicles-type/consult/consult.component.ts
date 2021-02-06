import { Component, OnInit } from '@angular/core';
import { VehiclesTypeService } from '../services/vehicles-type.service';

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

  data = []

  constructor(
    private vehiclesType: VehiclesTypeService
  ) { }

  ngOnInit(): void {
    this.vehiclesType.getData()
      .subscribe(res => {
        console.warn('GET DATA', res);
      });
  }

}
