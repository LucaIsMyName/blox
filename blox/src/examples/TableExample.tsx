// TableExample.tsx
import React, { useState } from "react";
import { Table, SortDirection } from "../components/Table";

// Define types for our data
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

export const TableExample: React.FC = () => {
  // Sample data
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active", lastLogin: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "active", lastLogin: "2023-01-20" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "inactive", lastLogin: "2022-12-05" },
    { id: 4, name: "Alice Williams", email: "alice@example.com", role: "Editor", status: "active", lastLogin: "2023-01-18" },
    { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "Viewer", status: "inactive", lastLogin: "2023-01-10" },
  ];

  // For sorting state
  const [sortColumn, setSortColumn] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Sort handler
  const handleSort = (columnId: string, direction: SortDirection) => {
    setSortColumn(columnId);
    setSortDirection(direction);
  };

  // Get sorted data
  const getSortedData = () => {
    if (sortDirection === "none" || !sortColumn) {
      return users;
    }

    return [...users].sort((a, b) => {
      let valueA = a[sortColumn as keyof User];
      let valueB = b[sortColumn as keyof User];

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
      cell: (value: string) => (
        <span
          className={`status-badge ${value === "active" ? "status-active" : "status-inactive"}`}
          data-status={value}>
          {value}
        </span>
      ),
    },
    {
      id: "lastLogin",
      header: "Last Login",
      sortable: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: (_: any, user: User) => (
        <div className="action-buttons">
          <button onClick={() => alert(`Edit user: ${user.name}`)}>Edit</button>
          <button onClick={() => alert(`Delete user: ${user.name}`)}>Delete</button>
        </div>
      ),
    },
  ];

  // Loading state demo
  const [isLoading, setIsLoading] = useState(false);

  // Empty state demo
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <div className="table-examples">
      <h2>Table Examples</h2>

      <div className="example-section">
        <h3>Basic Table</h3>
        <p>A declarative table with sortable columns</p>

        <div className="control-buttons">
          <button onClick={() => setIsLoading(!isLoading)}>{isLoading ? "Show Data" : "Show Loading State"}</button>
          <button onClick={() => setIsEmpty(!isEmpty)}>{isEmpty ? "Show Data" : "Show Empty State"}</button>
        </div>

        <Table.Container horizontalScroll>
          <Table
            data={isEmpty ? [] : isLoading ? [] : getSortedData()}
            columns={columns}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            getRowKey={(user) => user.id}
            getRowClassName={(user) => (user.status === "inactive" ? "inactive-row" : "")}
            className="basic-table">
            <Table.Caption>Users Management Table</Table.Caption>
            {isLoading && (
              <Table.Body>
                <Table.Loading>Loading users data...</Table.Loading>
              </Table.Body>
            )}
            {isEmpty && (
              <Table.Body>
                <Table.Empty>No users found</Table.Empty>
              </Table.Body>
            )}
          </Table>
        </Table.Container>
      </div>

      <div className="example-section">
        <h3>Composable Table</h3>
        <p>A fully composable table built with subcomponents</p>

        <Table.Container>
          <Table className="composable-table">
            <Table.Caption>Composable User Table Example</Table.Caption>

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Role</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users.map((user) => (
                <Table.Row
                  key={user.id}
                  className={user.status === "inactive" ? "inactive-row" : ""}>
                  <Table.Cell center>{user.id}</Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>
                    <span
                      className={`status-badge ${user.status === "active" ? "status-active" : "status-inactive"}`}
                      data-status={user.status}>
                      {user.status}
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.Container>
      </div>

      <div className="example-section">
        <h3>Custom Styled Table</h3>
        <p>A table with custom styling using CSS variables</p>

        <Table.Container>
          <Table className="custom-styled-table">
            <Table.Caption>Custom Styled Table</Table.Caption>

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users.slice(0, 3).map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell center>{user.id}</Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.Container>
      </div>

      {/* Styles for the examples */}
      <style>{`
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
        .inactive-row {
          font-style: italic;
          color: #6c757d;
        }
        
        /* Empty and loading states */
        [data-blox-table-empty-cell],
        [data-blox-table-loading-cell] {
          padding: 24px;
          text-align: center;
          color: #6c757d;
        }
        
        /* Custom styled table */
        .custom-styled-table {
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
        
        .custom-styled-table [data-blox-table-header-cell] {
          background-color: var(--table-header-bg);
          color: var(--table-header-color);
          border-bottom: var(--table-header-border);
          padding: var(--table-cell-padding);
        }
        
        .custom-styled-table [data-blox-table-cell] {
          border-bottom: 1px solid var(--table-row-border);
          padding: var(--table-cell-padding);
        }
        
        .custom-styled-table [data-blox-table-row]:hover [data-blox-table-cell] {
          background-color: var(--table-row-hover-bg);
        }
        
        .custom-styled-table [data-blox-table-caption] {
          padding: 16px;
          font-weight: 600;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default TableExample;
