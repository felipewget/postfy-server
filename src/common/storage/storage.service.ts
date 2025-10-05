import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StorageService {
  private s3: S3Client;
  private bucket = 'postfy';

  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {
    this.s3 = new S3Client({
      region: 'us-east-1',
      endpoint: 'http://localhost:9444',
      credentials: {
        accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
        secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const key = `${Date.now()}-${file.originalname}`;

    const uploadParams = {
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.send(new PutObjectCommand(uploadParams));

    const fileUrl = `http://localhost:9000/${this.bucket}/${key}`;

    const saved = this.fileRepository.create({
      filename: file.originalname,
      url: fileUrl,
      mimetype: file.mimetype,
    });

    await this.fileRepository.save(saved);

    return saved;
  }

  async listFiles() {
    const listCommand = new ListObjectsV2Command({ Bucket: this.bucket });
    const result = await this.s3.send(listCommand);

    return (
      result.Contents?.map((item) => ({
        key: item.Key,
        url: `http://localhost:9000/${this.bucket}/${item.Key}`,
      })) || []
    );
  }

  async getSavedFilesFromDb() {
    return this.fileRepository.find();
  }
}
