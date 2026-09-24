const RESUME_URL =
  "https://raw.githubusercontent.com/codegeek/resume/main/resume.json";

export interface ResumeProfile {
  network: string;
  username: string;
  url: string;
}

export interface ResumeBasics {
  name: string;
  label: string;
  image?: string;
  email: string;
  phone?: string;
  summary: string;
  location: {
    city: string;
    countryCode: string;
    region: string;
  };
  profiles: ResumeProfile[];
}

export interface ResumeWork {
  name: string;
  position: string;
  startDate: string;
  endDate?: string;
  location?: string;
  url?: string;
  summary?: string;
  highlights?: string[];
}

export interface ResumeEducation {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate?: string;
  courses?: string[];
}

export interface ResumeSkill {
  name: string;
  level: string;
  keywords: string[];
}

export interface ResumeLanguage {
  language: string;
  fluency: string;
}

export interface ResumeInterest {
  name: string;
  keywords: string[];
}

export interface Resume {
  basics: ResumeBasics;
  work: ResumeWork[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  languages: ResumeLanguage[];
  interests: ResumeInterest[];
}

const REQUIRED_KEYS: (keyof Resume)[] = [
  "basics",
  "work",
  "education",
  "skills",
  "languages",
  "interests",
];

function assertIsResume(data: unknown): asserts data is Resume {
  if (typeof data !== "object" || data === null) {
    throw new Error("resume.json did not parse to an object");
  }
  const missing = REQUIRED_KEYS.filter((key) => !(key in data));
  if (missing.length > 0) {
    throw new Error(
      `resume.json is missing expected key(s): ${missing.join(", ")}`,
    );
  }
}

export async function fetchResume(): Promise<Resume> {
  const response = await fetch(RESUME_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch resume.json from ${RESUME_URL}: ${response.status} ${response.statusText}`,
    );
  }

  const data: unknown = await response.json();
  assertIsResume(data);
  return data;
}
