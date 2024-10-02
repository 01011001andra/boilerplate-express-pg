export default interface ExampleType {
  id?: string
  name: string
  type: string
}

export type CreateService = (params: ExampleType) => Promise<ExampleType>
