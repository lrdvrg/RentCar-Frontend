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
    definition: ['Id', 'vehicle', 'client', 'haveGrated', 'haveReplacementTyre', 'haveWindowCrack', 'haveJack', 'fuel', 'flTyreStatus', 'frTyreStatus', 'rlTyreStatus', 'rrTyreStatus', 'date', 'comentary', 'employee', 'status', 'actions'],
    titles: ['Código', 'Vehículo', 'Cliente', 'Ralladuras', 'Goma de Respuesta', 'Roturas de Cristal', 'Gato', 'Combustible', 'Estado (DI)',
      'Estado (DD)', 'Estado (TI)', 'Estado (TD)', 'Fecha', 'Comentario', 'Empleado', 'Estado', 'Acciones']
  }

  data = []
  employee = []
  vehicle = []
  client = []

  constructor(
    private crudActions: CrudActionsService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.loader.start();
    this.crudActions.getData('Employees')
      .subscribe(res => {
        for (const vt of res) {
          this.employee.push({
            value: vt.EmployeeId, viewValue: vt.Name
          });
        }

        this.crudActions.getData('Vehicles')
          .subscribe(res => {
            for (const vt of res) {
              this.vehicle.push({
                value: vt.VehicleId, viewValue: vt.Description
              });
            }

            this.crudActions.getData('Clients')
              .subscribe(res => {
                for (const vt of res) {
                  this.client.push({
                    value: vt.ClientId, viewValue: vt.Name
                  });
                }

                this.crudActions.getData('Inspections')
                  .subscribe(res => {
                    for (const vt of res) {
                      console.log(vt);
                      this.data.push({
                        Id: vt.InspectionId, vehicle: this.getVehicle(vt.VehicleId), client: this.getClient(vt.ClientId), haveGrated: vt.HaveGrated, haveReplacementTyre: vt.HaveReplacementTyre, haveWindowCrack: vt.HaveWindowCrack, haveJack: vt.HaveJack, fuel: vt.Fuel,
                        flTyreStatus: vt.FLTyreStatus, frTyreStatus: vt.FRTyreStatus, rlTyreStatus: vt.RLTyreStatus, rrTyreStatus: vt.RRTyreStatus, date: vt.Date,
                        comentary: vt.Comment, employee: this.getEmployee(vt.EmployeeId), status: vt.Status
                      });
                    }
                    console.log(this.data)
                  });
              });
          });
      });
  }

  getEmployee(value) {
    return this.employee.find(element => element.value === value);
  }

  getClient(value) {
    return this.client.find(element => element.value === value);
  }

  getVehicle(value) {
    return this.vehicle.find(element => element.value === value);
  }

}
