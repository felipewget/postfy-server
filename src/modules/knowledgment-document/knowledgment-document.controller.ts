import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { KnowledgmentDocumentService } from './knowledgment-document.service';
import { JwtAuthGuard } from 'src/common/guards';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('knowledgment-document')
export class KnowledgmentDocumentController {
  constructor(
    protected readonly knowledgmentDocumentService: KnowledgmentDocumentService,
  ) {}

  @Get('account-:accountId/:type')
  @UseGuards(JwtAuthGuard)
  async listDocuments(
    @Param('accountId') accountId,
    @Param('type') sourceType: 'knowledment' | 'brain',
    @Query()
    {
      search,
      type,
    }: {
      search?: string;
      type?: string;
    },
  ) {
    return this.knowledgmentDocumentService.list({
      account: { id: +accountId },
      search,
      sourceType,
      searchFields: 'title,description',
      type,
    });
  }

  @Post('account-:accountId/link')
  async knowledgmentDocumentByLink(
    @Param('accountId') accountId,
    @Body('link') link,
    @Body('sourceType') sourceType: 'knowledment' | 'brain',
  ) {
    this.knowledgmentDocumentService.createEmbeddingsByLink(
      +accountId,
      link,
      sourceType,
    );
  }

  @Post('account-:accountId/document')
  @UseInterceptors(FileInterceptor('file'))
  async knowledgmentDocumentByDocument(
    @Param('accountId') accountId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('sourceType') sourceType: 'knowledment' | 'brain',
  ) {
    // return {
    //   file: file,
    //   sourceType
    // }
    return this.knowledgmentDocumentService.createEmbeddingsByDocument(
      +accountId,
      file,
      sourceType,
    );
  }

  @Post('account-:accountId/content')
  async knowledgmentDocumentByContent(
    @Param('accountId') accountId,
    @Body() payload: any,
  ) {
    return this.knowledgmentDocumentService.createEmbeddingsByContent(
      +accountId,
      payload.title,
      payload.content,
      payload.sourceType,
    );
  }
}
