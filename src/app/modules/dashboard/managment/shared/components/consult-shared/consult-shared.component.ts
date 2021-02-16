import { Component, Input, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { AlertOptionsService } from '../../services/alert-options.service';
import { CrudActionsService } from '../../services/crud-actions.service';
import { LoaderService } from '../../../../../../shared/services/loader.service';

@Component({
  selector: 'app-consult-shared',
  templateUrl: './consult-shared.component.html',
  styleUrls: ['./consult-shared.component.scss']
})
export class ConsultSharedComponent implements OnInit {

  father = '';

  @Input() title: string;
  @Input() name?: string;
  @Input() apiName?: string;
  @Input() data: any;
  @Input() incomingDataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private ao: AlertOptionsService,
    private crudActions: CrudActionsService,
    private loader: LoaderService,
    private cd: ChangeDetectorRef
  ) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        const elements = event.url.split(';');

        this.father = elements[0];
        console.log(this.father);
      }
    });
  }

  ngOnInit(): void {
    console.warn(this.data, this.incomingDataSource);
  }

  ngAfterViewInit() {
    this.loader.start();
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.incomingDataSource;
      this.dataSource.filterPredicate = (data: any, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) != -1;
      }
      this.cd.detectChanges();
      this.loader.end();
    }, 2000);

  }

  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createItem() {
    this.router.navigate([`../../${this.name}/create`], { relativeTo: this.route });
  }

  editItem(id) {
    this.router.navigate([`../../${this.name}/edit`, { id: id, name: this.apiName }], { relativeTo: this.route });
  }

  inactiveItem(element) {
    switch (this.father) {
      case '/dashboard/managment/vehicles-type/consult':
        const dialog = this.dialog.open(AlertDialogComponent, {
          disableClose: true,
          data: element.status === 'Activo' ? this.ao.deleteDialogWarningConfig('este tipo de vehiculo') : this.ao.activateDialogWarningConfig('este tipo de vehiculo')
        });
        dialog.afterClosed().subscribe(res => {
          if (res) {
            const body = {
              VehicleTypeId: element.Id,
              Description: element.description,
              Status: element.status === 'Activo' ? 'Inactivo' : 'Activo',
            };
            this.crudActions.putData('VehicleTypes', element.Id, body)
              .subscribe(res => {
                window.location.reload();
              }, err => {
                console.log(err);
              });
          }
        })
        break;

      case '/dashboard/managment/brand/consult':
        const dialog2 = this.dialog.open(AlertDialogComponent, {
          disableClose: true,
          data: element.status === 'Activo' ? this.ao.deleteDialogWarningConfig('esta marca') : this.ao.activateDialogWarningConfig('esta marca')
        });
        dialog2.afterClosed().subscribe(res => {
          if (res) {
            const body = {
              BrandId: element.Id,
              Description: element.description,
              Status: element.status === 'Activo' ? 'Inactivo' : 'Activo',
            };
            this.crudActions.putData('Brands', element.Id, body)
              .subscribe(res => {
                window.location.reload();
              }, err => {
                console.log(err);
              });
          }
        })
        break;

      case '/dashboard/managment/fuel-types/consult':
        const dialog3 = this.dialog.open(AlertDialogComponent, {
          disableClose: true,
          data: element.status === 'Activo' ? this.ao.deleteDialogWarningConfig('este tipo de combustible') : this.ao.activateDialogWarningConfig('este tipo de combustible')
        });
        dialog3.afterClosed().subscribe(res => {
          if (res) {
            const body = {
              FuelTypeId: element.Id,
              Description: element.description,
              Status: element.status === 'Activo' ? 'Inactivo' : 'Activo',
            };
            this.crudActions.putData('FuelTypes', element.Id, body)
              .subscribe(res => {
                window.location.reload();
              }, err => {
                console.log(err);
              });
          }
        })
        break;

      case '/dashboard/managment/clients/consult':
        const dialog4 = this.dialog.open(AlertDialogComponent, {
          disableClose: true,
          data: element.status === 'Activo' ? this.ao.deleteDialogWarningConfig('este cliente') : this.ao.activateDialogWarningConfig('este cliente')
        });
        dialog4.afterClosed().subscribe(res => {
          if (res) {
            const body = {
              ClientId: element.Id,
              Name: element.name,
              DocumentNo: element.document,
              CreditCard: element.noCard,
              CreditLimit: element.creditLimit,
              ClientType: element.personType,
              Status: element.status === 'Activo' ? 'Inactivo' : 'Activo',
            };
            this.crudActions.putData('Clients', element.Id, body)
              .subscribe(res => {
                window.location.reload();
              }, err => {
                console.log(err);
              });
          }
        })
        break;

      case '/dashboard/managment/employees/consult':
        const dialog5 = this.dialog.open(AlertDialogComponent, {
          disableClose: true,
          data: element.status === 'Activo' ? this.ao.deleteDialogWarningConfig('este cliente') : this.ao.activateDialogWarningConfig('este cliente')
        });
        dialog5.afterClosed().subscribe(res => {
          if (res) {
            const body = {
              EmployeeId: element.Id,
              Name: element.name,
              DocumentNo: element.document,
              BatchLabor: element.labour,
              CommissionPercentage: element.comission,
              AdmissionDate: element.date,
              Status: element.status === 'Activo' ? 'Inactivo' : 'Activo',
            };
            this.crudActions.putData('Employees', element.Id, body)
              .subscribe(res => {
                window.location.reload();
              }, err => {
                console.log(err);
              });
          }
        })
        break;

      case '/dashboard/managment/models/consult':
        const dialog6 = this.dialog.open(AlertDialogComponent, {
          disableClose: true,
          data: element.status === 'Activo' ? this.ao.deleteDialogWarningConfig('este modelo') : this.ao.activateDialogWarningConfig('este modelo')
        });
        dialog6.afterClosed().subscribe(res => {
          if (res) {
            const body = {
              ModelId: element.Id,
              BrandId: element.brand.value,
              Description: element.description,
              Status: element.status === 'Activo' ? 'Inactivo' : 'Activo',
            };
            this.crudActions.putData('Models', element.Id, body)
              .subscribe(res => {
                window.location.reload();
              }, err => {
                console.log(err);
              });
          }
        })
        break;

      case '/dashboard/managment/vehicles/consult':
        const dialog7 = this.dialog.open(AlertDialogComponent, {
          disableClose: true,
          data: element.status === 'Activo' ? this.ao.deleteDialogWarningConfig('este vehiculo') : this.ao.activateDialogWarningConfig('este vehiculo')
        });
        dialog7.afterClosed().subscribe(res => {
          const body = {
            VehicleId: element.Id,
            Description: element.description,
            ChasisNo: element.noChasis,
            MotorNo: element.noMotor,
            PlateNo: element.noPlate,
            VehicleTypeId: element.vehicleType.value,
            BrandId: element.brand.value,
            ModelId: element.model.value,
            FuelTypeId: element.fuelType.value,
            Status: element.status === 'Activo' ? 'Inactivo' : 'Activo',
          };
          console.log(body);

          if (res) {
            this.crudActions.putData('Vehicles', element.Id, body)
              .subscribe(res => {
                window.location.reload();
              }, err => {
                console.log(err);
              });
          }
        })
        break;

      case '/dashboard/managment/rent-return/consult':
        const dialog8 = this.dialog.open(AlertDialogComponent, {
          disableClose: true,
          data: this.ao.registerDialogWarningConfig('este vehiculo')
        });
        dialog8.afterClosed().subscribe(res => {
          const body = {
            RentAndRefundId: element.Id,
            EmployeeId: element.employee.value,
            VehicleId: element.vehicle.value,
            ClientId: element.client.value,
            RentDate: element.rentDate,
            RefundDate: new Date(),
            AmountPerDay: element.amountPerDay,
            AmountOfDays: element.days,
            Comment: element.comentary,
            Status: 'Retornado',
          };
          console.log(body);

          if (res) {
            this.crudActions.getSpecificData('Vehicles', element.vehicle.value)
              .subscribe(res => {
                const vehicleBody = {
                  VehicleId: res.VehicleId,
                  Description: res.Description,
                  ChasisNo: res.ChasisNo,
                  MotorNo: res.MotorNo,
                  PlateNo: res.PlateNo,
                  VehicleTypeId: res.VehicleTypeId,
                  BrandId: res.BrandId,
                  ModelId: res.ModelId,
                  FuelTypeId: res.FuelTypeId,
                  Status: 'Activo',
                };
                console.log(res);
                console.log(vehicleBody);
                this.crudActions.putData('Vehicles', res.VehicleId, vehicleBody)
                  .subscribe(res => {
                    this.crudActions.putData('RentAndRefunds', element.Id, body)
                      .subscribe(res => {
                        window.location.reload();
                      }, err => {
                        console.log(err);
                      });
                  }, err => {
                    console.log(err);
                  });
              }, err => {
                console.log(err);
              });
          }
        })
        break;

      case '/dashboard/managment/inspection/consult':
        const dialog9 = this.dialog.open(AlertDialogComponent, {
          disableClose: true,
          data: element.status === 'Activo' ? this.ao.deleteDialogWarningConfig('esta inspección') : this.ao.activateDialogWarningConfig('esta inspección')
        });
        dialog9.afterClosed().subscribe(res => {
          const body = {
            InspectionId: element.Id,
            VehicleId: element.vehicle.value,
            ClientId: element.client.value,
            HaveGrated: element.haveGrated,
            HaveReplacementTyre: element.haveReplacementTyre,
            HaveWindowCrack: element.haveWindowCrack,
            HaveJack: element.haveJack,
            Fuel: element.fuel,
            FLTyreStatus: element.flTyreStatus,
            FRTyreStatus: element.frTyreStatus,
            RLTyreStatus: element.rlTyreStatus,
            RRTyreStatus: element.rrTyreStatus,
            Date: element.date,
            Comment: element.comentary,
            EmployeeId: element.employee.value,
            Status: element.status === 'Realizada' ? 'Pendiente' : 'Realizada',
          };
          console.log(body);

          if (res) {
            this.crudActions.putData('Inspections', element.Id, body)
              .subscribe(res => {
                window.location.reload();
              }, err => {
                console.log(err);
              });
          }
        })
        break;

      default:
        break;
    }
  }
}
