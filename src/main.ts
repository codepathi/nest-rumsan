import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe, Logger} from '@nestjs/common'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  const logger = new Logger('bootstrap')

  const config = new DocumentBuilder()
  .setTitle('Rumsan Nest')
  .setDescription('Rumsan nest CRUD and OAUTH documentation')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('documentation', app, document);

  logger.log(`Swagger Documentation running on the url http://localhost:${process.env.PORT}/documentation`)
  await app.listen(process.env.PORT);
}

bootstrap();
