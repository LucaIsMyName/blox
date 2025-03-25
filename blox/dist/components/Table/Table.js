import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Table.tsx
import { createContext, useContext, useCallback, useMemo } from "react";
// Create context for table state
const TableContext = createContext({
    data: [],
    columns: [],
    autoGenerateRowKey: true,
});
// Hook to use table context
const useTable = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error("useTable must be used within a Table component");
    }
    return context;
};
// Table Container Component
const TableContainer = ({ children, horizontalScroll = false, className = "", ...props }) => {
    return (_jsx("div", { className: `blox-table-container ${className}`, "data-blox-table-container": "", "data-horizontal-scroll": horizontalScroll, style: {
            overflowX: horizontalScroll ? "auto" : undefined,
            width: "100%",
        }, ...props, children: children }));
};
// Table Caption Component
const TableCaption = ({ children, className = "", ...props }) => {
    return (_jsx("caption", { className: `blox-table-caption ${className}`, "data-blox-table-caption": "", ...props, children: children }));
};
// Table Header Component
const TableHeader = ({ children, className = "", ...props }) => {
    return (_jsx("thead", { className: `blox-table-header ${className}`, "data-blox-table-header": "", ...props, children: children }));
};
// Table Body Component
const TableBody = ({ children, className = "", ...props }) => {
    return (_jsx("tbody", { className: `blox-table-body ${className}`, "data-blox-table-body": "", ...props, children: children }));
};
// Table Row Component
const TableRow = ({ children, className = "", ...props }) => {
    return (_jsx("tr", { className: `blox-table-row ${className}`, "data-blox-table-row": "", ...props, children: children }));
};
// Table Header Cell Component
const TableHeaderCell = ({ children, columnId, sortable = false, sorted = false, sortDirection = "none", onSort, center = false, width, className = "", style, ...props }) => {
    // Internal props for the context version
    const table = useContext(TableContext);
    // Determine if this column is sorted (when used within Table)
    const isSorted = sorted || (columnId && table.sortColumn === columnId);
    const effectiveSortDirection = isSorted ? sortDirection || table.sortDirection || "none" : "none";
    // Handle sort click
    const handleSortClick = useCallback(() => {
        if (!sortable)
            return;
        if (onSort && columnId) {
            onSort(columnId);
        }
        else if (table.onSort && columnId) {
            let newDirection = "asc";
            if (columnId === table.sortColumn) {
                if (table.sortDirection === "asc") {
                    newDirection = "desc";
                }
                else if (table.sortDirection === "desc") {
                    newDirection = "none";
                }
            }
            table.onSort(columnId, newDirection);
        }
    }, [sortable, onSort, columnId, table]);
    return (_jsxs("th", { className: `blox-table-header-cell ${className}`, "data-blox-table-header-cell": "", "data-sortable": sortable, "data-sorted": isSorted, "data-sort-direction": effectiveSortDirection, "data-center": center, onClick: sortable ? handleSortClick : undefined, style: {
            ...(width ? { width } : {}),
            ...(center ? { textAlign: "center" } : {}),
            cursor: sortable ? "pointer" : undefined,
            ...style,
        }, ...props, children: [children, sortable && (_jsxs("span", { className: "blox-table-sort-icon", "data-blox-table-sort-icon": "", children: [effectiveSortDirection === "asc" && "▲", effectiveSortDirection === "desc" && "▼", effectiveSortDirection === "none" && "⇅"] }))] }));
};
// Table Cell Component
const TableCell = ({ children, columnId, center = false, className = "", style, ...props }) => {
    return (_jsx("td", { className: `blox-table-cell ${className}`, "data-blox-table-cell": "", "data-column-id": columnId, "data-center": center, style: {
            ...(center ? { textAlign: "center" } : {}),
            ...style,
        }, ...props, children: children }));
};
// Table Empty State Component
const TableEmpty = ({ children = "No data available", colSpan, className = "", ...props }) => {
    const table = useContext(TableContext);
    const effectiveColSpan = colSpan || table.columns.length || 1;
    return (_jsx("tr", { className: `blox-table-empty ${className}`, "data-blox-table-empty": "", ...props, children: _jsx("td", { colSpan: effectiveColSpan, className: "blox-table-empty-cell", "data-blox-table-empty-cell": "", style: { textAlign: "center", padding: "1rem" }, children: children }) }));
};
// Table Loading State Component
const TableLoading = ({ children = "Loading...", colSpan, className = "", ...props }) => {
    const table = useContext(TableContext);
    const effectiveColSpan = colSpan || table.columns.length || 1;
    return (_jsx("tr", { className: `blox-table-loading ${className}`, "data-blox-table-loading": "", ...props, children: _jsx("td", { colSpan: effectiveColSpan, className: "blox-table-loading-cell", "data-blox-table-loading-cell": "", style: { textAlign: "center", padding: "1rem" }, children: children }) }));
};
// Main Table Component
const Table = ({ data = [], columns = [], sortColumn, sortDirection = "none", onSort, autoGenerateRowKey = true, getRowKey, getRowClassName, children, className = "", ...props }) => {
    // Context value
    const contextValue = useMemo(() => ({
        data,
        columns,
        sortColumn,
        sortDirection,
        onSort,
        autoGenerateRowKey,
        getRowKey,
        getRowClassName,
    }), [data, columns, sortColumn, sortDirection, onSort, autoGenerateRowKey, getRowKey, getRowClassName]);
    // Render function for compositional usage vs. declarative
    const renderContent = () => {
        // If children are provided, use compositional pattern
        if (children) {
            return children;
        }
        // Otherwise, use declarative pattern with columns and data
        return (_jsxs(_Fragment, { children: [_jsx(TableHeader, { children: _jsx(TableRow, { children: columns.map((column) => (_jsx(TableHeaderCell, { columnId: column.id, sortable: column.sortable, center: column.center, width: column.width, ...column.headerProps, children: column.header }, column.id))) }) }), _jsx(TableBody, { children: data.length === 0 ? (_jsx(TableEmpty, { colSpan: columns.length })) : (data.map((row, rowIndex) => {
                        const rowKey = getRowKey ? getRowKey(row, rowIndex) : autoGenerateRowKey ? `row-${rowIndex}` : undefined;
                        const rowClassName = getRowClassName ? getRowClassName(row, rowIndex) : "";
                        return (_jsx(TableRow, { className: rowClassName, children: columns.map((column) => {
                                // Get cell content
                                let cellContent;
                                if (column.cell) {
                                    const value = column.accessor ? column.accessor(row, rowIndex) : row[column.id];
                                    cellContent = column.cell(value, row, rowIndex);
                                }
                                else if (column.accessor) {
                                    cellContent = column.accessor(row, rowIndex);
                                }
                                else {
                                    cellContent = row[column.id];
                                }
                                return (_jsx(TableCell, { columnId: column.id, center: column.center, ...column.cellProps, children: cellContent }, `${rowKey}-${column.id}`));
                            }) }, rowKey));
                    })) })] }));
    };
    return (_jsx(TableContext.Provider, { value: contextValue, children: _jsx("table", { className: `blox-table ${className}`, "data-blox-table": "", ...props, children: renderContent() }) }));
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
//# sourceMappingURL=Table.js.map