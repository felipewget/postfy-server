import { BaseEntity } from 'src/common/base';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Accounts } from './accounts.entity';
import { KnowledgmentDocument } from './knowledgment_documents';

@Entity()
export class KnowledgmentDocumentChunks extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int' })
  chunkIndex: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: any;

  @ManyToOne(() => KnowledgmentDocument, (knowledgment) => knowledgment.chunks)
  @JoinColumn({ name: 'knowledment_document_id' })
  knowledmentDocument: KnowledgmentDocument;
}