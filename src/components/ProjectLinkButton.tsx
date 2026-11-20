import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

interface ProjectLinkButtonProps {
  href: string;
  kind: 'github' | 'demo';
  projectName: string;
}

export default function ProjectLinkButton({ href, kind, projectName }: ProjectLinkButtonProps) {
  const isGithub = kind === 'github';
  const Icon = isGithub ? Github : ExternalLink;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${isGithub ? 'GitHub repository' : 'Live demo'} for ${projectName} (opens in a new tab)`}
      className="inline-flex items-center gap-2 rounded-full border border-[#B24863]/45 bg-white/55 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-[#8A2944] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8A2944] hover:bg-[#F4E6E9]"
    >
      <Icon size={14} aria-hidden="true" />
      {isGithub ? 'Source' : 'Live demo'}
      <ArrowUpRight size={13} aria-hidden="true" />
    </a>
  );
}
