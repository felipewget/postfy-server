import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base';
import { StorageService } from 'src/common/storage/storage.service';
import { Accounts, Users } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseService<Users> {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly storageService: StorageService,
  ) {
    super(userRepository);
  }

  async updateuser(
    userId: number,
    payload: Record<string, any>,
    file?: Express.Multer.File,
  ) {
    if (file) {
      const response = await this.storageService.uploadFile(file);

      payload = {
        ...payload,
        cover: response.url,
      };
    }

    return this.update(userId, payload);
  }
}
