import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {

  columns = {
    definition: ['Id', 'description', 'status', 'actions'],
    titles: ['Código', 'Descripción', 'Estado', 'Acciones']
  }

  data = []

  constructor() { }

  ngOnInit(): void {
  }

}
