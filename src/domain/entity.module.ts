import { Module } from '@nestjs/common';
import { ENTITIES } from 'src/domain/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { maumlabDb } from 'src/config/db-connection-config';

@Module({
  imports: [
    TypeOrmModule.forRoot(maumlabDb),
    TypeOrmModule.forFeature(ENTITIES),
  ],
  exports: [TypeOrmModule.forFeature(ENTITIES)],
})
export class EntityModule {}
