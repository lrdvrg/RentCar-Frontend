// Dependencias
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogConfigI, AlertDialogType } from './models/alert-dialog';

@Component({
  selector: 'humano-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  /**
   * Tipo de dialogo para mostrar que una accion ya fue realizada.
   */
  validateAlertDialogDone = AlertDialogType.Done;

  /**
   * Tipo de dialogo para mostrar la confirmacion de una accion.
   */
  validateAlertDialogConfirmAction = AlertDialogType.ConfirmAction;

  /**
   * Tipo de dialogo para mostrar una advertencia sobre una accion realizada.
   */
  validateAlertDialogWarning = AlertDialogType.Warning;

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>, @Inject(MAT_DIALOG_DATA) public dialogContent: AlertDialogConfigI) { }

  ngOnInit(): void {

    // Definiendo un tamaño fijo para el dialogo.
    this.dialogRef.addPanelClass('alert-dialog-custom-size');

    // Quitando el focus a los botones del dialogo al momento de abrir el dialogo.
    this.dialogRef._containerInstance._config.autoFocus = false;
  }

}
