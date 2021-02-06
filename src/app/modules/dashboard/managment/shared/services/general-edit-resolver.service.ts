import { Injectable } from '@angular/core';
import { AlertOptionsService } from './alert-options.service';
import { CrudActionsService } from './crud-actions.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlertDialogComponent } from '../../../../../shared/components/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GeneralEditResolverService {

  constructor(
    private ao: AlertOptionsService,
    private crudActions: CrudActionsService,
    private dialog: MatDialog
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<unknown> {
    const id = route.params['id'];
    const name = route.params['name'];

    return this.crudActions.getSpecificData(name, id).pipe(mergeMap(data => {
      if (data) {
        return of(data);
      } else {
        this.dialog.open(AlertDialogComponent, {
          disableClose: true,
          data: this.ao.errorDialogWarningConfig
        });
        return EMPTY;
      }
    }))
  }
}
