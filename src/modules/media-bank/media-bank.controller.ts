import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MediaBankService } from './media-bank.service';
import { JwtAuthGuard } from 'src/common/guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { In, Raw } from 'typeorm';

@Controller('media-bank')
@UseGuards(JwtAuthGuard)
export class MediaBankController {
  constructor(protected readonly mediaBankService: MediaBankService) {}

  @Post('account-:accountId')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Param('accountId') accountId,
    @Body() payload: { tags: string[]; description?: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.mediaBankService.addMedia(+accountId, payload, file);
  }

  @Get('account-:accountId')
  async list(
    @Param('accountId') accountId,
    @Query()
    params: {
      search?: string;
    },
  ) {
    const qb = this.mediaBankService.mediasRepository
      .createQueryBuilder('medias')
      .where('medias.account_id = :accountId', { accountId })
      .andWhere('medias.deleted_at IS NULL')
      .orderBy('medias.id', 'DESC')
      .take(15);

    if (params?.search) {
      qb.andWhere(
        'EXISTS (SELECT 1 FROM unnest(medias.tags) AS t WHERE t ILIKE :search)',
        { search: `%${params.search}%` },
      );
    }

    return qb.getMany();
  }

  @Patch()
  async update() {}

  @Delete()
  async delete() {}
}
