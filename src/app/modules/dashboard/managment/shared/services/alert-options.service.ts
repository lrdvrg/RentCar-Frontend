import { Injectable } from '@angular/core';
import { AlertDialogType, AlertDialogConfigI } from 'src/app/shared/components/alert-dialog/models/alert-dialog';

@Injectable({
  providedIn: 'root'
})
export class AlertOptionsService {

  constructor() { }

  alertDialogWarningConfig(type: string) {
    return {
      title: 'Confirmación',
      content: `Se ha guardado ${type} correctamente`,
      dialogType: AlertDialogType.Done
    }
  }

  deleteDialogWarningConfig(type: string): AlertDialogConfigI {
    return {
      title: 'Confirmación',
      content: `¿Esta seguro de inactivar ${type}?`,
      dialogType: AlertDialogType.ConfirmAction,
      primaryButtonText: 'Inactivar',
      secundaryButtonText: 'Cancelar',
    }
  }

  activateDialogWarningConfig(type: string): AlertDialogConfigI {
    return {
      title: 'Confirmación',
      content: `¿Esta seguro de activar ${type}?`,
      dialogType: AlertDialogType.ConfirmAction,
      primaryButtonText: 'Activar',
      secundaryButtonText: 'Cancelar',
    }
  }


  warningDialogWarningConfig: AlertDialogConfigI = {
    title: 'Error',
    content: 'Faltan campos obligatorios por completar',
    dialogType: AlertDialogType.Warning
  }

  errorDialogWarningConfig: AlertDialogConfigI = {
    title: 'Error',
    content: 'Ha ocurrido un error al intentar realizar esta petición, intente de nuevo mas tarde',
    dialogType: AlertDialogType.Warning
  }
}
