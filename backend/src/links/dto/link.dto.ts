import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class LinkBaseDto {
  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString()
  fileKey: string;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  expiresAt?: Date;
}

export class CreateLinkDto extends OmitType(LinkBaseDto, ['url']) {}
