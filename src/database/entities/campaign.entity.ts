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
  @Column({ default: true })
  enabled: boolean;

  @Column()
  title: string;

  @Column({ default: false })
  needsApprovation: boolean;

  @Column({ nullable: true })
  emailToApprove: string;

  @Column({ nullable: true || null })
  monday?: ContentType;

  @Column({ nullable: true, type: 'time' })
  mondayHour?: string;

  @Column({ type: 'jsonb', nullable: true })
  mondayConfig?: any;

  @Column({ nullable: true || null })
  tuesday: ContentType;

  @Column({ nullable: true, type: 'time' })
  tuesdayHour?: string;

  @Column({ type: 'jsonb', nullable: true })
  tuesdayConfig?: any;

  @Column({ nullable: true || null })
  wednesday: ContentType;

  @Column({ nullable: true, type: 'time' })
  wednesdayHour?: string;

  @Column({ type: 'jsonb', nullable: true })
  wednesdayConfig?: any;

  @Column({ nullable: true || null })
  thursday: ContentType;

  @Column({ nullable: true, type: 'time' })
  thursayHour?: string;

  @Column({ type: 'jsonb', nullable: true })
  thursayConfig?: any;

  @Column({ nullable: true || null })
  friday: ContentType;

  @Column({ nullable: true, type: 'time' })
  fridayHour?: string;

  @Column({ type: 'jsonb', nullable: true })
  fridayConfig?: any;

  @Column({ nullable: true || null })
  saturday: ContentType;

  @Column({ nullable: true, type: 'time' })
  saturdayHour?: string;

  @Column({ type: 'jsonb', nullable: true })
  saturdayConfig?: any;

  @Column({ nullable: true || null })
  sunday: ContentType;

  @Column({ nullable: true, type: 'time' })
  sundayHour?: string;

  @Column({ type: 'jsonb', nullable: true })
  sundayConfig?: any;

  @ManyToMany(() => Profiles, (profile) => profile.campaigns)
  @JoinTable()
  profiles: Profiles[];

  @ManyToOne(() => Accounts, (account) => account.campaings)
  @JoinColumn({ name: 'account_id' })
  account: Accounts;
}
