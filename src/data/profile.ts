// Single source of truth for personal details and links.
// Only real, user-provided values live here.

export const PROFILE = {
  name: 'Pewina Francy P. E.',
  email: 'pewinafrancy@gmail.com',
  github: 'https://github.com/pewina',
  linkedin: 'https://linkedin.com/in/pewina-francy-p-e',
  location: 'Chennai, Tamil Nadu, India',
  college: 'Jerusalem College of Engineering, Chennai',
  degree: 'B.Tech in Artificial Intelligence and Data Science',
  years: '2023–2027 (expected)',
  cgpa: '8.97',
} as const;

export const MAILTO = `mailto:${PROFILE.email}`;
