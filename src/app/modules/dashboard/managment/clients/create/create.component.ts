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

  personType: FieldConfig = {
    label: 'Tipo de Persona',
    name: 'personType',
    options: [
      {
        value: 'Fisica',
        viewValue: 'Física',
      },
      {
        value: 'Juridica',
        viewValue: 'Jurídica',
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
      name: this.fb.control('', Validators.required),
      noDocument: this.fb.control('', Validators.required),
      noCard: this.fb.control('', Validators.required),
      creditLimit: this.fb.control('', Validators.required),
      personType: this.fb.control('', Validators.required),
      status: this.fb.control('', Validators.required),
    });

    this.route.data.subscribe(res => {
      console.log(res);

      if (res.data) {
        const dataResolver = res.data;

        this.Id = dataResolver.ClientId;
        this.form.get('name').setValue(dataResolver.Name);
        this.form.get('noDocument').setValue(dataResolver.DocumentNo);
        this.form.get('noCard').setValue(dataResolver.CreditCard);
        this.form.get('creditLimit').setValue(dataResolver.CreditLimit);
        this.form.get('personType').setValue(dataResolver.ClientType);
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
          CreditCard: json.noCard,
          CreditLimit: json.creditLimit,
          ClientType: json.personType,
          Status: json.status,
        };
      } else {
        body = {
          ClientId: this.Id,
          Name: json.name,
          DocumentNo: json.noDocument,
          CreditCard: json.noCard,
          CreditLimit: json.creditLimit,
          ClientType: json.personType,
          Status: json.status,
        };
      }

      if (!this.Id) {
        this.crudActions.postData('Clients', body)
          .subscribe(res => {
            console.warn('CONSOLE DE POST:', res);

            this.actionComplete();
          }, err => {
            console.log(err);

            this.actionError();
          });
      } else {
        this.crudActions.putData('Clients', this.Id, body)
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

    this.router.navigate([`../../clients/consult`], { relativeTo: this.route });
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
