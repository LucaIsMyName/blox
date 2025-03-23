import { BaseProps } from "../../types";
import React from "react";

export type SortDirection = "asc" | "desc" | "none";

export interface TableColumn<T = any> {
  /**
   * Unique identifier for the column
   */
  id: string;

  /**
   * Header content for the column
   */
  header: React.ReactNode;

  /**
   * Function to access the cell data for this column
   */
  accessor?: (row: T, rowIndex: number) => React.ReactNode;

  /**
   * Cell renderer function
   */
  cell?: (value: any, row: T, rowIndex: number) => React.ReactNode;

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
  headerProps?: React.ThHTMLAttributes<HTMLTableHeaderCellElement>;

  /**
   * Additional props to pass to the data cells in this column
   */
  cellProps?: React.TdHTMLAttributes<HTMLTableDataCellElement>;
}

export interface TableProps<T = any> extends BaseProps {
  /**
   * Data array to be displayed in the table
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
   * @default 'none'
   */
  sortDirection?: SortDirection;

  /**
   * Handler for sort changes
   */
  onSort?: (columnId: string, direction: SortDirection) => void;

  /**
   * Whether the table has striped rows
   * @default false
   */
  striped?: boolean;

  /**
   * Whether the table has borders
   * @default false
   */
  bordered?: boolean;

  /**
   * Whether the table has hover effects
   * @default false
   */
  hover?: boolean;

  /**
   * Whether the table is compact
   * @default false
   */
  compact?: boolean;

  /**
   * Whether the table header should stick to the top when scrolling
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Whether the table has horizontal scrolling
   * @default false
   */
  horizontalScroll?: boolean;

  /**
   * Function to determine row class name
   */
  getRowClassName?: (row: T, index: number) => string;

  /**
   * Additional props for the table element
   */
  tableProps?: React.TableHTMLAttributes<HTMLTableElement>;

  /**
   * Additional props for the thead element
   */
  theadProps?: React.HTMLAttributes<HTMLTableSectionElement>;

  /**
   * Additional props for the tbody element
   */
  tbodyProps?: React.HTMLAttributes<HTMLTableSectionElement>;

  /**
   * Whether to show a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Content to display when there is no data
   */
  emptyContent?: React.ReactNode;

  /**
   * Content to display while loading
   */
  loadingContent?: React.ReactNode;

  /**
   * Component for rendering the table container
   */
  containerComponent?: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;

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
   * Custom table caption (for accessibility)
   */
  caption?: React.ReactNode;

  /**
   * Whether to show the table caption
   * @default true
   */
  showCaption?: boolean;
}
