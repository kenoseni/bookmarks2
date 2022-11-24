import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthResponseDto } from 'src/auth/dto/auth.response.dto';
import { ModifyUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}
  async modifyUser(user: AuthResponseDto, userDto: ModifyUserDto) {
    const userobj = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...userDto,
      },
    });
    return userobj;
  }
}
