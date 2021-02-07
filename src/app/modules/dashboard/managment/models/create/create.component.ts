import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { FieldConfig, status } from '../../../../../shared/components/models/field-config';
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

  Id = null;

  brands: FieldConfig = {
    label: 'Marca',
    name: 'brandId',
    options: [],
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
      brandId: this.fb.control(''),
      description: this.fb.control('', Validators.required),
      status: this.fb.control('', Validators.required),
    });
    this.loader.start();

    this.route.data.subscribe(res => {
      console.log(res);

      if (res.data) {
        const dataResolver = res.data;

        this.Id = dataResolver.ModelId;
        this.form.get('brandId').setValue(dataResolver.BrandId);
        this.form.get('description').setValue(dataResolver.Description);
        this.form.get('status').setValue(dataResolver.Status);
      }
    })

    this.crudActions.getData('Brands')
      .subscribe(res => {
        for (const vt of res) {
          if (vt.Status === 'Activo') {
            this.brands.options.push({
              value: vt.BrandId, viewValue: vt.Description
            });
          }
        }
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
          BrandId: json.brandId,
          Description: json.description,
          Status: json.status,
        };
      } else {
        body = {
          ModelId: this.Id,
          BrandId: json.brandId,
          Description: json.description,
          Status: json.status,
        };
      }

      if (!this.Id) {
        this.crudActions.postData('Models', body)
          .subscribe(res => {
            console.warn('CONSOLE DE POST:', res);

            this.actionComplete();
          }, err => {
            console.log(err);

            this.actionError();
          });
      } else {
        this.crudActions.putData('Models', this.Id, body)
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
      data: this.ao.alertDialogWarningConfig('el modelo')
    });

    this.router.navigate([`../../models/consult`], { relativeTo: this.route });
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
