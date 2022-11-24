import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(authDto: AuthDto) {
    const hash_password = await argon.hash(authDto.password);
    const user = await this.prisma.user.create({
      data: {
        email: authDto.email,
        hash_password,
      },
    });
    return user;
  }
  async signin(authDto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: authDto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const match = await argon.verify(user.hash_password, authDto.password);

    if (!match) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const token = await this.generateToken(user.id, user.email);
    return { ...user, token };
  }

  async generateToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      userId,
      email,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
