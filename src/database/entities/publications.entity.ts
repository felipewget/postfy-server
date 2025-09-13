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
  @Column({
    type: 'jsonb',
    nullable: true,
  })
  text?: Record<Channel, any>;

  @Column({ name: 'content_type' })
  contentType: ContentType;

  @Column()
  weekDay:
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday';

  @Column({ type: 'time' })
  hour: string;

  @Column()
  status: 'approved' | 'pending' | 'declined';

  @ManyToOne(() => Accounts, (account) => account.campaings)
  @JoinColumn({ name: 'account_id' })
  account?: Accounts;

  @ManyToMany(() => Profiles, (profile) => profile.campaigns, {
    nullable: true,
  })
  @JoinTable()
  profiles: Profiles[];
}
