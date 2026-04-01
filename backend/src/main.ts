import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3008;

  // ─── Global Prefix ────────────────────────────────────────────────
  app.setGlobalPrefix('api');

  // ─── CORS ─────────────────────────────────────────────────────────
  app.enableCors({
    origin: [
      'http://localhost:3000', // Next.js dev server
      'http://localhost:4000',
      process.env.FRONTEND_URL || '',
    ].filter(Boolean),
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // ─── Global Validation Pipe ───────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Strip properties not in DTO
      forbidNonWhitelisted: true, // Throw if unknown props are passed
      transform: true,           // Auto-transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ─── Global Exception Filter ──────────────────────────────────────
  app.useGlobalFilters(new AllExceptionsFilter());

  // ─── Swagger / OpenAPI ────────────────────────────────────────────
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NEXUS API')
    .setDescription(
      `
## NEXUS Backend REST API

A production-ready NestJS backend with:
- **JWT Authentication** (Signup / Login)
- **User Management** (CRUD)
- **MongoDB Atlas** (Mongoose ODM)
- **Role-based Access Control** (admin, user, moderator)

### Authentication
All protected endpoints require a **Bearer token** in the Authorization header:
\`\`\`
Authorization: Bearer <your_jwt_token>
\`\`\`
      `.trim(),
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Authentication', 'Signup, Login, and current user endpoints')
    .addTag('Users', 'User management endpoints (protected)')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'NEXUS API Docs',
  });

  // ─── Start Server ─────────────────────────────────────────────────
  await app.listen(port);

  logger.log(`🚀  Server running on: http://localhost:${port}`);
  logger.log(`📖  Swagger docs at:   http://localhost:${port}/api/docs`);
  logger.log(`🌐  API base URL:      http://localhost:${port}/api`);
}

bootstrap();
