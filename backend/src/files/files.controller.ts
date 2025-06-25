import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'path', required: false })
  async listRootItems(@Query('path') path?: string) {
    return this.filesService.listRootItems(path);
  }
}
