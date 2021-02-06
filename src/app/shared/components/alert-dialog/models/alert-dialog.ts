/**
 * Modelo de configuracion para el uso del alertDialogComponent.
 */
export interface AlertDialogConfigI {
  /**
   * Titulo que se va a mostrar en el dialogo.
   */
  title: string;

  /**
   * Contenido que se va a mostrar en dialogo.
   */
  content: string;

  /**
   * Define el tipo de dialogo a utilizar.
   */
  dialogType: AlertDialogType;

  /**
   * Texto a mostrar en el boton de accion principal.
   */
  primaryButtonText?: string;

  /**
   * Texto a mostrar en el boton de accion secundario.
   */
  secundaryButtonText?: string;
}

/**
 * Tipos de dialogos disponibles.
 */
export enum AlertDialogType {
  Warning = 'warning',
  ConfirmAction = 'confirmAction',
  Done = 'done'
}
