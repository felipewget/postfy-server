import { BaseEntity } from 'src/common/base';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Accounts } from './accounts.entity';
import { Channel } from 'src/declarators';
import { Profiles } from './profiles.entity';

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
export class Campaigns extends BaseEntity {
  @ManyToMany(() => Profiles, (profile) => profile.campaigns, )
  @JoinTable()
  profiles: Profiles[];

  @Column()
  title: string;

  @Column({ nullable: true || null })
  monday?: ContentType;

  @Column({ nullable: true, type: 'time' })
  mondayHour?: string;

  @Column({ nullable: true || null })
  tuesday: ContentType;

  @Column({ nullable: true, type: 'time' })
  tuesdayHour?: string;

  @Column({ nullable: true || null })
  wednesday: ContentType;

  @Column({ nullable: true, type: 'time' })
  wednesdayHour?: string;

  @Column({ nullable: true || null })
  thursday: ContentType;

  @Column({ nullable: true, type: 'time' })
  thursayHour?: string;

  @Column({ nullable: true || null })
  friday: ContentType;

  @Column({ nullable: true, type: 'time' })
  fridayHour?: string;

  @Column({ nullable: true || null })
  saturday: ContentType;

  @Column({ nullable: true, type: 'time' })
  saturdayHour?: string;

  @Column({ nullable: true || null })
  sunday: ContentType;

  @Column({ nullable: true, type: 'time' })
  sundayHour?: string;

  @ManyToOne(() => Accounts, (account) => account.campaings)
  @JoinColumn({ name: 'account_id' })
  account: Accounts;
}
