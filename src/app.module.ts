import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { FirebaseAuthMiddleware } from './middlewares/firebase-auth.middleware';

import { configuration } from './config';

import { AuthModule } from './api/v1/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService], // Ensure ConfigService is injected here
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('databaseURL'),
      }),
    }),
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply FirebaseAuthMiddleware to all routes
    consumer.apply(FirebaseAuthMiddleware).forRoutes('*');
  }
}
