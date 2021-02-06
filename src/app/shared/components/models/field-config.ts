export interface Validator {
    name: string;
    validator: any;
    message: string;
}
export interface FieldConfig {
    label?: string;
    name?: string;
    inputType?: string;
    options?: Array<FieldConfigOptions>;
    collections?: any;
    type?: string;
    value?: any;
    validations?: Validator[];
}

export interface FieldConfigOptions {
    value: any;
    viewValue: any;
    obligatory?: any;
}

export const status: FieldConfig = {
    label: 'Estado',
    name: 'status',
    options: [
        {
            value: 'Activo',
            viewValue: 'Activo',
        },
        {
            value: 'Inactivo',
            viewValue: 'Inactivo',
        }
    ],
}