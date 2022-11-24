import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';

export const GetUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const user = await verifyToken(req);
    req.user = user;
    return req.user;
  },
);

const verifyToken = async (req: Request) => {
  const jwt = new JwtService();
  const config = new ConfigService();
  const prisma = new PrismaClient();
  const secret: string = config.get('JWT_SECRET');

  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedException('Not authorized to perform this action');
  }
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw new UnauthorizedException('Invalid user token');
  }
  const userDetails: {
    sub: number;
    email: string;
    userId: number;
    iat: number;
    exp: number;
  } = await jwt.verifyAsync(token, { secret });

  return prisma.user.findUnique({
    where: {
      email: userDetails.email,
    },
  });
};
