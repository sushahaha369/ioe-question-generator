# Task Checklist: IOE Exam & Answer Key Generator

- [ ] **Task 1: Add Explanation Fields to Mock Question Bank**
  - **Acceptance**: All sample questions in `sample-questions.ts` include an `explanation` string explaining the concept behind the correct answer.
  - **Verify**: The type interface `QuestionData` compiles with the new field.
  - **Files**: `backend/src/questions/data/sample-questions.ts`

- [ ] **Task 2: Implement Answer Key PDF Exporter**
  - **Acceptance**: `PdfService` provides `generateAnswerKeyPdf` which renders question text, correct option letter, explanation details, and the AI error disclaimer in the footer.
  - **Verify**: Call the PDF exporter to confirm layout structure.
  - **Files**: `backend/src/pdf/pdf.service.ts`

- [ ] **Task 3: Expose Answer Key API Endpoints**
  - **Acceptance**: `ExamService` and `ExamController` expose `POST /exam/generate-answers-pdf` which compiles and downloads the Answer Key PDF.
  - **Verify**: Verify the endpoint via post request.
  - **Files**: `backend/src/exam/exam.service.ts`, `backend/src/exam/exam.controller.ts`

- [ ] **Task 4: Simplify UI and Add AI Warnings**
  - **Acceptance**: React UI has the PDF preview iframe and browser printing controls removed, displays the AI warning at the bottom, and provides separate download actions for the Question Paper and Answer Key.
  - **Verify**: Visually inspect the simplified macOS interface.
  - **Files**: `frontend/src/App.jsx`, `frontend/src/index.css`
