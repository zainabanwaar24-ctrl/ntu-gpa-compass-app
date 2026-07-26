// Official NTU (National Textile University) grading scale.
export type GradeInfo = {
  letter: string;
  points: number;
  minPercent: number; // inclusive lower bound
  maxPercent: number; // exclusive upper bound (100 for top)
  emoji: string;
  remarks: string;
  excluded: boolean; // true for I / W (excluded from GPA)
};

export const NTU_GRADES: GradeInfo[] = [
  { letter: 'A+', points: 4.0, minPercent: 90, maxPercent: 100.01, emoji: '🏆', remarks: 'Exceptional', excluded: false },
  { letter: 'A',  points: 4.0, minPercent: 85, maxPercent: 90,    emoji: '⭐', remarks: 'Outstanding', excluded: false },
  { letter: 'A-',  points: 3.66, minPercent: 80, maxPercent: 85,    emoji: '🌟', remarks: 'Excellent', excluded: false },
  { letter: 'B+',  points: 3.33, minPercent: 75, maxPercent: 80,    emoji: '👍', remarks: 'Very Good', excluded: false },
  { letter: 'B',   points: 3.0, minPercent: 71, maxPercent: 75,    emoji: '✅', remarks: 'Good', excluded: false },
  { letter: 'B-',  points: 2.66, minPercent: 68, maxPercent: 71,    emoji: '👌', remarks: 'Good Above', excluded: false },
  { letter: 'C+',  points: 2.33, minPercent: 64, maxPercent: 68,    emoji: '⚖️', remarks: 'Average', excluded: false },
  { letter: 'C',   points: 2.0, minPercent: 61, maxPercent: 64,    emoji: '🙂', remarks: 'Satisfactory', excluded: false },
  { letter: 'C-',  points: 1.66, minPercent: 58, maxPercent: 61,    emoji: '📈', remarks: 'Pass', excluded: false },
  { letter: 'D+',  points: 1.33, minPercent: 54, maxPercent: 58,    emoji: '⚠️', remarks: 'Low Pass', excluded: false },
  { letter: 'D',   points: 1.0, minPercent: 50, maxPercent: 54,    emoji: '🛑', remarks: 'Marginal Pass', excluded: false },
  { letter: 'F',   points: 0.0, minPercent: 0, maxPercent: 50,    emoji: '❌', remarks: 'Fail', excluded: false },
  { letter: 'I',   points: 0.0, minPercent: 0, maxPercent: 0,    emoji: '⏳', remarks: 'Incomplete', excluded: true },
  { letter: 'W',   points: 0.0, minPercent: 0, maxPercent: 0,    emoji: '🚫', remarks: 'Withdrawn', excluded: true },
];

export const LETTER_GRADES = NTU_GRADES.map((g) => g.letter);

export const gradeByLetter = (letter: string): GradeInfo =>
  NTU_GRADES.find((g) => g.letter === letter) ?? NTU_GRADES[NTU_GRADES.length - 1];

// Map a marks percentage (0-100) to the corresponding NTU grade.
export const gradeByMarks = (marks: number): GradeInfo => {
  const m = Math.max(0, Math.min(100, marks));
  for (const g of NTU_GRADES) {
    if (!g.excluded && m >= g.minPercent && m < g.maxPercent) return g;
  }
  // 100 falls into A+
  return NTU_GRADES[0];
};

export type Course = {
  id: string;
  name: string;
  credits: number;
  inputMode: 'letter' | 'marks';
  letter: string;
  marks: number;
};

export type Semester = {
  id: string;
  name: string;
  courses: Course[];
};

export const courseLetter = (c: Course): string =>
  c.inputMode === 'letter' ? c.letter : gradeByMarks(c.marks).letter;

export const courseGradeInfo = (c: Course): GradeInfo =>
  c.inputMode === 'letter' ? gradeByLetter(c.letter) : gradeByMarks(c.marks);

// A course counts toward GPA only if credits > 0 and grade is not excluded (I/W).
export const courseCounts = (c: Course): boolean => {
  const info = courseGradeInfo(c);
  return c.credits > 0 && !info.excluded;
};

export const semesterGpa = (semester: Semester): number => {
  let qp = 0;
  let cr = 0;
  for (const c of semester.courses) {
    if (!courseCounts(c)) continue;
    qp += c.credits * courseGradeInfo(c).points;
    cr += c.credits;
  }
  return cr === 0 ? 0 : qp / cr;
};

export const semesterCredits = (semester: Semester): number =>
  semester.courses.reduce((s, c) => (courseCounts(c) ? s + c.credits : s), 0);

export type Totals = {
  cgpa: number;
  earnedPoints: number;
  totalCredits: number;
};

export const overallTotals = (semesters: Semester[]): Totals => {
  let earnedPoints = 0;
  let totalCredits = 0;
  for (const sem of semesters) {
    for (const c of sem.courses) {
      if (!courseCounts(c)) continue;
      earnedPoints += c.credits * courseGradeInfo(c).points;
      totalCredits += c.credits;
    }
  }
  return {
    cgpa: totalCredits === 0 ? 0 : earnedPoints / totalCredits,
    earnedPoints,
    totalCredits,
  };
};

// Required GPA in remaining credits to hit a target CGPA at graduation.
export const requiredGpa = (
  targetCgpa: number,
  totalCreditsAtGraduation: number,
  earnedPoints: number,
  remainingCredits: number
): number | null => {
  if (remainingCredits <= 0) return null;
  if (totalCreditsAtGraduation <= 0) return null;
  const needed = targetCgpa * totalCreditsAtGraduation - earnedPoints;
  return needed / remainingCredits;
};

export type Feasibility = {
  label: string;
  emoji: string;
  color: string;
};

export const feasibilityOf = (required: number): Feasibility => {
  if (required <= 3.5) return { label: 'Achievable Target', emoji: '🎉', color: '#34d399' };
  if (required <= 4.0) return { label: 'Challenging Target', emoji: '🔥', color: '#fbbf24' };
  return { label: 'Mathematically Impossible', emoji: '🚨', color: '#f87171' };
};

export const uid = (): string =>
  Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

export const gpaColor = (gpa: number): string => {
  if (gpa >= 3.5) return '#34d399';
  if (gpa >= 2.5) return '#38bdf8';
  if (gpa >= 1.5) return '#fbbf24';
  return '#f87171';
};
