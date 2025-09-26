import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { Accounts } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService extends BaseService<Accounts> {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountRepository: Repository<Accounts>,
  ) {
    super(accountRepository);
  }
}
