import { Injectable, NotFoundException } from '@nestjs/common';
import { LinksRepository } from './links.repository';
import { v4 as uuidv4 } from 'uuid';
import { CreateLinkDto } from './dto/link.dto';
import { FilesService } from 'src/files/files.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Logger } from '@nestjs/common';

@Injectable()
export class LinksService {
  private readonly logger = new Logger(LinksService.name);

  constructor(
    private linksRepository: LinksRepository,
    private filesService: FilesService,
  ) {}

  async createLink(dto: CreateLinkDto) {
    const url = uuidv4();

    return this.linksRepository.create({
      url,
      fileKey: dto.fileKey,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
    });
  }

  async getLinkByUrl(url: string) {
    const link = await this.linksRepository.findByUrl(url);
    if (!link) {
      throw new NotFoundException('Link not found');
    }

    const file = await this.filesService.getFile(link.fileKey);
    return file;
  }

  async searchLinksByFileKey(searchTerm: string) {
    return this.linksRepository.searchByFileKey(searchTerm);
  }

  async deleteLink(id: string) {
    const result = await this.linksRepository.delete(id);
    if (!result) {
      throw new NotFoundException('Link not found');
    }
    return result;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async deleteExpiredLinks() {
    try {
      const deletedCount = await this.linksRepository.deleteExpiredLinks();
      if (deletedCount > 0) {
        this.logger.log(`Удалено ${deletedCount} просроченных ссылок`);
      }
    } catch (error) {
      this.logger.error('Ошибка при удалении просроченных ссылок:', error);
    }
  }
}
