// Table.tsx
import React, { createContext, useContext, useCallback, useMemo } from "react";
import { TableProps, TableHeaderProps, TableBodyProps, TableRowProps, TableHeaderCellProps, TableCellProps, TableCaptionProps, TableContainerProps, TableEmptyStateProps, TableLoadingStateProps, TableContextValue, TableColumn, SortDirection, TableComposition } from "./types";

// Create context for table state
const TableContext = createContext<TableContextValue<any>>({
  data: [],
  columns: [],
  autoGenerateRowKey: true,
});

// Hook to use table context
export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a Table component");
  }
  return context;
};

// Table Container Component
const TableContainer: React.FC<TableContainerProps> = ({ children, horizontalScroll = false, className = "", ...props }) => {
  return (
    <div
      className={`blox-table-container ${className}`}
      data-blox-table-container=""
      data-horizontal-scroll={horizontalScroll}
      style={{
        overflowX: horizontalScroll ? "auto" : undefined,
        width: "100%",
      }}
      {...props}>
      {children}
    </div>
  );
};

// Table Caption Component
const TableCaption: React.FC<TableCaptionProps> = ({ children, className = "", ...props }) => {
  return (
    <caption
      className={`blox-table-caption ${className}`}
      data-blox-table-caption=""
      {...props}>
      {children}
    </caption>
  );
};

// Table Header Component
const TableHeader: React.FC<TableHeaderProps> = ({ children, className = "", ...props }) => {
  return (
    <thead
      className={`blox-table-header ${className}`}
      data-blox-table-header=""
      {...props}>
      {children}
    </thead>
  );
};

// Table Body Component
const TableBody: React.FC<TableBodyProps> = ({ children, className = "", ...props }) => {
  return (
    <tbody
      className={`blox-table-body ${className}`}
      data-blox-table-body=""
      {...props}>
      {children}
    </tbody>
  );
};

// Table Row Component
const TableRow: React.FC<TableRowProps> = ({ children, className = "", ...props }) => {
  return (
    <tr
      className={`blox-table-row ${className}`}
      data-blox-table-row=""
      {...props}>
      {children}
    </tr>
  );
};

// Table Header Cell Component
const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ children, columnId, sortable = false, sorted = false, sortDirection = "none", onSort, center = false, width, className = "", style, ...props }) => {
  // Internal props for the context version
  const table = useContext(TableContext);

  // Determine if this column is sorted (when used within Table)
  const isSorted = sorted || (columnId && table.sortColumn === columnId);
  const effectiveSortDirection = isSorted ? sortDirection || table.sortDirection || "none" : "none";

  // Handle sort click
  const handleSortClick = useCallback(() => {
    if (!sortable) return;

    if (onSort && columnId) {
      onSort(columnId);
    } else if (table.onSort && columnId) {
      let newDirection: SortDirection = "asc";

      if (columnId === table.sortColumn) {
        if (table.sortDirection === "asc") {
          newDirection = "desc";
        } else if (table.sortDirection === "desc") {
          newDirection = "none";
        }
      }

      table.onSort(columnId, newDirection);
    }
  }, [sortable, onSort, columnId, table]);

  return (
    <th
      className={`blox-table-header-cell ${className}`}
      data-blox-table-header-cell=""
      data-sortable={sortable}
      data-sorted={isSorted}
      data-sort-direction={effectiveSortDirection}
      data-center={center}
      onClick={sortable ? handleSortClick : undefined}
      style={{
        ...(width ? { width } : {}),
        ...(center ? { textAlign: "center" } : {}),
        cursor: sortable ? "pointer" : undefined,
        ...style,
      }}
      {...props}>
      {children}
      {sortable && (
        <span
          className="blox-table-sort-icon"
          data-blox-table-sort-icon="">
          {effectiveSortDirection === "asc" && "▲"}
          {effectiveSortDirection === "desc" && "▼"}
          {effectiveSortDirection === "none" && "⇅"}
        </span>
      )}
    </th>
  );
};

// Table Cell Component
const TableCell: React.FC<TableCellProps> = ({ children, columnId, center = false, className = "", style, ...props }) => {
  return (
    <td
      className={`blox-table-cell ${className}`}
      data-blox-table-cell=""
      data-column-id={columnId}
      data-center={center}
      style={{
        ...(center ? { textAlign: "center" } : {}),
        ...style,
      }}
      {...props}>
      {children}
    </td>
  );
};

// Table Empty State Component
const TableEmpty: React.FC<TableEmptyStateProps> = ({ children = "No data available", colSpan, className = "", ...props }) => {
  const table = useContext(TableContext);
  const effectiveColSpan = colSpan || table.columns.length || 1;

  return (
    <tr
      className={`blox-table-empty ${className}`}
      data-blox-table-empty=""
      {...props}>
      <td
        colSpan={effectiveColSpan}
        className="blox-table-empty-cell"
        data-blox-table-empty-cell=""
        style={{ textAlign: "center", padding: "1rem" }}>
        {children}
      </td>
    </tr>
  );
};

// Table Loading State Component
const TableLoading: React.FC<TableLoadingStateProps> = ({ children = "Loading...", colSpan, className = "", ...props }) => {
  const table = useContext(TableContext);
  const effectiveColSpan = colSpan || table.columns.length || 1;

  return (
    <tr
      className={`blox-table-loading ${className}`}
      data-blox-table-loading=""
      {...props}>
      <td
        colSpan={effectiveColSpan}
        className="blox-table-loading-cell"
        data-blox-table-loading-cell=""
        style={{ textAlign: "center", padding: "1rem" }}>
        {children}
      </td>
    </tr>
  );
};

// Main Table Component
const Table = <T extends Record<string, any> = any>({ data = [], columns = [], sortColumn, sortDirection = "none", onSort, autoGenerateRowKey = true, getRowKey, getRowClassName, children, className = "", ...props }: TableProps<T> & { children?: React.ReactNode }) => {
  // Context value
  const contextValue = useMemo(
    () => ({
      data,
      columns,
      sortColumn,
      sortDirection,
      onSort,
      autoGenerateRowKey,
      getRowKey,
      getRowClassName,
    }),
    [data, columns, sortColumn, sortDirection, onSort, autoGenerateRowKey, getRowKey, getRowClassName]
  );

  // Render function for compositional usage vs. declarative
  const renderContent = () => {
    // If children are provided, use compositional pattern
    if (children) {
      return children;
    }

    // Otherwise, use declarative pattern with columns and data
    return (
      <>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell
                key={column.id}
                columnId={column.id}
                sortable={column.sortable}
                center={column.center}
                width={column.width}
                {...column.headerProps}>
                {column.header}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableEmpty colSpan={columns.length} />
          ) : (
            data.map((row, rowIndex) => {
              const rowKey = getRowKey ? getRowKey(row, rowIndex) : autoGenerateRowKey ? `row-${rowIndex}` : undefined;

              const rowClassName = getRowClassName ? getRowClassName(row, rowIndex) : "";

              return (
                <TableRow
                  key={rowKey}
                  className={rowClassName}>
                  {columns.map((column) => {
                    // Get cell content
                    let cellContent;
                    if (column.cell) {
                      const value = column.accessor ? column.accessor(row, rowIndex) : row[column.id];
                      cellContent = column.cell(value, row, rowIndex);
                    } else if (column.accessor) {
                      cellContent = column.accessor(row, rowIndex);
                    } else {
                      cellContent = row[column.id];
                    }

                    return (
                      <TableCell
                        key={`${rowKey}-${column.id}`}
                        columnId={column.id}
                        center={column.center}
                        {...column.cellProps}>
                        {cellContent}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </>
    );
  };

  return (
    <TableContext.Provider value={contextValue}>
      <table
        className={`blox-table ${className}`}
        data-blox-table=""
        {...props}>
        {renderContent()}
      </table>
    </TableContext.Provider>
  );
};

// Attach sub-components
Table.Container = TableContainer;
Table.Caption = TableCaption;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeaderCell = TableHeaderCell;
Table.Cell = TableCell;
Table.Empty = TableEmpty;
Table.Loading = TableLoading;

export default Table;
