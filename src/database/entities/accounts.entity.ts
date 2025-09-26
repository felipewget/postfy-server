import { BaseEntity } from 'src/common/base';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from './users.entity';
import { Profiles } from './profiles.entity';
import { Campaigns } from './campaign.entity';
import { KnowledgmentDocument } from './knowledgment_documents';
import { Tickets } from './tickets.entity';

@Entity()
export class Accounts extends BaseEntity {
  @Column({ name: 'account_name' })
  accountName: string;

  @Column()
  industry: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'tone_of_voice', nullable: true })
  toneOfVoice: string;

  @Column({ name: 'audience', nullable: true })
  audience: string;

  @Column({ name: 'language' })
  language: string;

  @Column({ name: 'additional_instructions', nullable: true })
  additionalInstructions?: string;

  @Column({ name: 'use_emojis', default: false })
  useEmojis?: string;

  @ManyToOne(() => Users, (user) => user.accounts)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(() => Profiles, (profile) => profile.account, { cascade: true })
  profiles?: Profiles[];

  @OneToMany(() => Campaigns, (campaign) => campaign.account, {
    cascade: true,
  })
  campaings?: Campaigns[];

  @OneToMany(
    () => KnowledgmentDocument,
    (knowledgmentDocument) => knowledgmentDocument.account,
    { cascade: true },
  )
  knowledgmentDocuments: KnowledgmentDocument[];

  @OneToMany(() => Tickets, (ticket) => ticket.account, { cascade: true })
  tickets: Tickets[];
}
