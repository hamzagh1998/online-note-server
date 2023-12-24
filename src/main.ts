import { EventEmitter } from 'stream';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

EventEmitter.defaultMaxListeners = 20;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const configService = app.get(ConfigService);

  // Initialize Firebase Admin SDK
  const firebaseConfig = configService.get<object>('firebaseAppConfig');

  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });

  // Set a global prefix for all routes
  app.setGlobalPrefix('api/v1');
  // enable CORS
  app.enableCors();

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
