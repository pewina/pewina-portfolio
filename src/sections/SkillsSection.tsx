import FadeIn from '../components/FadeIn';

const SKILLS = [
  {
    number: '01',
    name: 'AI & Machine Learning',
    description:
      'Machine learning fundamentals, Scikit-learn, model evaluation, imbalanced-data handling, and neural-network concepts.',
  },
  {
    number: '02',
    name: 'Data Analytics & Visualization',
    description:
      'Pandas, NumPy, exploratory data analysis, data preprocessing, Power BI, and communicating insights through visualizations.',
  },
  {
    number: '03',
    name: 'Web Development',
    description:
      'HTML5, CSS, JavaScript, React.js, and Flask-based web applications and API integration.',
  },
  {
    number: '04',
    name: 'Automation & Security',
    description:
      'Python scripting, automated network monitoring demonstrations, anomaly detection, and simulated security audit workflows.',
  },
  {
    number: '05',
    name: 'UI/UX & Visual Design',
    description:
      'Interface design, layout and typography, digital illustrations, logo design, Canva, Adobe Illustrator, Ibis Paint, Adobe Lightroom, and Sketch.',
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#FFFDFC' }}
    >
      <FadeIn y={40}>
        <h2
          id="skills-heading"
          className="font-black uppercase text-center leading-none mb-6 sm:mb-8 max-w-5xl mx-auto"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 130px)', color: '#55283C', textWrap: 'balance' }}
        >
          What I Work With
        </h2>
      </FadeIn>
      <FadeIn delay={0.1} y={20}>
        <p
          className="text-center font-light mb-16 sm:mb-20 md:mb-28 mx-auto max-w-2xl"
          style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', color: '#55283C', opacity: 0.6 }}
        >
          Areas of knowledge built through coursework, projects, and hands-on practice.
        </p>
      </FadeIn>

      <ol className="max-w-5xl mx-auto list-none">
        {SKILLS.map((skill, i) => (
          <FadeIn as="li" key={skill.number} delay={i * 0.1}>
            <div
              className="flex items-start gap-4 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: '1px solid rgba(12, 12, 12, 0.15)',
                ...(i === SKILLS.length - 1
                  ? { borderBottom: '1px solid rgba(12, 12, 12, 0.15)' }
                  : {}),
              }}
            >
              <span
                className="font-black leading-none shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)', color: '#55283C' }}
                aria-hidden="true"
              >
                {skill.number}
              </span>

              <div className="flex flex-col gap-2 sm:gap-3 pt-1 sm:pt-2" style={{ color: '#55283C' }}>
                <h3
                  className="font-medium uppercase"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {skill.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
                >
                  {skill.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}
