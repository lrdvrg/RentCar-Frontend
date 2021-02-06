import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig, status } from '../../../../../shared/components/models/field-config';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  status = status;
  todayDate = new Date();

  constructor(
    private fb: FormBuilder
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
  }

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
  }
}
