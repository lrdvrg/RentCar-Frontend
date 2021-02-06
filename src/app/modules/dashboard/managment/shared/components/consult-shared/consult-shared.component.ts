import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consult-shared',
  templateUrl: './consult-shared.component.html',
  styleUrls: ['./consult-shared.component.scss']
})
export class ConsultSharedComponent implements OnInit {

  @Input() title: string;
  @Input() name?: string;
  @Input() data: any;
  @Input() incomingDataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.warn(this.data, this.incomingDataSource);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.incomingDataSource;

    });
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createItem() {
    this.router.navigate([`../../${this.name}/create`], { relativeTo: this.route });
  }

}
