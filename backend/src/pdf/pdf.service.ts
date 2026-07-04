import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import * as cheerio from 'cheerio';

@Injectable()
export class PdfService {
  // Concurrency limit variables to handle high user loads without out-of-memory or CPU crashes
  private activeCount = 0;
  private readonly maxConcurrency = 3;
  private readonly waitingQueue: (() => void)[] = [];

  /**
   * Acquires a slot in the concurrency queue.
   */
  private async acquireSlot(): Promise<void> {
    if (this.activeCount < this.maxConcurrency) {
      this.activeCount++;
      return;
    }
    return new Promise<void>((resolve) => {
      this.waitingQueue.push(resolve);
    });
  }

  /**
   * Releases the slot and wakes up next queued task if present.
   */
  private releaseSlot(): void {
    this.activeCount--;
    if (this.waitingQueue.length > 0) {
      const next = this.waitingQueue.shift();
      if (next) {
        this.activeCount++;
        next();
      }
    }
  }

  /**
   * Helper to strip HTML tags and decode basic HTML entities
   */
  private cleanHtml(html: string): string {
    if (!html) return '';
    const $ = cheerio.load(html);
    let text = $.text();
    text = text.replace(/\\\(|\\\)/g, '');
    text = text.replace(/&ndash;/g, '-');
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&middot;/g, '·');
    return text.trim();
  }

  /**
   * Public entry for question paper PDF compilation, wrapped with the load balancer.
   */
  async generatePdf(questions: any[]): Promise<Buffer> {
    await this.acquireSlot();
    try {
      return await this.executeGeneratePdf(questions);
    } finally {
      this.releaseSlot();
    }
  }

  /**
   * Public entry for solutions PDF compilation, wrapped with the load balancer.
   */
  async generateAnswerKeyPdf(questions: any[]): Promise<Buffer> {
    await this.acquireSlot();
    try {
      return await this.executeGenerateAnswerKeyPdf(questions);
    } finally {
      this.releaseSlot();
    }
  }

  /**
   * Internal generator for the model exam paper.
   */
  private executeGeneratePdf(questions: any[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margins: { top: 36, bottom: 45, left: 36, right: 36 },
          bufferPages: true,
        });

        const chunks: Buffer[] = [];
        doc.on('data', (chunk: Buffer) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', (err: Error) => reject(err));

        // --- Document Header ---
        doc.font('Times-Bold').fontSize(16).text('INSTITUTE OF ENGINEERING (IOE)', { align: 'center' });
        doc.font('Times-Roman').fontSize(12).text('ENTRANCE MODEL EXAMINATION', { align: 'center' });
        doc.font('Times-Italic').fontSize(10).text('Time: 2 Hours | Full Marks: 100', { align: 'center' });
        doc.moveDown(0.5);

        // Draw a dividing line
        doc.moveTo(36, doc.y).lineTo(559, doc.y).strokeColor('#000000').lineWidth(1).stroke();
        doc.moveDown(1);

        // General Instructions
        doc.font('Times-Bold').fontSize(10).text('Instructions: ', { continued: true });
        doc.font('Times-Roman').fontSize(10).text(
          'Attempt all questions. Each question carries exactly 1 mark. There is a negative marking of 5% for wrong answers. Option symbols A, B, C, and D are to be used.'
        );
        doc.moveDown(1.5);

        // Group questions by subject
        const subjects = {
          mathematics: questions.filter(q => q.subject === 'mathematics'),
          physics: questions.filter(q => q.subject === 'physics'),
          chemistry: questions.filter(q => q.subject === 'chemistry'),
          english: questions.filter(q => q.subject === 'english'),
        };

        let questionIndex = 1;

        // Render each subject section
        for (const [subjName, subjQuestions] of Object.entries(subjects)) {
          if (subjQuestions.length === 0) continue;

          // Header for section
          const title = subjName.toUpperCase();
          doc.font('Times-Bold').fontSize(12).text(title, { align: 'center', underline: true });
          doc.moveDown(0.8);

          for (const q of subjQuestions) {
            const questionData = q.questionData;
            const qText = this.cleanHtml(questionData.question_plain_title);
            const markText = `[1 Mark]`;

            // Check if page overflow will occur, add page break if needed
            if (doc.y > 750) {
              doc.addPage();
            }

            // Write Question
            doc.font('Times-Bold').fontSize(10).text(`${questionIndex}. `, { continued: true });
            doc.font('Times-Roman').fontSize(10).text(qText, { continued: true });
            doc.font('Times-Italic').fontSize(9).text(`  ${markText}`, { align: 'right' });
            doc.moveDown(0.4);

            // Options mapping
            const options = [
              this.cleanHtml(questionData.ans1_plain_text),
              this.cleanHtml(questionData.ans2_plain_text),
              this.cleanHtml(questionData.ans3_plain_text),
              this.cleanHtml(questionData.ans4_plain_text),
            ];

            options.forEach((optText, optIdx) => {
              const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
              if (doc.y > 760) {
                doc.addPage();
              }
              doc.font('Times-Roman').fontSize(10).text(`(${letter}) ${optText}`, { indent: 15 });
              doc.moveDown(0.2);
            });

            doc.moveDown(0.8);
            questionIndex++;
          }

          doc.moveDown(1.5);
        }

        // Add page numbers and AI disclaimer at the footer of each page
        const pages = doc.bufferedPageRange();
        for (let i = 0; i < pages.count; i++) {
          doc.switchToPage(i);
          
          doc.font('Times-Italic').fontSize(7).fillColor('#4b5563').text(
            'Disclaimer: This question paper is generated by AI. AI can make errors. Please verify calculations and concepts.',
            36,
            doc.page.height - 40,
            { align: 'center', width: 523 }
          );
          
          doc.font('Times-Roman').fontSize(8).fillColor('#000000').text(
            `Page ${i + 1} of ${pages.count}`,
            36,
            doc.page.height - 25,
            { align: 'center', width: 523 }
          );
        }

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Internal generator for the model exam Answer Key.
   */
  private executeGenerateAnswerKeyPdf(questions: any[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margins: { top: 36, bottom: 45, left: 36, right: 36 },
          bufferPages: true,
        });

        const chunks: Buffer[] = [];
        doc.on('data', (chunk: Buffer) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', (err: Error) => reject(err));

        // --- Document Header ---
        doc.font('Times-Bold').fontSize(16).text('INSTITUTE OF ENGINEERING (IOE)', { align: 'center' });
        doc.font('Times-Roman').fontSize(12).text('ENTRANCE MODEL EXAMINATION - ANSWER KEY', { align: 'center' });
        doc.font('Times-Italic').fontSize(10).text('EXPLANATORY SOLUTIONS', { align: 'center' });
        doc.moveDown(0.5);

        // Draw a dividing line
        doc.moveTo(36, doc.y).lineTo(559, doc.y).strokeColor('#000000').lineWidth(1).stroke();
        doc.moveDown(1);

        // Group questions by subject
        const subjects = {
          mathematics: questions.filter(q => q.subject === 'mathematics'),
          physics: questions.filter(q => q.subject === 'physics'),
          chemistry: questions.filter(q => q.subject === 'chemistry'),
          english: questions.filter(q => q.subject === 'english'),
        };

        let questionIndex = 1;

        // Render each subject section
        for (const [subjName, subjQuestions] of Object.entries(subjects)) {
          if (subjQuestions.length === 0) continue;

          // Header for section
          const title = subjName.toUpperCase();
          doc.font('Times-Bold').fontSize(12).text(title, { align: 'center', underline: true });
          doc.moveDown(1.2);

          for (const q of subjQuestions) {
            const questionData = q.questionData;
            const qText = this.cleanHtml(questionData.question_plain_title);
            const ansIndex = questionData.correct_answer || 1;
            const optionLetter = String.fromCharCode(64 + ansIndex); // A, B, C, D
            const optionText = this.cleanHtml(questionData[`ans${ansIndex}_plain_text`]);
            const explanation = questionData.explanation || 'By applying fundamental principles of the subject.';

            // Check page overflow
            if (doc.y > 720) {
              doc.addPage();
            }

            // Write Question Text
            doc.font('Times-Bold').fontSize(10).text(`${questionIndex}. `, { continued: true });
            doc.font('Times-Roman').fontSize(10).text(qText);
            doc.moveDown(0.3);

            // Write Correct Answer
            doc.font('Times-Bold').fontSize(10).fillColor('#059669').text(`Correct Option: (${optionLetter}) ${optionText}`, { indent: 15 });
            doc.moveDown(0.2);

            // Write Explanation
            doc.font('Times-Bold').fontSize(9).fillColor('#4b5563').text('Why: ', { continued: true, indent: 15 });
            doc.font('Times-Roman').fontSize(9).fillColor('#1f2937').text(explanation);
            
            doc.moveDown(1);
            questionIndex++;
          }

          doc.moveDown(1.5);
        }

        // Add page numbers and AI disclaimer at the footer of each page
        const pages = doc.bufferedPageRange();
        for (let i = 0; i < pages.count; i++) {
          doc.switchToPage(i);
          
          doc.font('Times-Italic').fontSize(7).fillColor('#4b5563').text(
            'Disclaimer: This answer key is generated by AI. AI can make errors. Please verify calculations and concepts.',
            36,
            doc.page.height - 40,
            { align: 'center', width: 523 }
          );
          
          doc.font('Times-Roman').fontSize(8).fillColor('#000000').text(
            `Page ${i + 1} of ${pages.count}`,
            36,
            doc.page.height - 25,
            { align: 'center', width: 523 }
          );
        }

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  }
}
