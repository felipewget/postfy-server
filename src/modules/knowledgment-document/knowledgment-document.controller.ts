import { Body, Controller, Post } from '@nestjs/common';
import { BaseCrudController } from 'src/common/base';
import { KnowledgmentDocumentService } from './knowledgment-document.service';

@Controller('knowledgment-document')
export class KnowledgmentDocumentController extends BaseCrudController<KnowledgmentDocumentService> {
  constructor(
    protected readonly knowledgmentDocumentService: KnowledgmentDocumentService,
  ) {
    super(knowledgmentDocumentService);
  }

  @Post('link')
  async knowledgmentDocumentByLink() {
    this.knowledgmentDocumentService.createEmbeddingsByLink();
  }

  @Post('document')
  async knowledgmentDocumentByDocument() {
    return this.knowledgmentDocumentService.createEmbeddingsByDocument();
  }  
}
