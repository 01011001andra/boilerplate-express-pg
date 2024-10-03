export interface PaginationType {
  currentPage: number
  totalPages: number
  total: number
}

export interface PaginationQueryType {
  limit: string
  page: string
  search: string
}
