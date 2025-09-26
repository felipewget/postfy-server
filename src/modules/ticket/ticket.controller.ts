import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { JwtAuthGuard } from 'src/common/guards';

@Controller('tickets')
export class TicketController {
  constructor(protected readonly ticketService: TicketService) {}

  @Get('account-:accountId')
  @UseGuards(JwtAuthGuard)
  async list(@Param('accountId') accountId, @Query('status') status) {
    return this.ticketService.list({
      account: { id: +accountId },
      status,
    });
  }

  @Post('account-:accountId')
  async create(@Param('accountId') accountId, @Body() payload) {
    this.ticketService.create({
      account: { id: +accountId },
      ...payload,
    });
  }

  @Delete('account-:accountId/:ticketId')
  async delete(@Param('accountId') accountId, @Param('ticketId') ticketId) {
    const ticket = await this.ticketService.findOneByOrFail({
      where: {
        account: { id: +accountId },
        id: +ticketId,
      },
    });

    this.ticketService.delete(ticket.id);
  }
}
