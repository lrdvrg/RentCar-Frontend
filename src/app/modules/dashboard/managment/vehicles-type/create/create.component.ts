import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { AlertDialogType, AlertDialogConfigI } from 'src/app/shared/components/alert-dialog/models/alert-dialog';
import { status } from '../../../../../shared/components/models/field-config';
import { VehiclesTypeService } from '../services/vehicles-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../../../shared/services/loader.service';
import { AlertOptionsService } from '../../shared/services/alert-options.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  status = status;

  constructor(
    private fb: FormBuilder,
    private vehiclesType: VehiclesTypeService,
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
  }

  postData() {
    if (!this.form.invalid) {
      this.loader.start();

      const json = this.form.getRawValue();

      const body = {
        Description: json.description,
        Status: json.status,
      };

      this.vehiclesType.postData(body)
        .subscribe(res => {
          console.warn('CONSOLE DE POST:', res);

          this.loader.end();
          this.dialog.open(AlertDialogComponent, {
            disableClose: true,
            data: this.ao.alertDialogWarningConfig('el tipo de vehiculo')
          });

          this.router.navigate([`../../vehicles-type/consult`], { relativeTo: this.route });

        }, err => {
          console.log(err);
          this.loader.end();

          this.dialog.open(AlertDialogComponent, {
            disableClose: true,
            data: this.ao.alertDialogWarningConfig
          });

        });
    } else {
      this.dialog.open(AlertDialogComponent, {
        disableClose: true,
        data: this.ao.warningDialogWarningConfig
      });
    }
  }

  cancel() {
    this.location.back();
  }
}
