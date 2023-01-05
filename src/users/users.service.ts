import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { PrismaClient } from '@prisma/client';
import { AuthResponseDto } from 'src/auth/dto/auth.response.dto';
import { ModifyUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
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
