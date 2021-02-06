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

  constructor(
    private fb: FormBuilder
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
  }

  personType: FieldConfig = {
    label: 'Tipo de Persona',
    name: 'personType',
    options: [
      {
        value: 'fisica',
        viewValue: 'Física',
      },
      {
        value: 'juridica',
        viewValue: 'Jurídica',
      }
    ],
  }
}
