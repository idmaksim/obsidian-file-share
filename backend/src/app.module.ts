import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { LinksModule } from './links/links.module';
import { FilesModule } from './files/files.module';
import config from './config/config';
import { S3Module } from 'nestjs-s3';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    S3Module.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        config: {
          credentials: {
            secretAccessKey: configService.get('aws.secretAccessKey'),
            accessKeyId: configService.get('aws.accessKeyId'),
          },
          region: configService.get('aws.region'),
          endpoint: configService.get('aws.endpoint'),
          forcePathStyle: true,
        },
      }),
    }),
    AuthModule,
    PrismaModule,
    LinksModule,
    FilesModule,
  ],
})
export class AppModule {}
