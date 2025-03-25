import React from "react";
import { TableProps, TableHeaderProps, TableBodyProps, TableRowProps, TableHeaderCellProps, TableCellProps, TableCaptionProps, TableContainerProps, TableEmptyStateProps, TableLoadingStateProps } from "./types";
declare const Table: {
    <T extends Record<string, any> = any>({ data, columns, sortColumn, sortDirection, onSort, autoGenerateRowKey, getRowKey, getRowClassName, children, className, ...props }: TableProps<T> & {
        children?: React.ReactNode;
    }): import("react/jsx-runtime").JSX.Element;
    Container: React.FC<TableContainerProps>;
    Caption: React.FC<TableCaptionProps>;
    Header: React.FC<TableHeaderProps>;
    Body: React.FC<TableBodyProps>;
    Row: React.FC<TableRowProps>;
    HeaderCell: React.FC<TableHeaderCellProps>;
    Cell: React.FC<TableCellProps>;
    Empty: React.FC<TableEmptyStateProps>;
    Loading: React.FC<TableLoadingStateProps>;
};
export default Table;
