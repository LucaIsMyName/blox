import React, { useEffect } from "react";
import { TableProps, TableColumn, SortDirection } from "./types";
import { getComponentConfig, injectComponentStyles } from "../../utils/configLoader";

const SortIcon = ({ direction }: { direction: SortDirection }) => {
  if (direction === "none") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M7 10l5 5 5-5" />
      </svg>
    );
  } else if (direction === "asc") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    );
  }
};

export const Table = <T extends Record<string, any>>(props: TableProps<T>) => {
  // Load component configuration and merge with props
  const config = getComponentConfig<TableProps<T>>("Table");

  const { data = [], columns, sortColumn, sortDirection = "none", onSort, striped = config.props.striped || false, bordered = config.props.bordered || false, hover = config.props.hover || false, compact = config.props.compact || false, stickyHeader = config.props.stickyHeader || false, horizontalScroll = config.props.horizontalScroll || false, getRowClassName, tableProps, theadProps, tbodyProps, loading = config.props.loading || false, emptyContent = "No data available", loadingContent = "Loading...", containerComponent: Container = "div", autoGenerateRowKey = true, getRowKey, caption, showCaption = true, variant = config.props.variant || "primary", className = "", ...rest } = props;

  // Inject component-specific styles on mount
  useEffect(() => {
    injectComponentStyles("Table");
  }, []);

  // Handle column sorting
  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable || !onSort) return;

    let newDirection: SortDirection = "asc";

    if (column.id === sortColumn) {
      if (sortDirection === "asc") {
        newDirection = "desc";
      } else if (sortDirection === "desc") {
        newDirection = "none";
      }
    }

    onSort(column.id, newDirection);
  };

  // Render header cell
  const renderHeaderCell = (column: TableColumn<T>, index: number) => {
    const isSorted = column.id === sortColumn;
    const currentDirection = isSorted ? sortDirection : "none";

    return (
      <th
        key={column.id}
        style={{ width: column.width }}
        onClick={() => column.sortable && handleSort(column)}
        data-sortable={column.sortable}
        data-sorted={isSorted}
        data-sort-direction={currentDirection}
        data-center={column.center}
        {...column.headerProps}>
        <div className="flex items-center justify-between">
          <span>{column.header}</span>
          {column.sortable && (
            <span className="ml-1">
              <SortIcon direction={currentDirection} />
            </span>
          )}
        </div>
      </th>
    );
  };

  // Render cell content
  const getCellContent = (row: T, column: TableColumn<T>, rowIndex: number) => {
    if (column.cell) {
      const accessorValue = column.accessor ? column.accessor(row, rowIndex) : row[column.id];
      return column.cell(accessorValue, row, rowIndex);
    } else if (column.accessor) {
      return column.accessor(row, rowIndex);
    } else {
      return row[column.id];
    }
  };

  // Render row
  const renderRow = (row: T, rowIndex: number) => {
    const rowKey = getRowKey ? getRowKey(row, rowIndex) : autoGenerateRowKey ? `row-${rowIndex}` : undefined;

    const rowClassName = getRowClassName ? getRowClassName(row, rowIndex) : "";

    return (
      <tr
        key={rowKey}
        className={rowClassName}
        data-row-index={rowIndex}>
        {columns.map((column, colIndex) => (
          <td
            key={`${rowKey}-${column.id}`}
            data-column-id={column.id}
            data-center={column.center}
            {...column.cellProps}>
            {getCellContent(row, column, rowIndex)}
          </td>
        ))}
      </tr>
    );
  };

  // Render content based on loading and data state
  const renderContent = () => {
    if (loading) {
      return (
        <tr>
          <td
            colSpan={columns.length}
            data-loading="true">
            {loadingContent}
          </td>
        </tr>
      );
    }

    if (data.length === 0) {
      return (
        <tr>
          <td
            colSpan={columns.length}
            data-empty="true">
            {emptyContent}
          </td>
        </tr>
      );
    }

    return data.map(renderRow);
  };

  return (
    <Container
      data-blox="table-container"
      data-horizontal-scroll={horizontalScroll}
      {...rest}>
      <table
        data-blox="table"
        data-variant={variant}
        data-striped={striped}
        data-bordered={bordered}
        data-hover={hover}
        data-compact={compact}
        data-loading={loading}
        data-empty={data.length === 0}
        className={className}
        {...tableProps}>
        {caption && showCaption && <caption>{caption}</caption>}

        <thead
          data-blox="table-head"
          data-sticky={stickyHeader}
          {...theadProps}>
          <tr>{columns.map(renderHeaderCell)}</tr>
        </thead>

        <tbody
          data-blox="table-body"
          {...tbodyProps}>
          {renderContent()}
        </tbody>
      </table>
    </Container>
  );
};
