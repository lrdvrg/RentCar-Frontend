import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { status } from 'src/app/shared/components/models/field-config';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AlertOptionsService } from '../../shared/services/alert-options.service';
import { CrudActionsService } from '../../shared/services/crud-actions.service';
import { FieldConfig } from '../../../../../shared/components/models/field-config';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  status = status;
  Id = null;

  vehicleType: FieldConfig = {
    label: 'Tipo de Vehiculo',
    name: 'vehicleTypeId',
    options: []
  }

  brand: FieldConfig = {
    label: 'Marca',
    name: 'brandId',
    options: []
  }

  model: FieldConfig = {
    label: 'Modelo',
    name: 'modelId',
    options: []
  }

  fuelType: FieldConfig = {
    label: 'Tipo de Combustible',
    name: 'fuelTypeId',
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
      description: this.fb.control('', Validators.required),
      chasisNo: this.fb.control('', Validators.required),
      motorNo: this.fb.control('', Validators.required),
      plateNo: this.fb.control('', Validators.required),
      vehicleTypeId: this.fb.control('', Validators.required),
      brandId: this.fb.control('', Validators.required),
      modelId: this.fb.control({ value: '', disabled: true }, Validators.required),
      fuelTypeId: this.fb.control('', Validators.required),
      status: this.fb.control('', Validators.required),
    });

    this.route.data.subscribe(res => {
      console.log(res);

      if (res.data) {
        const dataResolver = res.data;

        this.Id = dataResolver.BrandId;
        this.form.get('description').setValue(dataResolver.Description);
        this.form.get('chasisNo').setValue(dataResolver.ChasisNo);
        this.form.get('motorNo').setValue(dataResolver.MotorNo);
        this.form.get('plateNo').setValue(dataResolver.PlateNo);
        this.form.get('vehicleTypeId').setValue(dataResolver.VehicleTypeId);
        this.form.get('brandId').setValue(dataResolver.BrandId);
        this.form.get('modelId').setValue(dataResolver.ModelId);
        this.form.get('fuelTypeId').setValue(dataResolver.FuelTypeId);
        this.form.get('status').setValue(dataResolver.Status);
      }
    });

    this.crudActions.getData('Brands')
      .subscribe(res => {
        for (const vt of res) {
          if (vt.Status === 'Activo') {
            this.brand.options.push({
              value: vt.BrandId, viewValue: vt.Description
            });
          }
        }

        this.crudActions.getData('VehicleTypes')
          .subscribe(res => {
            for (const vt of res) {
              if (vt.Status === 'Activo') {
                this.vehicleType.options.push({
                  value: vt.VehicleTypeId, viewValue: vt.Description
                });
              }
            }

            this.crudActions.getData('FuelTypes')
              .subscribe(res => {
                for (const vt of res) {
                  if (vt.Status === 'Activo') {
                    this.fuelType.options.push({
                      value: vt.FuelTypeId, viewValue: vt.Description
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
          Description: json.description,
          ChasisNochasisNo: json.chasisNo,
          MotorNomotorNo: json.motorNo,
          PlateNoplateNo: json.plateNo,
          VehicleTypeIdvehicleTypeId: json.vehicleTypeId,
          BrandIdbrandId: json.brandId,
          ModelIdmodelId: json.modelId,
          FuelTypeIdfuelTypeId: json.fuelTypeId,
          Status: json.status,
        };
      } else {
        body = {
          VehicleId: this.Id,
          Description: json.description,
          ChasisNochasisNo: json.chasisNo,
          MotorNomotorNo: json.motorNo,
          PlateNoplateNo: json.plateNo,
          VehicleTypeIdvehicleTypeId: json.vehicleTypeId,
          BrandIdbrandId: json.brandId,
          ModelIdmodelId: json.modelId,
          FuelTypeIdfuelTypeId: json.fuelTypeId,
          Status: json.status,
        };
      }

      if (!this.Id) {
        this.crudActions.postData('Vehicles', body)
          .subscribe(res => {
            console.warn('CONSOLE DE POST:', res);

            this.actionComplete();
          }, err => {
            console.log(err);

            this.actionError();
          });
      } else {
        this.crudActions.putData('Vehicles', this.Id, body)
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
      data: this.ao.alertDialogWarningConfig('el vehiculo')
    });

    this.router.navigate([`../../vehicles/consult`], { relativeTo: this.route });
  }

  actionError() {
    this.loader.end();

    this.dialog.open(AlertDialogComponent, {
      disableClose: true,
      data: this.ao.alertDialogWarningConfig
    });
  }

  brandChange(event) {
    if (event) {
      this.form.get('modelId').enable();
      this.crudActions.getData('Models')
        .subscribe(res => {
          this.model.options = [];
          for (const vt of res) {
            if (vt.BrandId === event.valor) {
              if (vt.Status === 'Activo') {
                this.model.options.push({
                  value: vt.ModelId, viewValue: vt.Description
                });
              }
            }
          }
        });
    }
  }

  cancel() {
    this.location.back();
  }
}
