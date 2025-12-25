import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // GlobalPiped to validate incoming request bodies:
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that donot have decorators
      forbidNonWhitelisted: true,
      transform: true, // transforms the payload to object WRT respectives DTO
      disableErrorMessages: false,
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
