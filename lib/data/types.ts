// Core data types for S-Talent Console

export type Organization = {
  id: string;
  name: string;
  logo?: string;
  type: 'merchant' | 'enterprise' | 'startup';
};

export type UserRole = 'admin' | 'recruiter' | 'hiring-manager';

export type RoleType = 'internship' | 'volunteer' | 'graduate';

export type RoleStatus = 'open' | 'closed' | 'paused';

export type ApplicationStage = 
  | 'new' 
  | 'reviewed' 
  | 'shortlisted' 
  | 'interview' 
  | 'offer' 
  | 'hired' 
  | 'rejected';

export type Role = {
  id: string;
  organizationId: string;
  title: string;
  type: RoleType;
  location: string;
  deadline: string;
  status: RoleStatus;
  requirements: string[];
  languages?: string[]; // languages the role requires, if any
  description: string;
  challengeTemplateId?: string;
  createdAt: string;
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  university: string;
  major: string;
  graduationDate: string;
  gpa: number;
  languages: string[];
  skills: string[];
  availability: 'immediate' | 'flexible' | 'limited';
  availabilityDates?: string[];
  workPermit: boolean;
  snoonuPlus: boolean;
  portfolio?: {
    projects: { title: string; url?: string; description: string }[];
    certificates: { title: string; issuer: string; date: string }[];
  };
  createdAt: string;
};

// One line of the explainable fit score: every point has a reason
export type ScoreLine = {
  label: string;
  points: number;
};

export type Application = {
  id: string;
  roleId: string;
  candidateId: string;
  stage: ApplicationStage;
  appliedAt: string;
  fitScore: number; // 0-100, always equals the sum of scoreBreakdown
  scoreBreakdown: ScoreLine[];
  fitReasons: string[];
  recommendation: 'accept' | 'reject' | 'hold';
  notes: { text: string; author: string; createdAt: string }[];
  skillProofSubmission?: {
    challengeId: string;
    submittedAt: string;
    content: string;
    score?: number;
    evaluation?: string;
  };
};

export type Interview = {
  id: string;
  applicationId: string;
  scheduledAt: string;
  duration: number; // minutes
  interviewer: string;
  interviewerEmail: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
};

export type ChallengeTemplate = {
  id: string;
  name: string;
  type: 'case-prompt' | 'coding-task' | 'sales-pitch' | 'ops-scenario';
  description: string;
  timer: number; // minutes
  submissionType: 'text' | 'file' | 'link';
  rubric: { criterion: string; weight: number }[];
};

export type Activity = {
  id: string;
  applicationId: string;
  type: 'applied' | 'opened' | 'messaged' | 'challenge-sent' | 'scheduled' | 'stage-changed';
  timestamp: string;
  details: string;
};
