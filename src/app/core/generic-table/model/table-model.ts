// import { ButtonModel } from "../../search-button/model/button.model";

export interface TableModel {
    header: IHeader[]
    values: any[],
    actions?: any[],
    noDataText?: string,
    rowClass?: string,
    rowCond: (value?: any) => boolean
    cellClass?: string,
    cellCond: (value: any, header: string) => boolean
    cellAction: (value?: any) => void
}


export interface IHeader {
    field: string;
    label: string;
    type: TableHeader,
    allSelected?: boolean,
    orderIcon?: boolean,
    filter?: IFilter,
}

export interface IFilter {
    type: TableFilter,
    isDropdown: boolean,
    values?: any[],
    optionValue?: string,
    optionLabel?: string,
    matchMode?: string,
}

// export interface IAction {
//   label?: string,
//   icon?: string,
//   function: (value?: any) => void,
// }

export type TableFilter = 'text' | 'numeric' | 'boolean' | 'date'
export type TableHeader = 'text' | 'number' | 'boolean' | 'image'
