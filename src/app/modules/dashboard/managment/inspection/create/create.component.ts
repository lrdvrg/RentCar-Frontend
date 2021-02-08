import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { FieldConfig, status } from 'src/app/shared/components/models/field-config';
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
  status = inspection;
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

  yesno: FieldConfig = {
    options: [
      {
        value: 'Si',
        viewValue: 'Si',
      },
      {
        value: 'No',
        viewValue: 'No',
      }
    ],
  }

  tyreStatus: FieldConfig = {
    options: [
      {
        value: 'Excelente',
        viewValue: 'Excelente',
      },
      {
        value: 'Buena',
        viewValue: 'Buena',
      },
      {
        value: 'Regular',
        viewValue: 'Regular',
      },
      {
        value: 'Mala',
        viewValue: 'Mala',
      }
    ],
  }

  fuel: FieldConfig = {
    options: [
      {
        value: 'Lleno',
        viewValue: 'Lleno',
      },
      {
        value: '3/4',
        viewValue: '3/4',
      },
      {
        value: '1/2',
        viewValue: '1/2',
      },
      {
        value: '1/4',
        viewValue: '1/4',
      }
    ],
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
      vehicle: this.fb.control('', Validators.required),
      client: this.fb.control('', Validators.required),
      haveGrated: this.fb.control('', Validators.required),
      haveReplacementTyre: this.fb.control('', Validators.required),
      haveWindowCrack: this.fb.control('', Validators.required),
      haveJack: this.fb.control('', Validators.required),
      fuel: this.fb.control('', Validators.required),
      flTyreStatus: this.fb.control('', Validators.required),
      frTyreStatus: this.fb.control('', Validators.required),
      rlTyreStatus: this.fb.control('', Validators.required),
      rrTyreStatus: this.fb.control('', Validators.required),
      date: this.fb.control('', Validators.required),
      comentary: this.fb.control('', Validators.required),
      employee: this.fb.control('', Validators.required),
      status: this.fb.control('', Validators.required),
    });


    this.route.data.subscribe(res => {
      console.log(res);

      if (res.data) {
        const dataResolver = res.data;

        this.Id = dataResolver.InspectionId;
        this.form.get('vehicle').setValue(dataResolver.VehicleId);
        this.form.get('client').setValue(dataResolver.ClientId);
        this.form.get('haveGrated').setValue(dataResolver.HaveGrated);
        this.form.get('haveReplacementTyre').setValue(dataResolver.HaveReplacementTyre);
        this.form.get('haveWindowCrack').setValue(dataResolver.HaveWindowCrack);
        this.form.get('haveJack').setValue(dataResolver.HaveJack);
        this.form.get('fuel').setValue(dataResolver.Fuel);
        this.form.get('flTyreStatus').setValue(dataResolver.FLTyreStatus);
        this.form.get('frTyreStatus').setValue(dataResolver.FRTyreStatus);
        this.form.get('rlTyreStatus').setValue(dataResolver.RLTyreStatus);
        this.form.get('rrTyreStatus').setValue(dataResolver.RRTyreStatus);
        this.form.get('date').setValue(dataResolver.Date);
        this.form.get('comentary').setValue(dataResolver.Comment);
        this.form.get('employee').setValue(dataResolver.EmployeeId);
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
          VehicleId: json.vehicle,
          ClientId: json.client,
          HaveGrated: json.haveGrated,
          HaveReplacementTyre: json.haveReplacementTyre,
          HaveWindowCrack: json.haveWindowCrack,
          HaveJack: json.haveJack,
          Fuel: json.fuel,
          FLTyreStatus: json.flTyreStatus,
          FRTyreStatus: json.frTyreStatus,
          RLTyreStatus: json.rlTyreStatus,
          RRTyreStatus: json.rrTyreStatus,
          Date: json.date,
          Comment: json.comentary,
          EmployeeId: json.employee,
          Status: json.status,
        };
      } else {
        body = {
          InspectionId: this.Id,
          VehicleId: json.vehicle,
          ClientId: json.client,
          HaveGrated: json.haveGrated,
          HaveReplacementTyre: json.haveReplacementTyre,
          HaveWindowCrack: json.haveWindowCrack,
          HaveJack: json.haveJack,
          Fuel: json.fuel,
          FLTyreStatus: json.flTyreStatus,
          FRTyreStatus: json.frTyreStatus,
          RLTyreStatus: json.rlTyreStatus,
          RRTyreStatus: json.rrTyreStatus,
          Date: json.date,
          Comment: json.comentary,
          EmployeeId: json.employee,
          Status: json.status,
        };
      }

      if (!this.Id) {
        this.crudActions.postData('Inspections', body)
          .subscribe(res => {
            console.warn('CONSOLE DE POST:', res);

            this.actionComplete();
          }, err => {
            console.log(err);

            this.actionError();
          });
      } else {
        this.crudActions.putData('Inspections', this.Id, body)
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
      data: this.ao.alertDialogWarningConfig('la inspección')
    });

    this.router.navigate([`../../inspection/consult`], { relativeTo: this.route });
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

export const inspection: FieldConfig = {
  label: 'Estado',
  name: 'status',
  options: [
    {
      value: 'Realizada',
      viewValue: 'Realizada',
    },
    {
      value: 'Pendiente',
      viewValue: 'Pendiente',
    }
  ],
}
