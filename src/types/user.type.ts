import { PaginationQueryType, PaginationType } from './pagination.type'

export interface UserType {
  id: string
  first_name: string
  last_name: string
  password: string
  birth_date: string
  address: string
  phone: string
  email: string
  email_verified: boolean
  job_title: string
  role: 'admin' | 'mentor' | 'student'
  created_at: string
  updated_at: string
}

export type UserCreate = (params: Omit<UserType, 'id' | 'created_at' | 'updated_at'>) => Promise<Omit<UserType, 'password'>>
export type UserFindMany = (params: PaginationQueryType) => Promise<{ docs: UserType[]; pagination: PaginationType }>
export type UserFindUnique = (params: { id: string }) => Promise<UserType>
export type UserFindUniqueEmail = (params: { email: string }) => Promise<Pick<UserType, 'email' | 'role' | 'email_verified' | 'password'>>
export type UserUpdate = (params: Omit<UserType, 'password' | 'created_at' | 'updated_at'>) => Promise<Omit<UserType, 'password'>>
export type UserDelete = (params: { id: string }) => Promise<UserType>

export type UserRegister = (params: Pick<UserType, 'email' | 'password'>) => Promise<Pick<UserType, 'email' | 'role'>>
export type UserLogin = (params: Pick<UserType, 'email' | 'password'>) => Promise<Pick<UserType, 'email' | 'role' | 'email_verified'>>
