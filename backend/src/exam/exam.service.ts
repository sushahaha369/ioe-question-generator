import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { QuestionsService } from '../questions/questions.service';
import { PdfService } from '../pdf/pdf.service';

export class ExamOptions {
  subjects?: string[]; 
  distribution?: 'standard' | '369' | 'custom';
  customCounts?: {
    physics?: number;
    mathematics?: number;
    chemistry?: number;
    english?: number;
  };
  chapter?: string;
}

@Injectable()
export class ExamService {
  private readonly logger = new Logger(ExamService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly questionsService: QuestionsService,
    private readonly pdfService: PdfService,
  ) {}

  /**
   * Generates model exam data (JSON array of questions) based on options.
   */
  async generateModelExamData(options: ExamOptions): Promise<any[]> {
    const subjects = options.subjects || ['physics', 'mathematics', 'chemistry', 'english'];
    const distribution = options.distribution || 'standard';
    
    // Resolve question counts for each subject
    const counts = this.resolveCounts(distribution, options.customCounts);

    // Try to fetch questions from the remote API
    let questions = await this.fetchQuestionsFromApi();

    if (!questions || questions.length === 0) {
      this.logger.warn('Failed to fetch questions from API or credentials missing. Falling back to mock question bank.');
      // Fetch from local mock question bank
      questions = this.questionsService.getMockQuestions(
        counts.english,
        counts.chemistry,
        counts.physics,
        counts.mathematics,
        options.chapter,
      );
    } else {
      // If fetched from API, we will filter and shuffle them to match requested counts
      questions = this.processApiQuestions(questions, counts, subjects);
    }

    // Filter by selected subjects (already partially done above, but to be sure)
    return questions.filter(q => subjects.includes(q.subject));
  }

  /**
   * Generates a model exam PDF based on options.
   */
  async generateModelExamPdf(options: ExamOptions): Promise<Buffer> {
    const finalQuestions = await this.generateModelExamData(options);
    // Generate and return PDF Buffer
    return this.pdfService.generatePdf(finalQuestions);
  }

  /**
   * Generates a model exam Answer Key PDF based on options.
   */
  async generateModelExamAnswersPdf(options: ExamOptions): Promise<Buffer> {
    const finalQuestions = await this.generateModelExamData(options);
    // Generate and return Answer Key PDF Buffer
    return this.pdfService.generateAnswerKeyPdf(finalQuestions);
  }

  /**
   * Generates a PDF for a custom list of questions.
   */
  async generateCustomQuestionsPdf(questions: any[]): Promise<Buffer> {
    return this.pdfService.generatePdf(questions);
  }

  /**
   * Generates an Answer Key PDF for a custom list of questions.
   */
  async generateCustomAnswersPdf(questions: any[]): Promise<Buffer> {
    return this.pdfService.generateAnswerKeyPdf(questions);
  }

  /**
   * Determine the target question count per subject based on distribution mode.
   */
  private resolveCounts(distribution: string, custom?: any) {
    if (distribution === 'standard') {
      return {
        english: 20,
        chemistry: 20,
        physics: 30,
        mathematics: 30,
      };
    } else {
      // custom
      return {
        english: Number(custom?.english || 0),
        chemistry: Number(custom?.chemistry || 0),
        physics: Number(custom?.physics || 0),
        mathematics: Number(custom?.mathematics || 0),
      };
    }
  }

  /**
   * Fetches questions from the remote API using the BASE_URL and TOKEN environment variables.
   */
  private async fetchQuestionsFromApi(): Promise<any[] | null> {
    const baseUrl = this.configService.get<string>('BASE_URL');
    const token = this.configService.get<string>('TOKEN');

    if (!baseUrl || !token) {
      this.logger.warn('BASE_URL or TOKEN not configured in environment variables.');
      return null;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      this.logger.log('Starting remote exam session...');
      const startResponse = await firstValueFrom(
        this.httpService.post(`${baseUrl}/mock-test/start-exam`, {}, { headers })
      );

      const sessionId = startResponse.data?.examSessionId;
      const questionIds = startResponse.data?.questions;

      if (!sessionId || !questionIds || !Array.isArray(questionIds)) {
        this.logger.error('Invalid response received from start-exam endpoint.');
        return null;
      }

      this.logger.log(`Session established: ${sessionId}. Fetching question details...`);
      const detailsResponse = await firstValueFrom(
        this.httpService.post(
          `${baseUrl}/exam/questions`,
          { sessionID: sessionId, questionIDs: questionIds },
          { headers }
        )
      );

      // Verify and return response array
      const rawQuestions = detailsResponse.data;
      if (Array.isArray(rawQuestions)) {
        // Map any field names if they differ slightly or standardize them
        return rawQuestions.map(q => ({
          id: q.id,
          // Standardize subject name matching
          subject: this.normalizeSubjectName(q.subject || q.subjectName || ''),
          marks: q.marks || 1,
          questionData: q.questionData || q,
        }));
      }

      return null;
    } catch (error) {
      this.logger.error(`Error communicating with external API: ${error.message}`);
      return null;
    }
  }

  /**
   * Map subject strings to standard subject keys
   */
  private normalizeSubjectName(sub: string): string {
    const lower = sub.toLowerCase();
    if (lower.includes('math')) return 'mathematics';
    if (lower.includes('phys')) return 'physics';
    if (lower.includes('chem')) return 'chemistry';
    if (lower.includes('eng')) return 'english';
    return lower;
  }

  /**
   * Helper to scale an API question pool to target count using variant generation.
   */
  private scalePool(pool: any[], count: number): any[] {
    if (pool.length === 0) return [];
    
    const selected: any[] = [];
    let attempts = 0;
    
    while (selected.length < count) {
      const idx = attempts % pool.length;
      const original = pool[idx];
      
      const cloned = JSON.parse(JSON.stringify(original));
      cloned.id = original.id * 100 + selected.length;
      
      if (selected.length >= pool.length) {
        const variantIndex = Math.floor(selected.length / pool.length) + 1;
        cloned.questionData.question_plain_title = `[Set B Var ${variantIndex}] ${cloned.questionData.question_plain_title}`;
        
        // Vary numeric options if possible
        if (cloned.questionData && !isNaN(Number(cloned.questionData.ans1_plain_text))) {
          cloned.questionData.ans1_plain_text = String(Number(cloned.questionData.ans1_plain_text) * (variantIndex + 1));
          cloned.questionData.ans2_plain_text = String(Number(cloned.questionData.ans2_plain_text) * (variantIndex + 1));
          cloned.questionData.ans3_plain_text = String(Number(cloned.questionData.ans3_plain_text) * (variantIndex + 1));
          cloned.questionData.ans4_plain_text = String(Number(cloned.questionData.ans4_plain_text) * (variantIndex + 1));
        }
      }
      
      selected.push(cloned);
      attempts++;
    }
    
    return selected.sort(() => 0.5 - Math.random());
  }

  /**
   * Process API questions to match target counts, falling back to mock bank if a subject is missing.
   */
  private processApiQuestions(questions: any[], counts: any, subjects: string[]): any[] {
    const result: any[] = [];
    const subjectsMap = {
      english: counts.english,
      chemistry: counts.chemistry,
      physics: counts.physics,
      mathematics: counts.mathematics,
    };

    for (const [subjectKey, count] of Object.entries(subjectsMap)) {
      if (!subjects.includes(subjectKey)) continue;

      const subPool = questions.filter(q => q.subject === subjectKey);
      
      if (subPool.length === 0) {
        // Fallback to local mock database for this subject
        this.logger.warn(`API returned 0 questions for subject "${subjectKey}". Falling back to mock question bank.`);
        const fallback = this.questionsService.getMockQuestions(
          subjectKey === 'english' ? count : 0,
          subjectKey === 'chemistry' ? count : 0,
          subjectKey === 'physics' ? count : 0,
          subjectKey === 'mathematics' ? count : 0,
        );
        result.push(...fallback);
      } else {
        result.push(...this.scalePool(subPool, count));
      }
    }

    return result;
  }
}
