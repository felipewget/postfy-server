import { Module } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import typeOrmRootConnector from './database/typeorm-connector';
import { Accounts, Campaigns, KnowledgmentDocument, KnowledgmentDocumentChunks, Profiles, Publications, PublicationTimetables, Users } from './database/entities';
import { KnowledgmentDocumentModule } from './modules/knowledgment-document/knowledgment-document.module';

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
        PublicationTimetables,
        Publications,
        Users
      ],
    }),
    PostModule,
    KnowledgmentDocumentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
