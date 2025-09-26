import { Controller, Post } from '@nestjs/common';
import { BaseCrudController } from 'src/common/base';
import { PostService } from './post.service';

@Controller('posts')
export class PostController extends BaseCrudController<PostService> {
  constructor(protected readonly postService: PostService) {
    super(postService);
  }

  @Post()
  create() {
    // return this.postService.createPosts();
  }
}
