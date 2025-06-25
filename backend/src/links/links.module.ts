import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { LinksRepository } from './links.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { FilesModule } from 'src/files/files.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [PrismaModule, FilesModule, ScheduleModule.forRoot()],
  controllers: [LinksController],
  providers: [LinksService, LinksRepository],
  exports: [LinksService],
})
export class LinksModule {}
