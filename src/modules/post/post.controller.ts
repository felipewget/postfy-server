import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { BaseCrudController } from 'src/common/base';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/common/guards';
import { IsNull, LessThan, MoreThan, Raw } from 'typeorm';

@Controller('posts')
export class PostController extends BaseCrudController<PostService> {
  constructor(protected readonly postService: PostService) {
    super(postService);
  }

  @Get('account-:accountId/approved')
  @UseGuards(JwtAuthGuard)
  listApprovedPosts(
    @Param('accountId') accountId,
    @Query()
    params: {
      step: 'incoming' | 'published' | 'failed';
      date?: string;
      lastId?: number;
    },
  ) {
    let dateFilter: Record<string, any> = { dispatchmentStatus: IsNull() };

    if (params?.date) {
      dateFilter = {
        date: Raw((alias) => `DATE(${alias}) = :date`, {
          date: params.date,
        }),
      };
    } else if (['published', 'failed'].includes(params?.step)) {
      dateFilter = {
        dispatchmentStatus:
          params.step === 'published' ? 'published' : 'failed',
      };
    }

    return this.postService.list({
      relations: ['profiles'],
      account: { id: +accountId },
      approvalStatus: 'approved',
      ...dateFilter,
      lastId: params?.lastId,
    });
  }

  @Post()
  create() {
    // return this.postService.createPosts();
  }
}
