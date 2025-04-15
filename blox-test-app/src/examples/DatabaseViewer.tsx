import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Table, Drawer, Switch, Toggle } from "blox-ui-react";

// Sample data for the database
const USERS = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2025-03-25" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active", lastLogin: "2025-03-27" },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "Viewer", status: "Inactive", lastLogin: "2025-02-15" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Editor", status: "Active", lastLogin: "2025-03-26" },
  { id: 5, name: "Michael Wilson", email: "michael@example.com", role: "Admin", status: "Active", lastLogin: "2025-03-28" },
  { id: 6, name: "Sarah Thompson", email: "sarah@example.com", role: "Viewer", status: "Inactive", lastLogin: "2025-01-30" },
  { id: 7, name: "David Martinez", email: "david@example.com", role: "Editor", status: "Active", lastLogin: "2025-03-20" },
];

function DatabaseViewer() {
  const [selectedUser, setSelectedUser]: any[] = useState(null);
  const [drawerOpen, setDrawerOpen]: any[] = useState(false);
  const [sortColumn, setSortColumn]: any[] = useState("name");
  const [sortDirection, setSortDirection]: any[] = useState("asc");
  const [filterRole, setFilterRole]: any[] = useState("all");
  const [showInactive, setShowInactive]: any[] = useState(false);

  // Handle sorting
  const handleSort = (columnId: number) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  // Filter and sort data
  const filteredData = USERS.filter((user) => {
    if (filterRole !== "all" && user.role !== filterRole) return false;
    if (!showInactive && user.status === "Inactive") return false;
    return true;
  }).sort((a: any, b: any) => {
    const factor = sortDirection === "asc" ? 1 : -1;
    if (a[sortColumn] < b[sortColumn]) return -1 * factor;
    if (a[sortColumn] > b[sortColumn]) return 1 * factor;
    return 0;
  });

  // Column definitions
  const columns = [
    { id: "name", header: "Name", sortable: true },
    { id: "email", header: "Email", sortable: true },
    { id: "role", header: "Role", sortable: true },
    { id: "status", header: "Status", sortable: true },
    { id: "lastLogin", header: "Last Login", sortable: true },
    { id: "actions", header: "Actions", sortable: false },
  ];

  // Handle row click
  const handleRowClick = (user: any) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Users Database</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add New User</button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="p-2 border border-gray-300 rounded">
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>

        <div className="flex items-end">
          {/* Replace Checkbox with Switch */}
          <Switch
            checked={showInactive}
            onChange={setShowInactive}
            label="Show inactive users"
            className="ml-4"
            trackClassName={showInactive ? "bg-sky-600" : "bg-gray-200"}
            thumbClassName={showInactive ? "bg-sky-50" : "bg-white"}
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <Table
          columns={columns}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          className="w-full">
          <Table.Caption className="sr-only">Users Database</Table.Caption>
          <Table.Header>
            <Table.Row className="bg-gray-50">
              {columns.map((column: any) => (
                <Table.HeaderCell
                  key={column.id}
                  onClick={() => column.sortable && handleSort(column.id)}
                  className={`p-4 text-left text-sm font-medium text-gray-600 ${column.sortable ? "cursor-pointer hover:bg-gray-100" : ""}`}>
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable && sortColumn === column.id && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </div>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredData.map((user: any) => (
              <Table.Row
                key={user.id}
                onClick={() => handleRowClick(user)}
                className="hover:bg-gray-50 cursor-pointer border-t border-gray-200">
                <Table.Cell className="p-4">{user.name}</Table.Cell>
                <Table.Cell className="p-4">{user.email}</Table.Cell>
                <Table.Cell className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${user.role === "Admin" ? "bg-purple-100 text-purple-800" : user.role === "Editor" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>{user.role}</span>
                </Table.Cell>
                <Table.Cell className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{user.status}</span>
                </Table.Cell>
                <Table.Cell className="p-4">{user.lastLogin}</Table.Cell>
                <Table.Cell className="p-4">
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* User Detail Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="right"
        maxWidth={768}
        showCloseButton={false}
        className="w-full bg-white shadow-xl">
        <Drawer.Header className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">User Details</h3>
          <button
            onClick={() => setDrawerOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            ×
          </button>
        </Drawer.Header>

        <Drawer.Body className="p-6">
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-semibold">{selectedUser.name.charAt(0)}</div>
                <div className="ml-4">
                  <h4 className="text-xl font-medium">{selectedUser.name}</h4>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium">{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Toggle
                    pressed={selectedUser.status === "Active"}
                    onChange={() => {}}
                    className={`mt-1 px-3 py-1 text-sm rounded ${selectedUser.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                    {selectedUser.status}
                  </Toggle>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Login</p>
                  <p className="font-medium">{selectedUser.lastLogin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-medium">{selectedUser.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">UUID</p>
                  <p className="text-sm">{uuid()}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <h5 className="font-medium mb-2">Permissions</h5>
                <div className="space-y-4">
                  {/* Add styling to make Switch components visible */}
                  <div className="flex items-center">
                    <Switch
                      label="View dashboard"
                      defaultChecked={true}
                      className="flex items-center"
                      trackClassName={"bg-sky-600"}
                      thumbClassName={"bg-white"}
                    />
                  </div>

                  <div className="flex items-center">
                    <Switch
                      label="Edit content"
                      defaultChecked={selectedUser.role !== "Viewer"}
                      className="flex items-center"
                      trackClassName={selectedUser.role !== "Viewer" ? "bg-sky-600" : "bg-gray-200"}
                      thumbClassName={selectedUser.role !== "Viewer" ? "bg-sky-50" : "bg-white"}
                    />
                  </div>

                  <div className="flex items-center">
                    <Switch
                      label="Manage users"
                      defaultChecked={selectedUser.role === "Admin"}
                      className="flex items-center"
                      trackClassName={selectedUser.role === "Admin" ? "bg-sky-600" : "bg-gray-200"}
                      thumbClassName={selectedUser.role === "Admin" ? "bg-sky-50" : "bg-white"}
                    />
                  </div>

                  <div className="flex items-center">
                    <Switch
                      label="Access settings"
                      defaultChecked={selectedUser.role === "Admin"}
                      className="flex items-center"
                      trackClassName={selectedUser.role === "Admin" ? "bg-sky-600" : "bg-gray-200"}
                      thumbClassName={selectedUser.role === "Admin" ? "bg-sky-50" : "bg-white"}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Drawer.Body>

        <Drawer.Footer className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
          <button
            onClick={() => setDrawerOpen(false)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
}

export default DatabaseViewer;
