import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthResponseDto } from 'src/auth/dto/auth.response.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { JwtGuard } from '../auth/guard';
import { GetUser } from './decorator';
import { ModifyUserDto } from './dto';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('users')
@Serialize(AuthResponseDto)
export class UsersController {
  constructor(private userService: UsersService) {}
  @HttpCode(HttpStatus.OK)
  @Get('me')
  currentUser(@GetUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Patch()
  modifyUser(@GetUser() user: AuthResponseDto, @Body() userDto: ModifyUserDto) {
    return this.userService.modifyUser(user, userDto);
  }
}
