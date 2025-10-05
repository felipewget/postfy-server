import { BaseEntity } from 'src/common/base';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Accounts } from './accounts.entity';

@Entity()
export class Medias extends BaseEntity {
  @Column()
  filename: string;

  @Column()
  url: string;

  @Column()
  mimetype: string;

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column()
  description: string;

  @ManyToOne(() => Accounts, (account) => account.medias)
  @JoinColumn({ name: 'account_id' })
  account: Accounts;
}
