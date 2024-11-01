import mysql from 'serverless-mysql'
import * as mysql2 from 'mysql2'

export const db = mysql({
  library: mysql2 as never,
  config: {
    host: String(process.env.DATABASE_HOST),
    port: Number(process.env.DATABASE_PORT),
    user: String(process.env.DATABASE_USERNAME),
    password: String(process.env.DATABASE_PASSWORD),
    database: String(process.env.DATABASE_NAME)
  }
})
