export interface Model {
  id: string;
  name: string;
  provider: string;
  providerLogo?: string;
  description: string;
  capabilities: string[];
  rating: number;
  ratingCount: number;
  priceType: 'free' | 'paid' | 'freemium';
  price?: number;
  priceUnit?: string;
  license: string;
  tags: string[];
  status?: 'new' | 'hot' | 'open' | null;
  createdAt: string;
  updatedAt: string;
}

export interface ModelFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  provider?: string[];
  capability?: string[];
  priceType?: string[];
  minRating?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedModelResponse {
  data: Model[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
