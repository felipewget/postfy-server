import { BaseEntity } from 'src/common/base';
import { Entity, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Accounts } from './accounts.entity';
import { Campaigns } from './campaign.entity';

@Entity()
export class Profiles extends BaseEntity {
  @Column()
  channel: 'facebook' | 'instagram' | 'x' | 'linkedin';

  @Column({ name: 'account_name' })
  profileTitle: string;

  @Column()
  profileId: string;

  @Column({ name: 'secret_token' })
  secretToken: string;

  @ManyToOne(() => Accounts, (account) => account.profiles)
  @JoinColumn({ name: 'account_id' })
  account: Accounts;

  @ManyToMany(() => Campaigns, campaign => campaign.profiles, { nullable: true })
  campaigns: Campaigns[];
}
