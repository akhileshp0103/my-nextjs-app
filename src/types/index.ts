export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ItemData {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  createdAt: Date;
}
