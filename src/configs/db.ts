import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432
})

pool.connect((err, client, release) => {
  if (err) {
    console.error('Failed to connect the database!', err.stack)
  } else {
    console.log('Connected to the database successfully!')
    release()
  }
})

export default pool
