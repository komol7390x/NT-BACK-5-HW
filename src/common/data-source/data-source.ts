import { config } from 'src/config/envConfig';
import { InfoEntity } from 'src/core/entities/info.entity';
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
    console.log('Data Source has been initialized!');
    // bu yerda serverni ishga tushiring
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });