export = {
  type: process.env.TYPEORM_CONNECTION || 'postgres',
  host: process.env.TYPEORM_HOST || '127.0.0.1',
  port: Number(process.env.TYPEORM_PORT || 5432),
  username: process.env.TYPEORM_USERNAME || 'postgres',
  password: process.env.TYPEORM_PASSWORD || 'postgres',
  database: process.env.TYPEORM_DATABASE || 'app-director',
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
