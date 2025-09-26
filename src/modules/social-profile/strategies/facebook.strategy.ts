import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FB_APP_ID!,
      clientSecret: process.env.FB_APP_SECRET!,
      callbackURL: process.env.FB_REDIRECT_URI!,
      profileFields: ['id', 'displayName', 'emails', 'photos'],
      scope: [
        'pages_show_list',
        'pages_manage_posts',
        'pages_read_engagement',
        // 'instagram_basic',
        // 'instagram_content_publish',
        // 'instagram_manage_insights',
        // 'email',
        // 'pages_show_list',
        // 'pages_manage_posts',
        // 'instagram_basic',
        // 'instagram_content_publish',
      ],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return { provider: 'facebook', accessToken, refreshToken, profile };
  }
}
