import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import { MAILTO, PROFILE } from '../data/profile';

const LINKS = [
  { label: 'Email', text: PROFILE.email, href: MAILTO, Icon: Mail, external: false },
  { label: 'GitHub', text: 'github.com/pewina', href: PROFILE.github, Icon: Github, external: true },
  {
    label: 'LinkedIn',
    text: 'linkedin.com/in/pewina-francy-p-e',
    href: PROFILE.linkedin,
    Icon: Linkedin,
    external: true,
  },
];

export default function ContactFooter() {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 pb-8 border-t border-[#55283C]/15"
      style={{ background: '#FBF8F5' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 sm:gap-14 text-center">
        <FadeIn y={40}>
          <h2
            id="contact-heading"
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.25rem, 8vw, 120px)', textWrap: 'balance' }}
          >
            Let&apos;s build something meaningful.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <ContactButton />
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <ul className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-x-10 sm:gap-y-4">
            {LINKS.map(({ label, text, href, Icon, external }) => (
              <li key={label} className="list-none">
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={external ? `${label}: ${text} (opens in a new tab)` : `${label}: ${text}`}
                  className="inline-flex items-center gap-2 text-[#55283C] font-light tracking-wide transition-opacity duration-200 hover:opacity-70"
                  style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)' }}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#55283C]/10 text-[#55283C]/50 font-light text-xs sm:text-sm uppercase tracking-widest">
          <span className="inline-flex items-center gap-2">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            {PROFILE.location}
          </span>
          <span>© 2026 {PROFILE.name}</span>
        </div>
      </div>
    </footer>
  );
}
