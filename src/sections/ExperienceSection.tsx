import { Award, Briefcase, GraduationCap } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { PROFILE } from '../data/profile';
import { CERTIFICATIONS, CERTIFICATION_PROVIDERS } from '../data/certifications';

const ACHIEVEMENTS = [
  'Cultural Secretary, College Student Council',
  'Shortlisted in the Top 100 at the Don Bosco Youth Film Festival',
  'State representative for Tamil Nadu at national-level school conferences',
  'First Prize, Mathophilia Intercollegiate Mathematics Contest',
];

const cardClass =
  'rounded-[32px] sm:rounded-[40px] border border-[#55283C]/25 p-6 sm:p-8 flex flex-col gap-3';
const labelClass =
  'flex items-center gap-2 font-light uppercase tracking-widest text-[#55283C]/60 text-xs sm:text-sm';
const titleClass = 'font-medium uppercase text-[#55283C]';
const bodyClass = 'font-light leading-relaxed text-[#55283C]/80';

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative px-5 sm:px-8 md:px-10 pb-20 sm:pb-24 md:pb-32"
      style={{ background: '#FBF8F5' }}
    >
      <FadeIn y={40}>
        <h2
          id="experience-heading"
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-14 sm:mb-20 max-w-5xl mx-auto"
          style={{ fontSize: 'clamp(2.25rem, 8vw, 120px)', textWrap: 'balance' }}
        >
          Experience &amp; Achievements
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto grid gap-4 sm:gap-6 md:grid-cols-2">
        <FadeIn delay={0}>
          <article className={`${cardClass} h-full`}>
            <p className={labelClass}>
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              Education
            </p>
            <h3
              className={titleClass}
              style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.6rem)' }}
            >
              {PROFILE.degree}
            </h3>
            <p className={bodyClass} style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)' }}>
              {PROFILE.college}
              <br />
              {PROFILE.years} · CGPA {PROFILE.cgpa}
            </p>
          </article>
        </FadeIn>

        <FadeIn delay={0.1}>
          <article className={`${cardClass} h-full`}>
            <p className={labelClass}>
              <Briefcase className="w-4 h-4" aria-hidden="true" />
              Experience · June 2025 – July 2025
            </p>
            <h3
              className={titleClass}
              style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.6rem)' }}
            >
              Data Science Intern — Taijjas, Chennai
            </h3>
            <p className={bodyClass} style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)' }}>
              Worked with real-world datasets through data collection, cleaning, preprocessing, and
              analysis, addressing missing values and inconsistencies to improve data quality.
            </p>
          </article>
        </FadeIn>

        <FadeIn delay={0.15}>
          <article className={`${cardClass} h-full`}>
            <p className={labelClass}>
              <Award className="w-4 h-4" aria-hidden="true" />
              Selected achievements
            </p>
            <ul className="flex flex-col gap-3 mt-1">
              {ACHIEVEMENTS.map((item) => (
                <li
                  key={item}
                  className={`${bodyClass} flex gap-3`}
                  style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)' }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8A2944]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </FadeIn>

        <FadeIn delay={0.2}>
          <article className={`${cardClass} h-full`}>
            <p className={labelClass}>
              <Award className="w-4 h-4" aria-hidden="true" />
              Certifications
            </p>
            {CERTIFICATIONS.length > 0 ? (
              <ul className="flex flex-col gap-3 mt-1">
                {CERTIFICATIONS.map((c) => (
                  <li
                    key={`${c.issuer}-${c.title}`}
                    className={bodyClass}
                    style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)' }}
                  >
                    <span className="text-[#55283C]">{c.title}</span>
                    <span className="block text-[#55283C]/60 text-sm">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className={bodyClass} style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)' }}>
                  Courses and virtual experience programs completed through:
                </p>
                <ul className="flex flex-wrap gap-2">
                  {CERTIFICATION_PROVIDERS.map((p) => (
                    <li
                      key={p}
                      className="list-none rounded-full border border-[#55283C]/30 px-3 py-1 text-[0.7rem] sm:text-xs font-medium uppercase tracking-wider text-[#55283C]"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>
        </FadeIn>
      </div>
    </section>
  );
}
