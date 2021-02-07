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
    definition: ['Id', 'description', 'noChasis', 'noMotor', 'noPlate', 'vehicleType', 'brand', 'model', 'fuelType', 'status', 'actions'],
    titles: ['Código', 'Descripción', 'No. Chasis', 'No. Motor', 'No. Placa', 'Tipo de Vehiculo', 'Marca', 'Modelo', 'Tipo de Combustible', 'Estado', 'Acciones']
  }

  data = []

  models = [];
  vehicleTypes = [];
  fuelTypes = [];
  brands = [];


  constructor(
    private crudActions: CrudActionsService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {

    this.loader.start();
    this.crudActions.getData('VehicleTypes')
      .subscribe(res => {
        for (const vt of res) {
          this.vehicleTypes.push({
            value: vt.VehicleTypeId, viewValue: vt.Description
          });
        }
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
                  this.models.push({
                    value: vt.ModelId, viewValue: vt.Description
                  });
                }
                this.crudActions.getData('FuelTypes')
                  .subscribe(res => {
                    for (const vt of res) {
                      this.fuelTypes.push({
                        value: vt.FuelTypeId, viewValue: vt.Description
                      });
                    }
                  });
                this.crudActions.getData('Vehicles')
                  .subscribe(res => {
                    for (const vt of res) {
                      console.log(vt);

                      this.data.push({
                        Id: vt.VehicleId, noChasis: vt.ChasisNo, noMotor: vt.MotorNo, noPlate: vt.PlateNo, vehicleType: this.getvehicleType(vt.VehicleTypeId), brand: this.getBrand(vt.BrandId), model: this.getModel(vt.ModelId), fuelType: this.getFuelType(vt.FuelTypeId), description: vt.Description, status: vt.Status
                      });
                    }
                    console.warn('GET DATA', this.data);
                  });
              });
          });
      });
  }

  getBrand(value) {
    return this.brands.find(element => element.value === value);
  }

  getModel(value) {
    return this.models.find(element => element.value === value);
  }

  getFuelType(value) {
    return this.fuelTypes.find(element => element.value === value);
  }

  getvehicleType(value) {
    return this.vehicleTypes.find(element => element.value === value);
  }

}
