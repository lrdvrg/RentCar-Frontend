import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { FieldConfig } from 'src/app/shared/components/models/field-config';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AlertOptionsService } from '../../managment/shared/services/alert-options.service';
import { CrudActionsService } from '../../managment/shared/services/crud-actions.service';


export interface columns {
  definition: any[],
  titles: any[]
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  data: columns = {
    definition: ['Id', 'employee', 'vehicle', 'client', 'rentDate', 'returnDate', 'amountPerDay', 'days', 'comentary', 'status'],
    titles: ['Código', 'Empleado', 'Vehículo', 'Cliente', 'Fecha de Renta', 'Fecha de Devolución', 'Monto por Día', 'Cantidad de Días', 'Comentario', 'Estado']
  }

  status = status;

  tableData = [];
  filterData = [];

  employee = [];
  vehicle = [];
  client = [];
  vehicleType = [];
  fuelType = [];

  firstDate = '';
  lastDate = '';
  statusFilter = '';
  employeeFilter = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private ao: AlertOptionsService,
    private crudActions: CrudActionsService,
    private loader: LoaderService,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    console.warn(this.data);

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
                      this.tableData.push({
                        Id: vt.RentAndRefundId, employee: this.getEmployee(vt.EmployeeId), vehicle: this.getVehicle(vt.VehicleId), client: this.getClient(vt.ClientId), rentDate: vt.RentDate, returnDate: vt.RefundDate, amountPerDay: vt.AmountPerDay, days: vt.AmountOfDays, comentary: vt.Comment, status: vt.Status
                      });
                    }
                    this.filterData = this.tableData;
                    console.log(this.tableData)
                  });
              });
          });
      });
  }

  ngAfterViewInit() {
    this.loader.start();
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.tableData;
      this.cd.detectChanges();
      this.loader.end();
    }, 2000);

  }

  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  search() {
    this.filterData = this.tableData;

    if (this.firstDate !== '') {
      console.log('intenta filtrar: firstdate')
      this.filterData = this.tableData.filter((word: any) => {
        let date = new Date(word.rentDate);
        let selectedDate = new Date(this.firstDate);
        return date >= selectedDate
      });
    }
    if (this.lastDate !== '') {
      console.log('intenta filtrar: lastdate')
      this.filterData = this.tableData.filter((word: any) => {
        let date = new Date(word.rentDate);
        let selectedDate = new Date(this.lastDate);
        return date <= selectedDate
      });

    }
    if (this.statusFilter !== '') {
      console.log('intenta filtrar: estado')
      this.filterData = this.tableData.filter((word: any) => word.status == this.statusFilter);
    }
    if (this.employeeFilter !== '') {
      console.log('intenta filtrar: empleado', this.employeeFilter)
      this.filterData = this.tableData.filter((word: any) => word.employee.value == this.employeeFilter);
    }
    this.dataSource.data = this.filterData;

    // this.dataSource.data = this.filterData;

  }

  emptyFilter() {
    this.firstDate = '';
    this.lastDate = '';
    this.statusFilter = '';
    this.employeeFilter = '';
    this.dataSource.data = this.tableData;

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


export const status: FieldConfig = {
  label: 'Estado',
  name: 'status',
  options: [
    {
      value: 'Rentado',
      viewValue: 'Rentado',
    },
    {
      value: 'Retornado',
      viewValue: 'Retornado',
    }
  ],
}