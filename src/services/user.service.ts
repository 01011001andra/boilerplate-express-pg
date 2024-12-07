import db from '../configs/db'
import { UserCreate, UserDelete, UserFindMany, UserFindUnique, UserFindUniqueEmail, UserRegister, UserUpdate, VerifyEmail } from '../types/user.type'

const create: UserCreate = async (user) => {
  const query = `
    INSERT INTO
        users (first_name, last_name, email, password, birth_date, address, phone, job_title, role)
    VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *
    `
  const result = await db.query(query, [user.first_name, user.last_name, user.email, user.password, user.birth_date, user.address, user.phone, user.job_title, user.role])

  return result.rows[0]
}

const findMany: UserFindMany = async ({ limit, page, search }) => {
  const query = `
    SELECT * FROM users
    LIMIT
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
    RETURNING email, role
    `

  const result = await db.query(query, [email, password])

  return result.rows[0]
}

const findUniqueEmail: UserFindUniqueEmail = async ({ email }) => {
  const query = `
    SELECT
        first_name, last_name, email, email_verified, role, password
    FROM
        users
    WHERE
        email= $1;
    `
  const result = await db.query(query, [email])
  return result.rows[0]
}

const verifyEmail: VerifyEmail = async ({ email }) => {
  const query = `
  UPDATE 
    users
  SET
    email_verified = true
  WHERE email= $1
  RETURNING email, email_verified, role
  `
  const result = await db.query(query, [email])

  return result.rows[0]
}

export default { create, findMany, findUnique, update, remove, register, findUniqueEmail, verifyEmail }
