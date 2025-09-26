import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/database/entities';
import { JwtModule } from 'src/common/jwt/jwt.module';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Users])],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
