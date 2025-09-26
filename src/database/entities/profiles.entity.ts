import { BaseEntity } from 'src/common/base';
import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, Unique } from 'typeorm';
import { Accounts } from './accounts.entity';
import { Campaigns } from './campaign.entity';

@Entity()
@Unique('unique_channel_type_profileId', ['channel', 'type', 'profileId'])
export class Profiles extends BaseEntity {
  @Column()
  channel: 'facebook' | 'instagram' | 'x' | 'linkedin';

  @Column()
  type: 'page' | 'user';

  @Column({ name: 'profile_title' })
  profileTitle: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId: string;

  @Column()
  profileId: string;

  @Column({ name: 'secret_token' })
  secretToken: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: any;

  @ManyToOne(() => Accounts, (account) => account.profiles)
  @JoinColumn({ name: 'account_id' })
  account: Accounts;

  @ManyToMany(() => Campaigns, (campaign) => campaign.profiles, {
    nullable: true,
  })
  campaigns: Campaigns[];
}
