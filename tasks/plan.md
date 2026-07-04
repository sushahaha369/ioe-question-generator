# Implementation Plan: NestJS IOE Entrance Exam Question Paper Generator

This plan outlines the implementation path for transitioning the Python-based IOE question paper generator to a modern NestJS + React Fullstack application.

---

## 🗺️ Implementation Order
We will build the application in four sequential phases:
1. **Phase 1: Backend Setup & Configuration** — Initialize NestJS, set up environment variables, and configure modules.
2. **Phase 2: Question Fetcher & Parsers** — Implement the external API connector (using mock questions as fallback), cheerio-based HTML parser, and question formatting logic.
3. **Phase 3: PDF Generator Service** — Implement the PDF engine using Node.js, mapping the question format to a clean, printed PDF document.
4. **Phase 4: Frontend Development** — Build a stunning glassmorphic UI using React and Vite, supporting live exam generation, previews, and PDF downloads.

---

## ⚡ Key Modules & Structure
- **Exam Module**: Manages endpoint requests, coordinates data retrieval.
- **Questions Module**: Houses a standalone dataset of sample questions (for Physics, Math, Chemistry, English) to guarantee standalone functionality if credentials aren't set.
- **PDF Module**: Encapsulates all layout calculations, header formatting, and question drawing logic.

---

## 🛡️ Risk & Mitigation Strategies
- **Math Equation Rendering (LaTeX/MathML) in HTML**: The python script uses BeautifulSoup and base64-encoded image extraction. In Node.js, we will use Cheerio to extract base64-encoded images and plain-text fallbacks, rendering equations as inline images where available.
- **API Availability**: If `BASE_URL` or `TOKEN` is invalid, the app will auto-fallback to the local question database.
