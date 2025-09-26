import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AiModule } from 'src/common/ai/ai.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publications, PublicationTimetables } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Publications, PublicationTimetables]), AiModule],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
