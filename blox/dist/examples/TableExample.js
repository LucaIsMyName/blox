import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// TableExample.tsx
import { useState } from "react";
import { Table } from "../components/Table";
export const TableExample = () => {
    // Sample data
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active", lastLogin: "2023-01-15" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "active", lastLogin: "2023-01-20" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "inactive", lastLogin: "2022-12-05" },
        { id: 4, name: "Alice Williams", email: "alice@example.com", role: "Editor", status: "active", lastLogin: "2023-01-18" },
        { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "Viewer", status: "inactive", lastLogin: "2023-01-10" },
    ];
    // For sorting state
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("none");
    // Sort handler
    const handleSort = (columnId, direction) => {
        setSortColumn(columnId);
        setSortDirection(direction);
    };
    // Get sorted data
    const getSortedData = () => {
        if (sortDirection === "none" || !sortColumn) {
            return users;
        }
        return [...users].sort((a, b) => {
            let valueA = a[sortColumn];
            let valueB = b[sortColumn];
            // Handle string comparisons
            if (typeof valueA === "string" && typeof valueB === "string") {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }
            if (valueA < valueB) {
                return sortDirection === "asc" ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDirection === "asc" ? 1 : -1;
            }
            return 0;
        });
    };
    // Column definitions
    const columns = [
        {
            id: "id",
            header: "ID",
            sortable: true,
            width: "60px",
            center: true,
        },
        {
            id: "name",
            header: "Name",
            sortable: true,
        },
        {
            id: "email",
            header: "Email",
            sortable: true,
        },
        {
            id: "role",
            header: "Role",
            sortable: true,
        },
        {
            id: "status",
            header: "Status",
            sortable: true,
            cell: (value) => (_jsx("span", { className: `status-badge ${value === "active" ? "status-active" : "status-inactive"}`, "data-status": value, children: value })),
        },
        {
            id: "lastLogin",
            header: "Last Login",
            sortable: true,
        },
        {
            id: "actions",
            header: "Actions",
            cell: (_, user) => (_jsxs("div", { className: "action-buttons", children: [_jsx("button", { onClick: () => alert(`Edit user: ${user.name}`), children: "Edit" }), _jsx("button", { onClick: () => alert(`Delete user: ${user.name}`), children: "Delete" })] })),
        },
    ];
    // Loading state demo
    const [isLoading, setIsLoading] = useState(false);
    // Empty state demo
    const [isEmpty, setIsEmpty] = useState(false);
    return (_jsxs("div", { className: "table-examples", children: [_jsx("h2", { children: "Table Examples" }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Basic Table" }), _jsx("p", { children: "A declarative table with sortable columns" }), _jsxs("div", { className: "control-buttons", children: [_jsx("button", { onClick: () => setIsLoading(!isLoading), children: isLoading ? "Show Data" : "Show Loading State" }), _jsx("button", { onClick: () => setIsEmpty(!isEmpty), children: isEmpty ? "Show Data" : "Show Empty State" })] }), _jsx(Table.Container, { horizontalScroll: true, children: _jsxs(Table, { data: isEmpty ? [] : isLoading ? [] : getSortedData(), columns: columns, sortColumn: sortColumn, sortDirection: sortDirection, onSort: handleSort, getRowKey: (user) => user.id, getRowClassName: (user) => (user.status === "inactive" ? "inactive-row" : ""), children: [_jsx(Table.Caption, { children: "Users Management Table" }), isLoading ? (_jsxs(_Fragment, { children: [_jsx(Table.Header, { children: _jsx(Table.Row, { children: columns.map((column) => (_jsx(Table.HeaderCell, { columnId: column.id, sortable: column.sortable, width: column.width, center: column.center, children: column.header }, column.id))) }) }), _jsx(Table.Body, { children: _jsx(Table.Loading, { children: "Loading users data..." }) })] })) : isEmpty ? (_jsxs(_Fragment, { children: [_jsx(Table.Header, { children: _jsx(Table.Row, { children: columns.map((column) => (_jsx(Table.HeaderCell, { columnId: column.id, sortable: column.sortable, width: column.width, center: column.center, children: column.header }, column.id))) }) }), _jsx(Table.Body, { children: _jsx(Table.Empty, { children: "No users found" }) })] })) : null /* The table will render declaratively from data and columns props */] }) })] }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Composable Table" }), _jsx("p", { children: "A fully composable table built with subcomponents" }), _jsx(Table.Container, { children: _jsxs(Table, { className: "composable-table", children: [_jsx(Table.Caption, { children: "Composable User Table Example" }), _jsx(Table.Header, { children: _jsxs(Table.Row, { children: [_jsx(Table.HeaderCell, { children: "ID" }), _jsx(Table.HeaderCell, { children: "Name" }), _jsx(Table.HeaderCell, { children: "Email" }), _jsx(Table.HeaderCell, { children: "Role" }), _jsx(Table.HeaderCell, { children: "Status" })] }) }), _jsx(Table.Body, { children: users.map((user) => (_jsxs(Table.Row, { className: user.status === "inactive" ? "inactive-row" : "", children: [_jsx(Table.Cell, { center: true, children: user.id }), _jsx(Table.Cell, { children: user.name }), _jsx(Table.Cell, { children: user.email }), _jsx(Table.Cell, { children: user.role }), _jsx(Table.Cell, { children: _jsx("span", { className: `status-badge ${user.status === "active" ? "status-active" : "status-inactive"}`, "data-status": user.status, children: user.status }) })] }, user.id))) })] }) })] }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Custom Styled Table" }), _jsx("p", { children: "A table with custom styling using CSS variables" }), _jsx(Table.Container, { children: _jsx(Table, { className: "custom-table", data: users.slice(0, 3), columns: columns.slice(0, 5), children: _jsx(Table.Caption, { children: "Custom Styled Table" }) }) })] }), _jsx("style", { children: `
        .table-examples {
          margin: 20px 0;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .example-section {
          margin-bottom: 40px;
        }
        
        .example-section h3 {
          margin-bottom: 8px;
        }
        
        .example-section p {
          margin-bottom: 16px;
          color: #666;
        }
        
        .control-buttons {
          margin-bottom: 16px;
          display: flex;
          gap: 8px;
        }
        
        .control-buttons button {
          padding: 6px 12px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .control-buttons button:hover {
          background-color: #e0e0e0;
        }
        
        /* Basic table styling */
        [data-blox-table] {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
          font-size: 14px;
        }
        
        [data-blox-table-caption] {
          font-weight: 600;
          padding: 10px;
          text-align: left;
          caption-side: top;
        }
        
        [data-blox-table-header-cell] {
          padding: 12px;
          text-align: left;
          font-weight: 600;
          background-color: #f8f9fa;
          border-bottom: 2px solid #e9ecef;
          position: relative;
        }
        
        [data-blox-table-header-cell][data-sortable="true"] {
          cursor: pointer;
          padding-right: 24px;
        }
        
        [data-blox-table-header-cell][data-sortable="true"]:hover {
          background-color: #f1f3f5;
        }
        
        [data-blox-table-sort-icon] {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.6;
        }
        
        [data-blox-table-header-cell][data-sorted="true"] [data-blox-table-sort-icon] {
          opacity: 1;
        }
        
        [data-blox-table-cell] {
          padding: 10px 12px;
          border-bottom: 1px solid #e9ecef;
        }
        
        [data-blox-table-row]:hover [data-blox-table-cell] {
          background-color: #f8f9fa;
        }
        
        /* Status badges */
        .status-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }
        
        .status-active {
          background-color: #e6f7ee;
          color: #0a7141;
        }
        
        .status-inactive {
          background-color: #feeaed;
          color: #b71a2e;
        }
        
        /* Action buttons */
        .action-buttons {
          display: flex;
          gap: 8px;
        }
        
        .action-buttons button {
          padding: 4px 8px;
          font-size: 12px;
          border-radius: 4px;
          border: 1px solid #ced4da;
          background-color: white;
          cursor: pointer;
        }
        
        .action-buttons button:hover {
          background-color: #f8f9fa;
        }
        
        /* Row styling */
        .inactive-row [data-blox-table-cell] {
          color: #6c757d;
          font-style: italic;
        }
        
        /* Empty and loading states */
        [data-blox-table-empty-cell],
        [data-blox-table-loading-cell] {
          padding: 24px;
          text-align: center;
          color: #6c757d;
        }
        
        /* Custom table styling using CSS variables */
        .custom-table {
          --table-header-bg: #4a148c;
          --table-header-color: white;
          --table-header-border: none;
          --table-row-border: #e0e0e0;
          --table-row-hover-bg: #f3e5f5;
          --table-cell-padding: 12px 16px;
          --table-border-radius: 8px;
          
          border-radius: var(--table-border-radius);
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .custom-table [data-blox-table-header-cell] {
          background-color: var(--table-header-bg);
          color: var(--table-header-color);
          border-bottom: var(--table-header-border);
          padding: var(--table-cell-padding);
        }
        
        .custom-table [data-blox-table-cell] {
          border-bottom: 1px solid var(--table-row-border);
          padding: var(--table-cell-padding);
        }
        
        .custom-table [data-blox-table-row]:hover [data-blox-table-cell] {
          background-color: var(--table-row-hover-bg);
        }
        
        .custom-table [data-blox-table-sort-icon] {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .custom-table [data-blox-table-caption] {
          padding: 16px;
          font-weight: 600;
          font-size: 16px;
        }
      ` })] }));
};
export default TableExample;
//# sourceMappingURL=TableExample.js.map