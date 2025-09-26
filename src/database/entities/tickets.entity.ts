import { BaseEntity } from 'src/common/base';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Accounts } from './accounts.entity';

@Entity()
export class Tickets extends BaseEntity {
  @Column()
  category: string;

  @Column()
  subject: string;

  @Column()
  message: string;

  @Column({ default: 'opened' })
  status: 'opened' | 'closed';

  @Column({ nullable: true })
  response?: string;

  @ManyToOne(() => Accounts, (account) => account.tickets)
  @JoinColumn({ name: 'account_id' })
  account: Accounts;
}
