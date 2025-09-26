import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { Profiles } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SocialProfileService extends BaseService<Profiles> {
  constructor(
    @InjectRepository(Profiles)
    protected readonly profilesRepository: Repository<Profiles>,
  ) {
    super(profilesRepository);
  }

  async refreshSocialFacebookProfilesByCallBack(
    displayName: string,
    accessToken: string,
    profileId: string,
  ) {
    let record = await this.profilesRepository.findOne({
      where: { channel: 'facebook', type: 'user', profileId },
    });

    if (record) {
      await this.profilesRepository.update(record.id, {
        profileTitle: displayName,
        secretToken: accessToken,
      });
    } else {
      record = await this.profilesRepository.save({
        channel: 'facebook',
        type: 'user',
        profileId,
        profileTitle: displayName,
        secretToken: accessToken,
      });
    }

    const pagesResponse = await fetch(
      `https://graph.facebook.com/v17.0/me/accounts?access_token=${accessToken}`,
    );
    const pagesData = await pagesResponse.json();

    //@ts-ignore
    if (!pagesData.data) {
      throw new Error('Não foi possível buscar as páginas do usuário.');
    }

    const pages = pagesData.data.map((page) => ({
      parentId: record.id,
      channel: 'facebook',
      type: 'page',
      profileId: page.id,
      profileTitle: page.name,
      secretToken: page.access_token,
      metadata: {
        tasks: page.tasks,
      },
    }));

    for (let i in pages) {
      await this.profilesRepository.upsert(pages[i], [
        'channel',
        'type',
        'profileId',
      ]);
    }
  }
}
