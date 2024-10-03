import db from '../configs/db'
import { UserCreate, UserDelete, UserFindMany, UserFindUnique, UserFindUniqueEmail, UserRegister, UserUpdate } from '../types/user.type'

const create: UserCreate = async ({ first_name, last_name, email, password, birth_date, address, phone, job_title, role }) => {
  const query = `
    INSERT INTO
        users (first_name, last_name, email, password, birth_date, address, phone, job_title, role)
    VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *
    `
  const result = await db.query(query, [first_name, last_name, email, password, birth_date, address, phone, job_title, role])

  return result.rows[0]
}

const findMany: UserFindMany = async ({ limit, page, search }) => {
  const query = `
    SELECT * FROM users
    `
  const result = await db.query(query, [limit, page, search])

  return { docs: result.rows, pagination: { currentPage: 0, total: 0, totalPages: 0 } }
}

const findUnique: UserFindUnique = async ({ id }) => {
  const query = `
    SELECT
        *
    FROM
        users
    WHERE
        id= $1;
    `
  const result = await db.query(query, [id])
  return result.rows[0]
}

const update: UserUpdate = async ({ id, first_name, last_name, email, birth_date, address, phone, job_title, role }) => {
  const query = `
    UPDATE users
    SET 
        first_name= $2,
        last_name= $3,
        email= $4,
        birth_date= $5,
        address= $6,
        phone= $7,
        job_title= $8,
        role= $9
    WHERE id= $1
    RETURNING *
  `

  const result = await db.query(query, [id, first_name, last_name, email, birth_date, address, phone, job_title, role])

  return result.rows[0]
}

const remove: UserDelete = async ({ id }) => {
  const query = `
    DELETE 
    FROM users
    WHERE id= $1
    RETURNING *
    `

  const result = await db.query(query, [id])

  return result.rows[0]
}

const register: UserRegister = async ({ email, password }) => {
  const query = `
    INSERT INTO
        users (email, password)
    VALUES
        ($1, $2)
    RETURNING first_name, last_name, email, role
    `

  const result = await db.query(query, [email, password])

  return result.rows[0]
}

const findUniqueEmail: UserFindUniqueEmail = async ({ email }) => {
  const query = `
    SELECT
        *
    FROM
        users
    WHERE
        email= $1;
    `
  const result = await db.query(query, [email])
  return result.rows[0]
}

export default { create, findMany, findUnique, update, remove, register, findUniqueEmail }
