import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { StorageService } from './storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
