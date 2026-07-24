# IOE Entrance Model Question Paper Generator

*Based on / forked from [Mandip47/IOE-Entrance-Model-Question-Paper-Generator](https://github.com/Mandip47/IOE-Entrance-Model-Question-Paper-Generator).*

A full-stack tool that generates model question papers in PDF format for Institute of Engineering (IOE) courses with just a single click. This tool streamlines exam preparation by providing ready-to-print question papers for students and educators alike. Includes an AI Agent for generating and customizing exams.

**Note:** This project is currently a work in progress. While the basic functionality is implemented, some PDF questions and options are not yet fully formatted. Contributions and feedback are welcome!

## Features

- **Quick PDF Generation**: Generate IOE model question papers instantly
- **Full-Stack Application**: Interactive frontend (React/Vite) with a robust backend (NestJS)
- **AI Exam Assistant**: Custom Antigravity-powered agent to interactively customize your exams
- **Easy-to-Use**: One-click PDF creation saves time and simplifies study material preparation
- **Customizable**: Additional question sets can be integrated and customized to meet specific requirements

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tosudip369/ioe-question-generator.git
   cd ioe-question-generator
   ```

2. **Install Node Dependencies:**
   Install dependencies for both the frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   cd ..
   ```

3. **Run the Application Servers:**
   Launch both the Vite frontend and NestJS backend concurrently:
   ```powershell
   ./run.ps1
   ```

4. **Run the AI Agent (Optional):**
   To interactively customize and generate exams via the AI assistant, install the Python dependencies and run the agent (ensure the backend is running first):
   ```bash
   pip install -r requirements.txt
   python generate_exam_agent.py
   ```

## Contributing

This project is in its early stages, and contributions are encouraged! If you're interested in helping improve the question formatting or adding new features, please reach out to us or fork the repository and open a pull request.
