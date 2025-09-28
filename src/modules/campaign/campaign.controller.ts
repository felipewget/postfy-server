import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards';
import { KnowledgmentDocumentService } from '../knowledgment-document/knowledgment-document.service';
import { CampaignService } from './campaign.service';

@Controller('campaigns')
export class CampaignController {
  constructor(protected readonly campaignService: CampaignService) {}

  @Get('account-:accountId')
  @UseGuards(JwtAuthGuard)
  async listDocuments(
    @Param('accountId') accountId,
    @Query('search') search: string,
  ) {
    return this.campaignService.list({
      relations: ['profiles'],
      account: { id: +accountId },
      searchFields: 'title',
      search,
    });
  }

  @Post('account-:accountId')
  async create(@Param('accountId') accountId, @Body() payload) {
    console.log('payloadpayload', accountId, payload);

    const { profiles, ...data } = payload;

    return await this.campaignService.create({
      account: { id: +accountId },
      profiles: profiles.map((id) => ({ id })),
      ...data,
    });
  }
}
