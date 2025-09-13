import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
  ) {}

  async login(account: Record<string, any>) {
    return { access_token: this.jwtService.sign(account) };
  }
}
