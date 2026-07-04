import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { PdfModule } from './pdf/pdf.module';
import { ExamModule } from './exam/exam.module';

@Module({
  imports: [QuestionsModule, PdfModule, ExamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
