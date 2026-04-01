export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface TableColumn<T> {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  render?: (row: T) => React.ReactNode;
}

export type Status = 'active' | 'inactive' | 'pending' | 'completed';

export interface UserBasic {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}
