import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  @Input() label: string;
  @Input() name: any;
  @Input() min?: any;
  @Input() max?: any;
  @Input() group: FormGroup;

  constructor() { }

  ngOnInit() { }
}
