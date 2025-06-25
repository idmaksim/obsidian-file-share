import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectS3, S3 } from 'nestjs-s3';
import { Readable } from 'stream';

@Injectable()
export class FilesService {
  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly configService: ConfigService,
  ) {}

  async getFile(key: string) {
    const result = await this.s3.getObject({
      Bucket: this.configService.get('aws.bucket'),
      Key: key,
    });

    if (result.Body instanceof Readable) {
      const chunks = [];
      for await (const chunk of result.Body) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      if (
        key.endsWith('.md') ||
        key.endsWith('.txt') ||
        key.endsWith('.json')
      ) {
        return buffer.toString('utf-8');
      }
      return buffer;
    }

    return result.Body;
  }

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
