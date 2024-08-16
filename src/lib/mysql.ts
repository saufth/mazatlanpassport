import mysql from 'serverless-mysql'
import * as mysql2 from 'mysql2'

export const pool = mysql({
  library: mysql2 as any,
  config: {
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    user: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE)
  }
})
