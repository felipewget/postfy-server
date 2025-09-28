import {
  Controller,
  ForbiddenException,
  Get,
  Query,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import fetch from 'node-fetch';
import { SocialProfileService } from './social-profile.service';
import { BaseCrudController } from 'src/common/base';
import { LessThan, ILike } from 'typeorm';

@Controller('social-profiles')
export class SocialProfileController extends BaseCrudController<SocialProfileService> {
  constructor(protected readonly socialProfileService: SocialProfileService) {
    super(socialProfileService);
  }

  // --- Facebook + Instagram Business ---
  @Get('facebook/auth')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {}

  @Get('facebook/auth/callback')
  @UseGuards(AuthGuard('facebook'))
  @Redirect('http://localhost:3000/social-profiles?profiles-udpdated=true', 302)
  async facebookCallback(@Req() req) {
    const user = req.user; // Passport user: { provider, accessToken, profile }

    this.socialProfileService.refreshSocialFacebookProfilesByCallBack(
      user.profile.displayName,
      user.accessToken,
      user.profile.id,
    );

    return;
  }

  // --- LinkedIn ---
  @Get('linkedin/auth')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinLogin() {}

  @Get('linkedin/auth/callback')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinCallback(@Req() req) {
    return req.user; // { provider, accessToken, refreshToken, profile }
  }

  // --- Twitter / x ---
  @Get('twitter/auth')
  @UseGuards(AuthGuard('twitter'))
  async twitterLogin() {}

  @Get('twitter/auth/callback')
  @UseGuards(AuthGuard('twitter'))
  async twitterCallback(@Req() req) {
    return req.user; // { provider, token, tokenSecret, profile }
  }
}
