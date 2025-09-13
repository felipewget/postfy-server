import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AiModule } from 'src/common/ai/ai.module';

@Module({
  imports: [AiModule],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
