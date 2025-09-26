import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaigns } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Campaigns])],
  providers: [CampaignService],
  controllers: [CampaignController]
})
export class CampaignModule {}
