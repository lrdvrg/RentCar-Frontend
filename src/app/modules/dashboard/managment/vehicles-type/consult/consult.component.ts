import { Component, OnInit } from '@angular/core';
import { VehiclesTypeService } from '../services/vehicles-type.service';
import { LoaderService } from '../../../../../shared/services/loader.service';

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
    private vehiclesType: VehiclesTypeService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.loader.start();
    this.vehiclesType.getData()
      .subscribe(res => {
        console.warn('GET DATA', res);
        for (const vt of res) {
          this.data.push({
            Id: vt.VehicleTypeId, description: vt.Description, status: vt.Status
          });
        }
        this.loader.end();
      });
  }

}
