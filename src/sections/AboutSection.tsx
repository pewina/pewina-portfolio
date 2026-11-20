import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import { CubeDecor, DataDecor, HexDecor, NeuralDecor } from '../components/visuals/Decor';

const ABOUT_TEXT =
  "I'm a final-year Artificial Intelligence and Data Science student at Jerusalem College of Engineering, Chennai. I enjoy building applications that combine intelligent systems, practical problem-solving, and thoughtful design. From experimenting with machine learning models to developing web applications and exploring UI/UX, I like turning ideas into useful, engaging digital experiences.";

const DECORATIONS = [
  { Icon: NeuralDecor, size: 'w-[100px] sm:w-[140px] md:w-[190px]', position: 'top-[5%] left-[1%] sm:left-[3%] md:left-[5%]', delay: 0.1, x: -60 },
  { Icon: HexDecor, size: 'w-[90px] sm:w-[120px] md:w-[160px]', position: 'bottom-[8%] left-[2%] sm:left-[5%] md:left-[8%]', delay: 0.25, x: -60 },
  { Icon: CubeDecor, size: 'w-[100px] sm:w-[140px] md:w-[180px]', position: 'top-[5%] right-[1%] sm:right-[3%] md:right-[5%]', delay: 0.15, x: 60 },
  { Icon: DataDecor, size: 'w-[110px] sm:w-[150px] md:w-[190px]', position: 'bottom-[7%] right-[2%] sm:right-[5%] md:right-[8%]', delay: 0.3, x: 60 },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-24 sm:py-28"
      style={{ background: '#FBF8F5' }}
    >
      {DECORATIONS.map(({ Icon, size, position, delay, x }, i) => (
        <FadeIn
          key={i}
          delay={delay}
          x={x}
          y={0}
          duration={0.9}
          className={`absolute ${position} ${size} pointer-events-none opacity-70`}
        >
          <Icon className="w-full h-auto float-slow" />
        </FadeIn>
      ))}

      <div className="relative z-10 w-full max-w-6xl">
        <FadeIn delay={0} y={30}>
          <div className="mb-10 sm:mb-14">
            <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-[#B24863]">
              A little introduction
            </p>
            <h2
              id="about-heading"
              className="hero-heading font-black uppercase leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(3.4rem, 10vw, 8.5rem)' }}
            >
              About me<span className="text-[#D89AA9]">.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-[0.88fr_1.12fr] items-center gap-10 md:gap-16 lg:gap-24">
          <FadeIn delay={0.12} x={-35} className="relative mx-auto w-full max-w-[390px]">
            <div className="absolute -inset-3 sm:-inset-4 rounded-[190px_190px_28px_28px] border border-[#D89AA9]/60 rotate-[-4deg]" />
            <div className="relative overflow-hidden rounded-[180px_180px_24px_24px] border-[7px] border-[#FFFDFC] bg-[#F4E6E9] shadow-[0_24px_65px_rgba(116,55,76,0.16)]">
              <img
                src="/images/pewina-about.png"
                alt="Pewina sitting at her workspace"
                className="block w-full aspect-[0.92/1] object-cover object-[center_38%]"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-5 -right-2 sm:-right-7 rounded-full border border-[#E9D8C9] bg-[#FFFDFC] px-5 py-3 shadow-lg">
              <span className="font-serif text-sm italic text-[#8A2944]">Curious by nature ✳</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.22} x={35} className="flex flex-col items-start">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D89AA9]/50 bg-white/60 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#8A2944]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B24863]" />
              AI &amp; Data Science Student
            </span>
            <p className="max-w-[620px] text-left text-[#55283C] font-medium leading-[1.9]" style={{ fontSize: 'clamp(1rem, 1.55vw, 1.2rem)' }}>
              {ABOUT_TEXT}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['AI & Machine Learning', 'Web Development', 'UI/UX Exploration'].map((item) => (
                <span key={item} className="rounded-full border border-[#E9D8C9] bg-[#FFFDFC]/80 px-4 py-2 text-xs font-medium text-[#87566A]">
                  {item}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="mt-16 flex justify-center md:justify-start md:pl-[calc(44%+2rem)]">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
