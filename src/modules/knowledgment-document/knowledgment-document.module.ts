import { Module } from '@nestjs/common';
import { KnowledgmentDocumentController } from './knowledgment-document.controller';
import { KnowledgmentDocumentService } from './knowledgment-document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgmentDocument, KnowledgmentDocumentChunks } from 'src/database/entities';

@Module({
  controllers: [KnowledgmentDocumentController],
  providers: [KnowledgmentDocumentService],
  imports: [TypeOrmModule.forFeature([KnowledgmentDocument, KnowledgmentDocumentChunks])],
})
export class KnowledgmentDocumentModule {}
