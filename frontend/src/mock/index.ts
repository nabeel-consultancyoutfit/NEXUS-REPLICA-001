/**
 * Workspace mock data — used by the dashboard demo page.
 * This is the original workspace mock, separate from the clone module mock.
 */

// ─── TanStack Table mock data ────────────────────────────────────────────────
export const mockTableData = [
  { id: 1,  name: 'Alice Johnson',   email: 'alice@nexusai.io',    status: 'active',   role: 'Admin',    createdAt: '2025-01-15T10:00:00Z' },
  { id: 2,  name: 'Bob Chen',        email: 'bob@nexusai.io',      status: 'active',   role: 'Developer', createdAt: '2025-02-01T09:00:00Z' },
  { id: 3,  name: 'Carol Smith',     email: 'carol@nexusai.io',    status: 'pending',  role: 'Designer',  createdAt: '2025-02-14T14:30:00Z' },
  { id: 4,  name: 'David Lee',       email: 'david@nexusai.io',    status: 'inactive', role: 'Analyst',   createdAt: '2025-03-01T11:00:00Z' },
  { id: 5,  name: 'Eva Martinez',    email: 'eva@nexusai.io',      status: 'active',   role: 'Developer', createdAt: '2025-03-10T08:45:00Z' },
  { id: 6,  name: 'Frank Wilson',    email: 'frank@nexusai.io',    status: 'active',   role: 'Manager',   createdAt: '2025-03-20T16:00:00Z' },
  { id: 7,  name: 'Grace Kim',       email: 'grace@nexusai.io',    status: 'pending',  role: 'Designer',  createdAt: '2025-04-01T10:15:00Z' },
  { id: 8,  name: 'Henry Park',      email: 'henry@nexusai.io',    status: 'active',   role: 'Developer', createdAt: '2025-04-05T09:30:00Z' },
  { id: 9,  name: 'Iris Thompson',   email: 'iris@nexusai.io',     status: 'inactive', role: 'Analyst',   createdAt: '2025-04-12T13:00:00Z' },
  { id: 10, name: 'Jack Davis',      email: 'jack@nexusai.io',     status: 'active',   role: 'Admin',     createdAt: '2025-04-20T11:45:00Z' },
  { id: 11, name: 'Karen White',     email: 'karen@nexusai.io',    status: 'active',   role: 'Developer', createdAt: '2025-05-01T09:00:00Z' },
  { id: 12, name: 'Leo Brown',       email: 'leo@nexusai.io',      status: 'pending',  role: 'Designer',  createdAt: '2025-05-10T14:00:00Z' },
];

// ─── ApexCharts mock data ─────────────────────────────────────────────────────
export const mockChartCategories = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const mockChartSeries = [
  {
    name: 'Revenue ($k)',
    data: [42, 58, 53, 67, 72, 88, 95, 89, 104, 118, 112, 131],
  },
  {
    name: 'Users',
    data: [120, 145, 160, 175, 190, 215, 240, 228, 255, 280, 265, 310],
  },
];
