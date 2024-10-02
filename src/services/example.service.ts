import db from '../configs/db'
import { CreateService, FindManyService, FindUniqueService } from '../types/example.type'

const create: CreateService = async ({ name, type }) => {
  const query = `
    INSERT INTO
      example (name, type)
    VALUES
      ($1, $2)
    RETURNING *
    `

  const result = await db.query(query, [name, type])
  return result.rows[0]
}

const findMany: FindManyService = async ({ limit, page, search }) => {
  const query = `SELECT * FROM example`
  const limitInt = parseInt(limit)
  const pageInt = parseInt(page)

  console.log(limitInt, pageInt, search)

  const result = await db.query(query)
  const data = {
    docs: result.rows,
    pagination: {
      currentPage: 0,
      totalPages: 0,
      total: 0
    }
  }
  return data
}

const findUnique: FindUniqueService = async ({ exampleId }) => {
  const query = `SELECT * FROM example WHERE id=$1`

  const result = await db.query(query, [exampleId])
  return result.rows[0]
}

export default { create, findMany, findUnique }
