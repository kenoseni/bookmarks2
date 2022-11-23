import { Injectable } from '@nestjs/common';
import { AuthResponseDto } from 'src/auth/dto/auth.response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
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
