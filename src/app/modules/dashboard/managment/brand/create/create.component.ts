import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { status } from '../../../../../shared/components/models/field-config';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AlertOptionsService } from '../../shared/services/alert-options.service';
import { Location } from '@angular/common';
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
      status: this.fb.control('', Validators.required),
    });

    this.route.data.subscribe(res => {
      console.log(res);

      if (res.data) {
        const dataResolver = res.data;

        this.Id = dataResolver.BrandId;
        this.form.get('description').setValue(dataResolver.Description);
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
          Description: json.description,
          Status: json.status,
        };
      } else {
        body = {
          BrandId: this.Id,
          Description: json.description,
          Status: json.status,
        };
      }

      if (!this.Id) {
        this.crudActions.postData('Brands', body)
          .subscribe(res => {
            console.warn('CONSOLE DE POST:', res);

            this.actionComplete();
          }, err => {
            console.log(err);

            this.actionError();
          });
      } else {
        this.crudActions.putData('Brands', this.Id, body)
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
      data: this.ao.alertDialogWarningConfig('la marca')
    });

    this.router.navigate([`../../brand/consult`], { relativeTo: this.route });
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
