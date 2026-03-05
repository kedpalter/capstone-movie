import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/constant/app.constant'
import { ValidationPipe } from '@nestjs/common/pipes';
import { ResponseSuccessInterceptor } from './common/interceptors/response-success.interceptor';
import { LogInterceptor } from './common/interceptors/log.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix("api")
  app.useGlobalInterceptors(new LogInterceptor, new ResponseSuccessInterceptor())

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('AOU Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  const port = PORT ?? 3053;
  await app.listen(port, () => {
    console.log(`💚 Server online:`, port)
  });
}
bootstrap();
