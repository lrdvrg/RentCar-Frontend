import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { FieldConfig } from 'src/app/shared/components/models/field-config';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AlertOptionsService } from '../../shared/services/alert-options.service';
import { CrudActionsService } from '../../shared/services/crud-actions.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  status = status;
  todayDate = new Date();
  Id = null;

  employee: FieldConfig = {
    label: 'Empleado',
    name: 'employee',
    options: []
  }

  vehicle: FieldConfig = {
    label: 'Vehículo',
    name: 'vehicle',
    options: []
  }

  client: FieldConfig = {
    label: 'Cliente',
    name: 'client',
    options: []
  }


  constructor(
    private fb: FormBuilder,
    private crudActions: CrudActionsService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private ao: AlertOptionsService,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      id: this.fb.control(''),
      employee: this.fb.control('', Validators.required),
      vehicle: this.fb.control('', Validators.required),
      client: this.fb.control('', Validators.required),
      rentDate: this.fb.control('', Validators.required),
      returnDate: this.fb.control({ value: '', disabled: true }, Validators.required),
      amountPerDay: this.fb.control('', Validators.required),
      days: this.fb.control('', Validators.required),
      comentary: this.fb.control('', Validators.required),
      status: this.fb.control('', Validators.required),
    });

    this.form.get('days').valueChanges.subscribe(value => {
      if (this.form.value.rentDate !== '' && value !== null) {
        let date = new Date(this.form.value.rentDate);
        date.setDate(date.getDate() + value);
        this.form.get('returnDate').setValue(date);
      }
    });

    this.form.get('rentDate').valueChanges.subscribe(value => {
      if (value !== '' && this.form.value.days !== null) {
        let date = new Date(value);
        date.setDate(date.getDate() + this.form.value.days);
        this.form.get('returnDate').setValue(date);
      }
    });

    this.route.data.subscribe(res => {
      console.log(res);

      if (res.data) {
        const dataResolver = res.data;

        this.Id = dataResolver.RentAndRefundId;
        this.form.get('employee').setValue(dataResolver.EmployeeId);
        this.form.get('vehicle').setValue(dataResolver.VehicleId);
        this.form.get('client').setValue(dataResolver.ClientId);
        this.form.get('rentDate').setValue(dataResolver.RentDate);
        this.form.get('returnDate').setValue(dataResolver.RefundDate);
        this.form.get('amountPerDay').setValue(dataResolver.AmountPerDay);
        this.form.get('days').setValue(dataResolver.AmountOfDays);
        this.form.get('comentary').setValue(dataResolver.Comment);
        this.form.get('status').setValue(dataResolver.Status);
      }
    });

    this.crudActions.getData('Employees')
      .subscribe(res => {
        for (const vt of res) {
          if (vt.Status === 'Activo') {
            this.employee.options.push({
              value: vt.EmployeeId, viewValue: vt.Name
            });
          }
        }

        this.crudActions.getData('Vehicles')
          .subscribe(res => {
            for (const vt of res) {
              if (vt.Status === 'Activo') {
                console.log(vt);
                this.vehicle.options.push({
                  value: vt.VehicleId, viewValue: vt.Description
                });
              }
            }

            this.crudActions.getData('Clients')
              .subscribe(res => {
                for (const vt of res) {
                  if (vt.Status === 'Activo') {
                    console.log(vt);
                    this.client.options.push({
                      value: vt.ClientId, viewValue: vt.Name
                    });
                  }
                }
              });
          });
        this.loader.end();
      });
  }

  postData() {
    if (!this.form.invalid) {
      this.loader.start();
      let body;
      const json = this.form.getRawValue();

      if (!this.Id) {
        body = {
          EmployeeId: json.employee,
          VehicleId: json.vehicle,
          ClientId: json.client,
          RentDate: json.rentDate,
          RefundDate: json.returnDate,
          AmountPerDay: json.amountPerDay,
          AmountOfDays: json.days,
          Comment: json.comentary,
          Status: json.status,
        };
      } else {
        body = {
          RentAndRefundId: this.Id,
          EmployeeId: json.employee,
          VehicleId: json.vehicle,
          ClientId: json.client,
          RentDate: json.rentDate,
          RefundDate: json.returnDate,
          AmountPerDay: json.amountPerDay,
          AmountOfDays: json.days,
          Comment: json.comentary,
          Status: json.status,
        };
      }

      if (!this.Id) {
        this.crudActions.postData('RentAndRefunds', body)
          .subscribe(res => {
            console.warn('CONSOLE DE POST:', res);

            this.actionComplete();
          }, err => {
            console.log(err);

            this.actionError();
          });
      } else {
        this.crudActions.putData('RentAndRefunds', this.Id, body)
          .subscribe(res => {
            console.warn('CONSOLE DE PUT:', res);

            this.actionComplete();
          }, err => {
            console.log(err);

            this.actionError();
          });
      }
    } else {
      this.dialog.open(AlertDialogComponent, {
        disableClose: true,
        data: this.ao.warningDialogWarningConfig
      });
    }
  }

  actionComplete() {
    this.loader.end();
    this.dialog.open(AlertDialogComponent, {
      disableClose: true,
      data: this.ao.alertDialogWarningConfig('la renta')
    });

    this.router.navigate([`../../rent-return/consult`], { relativeTo: this.route });
  }

  actionError() {
    this.loader.end();

    this.dialog.open(AlertDialogComponent, {
      disableClose: true,
      data: this.ao.alertDialogWarningConfig
    });
  }

  cancel() {
    this.location.back();
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