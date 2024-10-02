import { PaginationType } from './pagination.type'

export default interface ExampleType {
  id?: string
  name: string
  type: string
}

export type CreateService = (params: ExampleType) => Promise<ExampleType>
export type FindManyService = (params: {
  limit: string
  page: string
  search: string
}) => Promise<{ docs: ExampleType[]; pagination: PaginationType }>
export type FindUniqueService = (params: { exampleId: string }) => Promise<ExampleType>
