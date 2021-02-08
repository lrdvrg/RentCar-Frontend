import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { CrudActionsService } from '../../shared/services/crud-actions.service';

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

  constructor(
    private crudActions: CrudActionsService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.loader.start();
    this.crudActions.getData('Employees')
      .subscribe(res => {
        for (const vt of res) {
          this.data.push({
            Id: vt.EmployeeId, name: vt.Name, document: vt.DocumentNo, labour: vt.BatchLabor, comission: vt.CommissionPercentage, date: vt.AdmissionDate, status: vt.Status
          });
        }
        console.warn('GET DATA', this.data);
      });
  }
}
