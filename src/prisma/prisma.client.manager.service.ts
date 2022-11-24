import {
  BadRequestException,
  Injectable,
  OnModuleDestroy,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class PrismaClientManagerService implements OnModuleDestroy {
  constructor(private config: ConfigService) {}
  // the client instances cache object
  private clients: { [key: string]: PrismaClient } = {};

  getTenantID(@Req() req: Request): string {
    const tenantid = req.headers['x-tenant-id'] as string;
    // Implement type safty and validation for tenamts ID
    if (!tenantid) {
      throw new BadRequestException(
        'You failed to provide x-talent-id credentials in request header',
      );
    }
    return tenantid;
  }

  getClient(@Req() req: Request): PrismaClient {
    const tenantId = this.getTenantID(req);

    let client = this.clients[tenantId];

    if (!client) {
      const dbUrl = this.config.get('DATABASE_URL');

      const [_, schema]: [string, string] = dbUrl.split('=');

      const newUrl = dbUrl.replace(schema, tenantId);

      client = new PrismaClient({
        datasources: {
          db: {
            url: newUrl,
          },
        },
      });

      this.clients[tenantId] = client;
    }
    return client;
  }

  async onModuleDestroy() {
    await Promise.all(
      Object.values(this.clients).map((client) => client.$disconnect),
    );
  }
}
