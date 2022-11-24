import { Global, Module, Scope, FactoryProvider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { PrismaClientManagerService } from './prisma.client.manager.service';

const PrismaClientProvider: FactoryProvider<PrismaClient> = {
  provide: PrismaClient,
  scope: Scope.REQUEST,
  inject: [REQUEST, PrismaClientManagerService],
  useFactory: (request: Request, manager: PrismaClientManagerService) => {
    return manager.getClient(request);
  },
};

@Global()
@Module({
  providers: [PrismaClientManagerService, PrismaClientProvider],
  exports: [PrismaClient],
})
export class PrismaModule {}
