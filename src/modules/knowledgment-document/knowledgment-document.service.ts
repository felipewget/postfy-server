import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { chunkText } from 'src/common/ai/ai.utils';
import { BaseService } from 'src/common/base';
import { scrapeTextFromLink } from 'src/common/utils/crawler.util';
import { extractTextFromFile } from 'src/common/utils/file.util';
import { KnowledgmentDocumentChunks } from 'src/database/entities/knowledgment_document_chunks.entity';
import { KnowledgmentDocument } from 'src/database/entities/knowledgment_documents';
import { Repository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import os from 'os';

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

  async createEmbeddingsByLink(
    accountId: number,
    link: string,
    sourceType: 'knowledment' | 'brain',
  ) {
    const text = await scrapeTextFromLink(link);

    this.#saveKnowledgmentDocument(link, 'link', text, accountId, sourceType);
  }

  async createEmbeddingsByDocument(
    accountId: number,
    file: Express.Multer.File,
    sourceType: 'knowledment' | 'brain',
  ) {
     // Cria um caminho temporário no sistema
  const tmpPath = path.join(os.tmpdir(), `${Date.now()}-${file.originalname}`);

  // Salva o buffer em disco temporariamente
  await fs.promises.writeFile(tmpPath, file.buffer);

  try {
    // console.log(file.buffer);

    const response = await extractTextFromFile(tmpPath);

    return this.#saveKnowledgmentDocument(
      file.originalname,
      'document',
      response,
      accountId,
      sourceType
    );
    } finally {
    // Remove o arquivo temporário, mesmo se der erro
    await fs.promises.unlink(tmpPath).catch(() => {});
  }
  }

  async createEmbeddingsByContent(
    accountId: number,
    title: string,
    content: string,
    sourceType: 'knowledment' | 'brain',
  ) {
    this.#saveKnowledgmentDocument(title, 'content', content, accountId, sourceType);
  }

  async #saveKnowledgmentDocument(
    title: string,
    type: 'link' | 'document' | 'content',
    text: string,
    accountId: number,
    sourceType: 'knowledment' | 'brain',
  ) {
    const chunks = chunkText(text);

    const knowledmengtDocument = await this.knowledgmentDocumentRepository.save(
      {
        account: { id: accountId },
        title,
        type,
        sourceType
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
