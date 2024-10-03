import { PaginationQueryType, PaginationType } from './pagination.type'

export default interface ExampleType {
  id: string
  name: string
  type: string
  description: string
  created_at: string
  updated_at: string
}

export type ExampleCreate = (params: Omit<ExampleType, 'id' | 'created_at' | 'updated_at'>) => Promise<ExampleType>
export type ExampleFindMany = (params: PaginationQueryType) => Promise<{ docs: ExampleType[]; pagination: PaginationType }>
export type ExampleFindUnique = (params: Pick<ExampleType, 'id'>) => Promise<ExampleType>
export type ExampleUpdate = (params: Omit<ExampleType, 'created_at' | 'updated_at'>) => Promise<ExampleType>
export type ExampleDelete = (params: Pick<ExampleType, 'id'>) => Promise<ExampleType>
