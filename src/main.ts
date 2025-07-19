import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prefix = 'api';
  app.setGlobalPrefix(prefix);

  const config = new DocumentBuilder()
    .setTitle('PC Assembly Parts API')
    .setDescription('API with list of parts for PC assembly builder')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/docs`, app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
