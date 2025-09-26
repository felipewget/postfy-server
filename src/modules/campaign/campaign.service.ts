import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { Campaigns } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CampaignService extends BaseService<Campaigns> {
  constructor(
    @InjectRepository(Campaigns)
    protected readonly campaignsRepository: Repository<Campaigns>,
  ) {
    super(campaignsRepository);
  }
}
