import { BaseEntity } from 'src/common/base';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { KnowledgmentDocumentChunks } from './knowledgment_document_chunks.entity';
import { Accounts } from './accounts.entity';

@Entity()
export class KnowledgmentDocument extends BaseEntity {
  @Column()
  type: 'link' | 'document' | 'content';

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    name: 'source_type',
    type: 'enum',
    enum: ['knowledment', 'document', 'brain'],
    default: 'knowledment',
  })
  sourceType: 'knowledment' | 'document' | 'brain';

  @Column({ type: 'jsonb', nullable: true })
  metadata?: any;

  @OneToMany(
    () => KnowledgmentDocumentChunks,
    (knowledgmentDocumentChunk) =>
      knowledgmentDocumentChunk.knowledmentDocument,
    { cascade: true },
  )
  chunks: KnowledgmentDocumentChunks[];

  @ManyToOne(() => Accounts, (account) => account.knowledgmentDocuments)
  @JoinColumn({ name: 'account_id' })
  account: Accounts;
}
