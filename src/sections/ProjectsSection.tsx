import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import ProjectLinkButton from '../components/ProjectLinkButton';
import Panel from '../components/visuals/Panel';
import { PROJECTS } from '../data/projects';
import type { Project } from '../data/projects';

const IMAGE_RADIUS = 'rounded-[16px] sm:rounded-[20px]';

function Slot({ project, index }: { project: Project; index: 0 | 1 | 2 }) {
  const shot = project.screenshots?.[index];
  if (shot) {
    return (
      <img
        src={shot}
        alt={`${project.name} screenshot ${index + 1}`}
        loading="lazy"
        decoding="async"
        className="block w-full h-full object-contain sm:object-cover bg-[#F2E8EB]"
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`Diagram illustrating how ${project.name} works`}
      className="w-full h-full"
    >
      <Panel spec={project.visuals[index]} />
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function ProjectCard({ project, index, total, progress }: ProjectCardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.008;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <li className="list-none mb-5 md:mb-6 md:sticky md:top-24">
      <motion.article
        aria-labelledby={`project-${project.number}`}
        className="relative rounded-[22px] sm:rounded-[26px] border border-[#E9D7DC] shadow-[0_14px_38px_rgba(138,41,68,0.07)] p-4 sm:p-5 md:p-6"
        style={{
          background: '#FFFDFC',
          scale,
          top: `${index * 28}px`,
          transformOrigin: 'top center',
        }}
      >
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4 px-1 sm:px-2">
          <div className="flex items-center gap-3 sm:gap-5">
            <span
              className="font-black leading-none shrink-0"
              style={{ fontSize: 'clamp(2.25rem, 4.2vw, 4.5rem)', color: '#8A2944' }}
              aria-hidden="true"
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1">
              <span
                className="font-light uppercase tracking-widest"
                style={{ fontSize: 'clamp(0.58rem, 0.72vw, 0.72rem)', color: '#8A707A', opacity: 1 }}
              >
                {project.category}
              </span>
              <h3
                id={`project-${project.number}`}
                className="font-serif font-semibold"
                style={{ fontSize: 'clamp(1.05rem, 1.45vw, 1.55rem)', color: '#55283C' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          {(project.github || project.demo) && (
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <ProjectLinkButton href={project.github} kind="github" projectName={project.name} />
              )}
              {project.demo && (
                <ProjectLinkButton href={project.demo} kind="demo" projectName={project.name} />
              )}
            </div>
          )}
          {!project.github && !project.demo && project.note && (
            <p className="rounded-full border border-dashed border-[#D89AA9] px-3 py-1.5 text-[0.6rem] sm:text-xs font-light uppercase tracking-widest text-[#8A707A]">
              {project.note}
            </p>
          )}
        </div>

        {/* Description + tech */}
        <div className="px-1 sm:px-2 mb-3 sm:mb-4 flex flex-col gap-2.5">
          <p
            className="font-light leading-relaxed max-w-4xl"
            style={{ fontSize: 'clamp(0.78rem, 0.92vw, 0.92rem)', color: '#55283C', opacity: 0.82 }}
          >
            {project.description}
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Technologies and concepts used">
            {project.tech.map((t) => (
              <li
                key={t}
                className="list-none rounded-full border border-[#D89AA9]/60 bg-[#F8E9ED] px-2.5 py-1 text-[0.58rem] sm:text-[0.65rem] font-medium uppercase tracking-wider text-[#8A2944]"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Project visual */}
        {project.thumbnail ? (
          <div className={`relative overflow-hidden aspect-[16/5.5] sm:aspect-[16/5] ${IMAGE_RADIUS} bg-[#F4E9EC]`}>
            <img
              src={project.thumbnail}
              alt={`${project.name} project visual`}
              loading="lazy"
              decoding="async"
              className="block w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-[40fr_60fr]">
            <div className="flex flex-col gap-2.5">
              <div className={`overflow-hidden aspect-[420/180] sm:aspect-auto sm:h-[clamp(82px,7.2vw,112px)] ${IMAGE_RADIUS}`}>
                <Slot project={project} index={0} />
              </div>
              <div className={`overflow-hidden aspect-[420/180] sm:aspect-auto sm:h-[clamp(92px,8.5vw,132px)] ${IMAGE_RADIUS}`}>
                <Slot project={project} index={1} />
              </div>
            </div>
            <div className={`relative overflow-hidden aspect-[420/270] sm:aspect-auto ${IMAGE_RADIUS}`}>
              <div className="absolute inset-0">
                <Slot project={project} index={2} />
              </div>
            </div>
          </div>
        )}

        <p className="mt-2 px-1 sm:px-2 text-[0.55rem] sm:text-[0.62rem] font-light uppercase tracking-widest text-[#8A707A]">
          {project.caption}
        </p>
      </motion.article>
    </li>
  );
}

export default function ProjectsSection() {
  const cardsRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative z-10 -mt-8 sm:-mt-10 rounded-t-[30px] sm:rounded-t-[40px] px-4 sm:px-6 md:px-8 pt-14 sm:pt-16 md:pt-20 pb-14"
      style={{ background: '#FBF8F5' }}
    >
      <FadeIn y={40}>
        <h2
          id="projects-heading"
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-10 sm:mb-12 md:mb-14"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)' }}
        >
          Project
        </h2>
        <p className="mx-auto -mt-6 sm:-mt-8 mb-9 sm:mb-10 max-w-2xl text-center text-xs sm:text-sm md:text-base text-[#8A707A]">
          Thoughtful applications at the intersection of AI, accessibility, and human impact.
        </p>
      </FadeIn>

      <ol ref={cardsRef} className="max-w-[1440px] mx-auto list-none">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </ol>
    </section>
  );
}
