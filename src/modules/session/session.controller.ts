import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminTags } from 'src/common/documentation';
import { JwtService } from 'src/common/jwt/jwt.service';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dtos';

@Controller('sessions')
export class SessionController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
  ) {}

  @Post()
  async login(@Body() { email, password }: CreateSessionDto) {
    const account = await this.sessionService.validateUser(email, password);

    return this.jwtService.login({
      ...account,
      area: 'app',
    });
  }
}
