import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { StorageService } from 'src/common/storage/storage.service';
import { Medias } from 'src/database/entities';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class MediaBankService extends BaseService<Medias> {
  constructor(
    @InjectRepository(Medias)
     readonly mediasRepository: Repository<Medias>,
    private readonly storageService: StorageService,
  ) {
    super(mediasRepository);
  }

  async addMedia(
    accountId: number,
    payload: {
      tags: string[];
      description?: string;
    },
    file?: Express.Multer.File,
  ) {
    if (!file) return null;

    const response = await this.storageService.uploadFile(file);

    const { url, mimetype, filename } = response;

    let urlParts = url.split('/postfy/');
    urlParts.shift(); // This removes the first element
    let newUrl = urlParts.join('/postfy/');

    const data: DeepPartial<Medias> = {
      ...payload,
      account: {id: accountId},
      url: newUrl,
      mimetype,
      filename,
    };

    return this.create(data);
  }
}
