import { DataSourceOptions } from "typeorm"
import { config } from 'dotenv'

config()

export const getConfig = () => {
  return {
    type: "postgres",
    host: "localhost",
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: ["src/shared/infra/database/migrations/**/*.ts"],
    entities: ["src/modules/**/entities/*.ts"],
  } as DataSourceOptions
}