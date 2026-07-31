import { DataSource } from "typeorm";
import { Autor } from "../../model/author.model";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  poolSize: 10,
  synchronize: process.env.DB_SYNCRONIZE?.toLocaleLowerCase() === 'true',
  logging: 'all',
  entities: [Autor],
  migrations: [],
  invalidWhereValuesBehavior: { undefined: 'ignore', null: 'sql-null' },
});

export async function initDatabase() {
  await AppDataSource.initialize();
}
