import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class ModifyBookmarkDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsBoolean()
  @IsOptional()
  isLive?: boolean;
}
