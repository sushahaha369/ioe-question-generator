import React, { useState, useEffect, useRef } from 'react';

const FLASHCARDS = [
  { id: 1, front: "What is the formula for the radius of gyration of a solid sphere of radius R?", back: "k = R * √(2/5)" },
  { id: 2, front: "What is the conjugate acid of NH₂⁻?", back: "NH₃ (Ammonia)" },
  { id: 3, front: "What is the value of Euler's constant (e)?", back: "e ≈ 2.71828" },
  { id: 4, front: "What is the dimensional formula for Coefficient of Viscosity?", back: "[M¹ L⁻¹ T⁻¹]" },
  { id: 5, front: "What is the IUPAC name for Glycerol?", back: "Propane-1,2,3-triol" },
  { id: 6, front: "What is the formula for the capacitance of a parallel plate capacitor with dielectric K?", back: "C = K * ε₀ * A / d" },
  { id: 7, front: "What is the relation between escape velocity (Ve) and orbital velocity (Vo)?", back: "Ve = √2 * Vo" }
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Rank #12 Success Story: Cracking the IOE Entrance",
    excerpt: "An in-depth interview with Rohan Karki on how he balanced NEB +2 boards and mastered the 100 MCQ speed challenge.",
    date: "July 2, 2026",
    author: "Rohan Karki",
    readTime: "5 min read",
    content: `
      <h2>The Beginning of the Journey</h2>
      <p>Cracking the Tribhuvan University Institute of Engineering (IOE) entrance exam is widely regarded as one of the most competitive milestones for science students in Nepal. With over 15,000 applicants competing for limited seats in top constituent campuses like Pulchowk and Thapathali, speed and accuracy are everything.</p>
      
      <h2>My Preparation Strategy</h2>
      <p>I realized early on that reading theory books cover-to-cover was not enough. I switched to the <strong>Practice-First Method</strong>: taking active mock exams first, identifying where I made errors, and then reading only the chapters where I was weak. This active recall method saved me hundreds of hours.</p>
      
      <h2>Managing the 120 Minutes</h2>
      <p>In the real computer-based test, you have exactly 2 hours for 100 questions. I divided my time strictly:</p>
      <ul>
        <li><strong>English & Chemistry (35 mins)</strong>: These require less calculations. I answered them quickly to save time.</li>
        <li><strong>Physics & Mathematics (75 mins)</strong>: The core calculation-heavy sections where 2-mark questions reside.</li>
        <li><strong>Review (10 mins)</strong>: Scanning flags and correcting loose ends.</li>
      </ul>
      
      <p>Remember: there is a 10% negative marking in the official exam. Speed practice is your single biggest advantage. Keep taking mock tests, analyze the answer key, and learn the 'Why' behind every error!</p>
    `
  },
  {
    id: 2,
    title: "The Triple-Pass Reading Method for Physics & Math",
    excerpt: "Stop studying passively. Learn the active review technique that top scorers use to digest engineering concepts and retain formulas.",
    date: "June 28, 2026",
    author: "Dr. Prabhat Adhikari",
    readTime: "4 min read",
    content: `
      <h2>Why Passive Reading Fails</h2>
      <p>Many students spend hours highlighting formulas in physics and theorems in calculus, only to freeze when facing a twisted multiple-choice question. Passive reading creates an illusion of competence. To build real problem-solving speed, you need a structured strategy.</p>
      
      <h2>Introducing the Triple-Pass Method</h2>
      <p>The Triple-Pass method forces your brain to engage with the material at different levels of detail:</p>
      
      <h3>Pass 1: The Scan (5 minutes)</h3>
      <p>Quickly flip through the chapter or question set. Look at the headings, bold formulas, diagrams, and options. Do not try to solve anything yet. Your goal is to map the outline of the topic in your head.</p>
      
      <h3>Pass 2: The Core Sweep (30 minutes)</h3>
      <p>Attempt the basic questions and read the immediate explanations. Solve the 1-mark concepts. If you get a question wrong, mark it and write down the formula used in a central formula sheet.</p>
      
      <h3>Pass 3: The Deep Drill (25 minutes)</h3>
      <p>Attack the 2-mark computational questions (like circular motion integration or matrix determinants). Focus purely on deriving the result from memory. If you get stuck, use the 'Reveal Answer & Why' button in your practice tool to see the step-by-step logic, then hide it and resolve it again.</p>
    `
  },
  {
    id: 3,
    title: "Active Recall: How to Memorize 100+ Organic Reactions",
    excerpt: "Organic Chemistry weightage is critical. Here is a step-by-step playbook to map conversions and reagents without rote memorization.",
    date: "June 25, 2026",
    author: "Anjana Sharma",
    readTime: "6 min read",
    content: `
      <h2>The Chemistry Bottleneck</h2>
      <p>In the IOE syllabus, Chemistry accounts for 20 marks. While it carries fewer marks than Math or Physics, it is the fastest section to solve. If you know the reagents, you can finish the chemistry section in less than 15 minutes, leaving more time for calculus and mechanics.</p>
      
      <h2>Stop Memorizing, Start Mapping</h2>
      <p>Instead of memorizing lists of chemical equations, build <strong>Reaction Maps</strong>. Start with a central compound (e.g., Benzene or Ethanol) and draw arrows outward representing different reagents (e.g., concentrated H2SO4, KMnO4, or PCl5) and the resulting products.</p>
      
      <h2>Using Mock Question Explanations</h2>
      <p>When practicing mock papers, pay special attention to the 'Why' explanations for reaction questions. Understanding the role of the catalyst (dehydrating agent, oxidizing agent, etc.) is key. If you understand the mechanism, you can deduce the product of any reaction, even if the compounds are modified in the exam.</p>
    `
  },
  {
    id: 4,
    title: "Pulchowk Seat Guide: Regular vs Full-Fee Schemes",
    excerpt: "Understanding the seats matrix, constituent campus allocation rules, and BE/BArch cost streams at Pulchowk Campus.",
    date: "June 20, 2026",
    author: "Siddharth Regmi",
    readTime: "4 min read",
    content: `
      <h2>Campus Intake Structure</h2>
      <p>Tribhuvan University's Pulchowk Campus is the most sought-after engineering institute in Nepal. The intake is divided into <strong>Regular</strong> (highly subsidized, nominal semester costs) and <strong>Full-Fee</strong> streams.</p>
      
      <h2>Seat Categories</h2>
      <p>Each major department (Civil, Computer, Electrical, Electronics, Mechanical) allocates approximately 48 regular seats and 48 full-fee seats. To secure a regular civil seat, an applicant generally must score in the top 150 ranks nationally.</p>
      
      <h2>Scholarship quotas</h2>
      <p>A percentage of seats is reserved for government school graduates, female candidates, and underprivileged quotas. Ensure you prepare your documentation (community verification certificates) weeks before the ranking form submission.</p>
    `
  },
  {
    id: 5,
    title: "Wave Optics: Interference Hacks for 2-Mark Questions",
    excerpt: "Wave theory math can be tricky. Here is a cheat sheet on fringe width, slit-width ratios, and constructive interference paths.",
    date: "June 15, 2026",
    author: "Professor B. K. Shrestha",
    readTime: "6 min read",
    content: `
      <h2>Interference Core Formulas</h2>
      <p>In Wave Optics, 2-mark questions frequently involve slit widths and path differences. The path difference (Δx) for constructive interference is always an integral multiple of wavelength: <strong>Δx = nλ</strong>. For destructive interference: <strong>Δx = (2n-1)λ/2</strong>.</p>
      
      <h2>Fringe Width Shortcuts</h2>
      <p>The fringe width (β) is given by <strong>β = λD/d</strong>. If the entire Young's Double Slit apparatus is immersed in a liquid of refractive index (μ), the new fringe width becomes <strong>β' = β/μ</strong>. Do not waste time re-deriving this—apply the scale ratio directly!</p>
      
      <h2>Slit Width vs Intensity</h2>
      <p>Remember that the ratio of intensities is related to the amplitude ratio and slit width ratio: <strong>I₁/I₂ = (a₁/a₂)² = w₁/w₂</strong>. Memorize this relation; it resolves 90% of ratio calculations instantly.</p>
    `
  },
  {
    id: 6,
    title: "English Grammar: Subject-Verb Agreement Exceptions",
    excerpt: "Avoid common grammar traps. Master exceptions regarding collective nouns, coordinates, and compound qualifiers.",
    date: "June 10, 2026",
    author: "Prerna Koirala",
    readTime: "3 min read",
    content: `
      <h2>The Grammar Bottleneck</h2>
      <p>English accounts for 20 marks in the entrance exam. Speed is essential here. The faster you solve these, the more time you carry over to Maths calculations.</p>
      
      <h2>Tricky Exceptions</h2>
      <ul>
        <li><strong>Nouns plural in form but singular in meaning</strong>: Words like <em>physics</em>, <em>mathematics</em>, <em>news</em>, and <em>measles</em> always take a singular verb (e.g., "Physics is a fundamental science").</li>
        <li><strong>Collective Nouns</strong>: A collective noun (like <em>committee</em>, <em>jury</em>, <em>crew</em>) takes a singular verb if the group acts as a single unit, but a plural verb if the members act individually (e.g., "The jury was unanimous" vs "The jury were divided").</li>
        <li><strong>Compound Subjects with 'Or'/'Nor'</strong>: The verb agrees with the subject closest to it (e.g., "Neither the coordinator nor the students were present").</li>
      </ul>
    `
  },
  {
    id: 7,
    title: "Calculus Hacks: Integrating Rational Functions Fast",
    excerpt: "Use the Cover-Up Rule for partial fractions to resolve complex integration limits in under 30 seconds.",
    date: "June 05, 2026",
    author: "Ramanujan Adhikari",
    readTime: "4 min read",
    content: `
      <h2>The Cover-Up Method</h2>
      <p>When solving mock questions containing integrals like <strong>∫ 1 / ((x-1)(x-2)) dx</strong>, don't write out system equations to solve for A and B. Use Heaviside's Cover-Up method:</p>
      <p>To find the constant A for <strong>(x-1)</strong>, cover the <strong>(x-1)</strong> term in the original expression and plug in <strong>x = 1</strong>: <strong>A = 1 / (1-2) = -1</strong>. Similarly, to find B for <strong>(x-2)</strong>, cover <strong>(x-2)</strong> and plug in <strong>x = 2</strong>: <strong>B = 1 / (2-1) = 1</strong>.</p>
      <p>This gives <strong>∫ (-1/(x-1) + 1/(x-2)) dx = ln|x-2| - ln|x-1| + C</strong> immediately. This saves invaluable computation time!</p>
    `
  },
  {
    id: 8,
    title: "Circadian Rhythm Hacks: Sleeping During Entrance Week",
    excerpt: "Scientific sleep hygiene methods to maximize cognitive recall and prevent brain fog during the 2-hour mock challenge.",
    date: "May 30, 2026",
    author: "Dr. Sameer Thapa",
    readTime: "5 min read",
    content: `
      <h2>The Cognitive Cost of Sleep Loss</h2>
      <p>Cramming late at night the day before your IOE entrance mock destroys your brain's spatial processing and numerical recall. Sleep deprivation directly degrades working memory, meaning you will misread basic equations or commit simple calculation errors.</p>
      
      <h2>Aligning Your Circadian Rhythm</h2>
      <p>The official exam starts at different computer sessions. Wake up at the exact same hour every day for 7 days leading to the test. This aligns your cortisol peak with the test hours.</p>
      
      <h2>Blue-Light Lockout</h2>
      <p>Turn off screens 90 minutes before bed. Blue light blocks melatonin release. Read formula notebooks or blog success articles in print format instead of scrolling on tablets or laptops right before sleeping.</p>
    `
  }
];

const MOTIVATIONAL_HUBS = [
  {
    quote: "Scientists study the world as it is; engineers create the world that has never been.",
    author: "Theodore von Kármán",
    image: "blueprint"
  },
  {
    quote: "The only way to learn mathematics is to do mathematics.",
    author: "Paul Halmos",
    image: "math"
  },
  {
    quote: "Engineering is the closest thing to magic that exists in the world.",
    author: "Elon Musk",
    image: "space"
  },
  {
    quote: "What we know is a drop, what we are ignorant of is an ocean.",
    author: "Isaac Newton",
    image: "blueprint"
  },
  {
    quote: "Strive for perfection in everything you do. Take the best that exists and make it better.",
    author: "Sir Henry Royce",
    image: "mechanics"
  },
  {
    quote: "Math is the language in which God has written the universe.",
    author: "Galileo Galilei",
    image: "math"
  },
  {
    quote: "The human foot is a masterpiece of engineering and a work of art.",
    author: "Leonardo da Vinci",
    image: "mechanics"
  }
];

// --- local SVG Vector Art Components ---
function EngineeringArtBlueprint() {
  return (
    <svg viewBox="0 0 400 220" width="100%" height="100%">
      <rect width="100%" height="100%" fill="#0a0e1a"/>
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(197, 168, 128, 0.08)" strokeWidth="0.8"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      <circle cx="200" cy="110" r="65" fill="none" stroke="#c5a880" strokeWidth="1.5" strokeDasharray="4,4"/>
      <circle cx="200" cy="110" r="45" fill="none" stroke="#38bdf8" strokeWidth="1.2"/>
      <circle cx="200" cy="110" r="20" fill="none" stroke="#c5a880" strokeWidth="1"/>
      <line x1="50" y1="110" x2="350" y2="110" stroke="rgba(56,189,248,0.3)" strokeWidth="0.8"/>
      <line x1="200" y1="15" x2="200" y2="205" stroke="rgba(56,189,248,0.3)" strokeWidth="0.8"/>
      <path d="M 135 80 L 135 140 M 265 80 L 265 140" stroke="#c5a880" strokeWidth="1"/>
      <path d="M 135 110 L 265 110" stroke="#c5a880" strokeWidth="1"/>
      <text x="25" y="35" fill="rgba(255,255,255,0.25)" fontFamily="monospace" fontSize="10">SCALE: 1:10</text>
      <text x="25" y="50" fill="rgba(255,255,255,0.25)" fontFamily="monospace" fontSize="10">F = m * a</text>
      <text x="310" y="35" fill="rgba(255,255,255,0.25)" fontFamily="monospace" fontSize="10">E = mc²</text>
      <text x="310" y="50" fill="rgba(255,255,255,0.25)" fontFamily="monospace" fontSize="10">V = I * R</text>
    </svg>
  );
}

function EngineeringArtMath() {
  return (
    <svg viewBox="0 0 400 220" width="100%" height="100%">
      <rect width="100%" height="100%" fill="#09080a"/>
      <path d="M200,110 A10,10 0 0,1 210,110 A20,20 0 0,1 190,110 A40,40 0 0,1 230,110 A80,80 0 0,1 150,110 A160,160 0 0,1 310,110" 
            fill="none" stroke="#c5a880" strokeWidth="1.8"/>
      <polygon points="200,25 280,175 120,175" fill="none" stroke="rgba(197, 168, 128, 0.3)" strokeWidth="1"/>
      <circle cx="200" cy="110" r="85" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1"/>
      <text x="30" y="40" fill="rgba(255,255,255,0.2)" fontFamily="monospace" fontSize="10">∫ e^x dx = e^x</text>
      <text x="30" y="55" fill="rgba(255,255,255,0.2)" fontFamily="monospace" fontSize="10">∇ × E = -∂B/∂t</text>
      <text x="260" y="40" fill="rgba(255,255,255,0.2)" fontFamily="monospace" fontSize="10">eiπ + 1 = 0</text>
      <text x="260" y="55" fill="rgba(255,255,255,0.2)" fontFamily="monospace" fontSize="10">sin²θ + cos²θ = 1</text>
    </svg>
  );
}

function EngineeringArtSpace() {
  return (
    <svg viewBox="0 0 400 220" width="100%" height="100%">
      <rect width="100%" height="100%" fill="#06050e"/>
      <circle cx="200" cy="110" r="12" fill="#c5a880"/>
      <ellipse cx="200" cy="110" rx="140" ry="45" fill="none" stroke="rgba(197, 168, 128, 0.25)" strokeWidth="0.8"/>
      <ellipse cx="200" cy="110" rx="90" ry="28" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.8"/>
      <rect x="188" y="90" width="24" height="40" fill="none" stroke="#c5a880" strokeWidth="1"/>
      <line x1="140" y1="110" x2="260" y2="110" stroke="#c5a880" strokeWidth="1.2"/>
      <polygon points="140,100 140,120 120,115 120,105" fill="none" stroke="#38bdf8" strokeWidth="0.8"/>
      <polygon points="260,100 260,120 280,115 280,105" fill="none" stroke="#38bdf8" strokeWidth="0.8"/>
      <circle cx="45" cy="50" r="1" fill="#fff"/>
      <circle cx="350" cy="70" r="1.2" fill="#fff"/>
      <circle cx="70" cy="180" r="1" fill="#fff"/>
      <circle cx="320" cy="160" r="1.5" fill="#fff"/>
    </svg>
  );
}

function EngineeringArtMechanics() {
  return (
    <svg viewBox="0 0 400 220" width="100%" height="100%">
      <rect width="100%" height="100%" fill="#120e0c"/>
      <circle cx="150" cy="110" r="50" fill="none" stroke="#c5a880" strokeWidth="1.8"/>
      <circle cx="240" cy="110" r="32" fill="none" stroke="rgba(197, 168, 128, 0.4)" strokeWidth="1.8"/>
      <path d="M 150 55 L 150 165 M 95 110 L 205 110 M 112 72 L 188 148 M 188 72 L 112 148" stroke="#c5a880" strokeWidth="1.2"/>
      <path d="M 240 73 L 240 147 M 203 110 L 277 110" stroke="rgba(197, 168, 128, 0.4)" stroke="1.2"/>
      <path d="M 150 110 L 150 35" stroke="#f87171" strokeWidth="1.2" markerEnd="url(#arrow)"/>
      <text x="160" y="50" fill="#f87171" fontSize="9" fontFamily="monospace">Torque (τ)</text>
    </svg>
  );
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function App() {
  const [activeView, setActiveView] = useState('generator'); // 'generator' | 'blog' | 'syllabus' | 'feedback'
  const [selectedPost, setSelectedPost] = useState(null); // Selected blog post object for reading
  
  // Bright Ivory/Dark Gold Theme state (Toggleable)
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'

  // Random quote selected on mount
  const [quoteData, setQuoteData] = useState({ quote: '', author: '', image: '' });

  const [selectedSubjects, setSelectedSubjects] = useState([
    'physics',
    'mathematics',
    'chemistry',
    'english',
  ]);
  const [customMode, setCustomMode] = useState(false);
  const [customCounts, setCustomCounts] = useState({
    physics: 30,
    mathematics: 30,
    chemistry: 20,
    english: 20,
  });

  const [questions, setQuestions] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [answersUrl, setAnswersUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  
  // Track toggle state for answer cards in preview
  const [revealedAnswers, setRevealedAnswers] = useState({});

  // Interactive Quiz states
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: optionIdx (1-4) }
  const [timeRemaining, setTimeRemaining] = useState(120 * 60); // 120 mins in secs
  const [timerActive, setTimerActive] = useState(false);
  const [quizResult, setQuizResult] = useState(null); // { score, correct, incorrect, unanswered, total, negativeDeduction }

  // Full Screen Warning Toast notification
  const [showFullscreenToast, setShowFullscreenToast] = useState(false);

  // Audio system settings
  const [audioMuted, setAudioMuted] = useState(false);
  const [ambientSound, setAmbientSound] = useState('none'); // 'none' | 'library' | 'lab'
  const [adaptiveBooster, setAdaptiveBooster] = useState(false);
  const [apiProvider, setApiProvider] = useState('none');
  const [apiKey, setApiKey] = useState('');
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [practiceChapter, setPracticeChapter] = useState(null);

  // Persistent Web Audio references
  const ambientContextRef = useRef(null);
  const ambientNodesRef = useRef([]);
  const ambientGainRef = useRef(null);
  const [ambientVolume, setAmbientVolume] = useState(50);

  const [focusMusic, setFocusMusic] = useState(0); // 0: Off, 1: Baroque, 2: Binaural, 3: Rain, 4: Lofi
  const musicContextRef = useRef(null);
  const musicNodesRef = useRef([]);
  const musicGainRef = useRef(null);
  const [musicVolume, setMusicVolume] = useState(30);

  // Mock Performance Analytics History
  const [examHistory, setExamHistory] = useState([]);

  // Flagged questions bookmarks: holds full question objects for persistence
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { [qId]: questionObject }

  // Exam Center Simulator mode
  const [examCenterMode, setExamCenterMode] = useState(false);

  // Formula cheat-book drawer binder
  const [formulaBinderOpen, setFormulaBinderOpen] = useState(false);

  // Flashcards state
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);

  // Book pagination state: Page 1, 2, 3, 4, 5
  const [currentPage, setCurrentPage] = useState(1);

  // Flagged PDF generation loading indicators
  const [flaggedPdfLoading, setFlaggedPdfLoading] = useState(false);

  // CBT Question tracker: tracks which questions the user has visited
  const [visitedQuestions, setVisitedQuestions] = useState({});

  // Interactive Floating Scientific Calculator states
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');

  // Feedback form states
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackSubject, setFeedbackSubject] = useState('Suggestion');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Initialize quote, history, and flagged questions on load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_HUBS.length);
    setQuoteData(MOTIVATIONAL_HUBS[randomIndex]);

    const history = JSON.parse(localStorage.getItem('ioe_exam_history') || '[]');
    setExamHistory(history);

    const flags = JSON.parse(localStorage.getItem('ioe_flagged_questions') || '{}');
    setFlaggedQuestions(flags);

    const savedProvider = localStorage.getItem('ioe_api_provider') || 'none';
    const savedKey = localStorage.getItem('ioe_api_key') || '';
    setApiProvider(savedProvider);
    setApiKey(savedKey);
  }, []);

  // Sync ambient sound contexts whenever choice or mute is flipped
  useEffect(() => {
    startAmbientAudio(ambientSound);
    return () => stopAmbientAudio();
  }, [ambientSound, audioMuted]);

  // Sync focus music contexts whenever choice or mute is flipped
  useEffect(() => {
    startMusicAudio(focusMusic);
    return () => stopMusicAudio();
  }, [focusMusic, audioMuted]);

  // Timer countdown loop
  useEffect(() => {
    let interval = null;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && timerActive) {
      handleFinishQuiz();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  // Full Screen Native change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setShowFullscreenToast(true);
        const timer = setTimeout(() => {
          setShowFullscreenToast(false);
        }, 5000);
        return () => clearTimeout(timer);
      } else {
        setShowFullscreenToast(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Trigger KaTeX parsing on dynamic question rendering
  useEffect(() => {
    if (questions.length > 0 && window.renderMathInElement) {
      try {
        window.renderMathInElement(document.body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn("KaTeX render failed:", err);
      }
    }
  }, [questions, currentPage]);

  // CBT Visited Questions Registration Trigger
  useEffect(() => {
    if (questions.length > 0) {
      const pageContent = getPaginatedContent();
      const updated = { ...visitedQuestions };
      let changed = false;
      pageContent.items.forEach(q => {
        if (!updated[q.id]) {
          updated[q.id] = true;
          changed = true;
        }
      });
      if (changed) {
        setVisitedQuestions(updated);
      }
    }
  }, [currentPage, questions]);

  // Programmatic Web Audio Synthesizer: Satisfying Lead Pencil Click
  const playPencilClick = () => {
    if (audioMuted) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio Context blocked by browser safety:", e);
    }
  };

  // Programmatic Web Audio Synthesizer: Soft Paper Rustle
  const playPaperRustle = () => {
    if (audioMuted) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const bufferSize = ctx.sampleRate * 0.22; // 0.22 seconds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.22);
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      noise.start();
    } catch (e) {
      console.warn("Audio Context blocked by browser safety:", e);
    }
  };

  // Synthesize ambient focus soundscapes programmatically
  const stopAmbientAudio = () => {
    if (ambientContextRef.current) {
      try {
        ambientNodesRef.current.forEach(node => {
          if (node && typeof node.stop === 'function') node.stop();
        });
        ambientContextRef.current.close();
      } catch (e) {}
      ambientContextRef.current = null;
    }
    ambientNodesRef.current = [];
    ambientGainRef.current = null;
  };

  const startAmbientAudio = (type) => {
    stopAmbientAudio();
    if (audioMuted || type === 'none') return;
    
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      ambientContextRef.current = ctx;
      
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(ambientVolume / 100, ctx.currentTime);
      masterGain.connect(ctx.destination);
      ambientGainRef.current = masterGain;

      if (type === 'library') {
        const bufferSize = ctx.sampleRate * 2.5; 
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.015 * white)) / 1.015;
          lastOut = data[i];
          data[i] *= 3.8; 
        }
        
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 600;
        
        const gain = ctx.createGain();
        gain.gain.value = 0.28;
        
        source.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        
        source.start(0);
        ambientNodesRef.current.push(source);
      } else if (type === 'lab') {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = 85; 
        
        const oscGain = ctx.createGain();
        oscGain.gain.value = 0.07;
        
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(0);
        ambientNodesRef.current.push(osc);
        
        const clickInterval = setInterval(() => {
          if (ctx.state === 'closed' || audioMuted) {
            clearInterval(clickInterval);
            return;
          }
          if (Math.random() > 0.45) {
            const clickOsc = ctx.createOscillator();
            const clickGain = ctx.createGain();
            clickOsc.type = 'sine';
            clickOsc.frequency.setValueAtTime(1100 + Math.random()*300, ctx.currentTime);
            clickOsc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.02);
            clickGain.gain.setValueAtTime(0.003, ctx.currentTime);
            clickGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);
            
            clickOsc.connect(clickGain);
            clickGain.connect(masterGain);
            clickOsc.start();
            clickOsc.stop(ctx.currentTime + 0.02);
          }
        }, 280);
        
        ambientNodesRef.current.push({
          stop: () => clearInterval(clickInterval)
        });
      }
    } catch (e) {
      console.warn("Ambient Web Audio Context block:", e);
    }
  };

  useEffect(() => {
    if (ambientGainRef.current && ambientContextRef.current) {
      ambientGainRef.current.gain.setValueAtTime(ambientVolume / 100, ambientContextRef.current.currentTime);
    }
  }, [ambientVolume]);

  const stopMusicAudio = () => {
    if (musicContextRef.current) {
      try {
        musicNodesRef.current.forEach(node => {
          if (node.stop) node.stop();
        });
      } catch (e) {}
      try {
        musicContextRef.current.close();
      } catch (e) {}
      musicContextRef.current = null;
    }
    musicNodesRef.current = [];
    musicGainRef.current = null;
  };

  const startMusicAudio = (type) => {
    stopMusicAudio();
    if (audioMuted || type === 0) return;
    
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      musicContextRef.current = ctx;
      
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(musicVolume / 100, ctx.currentTime);
      masterGain.connect(ctx.destination);
      musicGainRef.current = masterGain;

      if (type === 1) {
        const chords = [
          [60, 64, 67, 72], 
          [55, 59, 62, 67], 
          [57, 60, 64, 69], 
          [52, 55, 59, 64]  
        ];
        let chordIdx = 0;
        let noteIdx = 0;
        
        const playNextNote = () => {
          if (ctx.state === 'closed' || audioMuted) return;
          
          const chord = chords[chordIdx];
          const midiNote = chord[noteIdx % chord.length];
          const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
          
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
          
          osc.connect(gainNode);
          gainNode.connect(masterGain);
          
          osc.start();
          osc.stop(ctx.currentTime + 1.0);
          
          noteIdx++;
          if (noteIdx % chord.length === 0) {
            chordIdx = (chordIdx + 1) % chords.length;
          }
        };

        const intervalId = setInterval(playNextNote, 400);
        musicNodesRef.current.push({
          stop: () => clearInterval(intervalId)
        });
      }
      else if (type === 2) {
        const oscL = ctx.createOscillator();
        const oscR = ctx.createOscillator();
        const gainL = ctx.createGain();
        const gainR = ctx.createGain();
        
        oscL.type = 'sine';
        oscL.frequency.setValueAtTime(200, ctx.currentTime);
        gainL.gain.value = 0.08;
        
        oscR.type = 'sine';
        oscR.frequency.setValueAtTime(204, ctx.currentTime);
        gainR.gain.value = 0.08;
        
        if (ctx.createStereoPanner) {
          const pannerL = ctx.createStereoPanner();
          pannerL.pan.value = -1.0;
          const pannerR = ctx.createStereoPanner();
          pannerR.pan.value = 1.0;
          
          oscL.connect(gainL).connect(pannerL).connect(masterGain);
          oscR.connect(gainR).connect(pannerR).connect(masterGain);
        } else {
          oscL.connect(gainL).connect(masterGain);
          oscR.connect(gainR).connect(masterGain);
        }
        
        oscL.start(0);
        oscR.start(0);
        musicNodesRef.current.push(oscL, oscR);
      }
      else if (type === 3) {
        const bufferSize = ctx.sampleRate * 2.0;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2.0 - 1.0;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        
        const lowpass = ctx.createBiquadFilter();
        lowpass.type = 'lowpass';
        lowpass.frequency.setValueAtTime(350, ctx.currentTime);
        
        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.6;
        
        noise.connect(lowpass).connect(noiseGain).connect(masterGain);
        noise.start(0);
        
        const thunderInterval = setInterval(() => {
          if (ctx.state === 'closed' || audioMuted) return;
          if (Math.random() > 0.8) {
            const thunderOsc = ctx.createOscillator();
            const thunderGain = ctx.createGain();
            
            thunderOsc.type = 'sawtooth';
            thunderOsc.frequency.setValueAtTime(20 + Math.random()*20, ctx.currentTime);
            
            const rumbleFilter = ctx.createBiquadFilter();
            rumbleFilter.type = 'lowpass';
            rumbleFilter.frequency.setValueAtTime(80, ctx.currentTime);
            
            thunderGain.gain.setValueAtTime(0.001, ctx.currentTime);
            thunderGain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.3);
            thunderGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);
            
            thunderOsc.connect(rumbleFilter).connect(thunderGain).connect(masterGain);
            thunderOsc.start();
            thunderOsc.stop(ctx.currentTime + 3.0);
          }
        }, 5000);
        
        musicNodesRef.current.push(noise, {
          stop: () => clearInterval(thunderInterval)
        });
      }
      else if (type === 4) {
        const chordProgressions = [
          [48, 60, 64, 67, 71],
          [45, 57, 60, 64, 67],
          [41, 53, 57, 60, 64],
          [43, 55, 59, 62, 65]
        ];
        let progIdx = 0;
        
        const playChord = () => {
          if (ctx.state === 'closed' || audioMuted) return;
          const notes = chordProgressions[progIdx];
          
          notes.forEach(midiNote => {
            const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const lp = ctx.createBiquadFilter();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            
            lp.type = 'lowpass';
            lp.frequency.setValueAtTime(500, ctx.currentTime);
            
            gain.gain.setValueAtTime(0.0001, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.8);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);
            
            osc.connect(lp).connect(gain).connect(masterGain);
            osc.start();
            osc.stop(ctx.currentTime + 3.8);
          });
          
          progIdx = (progIdx + 1) % chordProgressions.length;
        };
        
        playChord();
        const lofiInterval = setInterval(playChord, 4000);
        musicNodesRef.current.push({
          stop: () => clearInterval(lofiInterval)
        });
      }
    } catch (e) {
      console.warn("Music Web Audio Context block:", e);
    }
  };

  useEffect(() => {
    if (musicGainRef.current && musicContextRef.current) {
      musicGainRef.current.gain.setValueAtTime(musicVolume / 100, musicContextRef.current.currentTime);
    }
  }, [musicVolume]);

  const getSubjectAverages = () => {
    const avgs = { mathematics: 60, physics: 60, chemistry: 60, english: 60 };
    if (examHistory.length === 0) return avgs;
    
    let mathSum = 0, physSum = 0, chemSum = 0, engSum = 0;
    examHistory.forEach(h => {
      const m = h.metrics || { mathematics: 50, physics: 50, chemistry: 50, environment: 50 };
      mathSum += m.mathematics;
      physSum += m.physics;
      chemSum += m.chemistry;
      engSum += m.english || m.environment || 50;
    });

    return {
      mathematics: Math.round(mathSum / examHistory.length),
      physics: Math.round(physSum / examHistory.length),
      chemistry: Math.round(chemSum / examHistory.length),
      english: Math.round(engSum / examHistory.length),
    };
  };

  const getWeakestSubject = () => {
    if (examHistory.length === 0) return null;
    const averages = getSubjectAverages();
    let weakest = 'mathematics';
    let lowestScore = Infinity;
    
    Object.entries(averages).forEach(([subj, score]) => {
      if (score < lowestScore) {
        lowestScore = score;
        weakest = subj;
      }
    });
    return weakest;
  };

  const getActiveCounts = () => {
    if (customMode) {
      return customCounts;
    }
    
    const baseCounts = {
      physics: selectedSubjects.includes('physics') ? 30 : 0,
      mathematics: selectedSubjects.includes('mathematics') ? 30 : 0,
      chemistry: selectedSubjects.includes('chemistry') ? 20 : 0,
      english: selectedSubjects.includes('english') ? 20 : 0,
    };

    if (adaptiveBooster && examHistory.length > 0) {
      const weakest = getWeakestSubject();
      if (weakest && baseCounts[weakest] > 0) {
        const newCounts = { ...baseCounts };
        const boostVal = Math.round(newCounts[weakest] * 0.5); 
        newCounts[weakest] += boostVal;
        
        const otherSubjects = Object.keys(newCounts).filter(s => s !== weakest && newCounts[s] > 0);
        if (otherSubjects.length > 0) {
          let remainingDeduction = boostVal;
          otherSubjects.forEach((s, idx) => {
            const deduct = idx === otherSubjects.length - 1 
              ? remainingDeduction 
              : Math.floor(boostVal / otherSubjects.length);
            newCounts[s] = Math.max(2, newCounts[s] - deduct); 
            remainingDeduction -= deduct;
          });
        }
        return newCounts;
      }
    }
    
    return baseCounts;
  };

  const activeCounts = getActiveCounts();
  const totalQuestions = Object.values(activeCounts).reduce((a, b) => a + b, 0);
  const loadedFullMarks = questions.reduce((sum, q) => sum + (q.marks || 1), 0);

  const toggleSubject = (subj) => {
    if (selectedSubjects.includes(subj)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== subj));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subj]);
    }
  };

  const handleCustomCountChange = (subj, value) => {
    const num = Math.max(0, parseInt(value) || 0);
    setCustomCounts({ ...customCounts, [subj]: num });
  };

  const cleanHtmlForPreview = (html) => {
    if (!html) return '';
    let text = html;
    text = text.replace(/<[^>]*>/g, '');
    text = text.replace(/\\\(|\\\)/g, '');
    text = text.replace(/&ndash;/g, '-');
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&middot;/g, '·');
    return text.trim();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const triggerFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn("Fullscreen permission denied:", err);
      });
    }
  };

  const constructRagPrompt = (subjectCounts, chapterName = null) => {
    let contextText = '';
    if (subjectCounts.mathematics > 0) {
      contextText += `\nMath Formulas:\n- Limits: lim (x -> 0) [sin(x) / x] = 1\n- Integration: ∫ [1 / (x² + a²)] dx = (1/a) * tan⁻¹(x/a) + C\n- Integration By Parts: ∫ u dv = u*v - ∫ v du\n- Vector Cross Product: |a × b| = a * b * sin(θ)\n`;
    }
    if (subjectCounts.physics > 0) {
      contextText += `\nPhysics Formulas:\n- Viscosity (Stokes' Law): F = 6π * η * r * v\n- Capacitance (Parallel Plate): C = (K * ε₀ * A) / d\n- Doppler Effect (Approaching Source): f' = f * [v / (v - vs)]\n- Radius of Gyration (Solid Cylinder): k = R / √2\n- Fringe Width (Interference): β = (λ * D) / d\n`;
    }
    if (subjectCounts.chemistry > 0) {
      contextText += `\nChemistry Reagents:\n- Dehydration: Ethanol + Conc. H₂SO₄ (170°C) → Ethene + H₂O\n- Grignard Reaction: R-MgX + HCHO → Primary Alcohol\n- Rosenmund Reduction: R-COCl + H₂ [Pd/BaSO₄] → R-CHO\n- Ether Prep (Williamson's): R-ONa + R'-X → R-O-R'\n`;
    }

    let focusGuideline = '';
    if (chapterName) {
      focusGuideline = `\nFOCUS REQUIREMENT: Design the questions specifically to test concepts related to this sub-chapter: "${chapterName}". Make sure all generated questions focus strictly on this topic.\n`;
    }

    return `You are an expert tutor preparing questions for the Tribhuvan University Institute of Engineering (IOE) Entrance Examination in Nepal.
Generate exactly the requested number of multiple-choice questions matching the following subject counts:
- Mathematics: ${subjectCounts.mathematics || 0} questions
- Physics: ${subjectCounts.physics || 0} questions
- Chemistry: ${subjectCounts.chemistry || 0} questions
- English: ${subjectCounts.english || 0} questions
${focusGuideline}
Reference Context (Use these core formulas to design numerical problems):
${contextText}

Generate highly academic, rigorous questions with 4 distinct options. Return the output STRICTLY as a JSON array of question objects matching this exact structure:
[
  {
    "id": 1001,
    "subject": "physics",
    "marks": 1,
    "questionData": {
      "question_plain_title": "...",
      "ans1_plain_text": "...",
      "ans2_plain_text": "...",
      "ans3_plain_text": "...",
      "ans4_plain_text": "...",
      "correct_answer": 1,
      "explanation": "..."
    }
  }
]

Do not return any markdown wraps (like \`\`\`json) or extra text. Return only the raw JSON array.`;
  };

  const saveApiSettings = (provider, key) => {
    setApiProvider(provider);
    setApiKey(key);
    localStorage.setItem('ioe_api_provider', provider);
    localStorage.setItem('ioe_api_key', key);
    setShowApiSettings(false);
    playPencilClick();
  };

  const filterQuestionsByChapter = (questionsList, chapterName) => {
    if (!chapterName) return questionsList;
    
    const name = chapterName.toLowerCase();
    let keywords = [];
    
    if (name.includes('calculus') || name.includes('integration')) {
      keywords = ['limit', 'derivative', 'integral', 'area bounded', 'dy/dx', 'dx', '∫', 'lim'];
    } else if (name.includes('algebra') || name.includes('matrices')) {
      keywords = ['matrix', 'determinant', 'geometric', 'root', 'complex', 'log', 'progression'];
    } else if (name.includes('geometry') || name.includes('coordinate')) {
      keywords = ['tangent', 'circle', 'coordinate', 'line'];
    } else if (name.includes('mechanics') || name.includes('fluids')) {
      keywords = ['viscosity', 'cylinder', 'velocity', 'stokes', 'fluid', 'force', 'gyration'];
    } else if (name.includes('electricity') || name.includes('magnetism') || name.includes('capacitance')) {
      keywords = ['capacitance', 'plate', 'dielectric', 'charge', 'electric', 'capacitor'];
    } else if (name.includes('thermodynamics') || name.includes('wave') || name.includes('optics')) {
      keywords = ['doppler', 'frequency', 'wave', 'interference', 'slit', 'fringe', 'temperature', 'heat', 'thermal'];
    } else if (name.includes('physical')) {
      keywords = ['concentration', 'molarity', 'solution', 'physical', 'rate', 'chemical'];
    } else if (name.includes('organic')) {
      keywords = ['dehydration', 'ethene', 'grignard', 'alcohol', 'rosenmund', 'reduction', 'ether', 'decarboxylation', 'reagent'];
    } else if (name.includes('concord') || name.includes('grammar') || name.includes('agreement')) {
      keywords = ['concord', 'agreement', 'subject-verb', 'grammar', 'sentence', 'verb'];
    } else if (name.includes('vocabulary') || name.includes('idioms')) {
      keywords = ['vocabulary', 'antonym', 'synonym', 'idiom', 'meaning'];
    }

    if (keywords.length === 0) return questionsList;

    const filtered = questionsList.filter(q => {
      const qText = (
        (q.questionData.question_plain_title || '') + ' ' + 
        (q.questionData.explanation || '')
      ).toLowerCase();
      return keywords.some(kw => qText.includes(kw));
    });

    return filtered.length > 0 ? filtered : questionsList;
  };

  const handleGenerate = async (overrideCounts = null, overrideChapter = null, overrideCustomMode = null, overrideSubjects = null) => {
    playPaperRustle();
    triggerFullscreen();

    setActiveView('generator');
    setLoading(true);
    setErrorMsg(null);
    setQuestions([]);
    setRevealedAnswers({});
    setCurrentPage(1);
    
    setSelectedAnswers({});
    
    const isCustom = overrideCustomMode !== null ? overrideCustomMode : customMode;
    const subjects = overrideSubjects !== null ? overrideSubjects : selectedSubjects;
    
    const cleanOverrideCounts = (overrideCounts && typeof overrideCounts === 'object' && !overrideCounts.target && !overrideCounts.nativeEvent) ? overrideCounts : null;
    const counts = cleanOverrideCounts || (isCustom ? customCounts : {
      physics: subjects.includes('physics') ? 30 : 0,
      mathematics: subjects.includes('mathematics') ? 30 : 0,
      chemistry: subjects.includes('chemistry') ? 20 : 0,
      english: subjects.includes('english') ? 20 : 0,
    });

    const chapter = overrideChapter !== undefined ? overrideChapter : practiceChapter;
    if (overrideChapter === null) {
      setPracticeChapter(null);
    }
    
    const totalQCount = Object.values(counts).reduce((a, b) => a + b, 0);
    const calculatedTime = Math.max(120, totalQCount * 1.2 * 60); 
    setTimeRemaining(calculatedTime);
    
    setTimerActive(false);
    setQuizResult(null);
    setVisitedQuestions({});
    
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    if (answersUrl) {
      URL.revokeObjectURL(answersUrl);
      setAnswersUrl(null);
    }

    const payload = {
      subjects: subjects,
      distribution: isCustom ? 'custom' : 'standard',
      customCounts: counts,
      chapter: chapter?.name || undefined,
    };

    try {
      if (apiProvider !== 'none' && apiKey) {
        const prompt = constructRagPrompt(counts, chapter?.name);
        let text = '';

        if (apiProvider === 'gemini') {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2
              }
            })
          });
          if (!response.ok) throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
          const resData = await response.json();
          text = resData.candidates[0].content.parts[0].text;
        } 
        else if (apiProvider === 'openai') {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }] })
          });
          if (!response.ok) throw new Error(`OpenAI API Error: ${response.status} ${response.statusText}`);
          const resData = await response.json();
          text = resData.choices[0].message.content;
        }
        else if (apiProvider === 'openrouter') {
          const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${apiKey}`,
              'HTTP-Referer': window.location.origin,
              'X-Title': 'IOE Entrance CBT Simulator'
            },
            body: JSON.stringify({ model: 'meta-llama/llama-3-8b-instruct:free', messages: [{ role: 'user', content: prompt }] })
          });
          if (!response.ok) throw new Error(`OpenRouter Error: ${response.status} ${response.statusText}`);
          const resData = await response.json();
          text = resData.choices[0].message.content;
        }
        else if (apiProvider === 'deepseek') {
          const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: prompt }] })
          });
          if (!response.ok) throw new Error(`DeepSeek Error: ${response.status} ${response.statusText}`);
          const resData = await response.json();
          text = resData.choices[0].message.content;
        }
        else if (apiProvider === 'groq') {
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: [{ role: 'user', content: prompt }] })
          });
          if (!response.ok) throw new Error(`Groq Error: ${response.status} ${response.statusText}`);
          const resData = await response.json();
          text = resData.choices[0].message.content;
        }
        else if (apiProvider === 'anthropic') {
          const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json', 
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
              'dangerouslyAllowBrowser': 'true'
            },
            body: JSON.stringify({ 
              model: 'claude-3-5-sonnet-20240620', 
              max_tokens: 4000,
              messages: [{ role: 'user', content: prompt }] 
            })
          });
          if (!response.ok) throw new Error(`Anthropic CORS/API Error: ${response.status}. Tip: Route Claude via OpenRouter key to bypass browser CORS.`);
          const resData = await response.json();
          text = resData.content[0].text;
        }
        else if (apiProvider === 'mistral') {
          const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({ model: 'open-mixtral-8x22b', messages: [{ role: 'user', content: prompt }] })
          });
          if (!response.ok) throw new Error(`Mistral Error: ${response.status} ${response.statusText}`);
          const resData = await response.json();
          text = resData.choices[0].message.content;
        }
        else if (apiProvider === 'together') {
          const response = await fetch('https://api.together.xyz/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({ model: 'meta-llama/Llama-3-8b-chat-hf', messages: [{ role: 'user', content: prompt }] })
          });
          if (!response.ok) throw new Error(`Together AI Error: ${response.status} ${response.statusText}`);
          const resData = await response.json();
          text = resData.choices[0].message.content;
        }
        else if (apiProvider === 'perplexity') {
          const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({ model: 'llama-3-sonar-large-32k-chat', messages: [{ role: 'user', content: prompt }] })
          });
          if (!response.ok) throw new Error(`Perplexity Error: ${response.status} ${response.statusText}`);
          const resData = await response.json();
          text = resData.choices[0].message.content;
        }
        else if (apiProvider === 'fireworks') {
          const response = await fetch('https://api.fireworks.ai/inference/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({ model: 'accounts/fireworks/models/llama-v3-8b-instruct', messages: [{ role: 'user', content: prompt }] })
          });
          if (!response.ok) throw new Error(`Fireworks Error: ${response.status} ${response.statusText}`);
          const resData = await response.json();
          text = resData.choices[0].message.content;
        }
        else if (apiProvider === 'cohere') {
          const response = await fetch('https://api.cohere.ai/v1/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({ model: 'command-r-plus', message: prompt })
          });
          if (!response.ok) throw new Error(`Cohere Error: ${response.status} ${response.statusText}`);
          const resData = await response.json();
          text = resData.text;
        }
        else if (apiProvider === 'ollama') {
          const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'llama3',
              prompt: prompt,
              stream: false,
              format: 'json'
            })
          });
          if (!response.ok) throw new Error(`Local Ollama Error: Is Ollama running on port 11434?`);
          const resData = await response.json();
          text = resData.response;
        }

        let cleanText = text.trim();
        if (cleanText.startsWith('```')) {
          cleanText = cleanText.replace(/^```json/, '').replace(/```$/, '').trim();
        }

        const data = JSON.parse(cleanText);
        const subjectOrder = { mathematics: 1, physics: 2, chemistry: 3, english: 4 };
        let sortedData = [...data].sort((a, b) => {
          return (subjectOrder[a.subject] || 99) - (subjectOrder[b.subject] || 99);
        });

        if (chapter && chapter.name) {
          let filtered = filterQuestionsByChapter(sortedData, chapter.name);
          if (filtered.length > totalQCount) {
            filtered = filtered.slice(0, totalQCount);
          }
          sortedData = filtered;
        }

        setQuestions(sortedData);
        setTimerActive(true);

        const pdfResponse = await fetch(`${API_BASE_URL}/exam/generate-flagged-pdf`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questions: sortedData }),
        });
        if (pdfResponse.ok) {
          const blob = await pdfResponse.blob();
          setPdfUrl(URL.createObjectURL(blob));
        }

        const answersResponse = await fetch(`${API_BASE_URL}/exam/generate-flagged-answers-pdf`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questions: sortedData }),
        });
        if (answersResponse.ok) {
          const ansBlob = await answersResponse.blob();
          setAnswersUrl(URL.createObjectURL(ansBlob));
        }

        setLoading(false);
        return;
      }

      const dataResponse = await fetch(`${API_BASE_URL}/exam/generate-json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!dataResponse.ok) {
        throw new Error('Failed to retrieve question details.');
      }
      const data = await dataResponse.json();
      const subjectOrder = { mathematics: 1, physics: 2, chemistry: 3, english: 4 };
      let sortedData = [...data].sort((a, b) => {
        return (subjectOrder[a.subject] || 99) - (subjectOrder[b.subject] || 99);
      });

      if (chapter && chapter.name) {
        let filtered = filterQuestionsByChapter(sortedData, chapter.name);
        if (filtered.length > totalQCount) {
          filtered = filtered.slice(0, totalQCount);
        }
        sortedData = filtered;
      }
      setQuestions(sortedData);
      setTimerActive(true);

      const pdfEndpoint = (chapter && chapter.name) ? 'generate-flagged-pdf' : 'generate-pdf';
      const pdfBody = (chapter && chapter.name) ? { questions: sortedData } : payload;

      const pdfResponse = await fetch(`${API_BASE_URL}/exam/${pdfEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pdfBody),
      });

      if (!pdfResponse.ok) {
        throw new Error('Failed to compile Question Paper PDF.');
      }
      const blob = await pdfResponse.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      const ansEndpoint = (chapter && chapter.name) ? 'generate-flagged-answers-pdf' : 'generate-answers-pdf';
      const ansBody = (chapter && chapter.name) ? { questions: sortedData } : payload;

      const answersResponse = await fetch(`${API_BASE_URL}/exam/${ansEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ansBody),
      });

      if (!answersResponse.ok) {
        throw new Error('Failed to compile Answer Key PDF.');
      }
      const ansBlob = await answersResponse.blob();
      const ansUrl = URL.createObjectURL(ansBlob);
      setAnswersUrl(ansUrl);

    } catch (error) {
      console.error(error);
      setErrorMsg(error.message || 'Unable to communicate with the generator engine.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinishQuiz = () => {
    setTimerActive(false);
    setExamCenterMode(false);
    let correct = 0;
    let incorrect = 0;
    
    const subjectMetrics = {
      mathematics: { correct: 0, total: 0 },
      physics: { correct: 0, total: 0 },
      chemistry: { correct: 0, total: 0 },
      english: { correct: 0, total: 0 }
    };

    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      const subj = q.subject || 'physics';
      
      if (subjectMetrics[subj]) {
        subjectMetrics[subj].total++;
      }

      if (selected !== undefined) {
        if (selected === q.questionData.correct_answer) {
          correct++;
          if (subjectMetrics[subj]) subjectMetrics[subj].correct++;
        } else {
          incorrect++;
        }
      }
    });
    
    const unanswered = questions.length - correct - incorrect;
    const negativeDeduction = parseFloat((incorrect * 0.05).toFixed(2));
    const finalScore = parseFloat((correct - negativeDeduction).toFixed(2));
    
    const resultObj = {
      score: finalScore,
      correct,
      incorrect,
      unanswered,
      total: questions.length,
      negativeDeduction,
    };

    setQuizResult(resultObj);
    
    const historyEntry = {
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      score: finalScore,
      correct,
      incorrect,
      total: questions.length,
      metrics: {
        mathematics: subjectMetrics.mathematics.total > 0 ? Math.round((subjectMetrics.mathematics.correct / subjectMetrics.mathematics.total) * 100) : 50,
        physics: subjectMetrics.physics.total > 0 ? Math.round((subjectMetrics.physics.correct / subjectMetrics.physics.total) * 100) : 50,
        chemistry: subjectMetrics.chemistry.total > 0 ? Math.round((subjectMetrics.chemistry.correct / subjectMetrics.chemistry.total) * 100) : 50,
        english: subjectMetrics.english.total > 0 ? Math.round((subjectMetrics.english.correct / subjectMetrics.english.total) * 100) : 50,
      }
    };
    
    const updatedHistory = [...examHistory, historyEntry];
    setExamHistory(updatedHistory);
    localStorage.setItem('ioe_exam_history', JSON.stringify(updatedHistory));

    const autoReveals = {};
    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected === undefined || selected !== q.questionData.correct_answer) {
        autoReveals[q.id] = true;
      }
    });
    setRevealedAnswers(autoReveals);
    setCurrentPage(1);
    
    setTimeout(() => {
      const viewport = document.querySelector('.preview-viewport');
      if (viewport) {
        viewport.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const toggleFlagQuestion = (q) => {
    playPencilClick();
    const updated = { ...flaggedQuestions };
    if (updated[q.id]) {
      delete updated[q.id];
    } else {
      updated[q.id] = q;
    }
    setFlaggedQuestions(updated);
    localStorage.setItem('ioe_flagged_questions', JSON.stringify(updated));
  };

  const handleDownloadFlaggedPdf = async (solutions = false) => {
    const list = Object.values(flaggedQuestions);
    if (list.length === 0) return;
    
    playPaperRustle();
    setFlaggedPdfLoading(true);
    try {
      const endpoint = solutions ? 'generate-flagged-answers-pdf' : 'generate-flagged-pdf';
      const response = await fetch(`${API_BASE_URL}/exam/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: list }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate flagged questions PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = solutions ? 'ioe_flagged_solutions.pdf' : 'ioe_flagged_questions.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Error downloading revision booklet.');
    } finally {
      setFlaggedPdfLoading(false);
    }
  };

  const handleQuickPractice = (subject, chapterName, count) => {
    playPaperRustle();
    setSelectedSubjects([subject]);
    setCustomMode(true);
    
    const targetCounts = {
      physics: subject === 'physics' ? count : 0,
      mathematics: subject === 'mathematics' ? count : 0,
      chemistry: subject === 'chemistry' ? count : 0,
      english: subject === 'english' ? count : 0,
    };
    setCustomCounts(targetCounts);
    setPracticeChapter({ name: chapterName, count: count });
    
    setActiveView('generator');
    
    setTimeout(() => {
      handleGenerate(targetCounts, { name: chapterName, count: count }, true, [subject]);
    }, 150);
  };

  // Draggable virtual calculator key handler
  const handleCalcClick = (val) => {
    playPencilClick();
    if (val === 'C') {
      setCalcInput('');
      setCalcResult('');
    } else if (val === 'Del') {
      setCalcInput(prev => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        let expr = calcInput;
        expr = expr.replace(/sin\(/g, 'Math.sin(');
        expr = expr.replace(/cos\(/g, 'Math.cos(');
        expr = expr.replace(/tan\(/g, 'Math.tan(');
        expr = expr.replace(/log\(/g, 'Math.log10(');
        expr = expr.replace(/ln\(/g, 'Math.log(');
        expr = expr.replace(/sqrt\(/g, 'Math.sqrt(');
        expr = expr.replace(/π/g, 'Math.PI');
        expr = expr.replace(/e/g, 'Math.E');
        expr = expr.replace(/\^/g, '**');

        if (/^[0-9+\-*/().\s*Math\.sin|Math\.cos|Math\.tan|Math\.log10|Math\.log|Math\.sqrt|Math\.PI|Math\.E|**]+$/.test(expr)) {
          const res = new Function(`return (${expr})`)();
          setCalcResult(String(Number(res).toFixed(6).replace(/\.?0+$/, '')));
        } else {
          setCalcResult('Error');
        }
      } catch (err) {
        setCalcResult('Error');
      }
    } else {
      setCalcInput(prev => prev + val);
    }
  };

  // Dynamic paginator pages resolution
  const getActivePaginatorPages = () => {
    const pages = [];
    let pageCounter = 1;
    
    if (questions.some(q => q.subject === 'mathematics')) {
      pages.push({ id: pageCounter++, subject: 'mathematics', label: 'Math' });
    }
    if (questions.some(q => q.subject === 'physics')) {
      pages.push({ id: pageCounter++, subject: 'physics', label: 'Physics' });
    }
    if (questions.some(q => q.subject === 'chemistry')) {
      pages.push({ id: pageCounter++, subject: 'chemistry', label: 'Chemistry' });
    }
    if (questions.some(q => q.subject === 'english')) {
      pages.push({ id: pageCounter++, subject: 'english', label: 'English' });
    }
    
    pages.push({ id: pageCounter, subject: 'review', label: 'Review' });
    return pages;
  };

  // Jump directly to specific CBT question index across pagination
  const jumpToQuestion = (q, index) => {
    playPencilClick();
    const activePages = getActivePaginatorPages();
    const matchedPage = activePages.find(p => p.subject === q.subject);
    const targetPage = matchedPage ? matchedPage.id : activePages.length;
    
    setCurrentPage(targetPage);
    
    setTimeout(() => {
      const element = document.getElementById(`q-item-${q.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('q-highlight-flash');
        setTimeout(() => element.classList.remove('q-highlight-flash'), 1200);
      }
    }, 120);
  };

  const handleSendFeedback = (e) => {
    e.preventDefault();
    const email = 'tosudip369@hotmail.com';
    const subject = encodeURIComponent(`[IOE Exam Generator Feedback] - ${feedbackSubject}`);
    const body = encodeURIComponent(`Name: ${feedbackName}\n\nMessage:\n${feedbackMsg}`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    setFeedbackSent(true);
    setFeedbackName('');
    setFeedbackMsg('');
    setTimeout(() => setFeedbackSent(false), 5000);
  };

  const groupedQuestions = {
    mathematics: questions.filter((q) => q.subject === 'mathematics'),
    physics: questions.filter((q) => q.subject === 'physics'),
    chemistry: questions.filter((q) => q.subject === 'chemistry'),
    english: questions.filter((q) => q.subject === 'english'),
  };

  const getPaginatedContent = () => {
    const activePages = getActivePaginatorPages();
    const activePageObj = activePages.find(p => p.id === currentPage) || activePages[activePages.length - 1];
    
    if (!activePageObj) {
      return { title: 'Mock Exam Review Panel', items: questions };
    }
    
    if (activePageObj.subject === 'mathematics') {
      return { title: 'Mathematics Section', items: groupedQuestions.mathematics };
    } else if (activePageObj.subject === 'physics') {
      return { title: 'Physics Section', items: groupedQuestions.physics };
    } else if (activePageObj.subject === 'chemistry') {
      return { title: 'Chemistry Section', items: groupedQuestions.chemistry };
    } else if (activePageObj.subject === 'english') {
      return { title: 'English Section', items: groupedQuestions.english };
    } else {
      return { title: 'Mock Exam Review Panel', items: questions };
    }
  };

  const pageContent = getPaginatedContent();

  const renderEmptyArt = (key) => {
    switch (key) {
      case 'blueprint': return <EngineeringArtBlueprint />;
      case 'math': return <EngineeringArtMath />;
      case 'space': return <EngineeringArtSpace />;
      case 'mechanics': return <EngineeringArtMechanics />;
      default: return <EngineeringArtBlueprint />;
    }
  };

  const totalExams = examHistory.length;
  const bestScore = totalExams > 0 ? Math.max(...examHistory.map(h => h.score)) : 0;
  const avgScore = totalExams > 0 ? parseFloat((examHistory.reduce((acc, h) => acc + h.score, 0) / totalExams).toFixed(1)) : 0;



  const subjAverages = getSubjectAverages();

  const plotRadarPoint = (subject, pct) => {
    const r = 70 * (pct / 100);
    switch(subject) {
      case 'math': return `100,${100 - r}`;
      case 'physics': return `${100 + r},100`;
      case 'chemistry': return `100,${100 + r}`;
      case 'english': return `${100 - r},100`;
      default: return '100,100';
    }
  };

  const mathPoints = plotRadarPoint('math', subjAverages.mathematics);
  const physPoints = plotRadarPoint('physics', subjAverages.physics);
  const chemPoints = plotRadarPoint('chemistry', subjAverages.chemistry);
  const engPoints = plotRadarPoint('english', subjAverages.english);
  const radarPolygonPoints = `${mathPoints} ${physPoints} ${chemPoints} ${engPoints}`;

  const flaggedList = Object.values(flaggedQuestions);

  return (
    <div className={`mac-window ${theme === 'light' ? 'light-theme' : ''} ${examCenterMode ? 'exam-center-layout' : ''}`}>
      {/* Full-Screen Alert Toast */}
      {showFullscreenToast && (
        <div className="fullscreen-toast">
          🖥️ Full Screen Active. Press <strong>ESC</strong> to exit, or view with <strong>Tab</strong> in browser.
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="mac-spinner" />
          <div className="loading-text">Compiling IOE Exam Database...</div>
        </div>
      )}

      {/* --- AI Keys Settings Modal --- */}
      {showApiSettings && (
        <div className="formula-binder-overlay" onClick={() => setShowApiSettings(false)}>
          <div className="formula-binder-drawer" style={{ maxWidth: '420px', margin: 'auto', top: '15%', height: 'auto', borderRadius: '12px' }} onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>🔑 Bring Your Own Key (BYOK)</h3>
              <button className="close-drawer-btn" onClick={() => setShowApiSettings(false)}>✕</button>
            </div>
            
            <div className="drawer-content" style={{ padding: '1.5rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-sec)', marginBottom: '1.2rem', lineHeight: '1.4' }}>
                Store your personal API keys locally in your browser. All AI questions will be generated directly from your machine. <strong>Your keys never touch our servers.</strong>
              </p>

              <div className="feedback-group" style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>AI Provider</label>
                <select 
                  value={apiProvider}
                  onChange={(e) => setApiProvider(e.target.value)}
                  style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--panel-border)', borderRadius: '6px', color: 'var(--text-main)' }}
                >
                  <option value="none">Off (Use Default Mock Pool)</option>
                  <option value="gemini">Google Gemini (Gemini 2.5 Flash - 100% Free)</option>
                  <option value="openai">OpenAI API (GPT-4o-mini)</option>
                  <option value="openrouter">OpenRouter (Llama 3, Claude, DeepSeek)</option>
                  <option value="deepseek">DeepSeek API (DeepSeek Chat)</option>
                  <option value="groq">Groq Cloud (Llama 3.1 8b Instant)</option>
                  <option value="anthropic">Anthropic Claude (Claude 3.5 Sonnet)</option>
                  <option value="mistral">Mistral AI (Codestral / Mixtral)</option>
                  <option value="together">Together AI (Llama 3 8b Chat)</option>
                  <option value="perplexity">Perplexity AI (Sonar Large)</option>
                  <option value="fireworks">Fireworks AI (Llama 3 8b Instruct)</option>
                  <option value="cohere">Cohere (Command R+)</option>
                  <option value="ollama">Local Ollama (Offline Free)</option>
                </select>
              </div>

              {apiProvider !== 'none' && apiProvider !== 'ollama' && (
                <div className="feedback-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>API Token Key</label>
                  <input 
                    type="password"
                    placeholder="Enter your API token..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--panel-border)', borderRadius: '6px', color: 'var(--text-main)' }}
                  />
                  {apiProvider === 'gemini' && (
                    <small style={{ display: 'block', marginTop: '6px', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      Get a free API key at <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-gold)' }}>Google AI Studio</a>.
                    </small>
                  )}
                </div>
              )}

              {apiProvider === 'ollama' && (
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '4px', border: '1px solid var(--panel-border)', lineHeight: '1.4' }}>
                  🤖 <strong>Ollama Setup:</strong> Make sure you have Ollama running locally at <code>http://localhost:11434</code> with the <code>llama3</code> model pulled (<code>ollama pull llama3</code>).
                </p>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                <button 
                  className="mac-btn-secondary"
                  onClick={() => setShowApiSettings(false)}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Cancel
                </button>
                <button 
                  className="mac-btn-primary-glow"
                  onClick={() => saveApiSettings(apiProvider, apiKey)}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Save Keys
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Interactive Floating Scientific Calculator --- */}
      {calculatorOpen && (
        <div className="floating-calc-widget">
          <div className="calc-header-bar">
            <span className="calc-dots">
              <span className="dot dot-r" onClick={() => setCalculatorOpen(false)}></span>
              <span className="dot dot-y"></span>
              <span className="dot dot-g"></span>
            </span>
            <span className="calc-title">Virtual TU Scientific Calculator</span>
          </div>

          <div className="calc-display-screen">
            <div className="calc-exp-row">{calcInput || '0'}</div>
            <div className="calc-res-row">{calcResult || '0'}</div>
          </div>

          <div className="calc-keyboard-grid">
            {/* Scientific keys on left, operations on right */}
            {['sin(', 'cos(', 'tan(', 'C', 'Del',
              'log(', 'ln(', 'sqrt(', '(', ')',
              '7', '8', '9', '/', '^',
              '4', '5', '6', '*', 'π',
              '1', '2', '3', '-', 'e',
              '0', '.', '=', '+', 'C'
            ].map((btn, idx) => (
              <button 
                key={idx} 
                onClick={() => handleCalcClick(btn)}
                className={`calc-btn ${['C', 'Del'].includes(btn) ? 'btn-red' : ['=', '+', '-', '*', '/', '^'].includes(btn) ? 'btn-gold' : 'btn-num'}`}
              >
                {btn === 'sqrt(' ? '√' : btn === 'sin(' ? 'sin' : btn === 'cos(' ? 'cos' : btn === 'tan(' ? 'tan' : btn === 'log(' ? 'log' : btn === 'ln(' ? 'ln' : btn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* --- Formula Cheat Binder Slide-Over Drawer --- */}
      {formulaBinderOpen && (
        <div className="formula-binder-overlay" onClick={() => setFormulaBinderOpen(false)}>
          <div className="formula-binder-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>📖 Formulas & Reagents Binder</h3>
              <button className="close-drawer-btn" onClick={() => setFormulaBinderOpen(false)}>✕</button>
            </div>
            
            <div className="drawer-content">
              <div className="drawer-chapter">
                <h4>📐 Mathematics Quick Index</h4>
                <ul>
                  <li><strong>Limits:</strong> lim (x → 0) [sin(x) / x] = 1</li>
                  <li><strong>Integration:</strong> ∫ [1 / (x² + a²)] dx = (1/a) * tan⁻¹(x/a) + C</li>
                  <li><strong>Integration By Parts:</strong> ∫ u dv = u*v - ∫ v du</li>
                  <li><strong>Vector Dot Product:</strong> a • b = a * b * cos(θ)</li>
                  <li><strong>Vector Cross Product:</strong> |a × b| = a * b * sin(θ)</li>
                </ul>
              </div>

              <div className="drawer-chapter">
                <h4>⚡ Physics Core Equations</h4>
                <ul>
                  <li><strong>Viscosity (Stokes' Law):</strong> F = 6π * η * r * v</li>
                  <li><strong>Capacitance (Parallel Plate):</strong> C = (K * ε₀ * A) / d</li>
                  <li><strong>Doppler Effect (Approaching Source):</strong> f' = f * [v / (v - v_s)]</li>
                  <li><strong>Radius of Gyration (Solid Cylinder):</strong> k = R / √2</li>
                  <li><strong>Fringe Width (Interference):</strong> β = (λ * D) / d</li>
                </ul>
              </div>

              <div className="drawer-chapter">
                <h4>🧪 Organic Chemistry Conversions</h4>
                <ul>
                  <li><strong>Dehydration:</strong> Ethanol + Conc. H₂SO₄ (170°C) → Ethene + H₂O</li>
                  <li><strong>Grignard Reaction:</strong> R-MgX + HCHO → Primary Alcohol</li>
                  <li><strong>Rosenmund Reduction:</strong> R-COCl + H₂ [Pd/BaSO₄] → R-CHO</li>
                  <li><strong>Ether Prep (Williamson's):</strong> R-ONa + R'-X → R-O-R' + NaX</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Left Sidebar --- */}
      <aside className="mac-sidebar">
        <div className="traffic-lights">
          <div className="traffic-dot dot-red" />
          <div className="traffic-dot dot-yellow" />
          <div className="traffic-dot dot-green" />
        </div>

        <div className="sidebar-nav-container">
          <button 
            className={`sidebar-nav-item ${activeView === 'generator' ? 'active' : ''}`}
            onClick={() => { setActiveView('generator'); setSelectedPost(null); }}
          >
            <span>📝</span> Exam Generator
          </button>
          <button 
            className={`sidebar-nav-item ${activeView === 'syllabus' ? 'active' : ''}`}
            onClick={() => { setActiveView('syllabus'); setSelectedPost(null); }}
          >
            <span>📚</span> Syllabus Hub
          </button>
          <button 
            className={`sidebar-nav-item ${activeView === 'blog' ? 'active' : ''}`}
            onClick={() => { setActiveView('blog'); setSelectedPost(null); }}
          >
            <span>📰</span> Engineering Hub
          </button>
          <button 
            className={`sidebar-nav-item ${activeView === 'feedback' ? 'active' : ''}`}
            onClick={() => { setActiveView('feedback'); setSelectedPost(null); }}
          >
            <span>💬</span> Send Feedback
          </button>
        </div>

        {activeView === 'generator' ? (
          <>
            <div className="sidebar-section" style={{ marginTop: '0.8rem' }}>
              <h3 className="sidebar-title">Syllabus Subjects</h3>
              <div className="sidebar-list">
                {[
                  { id: 'physics', label: 'Physics' },
                  { id: 'mathematics', label: 'Mathematics' },
                  { id: 'chemistry', label: 'Chemistry' },
                  { id: 'english', label: 'English' },
                ].map((sub) => {
                  const isSelected = selectedSubjects.includes(sub.id);
                  return (
                    <div
                      key={sub.id}
                      className={`sidebar-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleSubject(sub.id)}
                    >
                      <div className="item-left">
                        <div className="item-checkbox">
                          <span className="item-checkmark" />
                        </div>
                        <span>{sub.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Unified Audio Controller */}
              <div style={{ marginTop: '14px', borderTop: '1px solid var(--panel-border)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-sec)', marginBottom: '4px' }}>
                  <span>🎵 Study Music: <strong>{['Off', 'Baroque Focus', 'Deep Binaural Focus', 'Cosy Rain & Thunder', 'Lofi Chill Chords'][focusMusic]}</strong></span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  value={focusMusic}
                  onChange={(e) => {
                    playPencilClick();
                    setFocusMusic(parseInt(e.target.value));
                  }}
                  style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer', marginBottom: '8px' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-sec)', marginBottom: '4px' }}>
                  <span>🎧 Ambient: <strong>{ambientSound === 'none' ? 'Off' : ambientSound === 'library' ? 'Library' : 'Lab'}</strong></span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="1"
                  value={ambientSound === 'none' ? 0 : ambientSound === 'library' ? 1 : 2}
                  onChange={(e) => {
                    playPencilClick();
                    const val = parseInt(e.target.value);
                    setAmbientSound(val === 0 ? 'none' : val === 1 ? 'library' : 'lab');
                  }}
                  style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer', marginBottom: '8px' }}
                />

                {(focusMusic !== 0 || ambientSound !== 'none') && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.70rem', color: 'var(--text-sec)' }}>
                      <span>Master Audio Volume</span>
                      <span>{musicVolume}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={musicVolume}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setMusicVolume(val);
                        setAmbientVolume(val);
                      }}
                      style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                    />
                  </div>
                )}
              </div>

              {/* AI weakness booster toggle */}
              {examHistory.length > 0 && (
                <div
                  className="custom-checkbox-row adaptive-booster-row"
                  onClick={() => {
                    playPencilClick();
                    setAdaptiveBooster(!adaptiveBooster);
                  }}
                  style={{ marginTop: '12px', background: 'rgba(197, 168, 128, 0.05)', padding: '6px 8px', borderRadius: '4px', border: '1px dashed rgba(197, 168, 128, 0.35)', display: 'flex', gap: '8px', cursor: 'pointer', alignItems: 'center' }}
                >
                  <div className={`item-checkbox ${adaptiveBooster ? 'selected' : ''}`}>
                    {adaptiveBooster && <span className="item-checkmark" style={{ display: 'block' }} />}
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--accent-gold)' }}>🎯 AI Weakness Booster</span>
                </div>
              )}
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Exam Rules</h3>
              
              <div
                className="custom-checkbox-row"
                onClick={() => setCustomMode(!customMode)}
              >
                <div className={`item-checkbox ${customMode ? 'selected' : ''}`}>
                  {customMode && <span className="item-checkmark" style={{ display: 'block' }} />}
                </div>
                <span>Custom Question Counts</span>
              </div>

              {customMode ? (
                <div className="custom-inputs-stack" style={{ marginTop: '8px' }}>
                  {selectedSubjects.map((sub) => (
                    <div key={sub} className="sidebar-input-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: '600' }}>
                        <span style={{ textTransform: 'capitalize' }}>{sub}</span>
                        <span style={{ color: 'var(--accent-gold)' }}>{customCounts[sub] || 0} MCQs</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="60"
                        value={customCounts[sub] || 0}
                        onChange={(e) => {
                          playPencilClick();
                          handleCustomCountChange(sub, e.target.value);
                        }}
                        style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="stats-box">
                  <div className="stat-row">
                    <span className="stat-label">Total MCQs</span>
                    <span className="stat-val">{totalQuestions}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Total Marks</span>
                    <span className="stat-val">{totalQuestions} Marks</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Duration</span>
                    <span className="stat-val">120 Minutes</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Negative Mark</span>
                    <span className="stat-val">5% / wrong</span>
                  </div>
                </div>
              )}
            </div>



            <div className="sidebar-section">
              <h3 className="sidebar-title">Quick Study Tools</h3>
              <button 
                className="mac-btn-secondary"
                onClick={() => setFormulaBinderOpen(true)}
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', marginBottom: '8px' }}
              >
                📖 Open Formula Binder
              </button>
            </div>

            <div className="ai-warning-box">
              ⚠️ <strong>Note:</strong> This question paper and answer key are generated by AI. AI can make errors. Please verify calculations.
            </div>
          </>
        ) : (
          <div className="sidebar-static-info">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Quick Study Tools</h3>
              <button 
                className="mac-btn-secondary"
                onClick={() => setFormulaBinderOpen(true)}
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
              >
                📖 Open Formula Binder
              </button>
            </div>

            <div className="ai-warning-box" style={{ marginTop: '1rem' }}>
              ⚠️ AI-Generated Model. Double check calculations and keys.
            </div>
            <div className="sidebar-contact-info">
              <h4>Support Email</h4>
              <p><a href="mailto:tosudip369@hotmail.com">tosudip369@hotmail.com</a></p>
            </div>
          </div>
        )}
      </aside>

      {/* --- Right Main Viewport --- */}
      <section className="mac-content">
        {/* --- 1. EXAM GENERATOR VIEW --- */}
        {activeView === 'generator' && (
          <>
            <header className="mac-toolbar">
              <h2 className="toolbar-title">Model Exam Document Viewer</h2>

              <div className="toolbar-center">
                {questions.length > 0 && (
                  <div className="toolbar-timer-pill">
                    <span className="timer-badge">⏱️ {formatTime(timeRemaining)}</span>
                  </div>
                )}
              </div>
              
              <div className="toolbar-actions">
                <button
                  className={`mac-btn-secondary ${apiProvider !== 'none' ? 'active-simulator' : ''}`}
                  onClick={() => {
                    playPencilClick();
                    setShowApiSettings(true);
                  }}
                  style={{ padding: '0.45rem 0.8rem', fontSize: '0.82rem', marginRight: '6px' }}
                  title="Configure AI API Providers & Keys"
                >
                  🔑 AI Keys {apiProvider !== 'none' ? `(${apiProvider.toUpperCase()})` : ''}
                </button>
                {/* virtual scientific calculator toggle */}
                <button
                  className={`mac-btn-secondary ${calculatorOpen ? 'active-simulator' : ''}`}
                  onClick={() => {
                    playPencilClick();
                    setCalculatorOpen(!calculatorOpen);
                  }}
                  style={{ padding: '0.45rem 0.8rem', fontSize: '0.82rem' }}
                  title="Virtual Scientific Calculator"
                >
                  🧮 Calculator
                </button>

                <button
                  className="mac-btn-secondary"
                  onClick={() => setAudioMuted(!audioMuted)}
                  style={{ padding: '0.45rem', minWidth: '40px', justifyContent: 'center', marginLeft: '6px' }}
                  title={audioMuted ? "Unmute Sounds" : "Mute Sounds"}
                >
                  <span>{audioMuted ? '🔇' : '🔊'}</span>
                </button>

                <button
                  className="mac-btn-secondary"
                  onClick={() => {
                    playPencilClick();
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                  }}
                  style={{ padding: '0.45rem', minWidth: '40px', justifyContent: 'center', marginLeft: '6px' }}
                  title={theme === 'dark' ? "Switch to Luxury Light" : "Switch to Luxury Dark"}
                >
                  <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
                </button>

                {questions.length > 0 && !quizResult && (
                  <button 
                    className={`mac-btn-secondary ${examCenterMode ? 'active-simulator' : ''}`}
                    onClick={() => setExamCenterMode(!examCenterMode)}
                    style={{ fontSize: '0.82rem', marginLeft: '6px' }}
                  >
                    🎭 {examCenterMode ? "Exit Exam Center" : "Simulate Exam Center"}
                  </button>
                )}

                {questions.length > 0 && !quizResult && (
                  <button 
                    className="mac-btn-primary-glow"
                    onClick={handleFinishQuiz}
                    style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', marginLeft: '6px' }}
                  >
                    ✔️ Finish Exam
                  </button>
                )}

                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    download="ioe_model_exam.pdf"
                    className="mac-btn-success"
                    style={{ marginLeft: '6px' }}
                  >
                    <span>📄</span> Download Question
                  </a>
                )}
                {answersUrl && (
                  <a
                    href={answersUrl}
                    download="ioe_model_exam_answers.pdf"
                    className="mac-btn-primary-glow"
                    style={{ marginLeft: '6px' }}
                  >
                    <span>🔑</span> Download Solution
                  </a>
                )}
              </div>
            </header>

            <div className="preview-viewport">
              {errorMsg && (
                <div className="error-banner" style={{ marginTop: 0, width: '100%', maxWidth: '500px' }}>
                  <span>❌ Error: {errorMsg}</span>
                </div>
              )}

              {/* Revision Notebook Banner */}
              {!questions.length && flaggedList.length > 0 && (
                <div className="revision-notebook-banner">
                  <div className="revision-notebook-info">
                    <h4>🔖 Personal Revision Notebook ({flaggedList.length} Flagged MCQs)</h4>
                    <p>Export your bookmarked questions and step-by-step explanations directly into a customized PDF booklet.</p>
                  </div>
                  <div className="revision-notebook-actions">
                    <button 
                      className="mac-btn-success"
                      onClick={() => handleDownloadFlaggedPdf(false)}
                      disabled={flaggedPdfLoading}
                    >
                      📄 Download Flagged PDF
                    </button>
                    <button 
                      className="mac-btn-primary-glow"
                      onClick={() => handleDownloadFlaggedPdf(true)}
                      disabled={flaggedPdfLoading}
                    >
                      🔑 Download Flagged Solutions
                    </button>
                  </div>
                </div>
              )}

              {!errorMsg && questions.length > 0 ? (
                <div className="cbt-workspace-layout">
                  
                  {/* Left Booklet Question Paper Sheet */}
                  <div key={currentPage} className="paper-sheet page-flip-transition" style={{ flex: 1 }}>
                    <div className="paper-header">
                      <h1 className="paper-univ">INSTITUTE OF ENGINEERING (IOE)</h1>
                      <h2 className="paper-exam">ENTRANCE MODEL EXAMINATION</h2>
                      <div className="paper-meta">Time: {practiceChapter ? `${Math.round((practiceChapter.count * 1.2 * 60) / 60)} Minutes` : '2 Hours'} | Full Marks: {questions.length > 0 ? loadedFullMarks : totalQuestions}</div>
                      {practiceChapter ? (
                        <div className="adaptive-boost-banner" style={{ margin: '8px auto 0 auto', display: 'inline-block', background: 'rgba(197, 168, 128, 0.08)', border: '1px solid rgba(197, 168, 128, 0.35)', color: 'var(--accent-gold)', fontSize: '0.72rem', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                          📖 Focused Practice: {(questions[0]?.subject || 'SUBJECT').toUpperCase()} ({practiceChapter.count} MCQs)
                        </div>
                      ) : (
                        adaptiveBooster && examHistory.length > 0 && (
                          <div className="adaptive-boost-banner" style={{ margin: '8px auto 0 auto', display: 'inline-block', background: 'rgba(197, 168, 128, 0.08)', border: '1px solid rgba(197, 168, 128, 0.35)', color: 'var(--accent-gold)', fontSize: '0.72rem', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                            🎯 AI Weakness Booster Active: Focused on {getWeakestSubject() ? getWeakestSubject().toUpperCase() : 'MATHEMATICS'}
                          </div>
                        )
                      )}
                      
                      <div className="booklet-paginator">
                        {getActivePaginatorPages().map((pg) => (
                          <button
                            key={pg.id}
                            className={`page-pill-btn ${currentPage === pg.id ? 'active' : ''}`}
                            onClick={() => {
                              playPaperRustle();
                              setCurrentPage(pg.id);
                            }}
                          >
                            Page {pg.id} ({pg.label})
                          </button>
                        ))}
                      </div>

                      <hr className="paper-divider" />
                    </div>

                    {quizResult && currentPage === 1 && (
                      <div className="quiz-result-card">
                        <h3 className="result-title">📊 Exam Performance Report</h3>
                        <div className="result-grid">
                          <div className="result-stat-box">
                            <span className="result-stat-lbl">Final Score</span>
                            <span className="result-stat-num">{quizResult.score} / {quizResult.total}</span>
                          </div>
                          <div className="result-stat-box">
                            <span className="result-stat-lbl">Correct</span>
                            <span className="result-stat-num" style={{ color: '#10b981' }}>{quizResult.correct}</span>
                          </div>
                          <div className="result-stat-box">
                            <span className="result-stat-lbl">Incorrect</span>
                            <span className="result-stat-num" style={{ color: '#ef4444' }}>{quizResult.incorrect}</span>
                          </div>
                          <div className="result-stat-box">
                            <span className="result-stat-lbl">Unanswered</span>
                            <span className="result-stat-num" style={{ color: '#6b7280' }}>{quizResult.unanswered}</span>
                          </div>
                          <div className="result-stat-box">
                            <span className="result-stat-lbl">Neg. Marks</span>
                            <span className="result-stat-num" style={{ color: '#f59e0b' }}>-{quizResult.negativeDeduction}</span>
                          </div>
                        </div>
                        <p className="result-desc">
                          Review your mistakes. Correct answers are in emerald green; incorrect choices are in red.
                        </p>
                        <button
                          className="mac-btn-primary-glow"
                          onClick={() => handleGenerate()}
                          style={{ margin: '1.2rem auto 0 auto', width: 'auto', display: 'flex', gap: '8px', padding: '0.65rem 1.8rem', justifyContent: 'center' }}
                        >
                          🔄 Generate New Mock Test
                        </button>
                      </div>
                    )}

                    <div className="paper-section">
                      <h3 className="paper-section-title">{pageContent.title}</h3>
                      
                      {pageContent.items.length === 0 ? (
                        <div className="empty-page-notification">
                          No questions in this section. Double check subject selectors in the sidebar.
                        </div>
                      ) : (
                        pageContent.items.map((q, idx) => {
                          const qData = q.questionData;
                          const isLongOption =
                            qData.ans1_plain_text.length > 25 ||
                            qData.ans2_plain_text.length > 25 ||
                            qData.ans3_plain_text.length > 25 ||
                            qData.ans4_plain_text.length > 25;

                          const isRevealed = !!revealedAnswers[q.id];
                          const ansIndex = qData.correct_answer || 1;
                          const optionLetter = String.fromCharCode(64 + ansIndex);
                          const optionText = qData[`ans${ansIndex}_plain_text`];
                          const selectedOpt = selectedAnswers[q.id];
                          const isFlagged = !!flaggedQuestions[q.id];

                          const carriesTwoMarks = q.subject === 'mathematics' ? idx >= 20 : (q.subject === 'physics' ? idx >= 20 : false);

                          return (
                            <div 
                              id={`q-item-${q.id}`}
                              key={q.id} 
                              className={`paper-question-item ${carriesTwoMarks ? 'double-marks-card' : ''}`}
                            >
                              <div className="paper-question-text">
                                <div className="question-left-wrap">
                                  <button 
                                    className={`flag-bookmark-btn ${isFlagged ? 'flagged' : ''}`}
                                    onClick={() => toggleFlagQuestion(q)}
                                    title={isFlagged ? "Remove from Revision Notebook" : "Save to Revision Notebook"}
                                  >
                                    🔖
                                  </button>
                                  <span>{questions.findIndex(item => item.id === q.id) + 1}. {cleanHtmlForPreview(qData.question_plain_title)}</span>
                                </div>
                                <span className={`question-marks ${carriesTwoMarks ? 'gold-seal' : ''}`}>
                                  {carriesTwoMarks ? '⭐ [2 Marks]' : '[1 Mark]'}
                                </span>
                              </div>
                              
                              <div className={`paper-options-container ${isLongOption ? 'long-options' : ''}`}>
                                {[1, 2, 3, 4].map((optIdx) => {
                                  const letter = String.fromCharCode(64 + optIdx);
                                  const optVal = qData[`ans${optIdx}_plain_text`];
                                  const isSelected = selectedOpt === optIdx;
                                  
                                  let optionClass = '';
                                  if (quizResult) {
                                    if (optIdx === ansIndex) {
                                      optionClass = 'correct-answer';
                                    } else if (isSelected && optIdx !== ansIndex) {
                                      optionClass = 'incorrect-answer';
                                    }
                                  } else if (isSelected) {
                                    optionClass = 'selected';
                                  }

                                  return (
                                    <div 
                                      key={optIdx} 
                                      className={`paper-option ${optionClass}`}
                                      onClick={() => {
                                        if (!quizResult) {
                                          playPencilClick();
                                          setSelectedAnswers({
                                            ...selectedAnswers,
                                            [q.id]: optIdx
                                          });
                                        }
                                      }}
                                      style={{ cursor: quizResult ? 'default' : 'pointer' }}
                                    >
                                      <span className="option-letter">({letter})</span>
                                      <span className="option-value">{cleanHtmlForPreview(optVal)}</span>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="interactive-reveal-container">
                                <button
                                    className={`reveal-trigger-btn ${isRevealed ? 'active' : ''}`}
                                    onClick={() => setRevealedAnswers({
                                      ...revealedAnswers,
                                      [q.id]: !isRevealed,
                                    })}
                                >
                                  {isRevealed ? '🙈 Hide Explanation' : '👁️ Reveal Answer & Why'}
                                </button>

                                {isRevealed && (
                                  <div className="revealed-explanation-box">
                                    <div className="revealed-option-row">
                                      <strong>Correct Option:</strong> <span className="correct-badge">({optionLetter})</span> {cleanHtmlForPreview(optionText)}
                                    </div>
                                    <div className="revealed-why-row">
                                      <strong>Why:</strong> {qData.explanation || 'By applying fundamental principles of the subject.'}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                      {currentPage === getActivePaginatorPages().length && quizResult && (
                        <div className="new-test-prompt-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', margin: '2rem 0', padding: '1.5rem', background: 'rgba(197, 168, 128, 0.03)', border: '1px dashed var(--panel-border)', borderRadius: '8px' }}>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-sec)', margin: 0 }}>All caught up? Test your concepts with a brand new set of questions!</p>
                          <button
                            className="mac-btn-primary-glow"
                            onClick={() => handleGenerate()}
                            style={{ padding: '0.6rem 1.8rem', fontSize: '0.82rem', marginTop: '6px' }}
                          >
                            🔄 Generate New Mock Test
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="booklet-footer-nav">
                      <button
                        className="mac-btn-secondary"
                        disabled={currentPage === 1}
                        onClick={() => {
                          playPaperRustle();
                          setCurrentPage((p) => p - 1);
                        }}
                      >
                        ◀ Previous Booklet Page
                      </button>
                      <span className="booklet-page-lbl">Page {currentPage} of {getActivePaginatorPages().length}</span>
                      <button
                        className="mac-btn-primary"
                        disabled={currentPage === getActivePaginatorPages().length}
                        onClick={() => {
                          playPaperRustle();
                          setCurrentPage((p) => p + 1);
                        }}
                      >
                        Next Booklet Page ▶
                      </button>
                    </div>

                    <div className="paper-footer-disclaimer">
                      Disclaimer: This question paper and answer key are generated by AI. AI can make errors. Please verify calculations.
                    </div>
                  </div>

                  {/* Right Collapsible CBT Question Navigation Palette */}
                  <div className="cbt-question-palette">
                    <h4>📍 CBT Question Palette</h4>
                    <p className="palette-desc">Color status: Green (Answered), Red (Visited but empty), Gold border (Flagged), Grey (Not visited).</p>
                    
                    {/* Live Progress Metrics Summary */}
                    <div className="palette-stats-summary" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '1rem', background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '6px', border: '1px solid var(--panel-border)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-sec)' }}>Answered: <strong style={{ color: '#10b981' }}>{Object.keys(selectedAnswers).length}</strong></div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-sec)' }}>Remaining: <strong style={{ color: '#ef4444' }}>{questions.length - Object.keys(selectedAnswers).length}</strong></div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-sec)' }}>Flagged: <strong style={{ color: 'var(--accent-gold)' }}>{Object.keys(flaggedQuestions).length}</strong></div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-sec)' }}>Total: <strong>{questions.length}</strong></div>
                    </div>
                    
                    <div className="palette-grid">
                      {questions.map((q, idx) => {
                        const isAnswered = selectedAnswers[q.id] !== undefined;
                        const isVisited = !!visitedQuestions[q.id];
                        const isFlagged = !!flaggedQuestions[q.id];
                        
                        const activePages = getActivePaginatorPages();
                        const activePageObj = activePages.find(p => p.id === currentPage);
                        const activeSubj = activePageObj ? activePageObj.subject : null;
                        const isCurrentSection = activeSubj ? q.subject === activeSubj : true;
                        
                        let statusClass = 'palette-unvisited';
                        if (isAnswered) {
                          statusClass = 'palette-answered';
                        } else if (isVisited) {
                          statusClass = 'palette-visited-empty';
                        }
                        
                        return (
                          <button
                            key={q.id}
                            onClick={() => jumpToQuestion(q, idx)}
                            className={`palette-num-badge ${statusClass} ${isFlagged ? 'palette-flagged' : ''} ${isCurrentSection ? 'palette-active-sec' : ''}`}
                            title={`Jump to Question ${idx + 1}`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              ) : (
                !loading && (
                  <div className="empty-viewport">
                    <div className="empty-art-frame">
                      {renderEmptyArt(quoteData.image)}
                    </div>
                    
                    <h3 className="empty-title">IOE Exam Book Preview</h3>
                    
                    <blockquote className="empty-quote">
                      "{quoteData.quote}"
                      <cite className="empty-quote-author">— {quoteData.author}</cite>
                    </blockquote>
                    
                    <p className="empty-desc">
                      Select your subjects on the left panel to begin preparing.
                    </p>

                    <button
                      className="mac-btn-primary-glow"
                      onClick={() => handleGenerate()}
                      disabled={selectedSubjects.length === 0}
                      style={{ marginTop: '1.8rem', width: 'auto', padding: '0.65rem 2rem' }}
                    >
                      ⚡ Generate Exam Paper
                    </button>
                  </div>
                )
              )}
            </div>
          </>
        )}

        {/* --- 2. SYLLABUS & CURRICULUM HUB (First-Principles Integrated Workspace) --- */}
        {activeView === 'syllabus' && (
          <>
            <header className="mac-toolbar">
              <h2 className="toolbar-title">TU IOE Syllabus & Weightage Hub</h2>
              <div className="toolbar-actions">
                <button
                  className="mac-btn-secondary"
                  onClick={() => setAudioMuted(!audioMuted)}
                  style={{ padding: '0.45rem', minWidth: '40px', justifyContent: 'center' }}
                  title={audioMuted ? "Unmute Sounds" : "Mute Sounds"}
                >
                  <span>{audioMuted ? '🔇' : '🔊'}</span>
                </button>

                <button
                  className="mac-btn-secondary"
                  onClick={() => {
                    playPencilClick();
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                  }}
                  style={{ padding: '0.45rem', minWidth: '40px', justifyContent: 'center', marginLeft: '6px' }}
                  title={theme === 'dark' ? "Switch to Luxury Light" : "Switch to Luxury Dark"}
                >
                  <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
                </button>
              </div>
            </header>

            <div className="preview-viewport" style={{ padding: '2rem', background: '#111214' }}>
              <div className="syllabus-container page-flip-transition">
                
                {/* First-Principles Competitor Features Banner Grid */}
                <div className="competitor-feature-board">
                  <div className="board-header">
                    <h3>🛡️ A Workspace Built For Your Aspirations</h3>
                    <p>Unlike standard passive course directories, our mock generator compiles everything you need natively from first principles.</p>
                  </div>

                  <div className="board-features-grid">
                    <div className="feature-item-card">
                      <h5>⏱️ Automated Regular Mock Tests</h5>
                      <p>Full 120-minute timed simulator with immediate scores and step-by-step corrections.</p>
                      <button onClick={() => handleGenerate()} className="mac-btn-primary-glow" style={{ fontSize: '0.75rem', padding: '6px 12px', marginTop: '10px' }}>
                        ⚡ Start Mock Exam
                      </button>
                    </div>

                    <div className="feature-item-card">
                      <h5>🔋 Dynamic Parametric Questions</h5>
                      <p>Powered by our template variable solver. Generates mathematically unique numerical calculations on every attempt.</p>
                      <span className="badge-glow" style={{ marginTop: '8px', display: 'inline-block' }}>Infinite Combinations Active</span>
                    </div>

                    <div className="feature-item-card">
                      <h5>📈 Subject Strength Analytics</h5>
                      <p>Automatically maps your correct/incorrect ratios over time to identify conceptual weaknesses.</p>
                      <button onClick={() => setActiveView('blog')} className="mac-btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px', marginTop: '10px' }}>
                        📊 View Strength Radar
                      </button>
                    </div>

                    <div className="feature-item-card">
                      <h5>✍️ Easy Revision note taking</h5>
                      <p>Flag hard questions during your test, save them in your local binder, and export to tailored revision PDFs.</p>
                      <span className="badge-glow" style={{ marginTop: '8px', display: 'inline-block' }}>Local Storage Binder Ready</span>
                    </div>

                    <div className="feature-item-card">
                      <h5>💬 Interactive Peer Help Desk</h5>
                      <p>Ask concerns and send suggestions directly to our support desk for prompt replies.</p>
                      <button onClick={() => setActiveView('feedback')} className="mac-btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px', marginTop: '10px' }}>
                        💬 Contact Expert Team
                      </button>
                    </div>
                  </div>
                </div>

                <div className="syllabus-grid">
                  {/* Math */}
                  <div className="syllabus-subject-card">
                    <div className="subj-card-header">
                      <div className="subj-icon-title">
                        <span className="subj-icon">📐</span>
                        <h4>Mathematics</h4>
                      </div>
                      <span className="subj-weightage-badge">30 Marks</span>
                    </div>
                    <div className="subj-progress-wrapper">
                      <div className="subj-progress-bar" style={{ width: '30%' }}></div>
                    </div>
                    <ul className="subj-chapter-list">
                      <li>
                        <div className="chapter-info">
                          <span>Full Subject Practice</span>
                          <small>30 Marks</small>
                        </div>
                        <div className="chapter-actions" style={{ width: '100%', display: 'flex', gap: '6px', marginTop: '6px' }}>
                          <button onClick={() => setFormulaBinderOpen(true)} className="chapter-mini-btn" style={{ flex: 1 }}>Formula</button>
                          <button onClick={() => handleQuickPractice('mathematics', 'Mathematics Practice', 30)} className="chapter-practice-btn" style={{ flex: 2 }}>Practice</button>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Physics */}
                  <div className="syllabus-subject-card">
                    <div className="subj-card-header">
                      <div className="subj-icon-title">
                        <span className="subj-icon">⚡</span>
                        <h4>Physics</h4>
                      </div>
                      <span className="subj-weightage-badge">30 Marks</span>
                    </div>
                    <div className="subj-progress-wrapper">
                      <div className="subj-progress-bar" style={{ width: '30%' }}></div>
                    </div>
                    <ul className="subj-chapter-list">
                      <li>
                        <div className="chapter-info">
                          <span>Full Subject Practice</span>
                          <small>30 Marks</small>
                        </div>
                        <div className="chapter-actions" style={{ width: '100%', display: 'flex', gap: '6px', marginTop: '6px' }}>
                          <button onClick={() => setFormulaBinderOpen(true)} className="chapter-mini-btn" style={{ flex: 1 }}>Formula</button>
                          <button onClick={() => handleQuickPractice('physics', 'Physics Practice', 30)} className="chapter-practice-btn" style={{ flex: 2 }}>Practice</button>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Chemistry */}
                  <div className="syllabus-subject-card">
                    <div className="subj-card-header">
                      <div className="subj-icon-title">
                        <span className="subj-icon">🧪</span>
                        <h4>Chemistry</h4>
                      </div>
                      <span className="subj-weightage-badge">20 Marks</span>
                    </div>
                    <div className="subj-progress-wrapper">
                      <div className="subj-progress-bar" style={{ width: '20%' }}></div>
                    </div>
                    <ul className="subj-chapter-list">
                      <li>
                        <div className="chapter-info">
                          <span>Full Subject Practice</span>
                          <small>20 Marks</small>
                        </div>
                        <div className="chapter-actions" style={{ width: '100%', display: 'flex', gap: '6px', marginTop: '6px' }}>
                          <button onClick={() => setFormulaBinderOpen(true)} className="chapter-mini-btn" style={{ flex: 1 }}>Formula</button>
                          <button onClick={() => handleQuickPractice('chemistry', 'Chemistry Practice', 20)} className="chapter-practice-btn" style={{ flex: 2 }}>Practice</button>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* English */}
                  <div className="syllabus-subject-card">
                    <div className="subj-card-header">
                      <div className="subj-icon-title">
                        <span className="subj-icon">💬</span>
                        <h4>English</h4>
                      </div>
                      <span className="subj-weightage-badge">20 Marks</span>
                    </div>
                    <div className="subj-progress-wrapper">
                      <div className="subj-progress-bar" style={{ width: '20%' }}></div>
                    </div>
                    <ul className="subj-chapter-list">
                      <li>
                        <div className="chapter-info">
                          <span>Full Subject Practice</span>
                          <small>20 Marks</small>
                        </div>
                        <div className="chapter-actions" style={{ width: '100%', marginTop: '6px' }}>
                          <button onClick={() => handleQuickPractice('english', 'English Practice', 20)} className="chapter-practice-btn" style={{ width: '100%' }}>Practice</button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* --- 3. ENGINEERING HUB VIEW --- */}
        {activeView === 'blog' && (
          <>
            <header className="mac-toolbar">
              <h2 className="toolbar-title">
                {selectedPost ? `Hub / ${selectedPost.title}` : 'Engineering Student Hub & Analytics'}
              </h2>
              
              <div className="toolbar-actions">
                <button
                  className="mac-btn-secondary"
                  onClick={() => setAudioMuted(!audioMuted)}
                  style={{ padding: '0.45rem', minWidth: '40px', justifyContent: 'center' }}
                  title={audioMuted ? "Unmute Sounds" : "Mute Sounds"}
                >
                  <span>{audioMuted ? '🔇' : '🔊'}</span>
                </button>

                <button
                  className="mac-btn-secondary"
                  onClick={() => {
                    playPencilClick();
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                  }}
                  style={{ padding: '0.45rem', minWidth: '40px', justifyContent: 'center', marginLeft: '6px' }}
                  title={theme === 'dark' ? "Switch to Luxury Light" : "Switch to Luxury Dark"}
                >
                  <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
                </button>

                {selectedPost && (
                  <button 
                    className="mac-btn-secondary"
                    onClick={() => setSelectedPost(null)}
                    style={{ marginLeft: '6px' }}
                  >
                    <span>⬅️</span> Back to Hub
                  </button>
                )}
              </div>
            </header>

            <div className="preview-viewport" style={{ background: '#111214' }}>
              {selectedPost ? (
                <div className="paper-sheet blog-reader page-flip-transition">
                  <h1 className="blog-title">{selectedPost.title}</h1>
                  <div className="blog-author-line">
                    By <strong>{selectedPost.author}</strong> | {selectedPost.date} | <span>⏱️ {selectedPost.readTime}</span>
                  </div>
                  <hr className="paper-divider" />
                  <div 
                    className="blog-main-content"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                  <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                    <button 
                      className="mac-btn-primary" 
                      onClick={() => setSelectedPost(null)}
                    >
                      Back to Hub Grid
                    </button>
                  </div>
                </div>
              ) : (
                <div className="blog-grid-container">
                  
                  {/* Progress Analytics */}
                  <div className="analytics-welcome-banner">
                    <div className="analytics-header">
                      <h3>📈 Your Mock Practice Analytics</h3>
                      <p>Visual statistics and scores saved automatically from your browser's mock exams history.</p>
                    </div>

                    {totalExams > 0 ? (
                      <div className="analytics-dashboard-layout">
                        <div className="analytics-dashboard-grid">
                          <div className="analytics-box">
                            <span className="analytics-lbl">Exams Taken</span>
                            <span className="analytics-num">{totalExams} Tests</span>
                          </div>
                          <div className="analytics-box">
                            <span className="analytics-lbl">Best Score</span>
                            <span className="analytics-num" style={{ color: '#c5a880' }}>{bestScore} pts</span>
                          </div>
                          <div className="analytics-box">
                            <span className="analytics-lbl">Average Score</span>
                            <span className="analytics-num">{avgScore} pts</span>
                          </div>
                          <div className="analytics-box">
                            <span className="analytics-lbl">Syllabus Progress</span>
                            <span className="analytics-num" style={{ color: '#10b981' }}>Active</span>
                          </div>
                        </div>

                        <div className="analytics-radar-card">
                          <h4>Subject-Wise Strength Chart (%)</h4>
                          <div className="radar-canvas-container">
                            <svg viewBox="0 0 200 200" width="160px" height="160px" className="radar-svg-grid">
                              <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                              <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                              <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                              <line x1="100" y1="30" x2="100" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                              <line x1="30" y1="100" x2="170" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                              <text x="100" y="22" fill="#c5a880" fontSize="8" textAnchor="middle">MATH ({subjAverages.mathematics}%)</text>
                              <text x="175" y="103" fill="#c5a880" fontSize="8">PHYS ({subjAverages.physics}%)</text>
                              <text x="100" y="186" fill="#c5a880" fontSize="8" textAnchor="middle">CHEM ({subjAverages.chemistry}%)</text>
                              <text x="25" y="103" fill="#c5a880" fontSize="8" textAnchor="end">ENG ({subjAverages.english}%)</text>
                              <polygon points={radarPolygonPoints} fill="rgba(197, 168, 128, 0.28)" stroke="#c5a880" strokeWidth="1.5" />
                            </svg>
                          </div>
                        </div>

                        <div className="analytics-history-list">
                          <h4>Recent Test Performance Log</h4>
                          <div className="analytics-table-header">
                            <span>Date</span>
                            <span>Correct</span>
                            <span>Incorrect</span>
                            <span>Score</span>
                          </div>
                          {examHistory.slice(-4).reverse().map((h, i) => (
                            <div key={i} className="analytics-table-row">
                              <span className="date-col">{h.date} <small>{h.time}</small></span>
                              <span className="correct-col" style={{ color: '#10b981' }}>{h.correct} / {h.total}</span>
                              <span className="wrong-col" style={{ color: '#ef4444' }}>{h.incorrect}</span>
                              <span className="score-col"><strong>{h.score}</strong></span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="analytics-empty-state">
                        No exam history recorded yet. Select subjects in the <strong>Exam Generator</strong> panel and complete your first test mock to view progress charts!
                      </div>
                    )}
                  </div>

                  {/* Flagged Revision Exporter */}
                  {flaggedList.length > 0 && (
                    <div className="analytics-welcome-banner" style={{ marginTop: '1.5rem', background: 'rgba(197, 168, 128, 0.04)' }}>
                      <div className="analytics-header" style={{ marginBottom: '1.2rem' }}>
                        <h3>🔖 Personal Weak-Points Exporter ({flaggedList.length} Questions Saved)</h3>
                        <p>Generate a customized study booklet containing only your bookmarked questions and step-by-step solutions.</p>
                      </div>
                      <div className="flagged-exporter-buttons" style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <button 
                          className="mac-btn-success"
                          onClick={() => handleDownloadFlaggedPdf(false)}
                          disabled={flaggedPdfLoading}
                        >
                          📄 Download Flagged Questions PDF
                        </button>
                        <button 
                          className="mac-btn-primary-glow"
                          onClick={() => handleDownloadFlaggedPdf(true)}
                          disabled={flaggedPdfLoading}
                        >
                          🔑 Download Flagged Solutions PDF
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Interactive Flashcards */}
                  <div className="flashcards-widget-container" style={{ marginTop: '1.5rem' }}>
                    <div className="flashcards-header">
                      <h3>🃏 Daily Syllabus Flashcards</h3>
                      <p>Practice active recall with core concepts and formulas. Click the card to flip it!</p>
                    </div>

                    <div className="flashcards-flex-wrap">
                      <div 
                        className={`flashcard-card-3d ${cardFlipped ? 'flipped' : ''}`}
                        onClick={() => {
                          playPencilClick();
                          setCardFlipped(!cardFlipped);
                        }}
                      >
                        <div className="card-face face-front">
                          <span className="card-lbl">Question</span>
                          <p>{FLASHCARDS[currentCardIdx].front}</p>
                          <span className="flip-prompt">🔄 Click to Flip & Verify</span>
                        </div>
                        <div className="card-face face-back">
                          <span className="card-lbl">Correct Answer</span>
                          <p>{FLASHCARDS[currentCardIdx].back}</p>
                          <span className="flip-prompt">🔄 Click to Flip Back</span>
                        </div>
                      </div>

                      <div className="flashcard-controls">
                        <button 
                          className="mac-btn-secondary"
                          onClick={() => {
                            playPencilClick();
                            setCardFlipped(false);
                            setCurrentCardIdx((prev) => (prev === 0 ? FLASHCARDS.length - 1 : prev - 1));
                          }}
                        >
                          ◀ Previous
                        </button>
                        <span className="card-idx-val">{currentCardIdx + 1} / {FLASHCARDS.length}</span>
                        <button 
                          className="mac-btn-primary"
                          onClick={() => {
                            playPencilClick();
                            setCardFlipped(false);
                            setCurrentCardIdx((prev) => (prev === FLASHCARDS.length - 1 ? 0 : prev + 1));
                          }}
                        >
                          Next ▶
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="blog-welcome-banner" style={{ marginTop: '2.5rem' }}>
                    <h3>📢 IOE Success & Resource Hub</h3>
                    <p>Read success stories, study methodologies, and memorization tips curated specifically for Nepalese engineering aspirants.</p>
                  </div>

                  <div className="blog-cards-grid">
                    {BLOG_POSTS.map(post => (
                      <div 
                        key={post.id} 
                        className="blog-card"
                        onClick={() => setSelectedPost(post)}
                      >
                        <div className="blog-card-meta">{post.date} &bull; {post.readTime}</div>
                        <h3 className="blog-card-title">{post.title}</h3>
                        <p className="blog-card-excerpt">{post.excerpt}</p>
                        <div className="blog-card-footer">
                          <span>Read Article</span> <span>➡️</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* --- 4. FEEDBACK FORM VIEW --- */}
        {activeView === 'feedback' && (
          <>
            <header className="mac-toolbar">
              <h2 className="toolbar-title">User Feedback Portal</h2>
              
              <div className="toolbar-actions">
                <button
                  className="mac-btn-secondary"
                  onClick={() => setAudioMuted(!audioMuted)}
                  style={{ padding: '0.45rem', minWidth: '40px', justifyContent: 'center' }}
                  title={audioMuted ? "Unmute Sounds" : "Mute Sounds"}
                >
                  <span>{audioMuted ? '🔇' : '🔊'}</span>
                </button>

                <button
                  className="mac-btn-secondary"
                  onClick={() => {
                    playPencilClick();
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                  }}
                  style={{ padding: '0.45rem', minWidth: '40px', justifyContent: 'center', marginLeft: '6px' }}
                  title={theme === 'dark' ? "Switch to Luxury Light" : "Switch to Luxury Dark"}
                >
                  <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
                </button>
              </div>
            </header>

            <div className="preview-viewport" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="feedback-card">
                <div className="feedback-header">
                  <h3>📩 Submit Your Feedback</h3>
                  <p>Have suggestions, questions, or encountered an issue? Share your thoughts. We verify feedback directly at <a href="mailto:tosudip369@hotmail.com">tosudip369@hotmail.com</a>.</p>
                </div>

                {feedbackSent && (
                  <div className="success-banner" style={{ margin: '1rem 0' }}>
                    ✅ Feedback mail opened! Please complete sending it in your mail client.
                  </div>
                )}

                <form className="feedback-form" onSubmit={handleSendFeedback}>
                  <div className="feedback-group">
                    <label htmlFor="user-name">Your Name</label>
                    <input 
                      type="text" 
                      id="user-name" 
                      placeholder="e.g. Sudip" 
                      value={feedbackName}
                      onChange={(e) => setFeedbackName(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="feedback-group">
                    <label htmlFor="user-subj">Category</label>
                    <select 
                      id="user-subj"
                      value={feedbackSubject}
                      onChange={(e) => setFeedbackSubject(e.target.value)}
                    >
                      <option value="Suggestion">💡 Suggestion / Idea</option>
                      <option value="Bug Report">🐛 Bug Report</option>
                      <option value="Question Pool">📚 Question Request</option>
                      <option value="Other">❓ Other</option>
                    </select>
                  </div>

                  <div className="feedback-group">
                    <label htmlFor="user-msg">Message</label>
                    <textarea 
                      id="user-msg" 
                      rows="6" 
                      placeholder="Describe what we can improve..."
                      value={feedbackMsg}
                      onChange={(e) => setFeedbackMsg(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="mac-btn-primary-glow" style={{ width: '100%', justifyContent: 'center', marginTop: '0.8rem' }}>
                    💬 Send Feedback
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
