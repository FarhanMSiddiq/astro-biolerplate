import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: ["./dist/database/migrations/**/*{.ts,.js}"],
  migrationsTableName: "typeorm_migrations",
  migrationsRun: false,
  synchronize: false,
});

export default AppDataSource;
