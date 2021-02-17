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

  registerDialogWarningConfig(type: string): AlertDialogConfigI {
    return {
      title: 'Confirmación',
      content: `Confirmar retorno de ${type}`,
      dialogType: AlertDialogType.ConfirmAction,
      primaryButtonText: 'Confirmar',
      secundaryButtonText: 'Cancelar',
    }
  }


  warningDialogWarningConfig: AlertDialogConfigI = {
    title: 'Error',
    content: 'Faltan campos obligatorios por completar',
    dialogType: AlertDialogType.Warning
  }

  loginWarningDialogWarningConfig: AlertDialogConfigI = {
    title: 'Alerta',
    content: 'No pueden haber campos vacios',
    dialogType: AlertDialogType.Warning
  }

  loginErrorDialogWarningConfig: AlertDialogConfigI = {
    title: 'Error',
    content: 'El usuario o contraseña es incorrecto, intente de nuevo',
    dialogType: AlertDialogType.Warning
  }

  userExistsDialogWarningConfig: AlertDialogConfigI = {
    title: 'Error',
    content: 'Este nombre de usuario ya existe, intente otro',
    dialogType: AlertDialogType.Warning
  }

  passwordDialogWarningConfig: AlertDialogConfigI = {
    title: 'Error',
    content: 'Las contraseñas no coinciden',
    dialogType: AlertDialogType.Warning
  }

  userCreatedDialogWarningConfig: AlertDialogConfigI = {
    title: 'Confirmación',
    content: `Se ha creado el usuario correctamente`,
    dialogType: AlertDialogType.Done
  }

  errorDialogWarningConfig: AlertDialogConfigI = {
    title: 'Error',
    content: 'Ha ocurrido un error al intentar realizar esta petición, intente de nuevo mas tarde',
    dialogType: AlertDialogType.Warning
  }
}
