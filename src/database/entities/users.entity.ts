import { BaseEntity } from 'src/common/base';
import { Entity, Column, OneToMany } from 'typeorm';
import { Accounts } from './accounts.entity';

@Entity()
export class Users extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @OneToMany(() => Accounts, (account) => account.user, { cascade: true })
  accounts?: Accounts[];
}
