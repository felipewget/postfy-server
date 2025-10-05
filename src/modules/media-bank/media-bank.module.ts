import { Module } from '@nestjs/common';
import { MediaBankService } from './media-bank.service';
import { MediaBankController } from './media-bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medias } from 'src/database/entities';
import { StorageModule } from 'src/common/storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Medias]), StorageModule],
  providers: [MediaBankService],
  controllers: [MediaBankController]
})
export class MediaBankModule {}
