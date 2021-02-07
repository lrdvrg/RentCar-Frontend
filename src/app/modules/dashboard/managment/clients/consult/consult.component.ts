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
    definition: ['Id', 'name', 'document', 'noCard', 'creditLimit', 'personType', 'status', 'actions'],
    titles: ['Código', 'Nombre', 'Cédula', 'No. Tarjeta CR', 'Límite de Credito', 'Tipo Persona', 'Estado', 'Acciones']
  }


  data = []

  constructor(
    private crudActions: CrudActionsService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.loader.start();
    this.crudActions.getData('Clients')
      .subscribe(res => {
        for (const vt of res) {
          this.data.push({
            Id: vt.ClientId, name: vt.Name, document: vt.DocumentNo, noCard: vt.CreditCard, creditLimit: vt.CreditLimit, personType: vt.ClientType, status: vt.Status
          });
        }
        console.warn('GET DATA', this.data);
        this.loader.end();
      });
  }

}
