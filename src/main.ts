import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

process.env.TZ = 'UTC';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
    index: false,
  });

  app.enableCors();

  await app.listen(3001);
}

bootstrap();
