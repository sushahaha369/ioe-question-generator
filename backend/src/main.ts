import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable strict CORS for the frontend origin
  app.enableCors({
    origin: (requestOrigin, callback) => {
      if (!requestOrigin || 
          requestOrigin.includes('localhost') || 
          requestOrigin.includes('127.0.0.1') || 
          requestOrigin.includes('vercel.app') || 
          requestOrigin.includes('work.gd')) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: 'GET,POST,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });
  
  const port = process.env.PORT ?? 5000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
