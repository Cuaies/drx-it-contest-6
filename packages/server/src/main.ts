import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupApp } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupApp(app);
  await app.listen(3000);
}
bootstrap();
