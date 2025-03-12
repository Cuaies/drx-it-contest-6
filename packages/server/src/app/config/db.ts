export const dbConfiguration = () => ({
  db: {
    dialect: 'postgres',
    host: process.env.POSTGRESQL_HOST || 'localhost',
    port: parseInt(process.env.POSTGRESQL_PORT, 10) || 35432,
    database: process.env.POSTGRESQL_DATABASE,
    username: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    autoLoadModels: true,
    synchronize: true, // TODO: change based on env
  },
});
