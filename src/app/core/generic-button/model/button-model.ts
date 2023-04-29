export interface ButtonModel {
    label: string,
    icon?: string,
    disabled?: boolean,
    function: (value: any) => void,
}

export type ButtonPosition = 'justify-content-end' | 'justify-content-start' | 'justify-content-center' | 'justify-content-between'

export type ButtonStyle = '' | 'p-button-rounded' | 'p-button-outlined' | 'p-button-text' | 'p-button-raised'
export type ButtonType = '' | 'p-button-secondary' | 'p-button-success' | 'p-button-info' | 'p-button-warning' | 'p-button-help' | 'p-button-danger'