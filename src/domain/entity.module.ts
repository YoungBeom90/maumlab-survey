import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { maumlabDb } from 'src/config/db-connection-config';
import * as entityMap from 'src/domain/entities';

const entities = Object.values(entityMap);
@Module({
  imports: [
    TypeOrmModule.forRoot(maumlabDb),
    TypeOrmModule.forFeature(entities),
  ],
  exports: [TypeOrmModule.forFeature(entities)],
})
export class EntityModule {}
