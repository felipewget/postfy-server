import { BaseEntity } from 'src/common/base';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Accounts } from './accounts.entity';

@Entity()
export class PublicationTimetables extends BaseEntity {
  @Column()
  publicationId: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column()
  status: 'upcoming' | 'published' | 'failed';

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

  @ManyToOne(() => Accounts, (account) => account.campaings)
  @JoinColumn({ name: 'account_id' })
  account?: Accounts;
}
