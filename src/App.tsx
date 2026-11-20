import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactFooter from './sections/ContactFooter';

export default function App() {
  return (
    <div style={{ background: '#FBF8F5', overflowX: 'clip' }}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <HeroSection />
      <main id="main">
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
      </main>
      <ContactFooter />
    </div>
  );
}
