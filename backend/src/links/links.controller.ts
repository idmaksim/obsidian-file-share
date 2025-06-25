import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/link.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('links')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Post()
  async createLink(@Body() dto: CreateLinkDto) {
    return this.linksService.createLink(dto);
  }

  @Get(':url')
  async getLinkByUrl(@Param('url') url: string) {
    return this.linksService.getLinkByUrl(url);
  }

  @Get()
  @ApiQuery({ name: 'search', required: false })
  async searchLinks(@Query('search') searchTerm: string) {
    return this.linksService.searchLinksByFileKey(searchTerm);
  }

  @Delete(':id')
  async deleteLink(@Param('id') id: string) {
    return this.linksService.deleteLink(id);
  }
}
