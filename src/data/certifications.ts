// Certification providers (from the resume).
export const CERTIFICATION_PROVIDERS = [
  'NPTEL',
  'IIT Kharagpur',
  'IIT Madras',
  'TATA Forage',
  'Accenture Forage',
  'IBM SkillsBuild',
] as const;

// Add exact certification titles from the resume here, e.g.
//   { title: '<exact title>', issuer: 'NPTEL — IIT Madras' }
// When this list has entries, they are shown on the page in place of the provider pills.
export interface Certification {
  title: string;
  issuer: string;
}

export const CERTIFICATIONS: Certification[] = [];
