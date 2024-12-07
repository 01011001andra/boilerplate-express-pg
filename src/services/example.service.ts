import db from '../configs/db'
import { ExampleCreate, ExampleDelete, ExampleFindMany, ExampleFindUnique, ExampleUpdate } from '../types/example.type'

const create: ExampleCreate = async ({ name, type, description }) => {
  const query = `
    INSERT INTO
      examples (name, type, description)
    VALUES
      ($1, $2, $3)
    RETURNING *;
    `

  const result = await db.query(query, [name, type, description])
  return result.rows[0]
}

const findMany: ExampleFindMany = async ({ limit, page, search }) => {
  const searchTerm = `%${search}%`

  const offset = (page - 1) * limit

  const queryTotal = `
    SELECT *
    FROM examples
    WHERE name ILIKE $1;
  `
  const queryTotalData = [searchTerm]
  const totalDataQuery = await db.query(queryTotal, queryTotalData)

  const query = `
    SELECT *
    FROM examples
    WHERE name ILIKE $3
    LIMIT $1 OFFSET $2;`

  const queryData = [limit, offset, searchTerm]

  const result = await db.query(query, queryData)

  const totalData = totalDataQuery.rowCount || 0

  const totalPages = Math.ceil(totalData / limit) || 1

  return { docs: result.rows, pagination: { currentPage: page, total: totalData, totalPages: totalPages } }
}

const findUnique: ExampleFindUnique = async ({ id }) => {
  const query = `SELECT * FROM examples WHERE id = $1;`

  const result = await db.query(query, [id])
  return result.rows[0]
}

const update: ExampleUpdate = async ({ name, description, type, id }) => {
  const query = `
    UPDATE examples
    SET
      name = $1,
      description = $2,
      type = $3
    WHERE
      id = $4
    RETURNING *;
  `
  const result = await db.query(query, [name, description, type, id])
  return result.rows[0]
}

const remove: ExampleDelete = async ({ id }) => {
  const query = `
    DELETE
    FROM examples
    WHERE id = $1
    RETURNING *
  `

  const result = await db.query(query, [id])
  if (result.rowCount === 0) return false
  return result.rows[0]
}

export default { create, findMany, findUnique, update, remove }
