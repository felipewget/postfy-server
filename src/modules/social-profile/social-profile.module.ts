import { Module } from '@nestjs/common';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { LinkedinStrategy } from './strategies/linkedin.strategy';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { SocialProfileController } from './social-profile.controller';
import { SocialProfileService } from './social-profile.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profiles } from 'src/database/entities';

@Module({
  imports: [PassportModule.register({ session: false }), TypeOrmModule.forFeature([Profiles])],
  controllers: [SocialProfileController],
  providers: [SocialProfileService, FacebookStrategy, LinkedinStrategy, TwitterStrategy]
})
export class SocialProfileModule {}