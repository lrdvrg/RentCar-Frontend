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
  todayDate = new Date();

  Id = null;

  labour: FieldConfig = {
    label: 'Tanda de Labor',
    name: 'labour',
    options: [
      {
        value: 'Matutina',
        viewValue: 'Matutina',
      },
      {
        value: 'Vespertina',
        viewValue: 'Vespertina',
      },
      {
        value: 'Nocturna',
        viewValue: 'Nocturna',
      }
    ],
  };

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
      name: this.fb.control('', Validators.required),
      noDocument: this.fb.control('', Validators.required),
      labour: this.fb.control('', Validators.required),
      comission: this.fb.control('', Validators.required),
      date: this.fb.control('', Validators.required),
      status: this.fb.control('', Validators.required),
    });

    this.route.data.subscribe(res => {
      console.log(res);

      if (res.data) {
        const dataResolver = res.data;

        this.Id = dataResolver.EmployeeId;
        this.form.get('name').setValue(dataResolver.Name);
        this.form.get('noDocument').setValue(dataResolver.DocumentNo);
        this.form.get('labour').setValue(dataResolver.BatchLabor);
        this.form.get('comission').setValue(dataResolver.CommissionPercentage);
        this.form.get('date').setValue(dataResolver.AdmissionDate);
        this.form.get('status').setValue(dataResolver.Status);
      }
    })
  }

  postData() {
    if (!this.form.invalid) {
      this.loader.start();
      let body;
      const json = this.form.getRawValue();

      if (!this.Id) {
        body = {
          Name: json.name,
          DocumentNo: json.noDocument,
          BatchLabor: json.labour,
          CommissionPercentage: json.comission,
          AdmissionDate: json.date,
          Status: json.status,
        };
      } else {
        body = {
          EmployeeId: this.Id,
          Name: json.name,
          DocumentNo: json.noDocument,
          BatchLabor: json.labour,
          CommissionPercentage: json.comission,
          AdmissionDate: json.date,
          Status: json.status,
        };
      }

      if (!this.Id) {
        this.crudActions.postData('Employees', body)
          .subscribe(res => {
            console.warn('CONSOLE DE POST:', res);

            this.actionComplete();
          }, err => {
            console.log(err);

            this.actionError();
          });
      } else {
        this.crudActions.putData('Employees', this.Id, body)
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
      data: this.ao.alertDialogWarningConfig('el cliente')
    });

    this.router.navigate([`../../employees/consult`], { relativeTo: this.route });
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
