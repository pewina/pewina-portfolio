import type { VisualSpec } from '../components/visuals/Panel';

export interface Project {
  number: string;
  category: string;
  name: string;
  description: string;
  tech: string[];
  /** A GitHub button appears only when this is set. */
  github?: string;
  /** A Live Demo button appears only when this is set. */
  demo?: string;
  /** Small plain-text note shown where buttons would be (e.g. repository status). */
  note?: string;
  /**
   * Real screenshots, in grid order: [top-left, bottom-left, tall right].
   * Files live in /public/screenshots.
   */
  screenshots?: [string, string, string];
  /** A project-specific showcase image created for the portfolio. */
  thumbnail?: string;
  /** Caption under the image grid. */
  caption: string;
  /** Illustrations shown when there are no screenshots. */
  visuals: [VisualSpec, VisualSpec, VisualSpec];
}

const PURPLE = '#8A2944';
const VIOLET = '#B24863';
const ORANGE = '#C7A88B';

const ILLUSTRATION_CAPTION = 'Diagrams of how it works, not screenshots';

export const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'Mobile App / AI / Livelihood Platform',
    name: 'SilverHands',
    description:
      'An AI-powered livelihood platform that connects skilled seniors and homemakers with meaningful opportunities. Voice onboarding extracts skills and experience, while intelligent matching considers skill overlap, distance, local demand, and profile verification. A secure Family Guide workflow lets trusted relatives assist without taking control of sensitive profile information.',
    tech: [
      'Flutter',
      'FastAPI',
      'Supabase',
      'PostgreSQL + pgvector',
      'Gemini',
      'ElevenLabs',
      'RAG',
      'Firebase',
      'Google Maps',
    ],
    github: 'https://github.com/pewina/sliver-hands',
    thumbnail: '/screenshots/silverhands-dashboard.webp',
    caption: 'Illustrative product mockup — not a live application screenshot',
    visuals: [
      { kind: 'pipeline', accent: PURPLE, steps: ['Voice', 'Skills', 'Match', 'Guide'] },
      {
        kind: 'factors',
        accent: VIOLET,
        center: 'Match score',
        labels: ['Skill overlap', 'Distance', 'Local demand', 'Verification'],
      },
      { kind: 'guide', accent: PURPLE },
    ],
  },
  {
    number: '02',
    category: 'AI / Neural Networks / Assistive Technology',
    name: 'NeuroLimb AI',
    description:
      'An interactive self-healing neural-network simulator for smart prosthetic limb control. It demonstrates STDP learning, homeostatic regulation, structural plasticity, and neuromodulation, recovering accuracy to 90%+ in under five seconds after signal disruption — without retraining or manual recalibration.',
    tech: [
      'React 18',
      'Canvas API',
      'Web Audio API',
      'FastAPI',
      'NumPy',
      'STDP',
      'Homeostatic regulation',
      'Structural plasticity',
      'Neuromodulation',
    ],
    github: 'https://github.com/pewina/NeuroLimb-AI',
    thumbnail: '/screenshots/neurolimb-2.webp',
    screenshots: [
      '/screenshots/neurolimb-1.webp',
      '/screenshots/neurolimb-2.webp',
      '/screenshots/neurolimb-3.webp',
    ],
    caption: 'Screenshots of the running simulator',
    visuals: [
      { kind: 'pulse', accent: PURPLE, seed: 3 },
      { kind: 'curve', accent: PURPLE },
      { kind: 'network', accent: PURPLE, seed: 4 },
    ],
  },
  {
    number: '03',
    category: 'Machine Learning / Data Analytics',
    name: 'Credit Card Fraud Detection',
    description:
      'A machine-learning pipeline for identifying fraudulent transactions in a highly imbalanced dataset of 284,807 real-world transactions, where only 0.17% are fraud. The workflow uses RandomOverSampler to address class imbalance, then compares Logistic Regression with Isolation Forest using F1-score, Matthews correlation coefficient, and confusion-matrix analysis.',
    tech: [
      'Python',
      'pandas',
      'NumPy',
      'scikit-learn',
      'imbalanced-learn',
      'Logistic Regression',
      'Isolation Forest',
      'EDA',
    ],
    github: 'https://github.com/pewina/credit-card-fraud-detection',
    thumbnail: '/screenshots/fraud-detection-showcase.webp',
    caption: 'Illustrative project visual — model workflow and dataset details are documented in the repository',
    visuals: [
      { kind: 'pipeline', accent: PURPLE, steps: ['EDA', 'Balance', 'Train', 'Evaluate'] },
      { kind: 'imbalance', accent: PURPLE },
      { kind: 'models', accent: VIOLET },
    ],
  },
  {
    number: '04',
    category: 'AI / EdTech / Student Support · Hackathon',
    name: 'LearnBridge AI',
    description:
      'An inclusive learning and early-student-support application designed to make education more accessible. It brings together adjustable text size and contrast, reduced-motion settings, language and audio support, visual descriptions, and mood check-ins (happy, neutral, sad, or depressed), with student-safety guidance including the 1098 child helpline.',
    tech: ['React', 'Vite', 'FastAPI', 'Accessibility', 'Multilingual UX', 'Audio support'],
    note: 'Repository coming soon',
    thumbnail: '/screenshots/learnbridge-showcase.webp',
    caption: 'Illustrative app concept — LearnBridge AI repository is coming soon',
    visuals: [
      { kind: 'pipeline', accent: VIOLET, steps: ['Access', 'Learn', 'Check-in', 'Support'] },
      {
        kind: 'factors',
        accent: PURPLE,
        center: 'Learner',
        labels: ['Text & contrast', 'Audio', 'Language', 'Mood'],
      },
      { kind: 'routing', accent: VIOLET, labels: ['Teacher', 'Counselor', '1098 helpline'] },
    ],
  },
  {
    number: '05',
    category: 'Full-Stack Development / Weather Application',
    name: 'WeatherMind AI',
    description:
      'A cartoon-style weather application featuring real-time forecasts, mood-based animated backgrounds, and a Flask backend integrated with the OpenWeatherMap REST API.',
    tech: ['Flask', 'OpenWeatherMap REST API', 'Animated UI'],
    caption: ILLUSTRATION_CAPTION,
    visuals: [
      { kind: 'mood' },
      { kind: 'pipeline', accent: VIOLET, steps: ['Client', 'Flask', 'REST API', 'Mood UI'] },
      { kind: 'weather' },
    ],
  },
  {
    number: '06',
    category: 'Automation / Network Security',
    name: 'Network Security Automation Demo',
    description:
      'A capstone demonstration of automated network monitoring, anomaly detection, and simulated security audit tasks.',
    tech: ['Python scripting', 'Network monitoring', 'Anomaly detection', 'Simulated security audits'],
    caption: ILLUSTRATION_CAPTION,
    visuals: [
      { kind: 'log', accent: ORANGE, seed: 9 },
      { kind: 'hex', accent: VIOLET, seed: 21 },
      { kind: 'topology', accent: PURPLE, seed: 7 },
    ],
  },
];
