import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldConfig } from '../models/field-config';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() options: FieldConfig;
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() label: string;

  @Output() selected = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.options.name) {
      this.name = this.options.name;
    }
  }

  emitter(event) {
    this.selected.emit({ valor: event.value, name: this.name });
  }

}
