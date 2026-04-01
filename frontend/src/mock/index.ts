import { UserBasic, Status } from '@/types/shared';

export const mockUsers: UserBasic[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  },
];

export const mockTableData: Array<{
  id: string;
  name: string;
  email: string;
  status: Status;
  role: string;
  createdAt: Date;
}> = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'active',
    role: 'Admin',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'active',
    role: 'User',
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    status: 'pending',
    role: 'Moderator',
    createdAt: new Date('2024-03-05'),
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    status: 'active',
    role: 'User',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    status: 'inactive',
    role: 'User',
    createdAt: new Date('2023-12-30'),
  },
  {
    id: '6',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    status: 'active',
    role: 'Editor',
    createdAt: new Date('2024-02-28'),
  },
  {
    id: '7',
    name: 'Robert Miller',
    email: 'robert.miller@example.com',
    status: 'pending',
    role: 'User',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    status: 'active',
    role: 'Admin',
    createdAt: new Date('2024-01-05'),
  },
  {
    id: '9',
    name: 'James Taylor',
    email: 'james.taylor@example.com',
    status: 'completed',
    role: 'User',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '10',
    name: 'Patricia White',
    email: 'patricia.white@example.com',
    status: 'active',
    role: 'Moderator',
    createdAt: new Date('2024-03-01'),
  },
];

export const mockChartSeries = [
  {
    name: 'Series A',
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: 'Series B',
    data: [11, 32, 45, 32, 34, 52, 41],
  },
];

export const mockChartCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
