import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../shared/services/loader.service';
import { CrudActionsService } from '../../shared/services/crud-actions.service';
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
    private crudActions: CrudActionsService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.loader.start();
    this.crudActions.getData('VehicleTypes')
      .subscribe(res => {
        for (const vt of res) {
          this.data.push({
            Id: vt.VehicleTypeId, description: vt.Description, status: vt.Status
          });
        }
        console.warn('GET DATA', this.data);
      });
  }
}
