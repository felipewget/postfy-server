import { BaseEntity } from 'src/common/base';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from './users.entity';
import { Profiles } from './profiles.entity';
import { Campaigns } from './campaign.entity';
import { KnowledgmentDocument } from './knowledgment_documents';

@Entity()
export class Accounts extends BaseEntity {
  @Column({ name: 'account_name' })
  accountName: string;

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
}
