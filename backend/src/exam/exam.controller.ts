import { Controller, Post, Body, Res, HttpCode, HttpStatus, Get, BadRequestException } from '@nestjs/common';
import type { Response } from 'express';
import { ExamService, ExamOptions } from './exam.service';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  /**
   * Health check endpoint
   */
  @Get('health')
  healthCheck() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  /**
   * Endpoint to generate and download the Model Exam PDF.
   */
  @Post('generate-pdf')
  @HttpCode(HttpStatus.OK)
  async generatePdf(@Body() options: ExamOptions, @Res() res: Response) {
    try {
      const validated = this.validateOptions(options);
      const pdfBuffer = await this.examService.generateModelExamPdf(validated);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ioe_model_exam.pdf"',
        'Content-Length': pdfBuffer.length,
      });

      res.end(pdfBuffer);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to generate model exam PDF',
        error: error.message,
      });
    }
  }

  /**
   * Endpoint to generate and download the Model Exam Answer Key PDF.
   */
  @Post('generate-answers-pdf')
  @HttpCode(HttpStatus.OK)
  async generateAnswersPdf(@Body() options: ExamOptions, @Res() res: Response) {
    try {
      const validated = this.validateOptions(options);
      const pdfBuffer = await this.examService.generateModelExamAnswersPdf(validated);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ioe_model_exam_answers.pdf"',
        'Content-Length': pdfBuffer.length,
      });

      res.end(pdfBuffer);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to generate model exam answer key PDF',
        error: error.message,
      });
    }
  }

  /**
   * Endpoint to generate and get the JSON data of the questions.
   */
  @Post('generate-json')
  @HttpCode(HttpStatus.OK)
  async generateJson(@Body() options: ExamOptions) {
    const validated = this.validateOptions(options);
    return this.examService.generateModelExamData(validated);
  }

  /**
   * Endpoint to generate a PDF for a custom list of flagged questions.
   */
  @Post('generate-flagged-pdf')
  @HttpCode(HttpStatus.OK)
  async generateFlaggedPdf(@Body() body: { questions: any[] }, @Res() res: Response) {
    try {
      if (!body || !Array.isArray(body.questions)) {
        throw new BadRequestException('Invalid questions list');
      }
      const pdfBuffer = await this.examService.generateCustomQuestionsPdf(body.questions);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ioe_flagged_questions.pdf"',
        'Content-Length': pdfBuffer.length,
      });
      res.end(pdfBuffer);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to generate flagged questions PDF',
        error: error.message,
      });
    }
  }

  /**
   * Endpoint to generate an Answer Key PDF for a custom list of flagged questions.
   */
  @Post('generate-flagged-answers-pdf')
  @HttpCode(HttpStatus.OK)
  async generateFlaggedAnswersPdf(@Body() body: { questions: any[] }, @Res() res: Response) {
    try {
      if (!body || !Array.isArray(body.questions)) {
        throw new BadRequestException('Invalid questions list');
      }
      const pdfBuffer = await this.examService.generateCustomAnswersPdf(body.questions);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ioe_flagged_solutions.pdf"',
        'Content-Length': pdfBuffer.length,
      });
      res.end(pdfBuffer);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to generate flagged answers PDF',
        error: error.message,
      });
    }
  }

  /**
   * Manual input sanitizer & validation boundary (protects against parameter pollution & resource exhaustion)
   */
  private validateOptions(options: ExamOptions): ExamOptions {
    if (!options || typeof options !== 'object') {
      return {
        subjects: ['physics', 'mathematics', 'chemistry', 'english'],
        distribution: 'standard'
      };
    }

    const sanitized: ExamOptions = {
      subjects: [],
      distribution: 'standard'
    };

    // 1. Sanitize subjects array (allowlist only)
    const allowedSubjects = ['physics', 'mathematics', 'chemistry', 'english'];
    if (Array.isArray(options.subjects)) {
      sanitized.subjects = options.subjects.filter(sub => 
        typeof sub === 'string' && allowedSubjects.includes(sub.toLowerCase())
      );
    }
    if (!sanitized.subjects || sanitized.subjects.length === 0) {
      sanitized.subjects = [...allowedSubjects];
    }

    // 2. Sanitize distribution mode
    if (typeof options.distribution === 'string' && ['standard', 'custom'].includes(options.distribution.toLowerCase())) {
      sanitized.distribution = options.distribution.toLowerCase() as 'standard' | 'custom';
    }

    // 3. Sanitize customCounts (prevent negative numbers & overflow/resource exhaustion)
    if (options.customCounts && typeof options.customCounts === 'object') {
      const counts: any = {};
      const customCounts = options.customCounts as any;
      for (const sub of allowedSubjects) {
        const inputVal = customCounts[sub];
        if (inputVal !== undefined) {
          const num = Math.floor(Number(inputVal));
          // Cap question counts at 100 per subject to avoid CPU/memory resource exhaustion
          counts[sub] = isNaN(num) ? 0 : Math.max(0, Math.min(100, num));
        } else {
          counts[sub] = 0;
        }
      }
      sanitized.customCounts = counts;
    }

    return sanitized;
  }
}
