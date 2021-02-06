import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { AlertDialogComponent } from "src/app/shared/components/alert-dialog/alert-dialog.component";
import { AlertOptionsService } from "../../shared/services/alert-options.service";
import { VehiclesTypeService } from "./vehicles-type.service";

@Injectable({
  providedIn: 'root'
})
export class EditResolverService {

  constructor(
    private ao: AlertOptionsService,
    private vehiclesTypeService: VehiclesTypeService,
    private dialog: MatDialog
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<unknown> {
    const id = route.params['id'];

    return this.vehiclesTypeService.getSpecificData(id).pipe(
      mergeMap(data => {
        if (data) {
          return of(data);
        } else {
          this.dialog.open(AlertDialogComponent, {
            disableClose: true,
            data: this.ao.errorDialogWarningConfig
          });
          console.log('RESOLVER ERROR: ', data);
          return EMPTY;
        }
      })
    );
  }
}
