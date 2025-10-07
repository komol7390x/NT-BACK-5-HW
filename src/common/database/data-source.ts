import { config } from 'src/config/envConfig';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.DB.HOST,
  port: Number(config.DB.PORT),
  username: config.DB.USER,
  password: config.DB.PASS,
  database: config.DB.NAME,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/core/entities/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database is working');
    // bu yerda serverni ishga tushiring
  })
  .catch((err) => {
    console.error('Database is not working', err);
  });