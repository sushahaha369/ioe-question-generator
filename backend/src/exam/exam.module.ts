import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { QuestionsModule } from '../questions/questions.module';
import { PdfModule } from '../pdf/pdf.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    QuestionsModule,
    PdfModule,
  ],
  providers: [ExamService],
  controllers: [ExamController],
})
export class ExamModule {}
