import React, { useState } from "react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Table } from "../components/Table";
// Table example component to be added at the top of App.tsx with the other state variables
export const TableExample = () => {
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | "none">("none");

  // Sample data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "Editor", status: "Inactive" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", role: "User", status: "Active" },
    { id: 5, name: "Michael Wilson", email: "michael@example.com", role: "Admin", status: "Inactive" },
  ];

  const [data, setData] = useState(users);

  // Handle sorting
  const handleSort = (columnId: string, direction: "asc" | "desc" | "none") => {
    setSortColumn(columnId);
    setSortDirection(direction);

    // Sort the data
    if (direction === "none") {
      setData([...users]); // Reset to original order
    } else {
      const sortedData = [...data].sort((a: any, b: any) => {
        if (a[columnId] < b[columnId]) return direction === "asc" ? -1 : 1;
        if (a[columnId] > b[columnId]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      setData(sortedData);
    }
  };

  // Custom status badge component
  const StatusBadge = ({ status }: { status: string }) => (
    <Badge
      variant={status === "Active" ? "success" : "danger"}
      pill>
      {status}
    </Badge>
  );

  // Define columns
  const columns = [
    {
      id: "id",
      header: "ID",
      width: "50px",
      sortable: true,
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
      center: true,
    },
    {
      id: "status",
      header: "Status",
      sortable: true,
      center: true,
      // Custom cell renderer
      cell: (value: string) => <StatusBadge status={value} />,
    },
    {
      id: "actions",
      header: "Actions",
      center: true,
      // Custom cell with buttons
      cell: (_: any, row: any) => (
        <div className="flex justify-center space-x-2">
          <Button
            size="xs"
            variant="info">
            Edit
          </Button>
          <Button
            size="xs"
            variant="danger">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Apply styling
  return (
    <div>
      {/* Custom CSS for the table */}

      <Table
        data={data}
        columns={columns}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        hover
        bordered
        caption="User Management Table"
        emptyContent={<div className="py-8 text-center text-gray-500">No users found</div>}
      />
    </div>
  );
};
