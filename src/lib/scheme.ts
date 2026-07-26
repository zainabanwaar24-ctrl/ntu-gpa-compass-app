import type { Course, Semester } from '@/lib/grades';
import { uid } from '@/lib/grades';

// NTU BS Artificial Intelligence (2023-27) official curriculum scheme.
export type SchemeCourse = { name: string; credits: number };
export type SchemeSemester = { name: string; courses: SchemeCourse[] };

export const NTU_BS_AI_SCHEME: SchemeSemester[] = [
  {
    name: 'Semester 1',
    courses: [
      { name: 'Physics for Computing', credits: 2 },
      { name: 'Physics for Computing LAB', credits: 1 },
      { name: 'Programming Fundamentals (PF)', credits: 3 },
      { name: 'Programming Fundamentals LAB', credits: 1 },
      { name: 'Functional English (FE)', credits: 3 },
      { name: 'Introduction to ICT', credits: 2 },
      { name: 'Introduction to ICT LAB', credits: 1 },
      { name: 'Discrete Structures', credits: 3 },
      { name: 'Translation of Al-Quran-I', credits: 0 },
    ],
  },
  {
    name: 'Semester 2',
    courses: [
      { name: 'Probability and Statistics', credits: 3 },
      { name: 'Fundamentals of Management', credits: 2 },
      { name: 'Database Systems', credits: 3 },
      { name: 'Database Systems LAB', credits: 1 },
      { name: 'Digital Logic Design (DLD)', credits: 2 },
      { name: 'Digital Logic Design LAB', credits: 1 },
      { name: 'Object Oriented Programming (OOP)', credits: 3 },
      { name: 'Object Oriented Programming LAB', credits: 1 },
      { name: 'Islamic Studies', credits: 2 },
      { name: 'Translation of Al-Quran-II', credits: 0 },
    ],
  },
  {
    name: 'Semester 3',
    courses: [
      { name: 'Calculus and Analytic Geometry (CAG)', credits: 3 },
      { name: 'Data Structures (DS)', credits: 3 },
      { name: 'Data Structures LAB', credits: 1 },
      { name: 'Data Communication and Networks', credits: 2 },
      { name: 'Data Communication and Networks LAB', credits: 1 },
      { name: 'Introduction to Artificial Intelligence', credits: 2 },
      { name: 'Introduction to Artificial Intelligence LAB', credits: 1 },
      { name: 'Software Engineering Fundamentals', credits: 3 },
      { name: 'Translation of Al-Quran-III', credits: 0 },
    ],
  },
  {
    name: 'Semester 4',
    courses: [
      { name: 'Linear Algebra', credits: 3 },
      { name: 'Programming for Artificial Intelligence', credits: 2 },
      { name: 'Programming for Artificial Intelligence LAB', credits: 1 },
      { name: 'Information Security', credits: 2 },
      { name: 'Information Security LAB', credits: 1 },
      { name: 'Computer Organization & Assembly Language (COAL)', credits: 2 },
      { name: 'Computer Organization & Assembly Language LAB', credits: 1 },
      { name: 'Knowledge Representation and Reasoning', credits: 2 },
      { name: 'Knowledge Representation and Reasoning LAB', credits: 1 },
      { name: 'Expository Writing (EW)', credits: 3 },
      { name: 'Translation of Al-Quran-IV', credits: 0 },
    ],
  },
  {
    name: 'Semester 5',
    courses: [
      { name: 'Multivariable Calculus', credits: 3 },
      { name: 'Machine Learning', credits: 2 },
      { name: 'Machine Learning LAB', credits: 1 },
      { name: 'Operating Systems (OS)', credits: 2 },
      { name: 'Operating Systems LAB', credits: 1 },
      { name: 'Design and Analysis of Algorithms', credits: 3 },
      { name: 'AI Elective I', credits: 3 },
      { name: 'AI Elective II', credits: 3 },
      { name: 'Translation of Al-Quran-V', credits: 0 },
    ],
  },
  {
    name: 'Semester 6',
    courses: [
      { name: 'Artificial Neural Networks and Deep Learning', credits: 2 },
      { name: 'Artificial Neural Networks and Deep Learning LAB', credits: 1 },
      { name: 'Parallel and Distributed Computing', credits: 2 },
      { name: 'Parallel and Distributed Computing LAB', credits: 1 },
      { name: 'AI Elective III', credits: 3 },
      { name: 'AI Elective IV', credits: 3 },
      { name: 'Financial Accounting', credits: 3 },
      { name: 'Introduction to Textiles', credits: 2 },
      { name: 'Translation of Al-Quran-VI', credits: 0 },
    ],
  },
  {
    name: 'Semester 7',
    courses: [
      { name: 'BS Final Project-I (FYP-1)', credits: 2 },
      { name: 'Computer Vision', credits: 2 },
      { name: 'Computer Vision LAB', credits: 1 },
      { name: 'AI Elective V', credits: 3 },
      { name: 'AI Elective VI', credits: 3 },
      { name: 'Technical and Business Writing', credits: 3 },
      { name: 'Entrepreneurship', credits: 2 },
      { name: 'Ideology and Constitution of Pakistan', credits: 2 },
      { name: 'Translation of Al-Quran-VII', credits: 0 },
    ],
  },
  {
    name: 'Semester 8',
    courses: [
      { name: 'BS Final Project-II', credits: 4 },
      { name: 'AI Elective VII', credits: 3 },
      { name: 'Civics & Community Engagement', credits: 2 },
      { name: 'Professional Practices', credits: 2 },
      { name: 'Translation of Al-Quran-VIII', credits: 0 },
    ],
  },
];

export const schemeToSemester = (scheme: SchemeSemester): Semester => ({
  id: uid(),
  name: scheme.name,
  courses: scheme.courses.map<Course>((c) => ({
    id: uid(),
    name: c.name,
    credits: c.credits,
    inputMode: 'letter',
    letter: 'A',
    marks: 90,
  })),
});

export const schemeTotalCredits = NTU_BS_AI_SCHEME.reduce(
  (sum, sem) => sum + sem.courses.reduce((s, c) => s + c.credits, 0),
  0
);
