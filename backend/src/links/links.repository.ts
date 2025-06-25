import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Link } from '@prisma/client';

@Injectable()
export class LinksRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    url: string;
    fileKey: string;
    expiresAt?: Date;
  }): Promise<Link> {
    return this.prisma.link.create({
      data,
    });
  }

  async findByUrl(url: string): Promise<Link | null> {
    return this.prisma.link.findUnique({
      where: { url, expiresAt: { gt: new Date() } },
    });
  }

  async searchByFileKey(searchTerm: string): Promise<Link[]> {
    return this.prisma.link.findMany({
      where: {
        fileKey: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async delete(id: string): Promise<Link | null> {
    return this.prisma.link.delete({
      where: { id },
    });
  }

  async deleteExpiredLinks(): Promise<number> {
    const result = await this.prisma.link.deleteMany({
      where: {
        expiresAt: {
          not: null,
          lt: new Date(),
        },
      },
    });
    return result.count;
  }
}
