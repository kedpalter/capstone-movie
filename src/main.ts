import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/constant/app.constant'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api")

  const port = PORT ?? 3053;
  await app.listen(port, () => {
    console.log(`💚 Server online:`, port)
  });
}
bootstrap();
