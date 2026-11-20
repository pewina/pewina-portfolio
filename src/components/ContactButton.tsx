import { ArrowUpRight } from 'lucide-react';
import { MAILTO } from '../data/profile';

interface ContactButtonProps {
  label?: string;
}

export default function ContactButton({ label = 'Contact Me' }: ContactButtonProps) {
  return (
    <a
      href={MAILTO}
      className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_26px_rgba(138,41,68,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(138,41,68,0.24)] sm:px-10 sm:py-4 sm:text-sm"
      style={{ background: 'linear-gradient(120deg, #81263F 0%, #A83E5A 65%, #C47788 100%)' }}
    >
      {label}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
