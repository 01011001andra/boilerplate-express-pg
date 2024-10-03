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
  const query = `SELECT * FROM examples;`
  const limitInt = parseInt(limit)
  const pageInt = parseInt(page)

  console.log(limitInt, pageInt, search)

  const result = await db.query(query)

  return { docs: result.rows, pagination: { currentPage: 0, total: 0, totalPages: 0 } }
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
