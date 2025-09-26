import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, StrategyOption } from 'passport-linkedin-oauth2';

interface StrategyOptionWithState extends StrategyOption {
  state?: boolean;
}

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor() {
    super({
      clientID: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      callbackURL: process.env.LINKEDIN_REDIRECT_URI!,
      scope: [
        'r_liteprofile',
        'r_emailaddress',
        'w_member_social',
        'w_organization_social',
        'r_organization_social',
        'w_member_social',
        'r_member_social',
      ],
      state: false,
    } as StrategyOptionWithState);
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return { provider: 'linkedin', accessToken, refreshToken, profile };
  }
}
