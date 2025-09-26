import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BaseCrudController } from 'src/common/base';
import { Accounts } from 'src/database/entities';
import { AccountService } from './account.service';
import { JwtAuthGuard } from 'src/common/guards';

@Controller('accounts')
export class AccountController {
  constructor(protected readonly accountService: AccountService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async listAccounts(@Req() { user }) {
    return this.accountService.findAll({
      where: {
        user: { id: user.id },
      },
    });
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getAccount(@Req() { user }, @Param('id') id) {
    return this.accountService.findOneBy({
      where: {
        user: { id: user.id },
        id: +id
      },
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() { user }, @Body() body) {
    return this.accountService.create({
      user: { id: user.id },
      ...body,
    });
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async update(@Body() body, @Param('id') id) {
    return this.accountService.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.accountService.delete(+id);
  }
}
