export interface PaginationType {
  currentPage: number
  totalPages: number
  total: number
}

export interface PaginationQueryType {
  limit: number
  page: number
  search: string
}
