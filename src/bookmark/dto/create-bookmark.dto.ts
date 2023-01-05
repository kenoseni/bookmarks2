import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsBoolean()
  @IsOptional()
  isLive?: boolean;
}
