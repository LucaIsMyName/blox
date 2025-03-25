// types.ts
import { ReactNode, HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

export type SortDirection = 'asc' | 'desc' | 'none';

export interface TableColumn<T = any> {
  /**
   * Unique identifier for the column
   */
  id: string;

  /**
   * Header content for the column
   */
  header: ReactNode;

  /**
   * Function to access the cell data for this column
   */
  accessor?: (row: T, rowIndex: number) => ReactNode;

  /**
   * Cell renderer function
   */
  cell?: (value: any, row: T, rowIndex: number) => ReactNode;

  /**
   * Whether this column is sortable
   * @default false
   */
  sortable?: boolean;

  /**
   * Whether this column should be centered
   * @default false
   */
  center?: boolean;

  /**
   * Column width (e.g., '100px', '10%')
   */
  width?: string;

  /**
   * Additional props to pass to the header cell
   */
  headerProps?: ThHTMLAttributes<HTMLTableHeaderCellElement>;

  /**
   * Additional props to pass to the data cells in this column
   */
  cellProps?: TdHTMLAttributes<HTMLTableDataCellElement>;
}

export interface TableProps<T = any> extends TableHTMLAttributes<HTMLTableElement> {
  /**
   * Data array to be displayed in the table
   */
  data?: T[];

  /**
   * Column definitions
   */
  columns?: TableColumn<T>[];

  /**
   * Key for the currently sorted column
   */
  sortColumn?: string;

  /**
   * Current sort direction
   * @default 'none'
   */
  sortDirection?: SortDirection;

  /**
   * Handler for sort changes
   */
  onSort?: (columnId: string, direction: SortDirection) => void;

  /**
   * Whether to automatically generate row keys using the row index
   * @default true
   */
  autoGenerateRowKey?: boolean;

  /**
   * Function to generate a key for each row
   */
  getRowKey?: (row: T, index: number) => string | number;

  /**
   * Function to determine row class name
   */
  getRowClassName?: (row: T, index: number) => string;

  /**
   * Children of the table (when using the compositional API)
   */
  children?: ReactNode;
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Children of the table header
   */
  children?: ReactNode;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Children of the table body
   */
  children?: ReactNode;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * Children of the table row
   */
  children?: ReactNode;
}

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
  /**
   * Children of the table header cell
   */
  children?: ReactNode;
  
  /**
   * Column ID for sorting
   */
  columnId?: string;
  
  /**
   * Whether this column is sortable
   */
  sortable?: boolean;
  
  /**
   * Whether this column is currently sorted
   */
  sorted?: boolean;
  
  /**
   * Current sort direction for this column
   */
  sortDirection?: SortDirection;
  
  /**
   * Handler for sort changes
   */
  onSort?: (columnId: string) => void;
  
  /**
   * Whether this column should be centered
   */
  center?: boolean;
  
  /**
   * Column width
   */
  width?: string;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableDataCellElement> {
  /**
   * Children of the table cell
   */
  children?: ReactNode;
  
  /**
   * Column ID (for data attributes)
   */
  columnId?: string;
  
  /**
   * Whether this cell should be centered
   */
  center?: boolean;
}

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
  /**
   * Children of the table caption
   */
  children?: ReactNode;
}

export interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children of the table container
   */
  children?: ReactNode;
  
  /**
   * Whether the container should enable horizontal scrolling
   */
  horizontalScroll?: boolean;
}

export interface TableEmptyStateProps extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * Content to display when table has no data
   */
  children?: ReactNode;
  
  /**
   * Number of columns to span
   */
  colSpan?: number;
}

export interface TableLoadingStateProps extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * Content to display while table is loading
   */
  children?: ReactNode;
  
  /**
   * Number of columns to span
   */
  colSpan?: number;
}

export interface TableContextValue<T = any> {
  /**
   * Data array to be displayed
   */
  data: T[];
  
  /**
   * Column definitions
   */
  columns: TableColumn<T>[];
  
  /**
   * Key for the currently sorted column
   */
  sortColumn?: string;
  
  /**
   * Current sort direction
   */
  sortDirection?: SortDirection;
  
  /**
   * Handler for sort changes
   */
  onSort?: (columnId: string, direction: SortDirection) => void;
  
  /**
   * Function to generate a key for each row
   */
  getRowKey?: (row: T, index: number) => string | number;
  
  /**
   * Whether to automatically generate row keys
   */
  autoGenerateRowKey: boolean;
  
  /**
   * Function to determine row class name
   */
  getRowClassName?: (row: T, index: number) => string;
}

export interface TableComposition {
  Header: React.FC<TableHeaderProps>;
  Body: React.FC<TableBodyProps>;
  Row: React.FC<TableRowProps>;
  HeaderCell: React.FC<TableHeaderCellProps>;
  Cell: React.FC<TableCellProps>;
  Caption: React.FC<TableCaptionProps>;
  Container: React.FC<TableContainerProps>;
  Empty: React.FC<TableEmptyStateProps>;
  Loading: React.FC<TableLoadingStateProps>;
}