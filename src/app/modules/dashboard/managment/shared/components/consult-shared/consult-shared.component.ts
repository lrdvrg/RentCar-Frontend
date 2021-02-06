import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { AlertOptionsService } from '../../services/alert-options.service';
import { VehiclesTypeService } from '../../../vehicles-type/services/vehicles-type.service';

@Component({
  selector: 'app-consult-shared',
  templateUrl: './consult-shared.component.html',
  styleUrls: ['./consult-shared.component.scss']
})
export class ConsultSharedComponent implements OnInit {

  father = '';

  @Input() title: string;
  @Input() name?: string;
  @Input() data: any;
  @Input() incomingDataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private ao: AlertOptionsService,
    private vehiclesType: VehiclesTypeService,
  ) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        const elements = event.url.split(';');

        this.father = elements[0];
        console.log(this.father);
      }
    });
  }

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

  editItem(id) {
    this.router.navigate([`../../${this.name}/edit`, { id: id }], { relativeTo: this.route });
  }

  inactiveItem(element) {
    switch (this.father) {
      case '/dashboard/managment/vehicles-type/consult':
        const dialog = this.dialog.open(AlertDialogComponent, {
          disableClose: true,
          data: element.status === 'Activo' ? this.ao.deleteDialogWarningConfig('este tipo de vehiculo') : this.ao.activateDialogWarningConfig('este tipo de vehiculo')
        });
        dialog.afterClosed().subscribe(res => {
          if (res) {
            const body = {
              VehicleTypeId: element.Id,
              Description: element.description,
              Status: element.status === 'Activo' ? 'Inactivo' : 'Activo',
            };
            this.vehiclesType.putData(element.Id, body)
              .subscribe(res => {
                window.location.reload();
              }, err => {
                console.log(err);
              });
          }
        })
        break;

      default:
        break;
    }
  }
}
