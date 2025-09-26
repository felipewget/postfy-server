import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/database/entities';
import { StorageService } from 'src/common/storage/storage.service';
import { FileEntity } from 'src/common/storage/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, FileEntity])],
  controllers: [UserController],
  providers: [UserService, StorageService],
})
export class UserModule {}
