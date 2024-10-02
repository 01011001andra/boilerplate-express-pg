import db from '../configs/db'
import ExampleType, { CreateService } from '../types/example.type'

const create: CreateService = async ({ name, type }): Promise<ExampleType> => {
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

export default { create }
