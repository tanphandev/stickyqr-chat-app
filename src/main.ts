import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  exception filters
  app.useGlobalFilters(new HttpExceptionFilter());

  //cors
  app.enableCors();

  await app.listen(4000);
}
bootstrap();
