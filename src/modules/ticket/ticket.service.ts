import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { Tickets } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService extends BaseService<Tickets> {
  constructor(
    @InjectRepository(Tickets)
    protected readonly ticketsRepository: Repository<Tickets>,
  ) {
    super(ticketsRepository);
  }
}