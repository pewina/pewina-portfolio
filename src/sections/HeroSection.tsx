import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Github, Linkedin, Sparkles } from 'lucide-react';
import { PROFILE, MAILTO } from '../data/profile';

type Focus = 'AI & Data Science' | 'Web Development' | 'Creative UI/UX';

const FOCUS_COPY: Record<Focus, string> = {
  'AI & Data Science': 'Turning complex ideas into intelligent, human-centred solutions.',
  'Web Development': 'Building thoughtful digital experiences, from first sketch to working product.',
  'Creative UI/UX': 'Blending visual storytelling with clear, welcoming interactions.',
};

const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Journey', href: '#experience', id: 'experience' },
];

const FOCUSES: Focus[] = ['AI & Data Science', 'Web Development', 'Creative UI/UX'];

export default function HeroSection() {
  const reduceMotion = !!useReducedMotion();
  const [activeSection, setActiveSection] = useState('home');
  const [focus, setFocus] = useState<Focus>('AI & Data Science');

  useEffect(() => {
    const ids = ['about', 'skills', 'projects', 'experience', 'contact'];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!('IntersectionObserver' in window) || !elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-18% 0px -58% 0px', threshold: [0.05, 0.2, 0.4, 0.65] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <header
      id="home"
      className="hero-shell relative isolate min-h-[100svh] overflow-hidden px-3 py-3 sm:px-5 sm:py-5 lg:px-7 lg:py-7"
    >
      <div className="hero-frame relative flex min-h-[calc(100svh-1.5rem)] flex-col overflow-hidden rounded-[26px] sm:min-h-[calc(100svh-2.5rem)] sm:rounded-[34px] lg:min-h-[calc(100svh-3.5rem)] lg:rounded-[42px]">
        {/* Soft, cloud-like colour fields echo the reference without leaving the portfolio palette. */}
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-glow hero-glow-three" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="hero-spark hero-spark-one" aria-hidden="true">✳</div>
        <div className="hero-spark hero-spark-two" aria-hidden="true">✧</div>

        {/* Navigation */}
        <motion.nav
          aria-label="Primary navigation"
          className="relative z-20 flex items-center justify-between gap-4 px-5 pt-5 sm:px-8 sm:pt-7 lg:px-12 lg:pt-9"
          initial={reduceMotion ? false : { opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <a
            href="#home"
            onClick={() => setActiveSection('home')}
            className="hero-monogram group inline-flex items-center gap-2"
            aria-label="Pewina Francy, home"
          >
            <span className="hero-monogram-mark">pf.</span>
            <span className="hidden text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#815063] sm:inline">Pewina Francy</span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/45 p-1.5 shadow-[0_8px_30px_rgba(116,55,76,0.06)] backdrop-blur-md md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                aria-current={activeSection === link.id ? 'page' : undefined}
                className={`hero-nav-link ${activeSection === link.id ? 'is-active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a className="hero-social" href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <Github size={16} />
            </a>
            <a className="hero-social hidden sm:inline-flex" href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <Linkedin size={16} />
            </a>
            <a href={MAILTO} className="hero-connect">
              Let&apos;s connect <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.nav>

        {/* Mobile section navigation */}
        <div className="relative z-20 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 md:hidden sm:px-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setActiveSection(link.id)}
              className={`hero-mobile-nav ${activeSection === link.id ? 'is-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Side index */}
        <aside className="hero-side-index absolute left-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-5 xl:flex" aria-label="Page sections">
          {[
            { label: 'ABOUT', id: 'about' },
            { label: 'SKILLS', id: 'skills' },
            { label: 'PROJECTS', id: 'projects' },
            { label: 'JOURNEY', id: 'experience' },
          ].map((item, index) => (
            <button key={item.id} onClick={() => jumpTo(item.id)} className={`hero-side-link ${activeSection === item.id ? 'is-active' : ''}`}>
              <span className="hero-side-number">0{index + 1}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Main typographic statement */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-8 pt-10 text-center sm:px-8 sm:pt-12 lg:pt-8">
          <motion.div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DDBBC4]/70 bg-white/45 px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#8A4961] shadow-sm backdrop-blur-sm sm:text-[0.68rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.65 }}
          >
            <Sparkles size={13} /> AI &amp; Data Science · Creative Development
          </motion.div>

          <motion.div
            className="relative"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <h1 className="hero-name select-none" aria-label="Pewina Francy">
              <span className="hero-name-first">PEWINA</span>
              <span className="hero-name-last">FRANCY</span>
            </h1>
            <span className="hero-name-flower" aria-hidden="true">✳</span>
          </motion.div>

          <motion.p
            className="hero-tagline mt-5 max-w-2xl text-base leading-relaxed sm:mt-7 sm:text-lg md:text-xl"
            key={focus}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {FOCUS_COPY[focus]}
          </motion.p>

          <div className="mt-5 flex flex-wrap justify-center gap-2 sm:mt-6" aria-label="Choose a creative focus">
            {FOCUSES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFocus(item)}
                aria-pressed={focus === item}
                className={`hero-focus-chip ${focus === item ? 'is-selected' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>

          <motion.div
            className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-9"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <a href="#projects" className="hero-primary-cta" onClick={() => setActiveSection('projects')}>
              Explore my work <ArrowRight size={16} />
            </a>
            <a href="#about" className="hero-secondary-cta" onClick={() => setActiveSection('about')}>
              A little about me <ArrowDownRight size={15} />
            </a>
          </motion.div>
        </div>

        {/* Bottom signature and featured project card */}
        <div className="relative z-20 flex flex-col items-end justify-between gap-5 px-5 pb-5 sm:flex-row sm:items-end sm:px-8 sm:pb-7 lg:px-12 lg:pb-10">
          <motion.div
            className="hero-signature self-start sm:self-end"
            initial={reduceMotion ? false : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <span className="hero-signature-line" />
            <p>Thoughtful technology,</p>
            <p>with a human touch.</p>
            <span className="mt-3 block text-[0.58rem] font-medium uppercase tracking-[0.2em] text-[#9C7886]">Chennai, India · 2026</span>
          </motion.div>

          <motion.a
            href="#projects"
            onClick={() => setActiveSection('projects')}
            className="hero-feature-card group"
            initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            whileHover={reduceMotion ? undefined : { y: -7, rotate: -1.5, scale: 1.02 }}
          >
            <div className="hero-feature-image-wrap">
              <img src="/screenshots/silverhands-dashboard.webp" alt="SilverHands AI platform dashboard preview" />
              <span className="hero-feature-pill">Featured project</span>
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div>
                <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[#A77B8A]">01 / Social impact AI</span>
                <span className="mt-0.5 block font-serif text-lg font-semibold text-[#55283C]">SilverHands AI</span>
              </div>
              <span className="hero-feature-arrow"><ArrowUpRight size={17} /></span>
            </div>
          </motion.a>
        </div>

        <div className="pointer-events-none absolute bottom-9 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-[#A77B8A] lg:flex">
          <span className="hero-scroll-dot" /> Scroll to explore
        </div>
      </div>
    </header>
  );
}
