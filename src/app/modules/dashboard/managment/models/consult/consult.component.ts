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
    definition: ['Id', 'brand', 'description', 'status', 'actions'],
    titles: ['Código', 'Marca', 'Descripción', 'Estado', 'Acciones']
  }

  data = []
  brands = []

  constructor(
    private crudActions: CrudActionsService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.loader.start();
    this.crudActions.getData('Brands')
      .subscribe(res => {
        for (const vt of res) {
          this.brands.push({
            value: vt.BrandId, viewValue: vt.Description
          });

        }
        this.crudActions.getData('Models')
          .subscribe(res => {
            for (const vt of res) {
              this.data.push({
                Id: vt.ModelId, brand: this.getBrand(vt.BrandId), description: vt.Description, status: vt.Status
              });
            }
            console.warn('GET DATA', this.data);
          });
      });
  }

  getBrand(value) {
    return this.brands.find(element => element.value === value);
  }


}
