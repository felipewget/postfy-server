import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { chunkText } from 'src/common/ai/ai.utils';
import { BaseService } from 'src/common/base';
import { scrapeTextFromLink } from 'src/common/utils/crawler.util';
import { extractTextFromFile } from 'src/common/utils/file.util';
import { KnowledgmentDocumentChunks } from 'src/database/entities/knowledgment_document_chunks.entity';
import { KnowledgmentDocument } from 'src/database/entities/knowledgment_documents';
import { Repository } from 'typeorm';

@Injectable()
export class KnowledgmentDocumentService extends BaseService<KnowledgmentDocument> {
  constructor(
    @InjectRepository(KnowledgmentDocument)
    protected readonly knowledgmentDocumentRepository: Repository<KnowledgmentDocument>,
    @InjectRepository(KnowledgmentDocumentChunks)
    protected readonly knowledgmentDocumentChunksRepository: Repository<KnowledgmentDocumentChunks>,
  ) {
    super(knowledgmentDocumentRepository);
  }

  async createEmbeddingsByLink() {
    const link =
      'https://lemeconsultoria.com.br/plano-de-carreira-cargos-e-salarios/';
    const text = await scrapeTextFromLink(link);

    this.#saveKnowledgmentDocument(link, 'link', text);
  }

  async createEmbeddingsByDocument() {
    //  extractTextFromFile(process.cwd() + '/src/tmp/file-sample_1MB.docx');
    const response = await extractTextFromFile(process.cwd() + '/src/tmp/sample.pdf');

    this.#saveKnowledgmentDocument('sample.pdf', 'document', response)
  }

  async createEmbeddingsByContent() {
    this.#saveKnowledgmentDocument('Title', 'content', 'personal text here')
  }

  async #saveKnowledgmentDocument(
    title: string,
    type: 'link' | 'document' | 'content',
    text: string,
  ) {
    const chunks = chunkText(text);

    const knowledmengtDocument = await this.knowledgmentDocumentRepository.save(
      {
        title,
        type,
      },
    );

    chunks.map((chunk, i) =>
      this.knowledgmentDocumentChunksRepository.save({
        knowledmentDocument: { id: knowledmengtDocument.id },
        chunkIndex: i,
        content: chunk,
      }),
    );
  }
}
