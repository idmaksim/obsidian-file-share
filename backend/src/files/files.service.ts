import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class FilesService {
  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly configService: ConfigService,
  ) {}

  async listRootItems(path?: string) {
    const result = await this.s3.listObjectsV2({
      Bucket: this.configService.get('aws.bucket'),
      Delimiter: '/',
      Prefix: path,
    });

    const files = result.Contents?.map((file) => file.Key) || [];

    const folders = result.CommonPrefixes?.map((folder) => folder.Prefix) || [];

    return { files, folders };
  }
}
