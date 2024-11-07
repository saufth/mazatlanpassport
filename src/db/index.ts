import mysql from 'serverless-mysql'
import * as mysql2 from 'mysql2'

export const db = mysql({
  library: mysql2 as never,
  config: {
    host: process.env.DATABASE_HOST as string,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string
  }
})
