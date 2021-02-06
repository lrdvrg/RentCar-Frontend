import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {


  @Input() label: string;
  @Input() name: string;
  @Input() min: number;
  @Input() max: number;
  @Input() maxInfo?: string;
  @Input() placeholder: string;
  @Input() group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

  maxFunction(control) {
    if (control.errors) {
      if (control.errors.max) {
        if (control.value > control.errors.max.max) {
          // tslint:disable-next-line: radix
          control.setValue(parseInt(control.errors.max.max.toString()));
        }
      }
    } else if (this.max) {
      if (control.value > this.max) {
        // tslint:disable-next-line: radix
        control.setValue(parseInt(this.max.toString()));
      }
    }
  }
}
