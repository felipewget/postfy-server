import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-twitter';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super({
      consumerKey: process.env.TWITTER_CLIENT_ID!,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET!,
      callbackURL: process.env.TWITTER_REDIRECT_URI!,
      includeEmail: true,
    });
  }

  async validate(token: string, tokenSecret: string, profile: any) {
    return { provider: 'twitter', token, tokenSecret, profile };
  }
}