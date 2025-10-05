import { BaseEntity } from 'src/common/base';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Accounts } from './accounts.entity';
import { Profiles } from './profiles.entity';
import { Channel } from 'src/declarators';

type ContentType =
  | 'Tips & Tricks'
  | 'Industry Insight'
  | 'Article / Blog Summary'
  | 'Quote / Inspiration'
  | 'Behind the Scenes'
  | 'Poll'
  | 'Client Story'
  | 'Stats & Data'
  | 'Listicle'
  | "Founder's Note";

@Entity()
export class Publications extends BaseEntity {
  @Column({ nullable: true })
  text?: string;

  @Column({ name: 'content_type' })
  contentType: ContentType;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column({ nullable: true })
  media?: string;

  @Column({
    name: 'dispatch_status',
    type: 'enum',
    enum: ['published', 'failed'],
    nullable: true,
  })
  dispatchmentStatus?: 'published' | 'failed';

  @Column({
    name: 'approval_status',
    type: 'enum',
    enum: ['approved', 'pending', 'declined'],
    default: 'pending',
  })
  approvalStatus: 'approved' | 'pending' | 'declined';

  @ManyToOne(() => Accounts, (account) => account.campaings)
  @JoinColumn({ name: 'account_id' })
  account?: Accounts;

  @ManyToMany(() => Profiles, (profile) => profile.campaigns, {
    nullable: true,
  })
  @JoinTable()
  profiles: Profiles[];
}
