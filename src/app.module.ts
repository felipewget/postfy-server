import { Module } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import typeOrmRootConnector from './database/typeorm-connector';
import {
  Accounts,
  Campaigns,
  KnowledgmentDocument,
  KnowledgmentDocumentChunks,
  Profiles,
  Publications,
  Users,
} from './database/entities';
import { KnowledgmentDocumentModule } from './modules/knowledgment-document/knowledgment-document.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { SocialProfileModule } from './modules/social-profile/social-profile.module';
import { AccountModule } from './modules/account/account.module';
import { StorageModule } from './common/storage/storage.module';
import { FileEntity } from './common/storage/file.entity';
import { UserModule } from './modules/user/user.module';
import { SessionModule } from './modules/session/session.module';
import { CampaignModule } from './modules/campaign/campaign.module';
import { MediaBankModule } from './modules/media-bank/media-bank.module';

@Module({
  imports: [
    typeOrmRootConnector({
      host: 'localhost',
      database: 'postgres',
      username: 'postgres',
      password: 'admin',
      port: 5432,
      entities: [
        Accounts,
        Campaigns,
        KnowledgmentDocument,
        KnowledgmentDocumentChunks,
        Profiles,
        Publications,
        Users,
        FileEntity,
      ],
    }),
    PostModule,
    KnowledgmentDocumentModule,
    TicketModule,
    SocialProfileModule,
    AccountModule,
    StorageModule,
    UserModule,
    SessionModule,
    CampaignModule,
    MediaBankModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
