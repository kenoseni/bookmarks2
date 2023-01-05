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
import { JwtGuard } from 'src/auth/guard';
import { HandleDatabaseError } from 'src/interceptors/prisma.interceptor';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetUser } from './decorator';
import { ModifyUserDto } from './dto';
import { UsersService } from './users.service';
@Controller('users')
@Serialize(AuthResponseDto)
@HandleDatabaseError()
export class UsersController {
  constructor(private userService: UsersService) {}
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get('me')
  currentUser(@GetUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Patch()
  modifyUser(@GetUser() user: AuthResponseDto, @Body() userDto: ModifyUserDto) {
    return this.userService.modifyUser(user, userDto);
  }
}
