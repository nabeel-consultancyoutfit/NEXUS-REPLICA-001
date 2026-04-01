import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    // ─── Global Config ───────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig, jwtConfig],
    }),

    // ─── MongoDB Atlas Connection ─────────────────────────────────────
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        dbName: 'nexus-database',
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('✅  MongoDB Atlas connected successfully');
          });
          connection.on('error', (err: Error) => {
            console.error('❌  MongoDB connection error:', err.message);
          });
          return connection;
        },
      }),
      inject: [ConfigService],
    }),

    // ─── Feature Modules ──────────────────────────────────────────────
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
