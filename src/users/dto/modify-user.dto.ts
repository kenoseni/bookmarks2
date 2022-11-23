import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ModifyUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;
}
