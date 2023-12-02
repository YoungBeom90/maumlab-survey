import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const maumlabDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'maumlab',
  password: 'maumlab!',
  database: 'maumlab',
  entities: [],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
};
