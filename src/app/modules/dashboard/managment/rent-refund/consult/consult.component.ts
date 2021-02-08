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
    definition: ['Id', 'employee', 'vehicle', 'client', 'rentDate', 'returnDate', 'amountPerDay', 'days', 'comentary', 'status', 'actions'],
    titles: ['Código', 'Empleado', 'Vehículo', 'Cliente', 'Fecha de Renta', 'Fecha de Devolución', 'Monto por Día', 'Cantidad de Días', 'Comentario', 'Estado', 'Acciones']
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

                this.crudActions.getData('RentAndRefunds')
                  .subscribe(res => {
                    for (const vt of res) {
                      console.log(vt);
                      this.data.push({
                        Id: vt.RentAndRefundId, employee: this.getEmployee(vt.EmployeeId), vehicle: this.getVehicle(vt.VehicleId), client: this.getClient(vt.ClientId), rentDate: vt.RentDate, returnDate: vt.RefundDate, amountPerDay: vt.AmountPerDay, days: vt.AmountOfDays, comentary: vt.Comment, status: vt.Status
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
