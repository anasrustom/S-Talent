import type { 
  Organization, 
  Role, 
  Candidate, 
  Application, 
  Interview, 
  ChallengeTemplate,
  ScoreLine
} from './types';

// Organizations
export const organizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Qatar Foundation',
    type: 'enterprise',
  },
  {
    id: 'org-2',
    name: 'Doha Events Co.',
    type: 'merchant',
  },
  {
    id: 'org-3',
    name: 'Startup XYZ',
    type: 'startup',
  },
];

// Challenge Templates
export const challengeTemplates: ChallengeTemplate[] = [
  {
    id: 'tpl-1',
    name: 'Case Study: Event Operations',
    type: 'case-prompt',
    description: 'Analyze a complex event logistics scenario and propose solutions',
    timer: 60,
    submissionType: 'text',
    rubric: [
      { criterion: 'Problem Analysis', weight: 30 },
      { criterion: 'Solution Quality', weight: 40 },
      { criterion: 'Feasibility', weight: 30 },
    ],
  },
  {
    id: 'tpl-2',
    name: 'Coding Challenge: API Integration',
    type: 'coding-task',
    description: 'Build a REST API integration with error handling',
    timer: 90,
    submissionType: 'link',
    rubric: [
      { criterion: 'Code Quality', weight: 35 },
      { criterion: 'Functionality', weight: 40 },
      { criterion: 'Error Handling', weight: 25 },
    ],
  },
  {
    id: 'tpl-3',
    name: 'Sales Pitch: Partnership Proposal',
    type: 'sales-pitch',
    description: 'Create a pitch for a potential business partnership',
    timer: 45,
    submissionType: 'file',
    rubric: [
      { criterion: 'Persuasiveness', weight: 40 },
      { criterion: 'Clarity', weight: 30 },
      { criterion: 'Value Proposition', weight: 30 },
    ],
  },
];

// Roles
export const roles: Role[] = [
  {
    id: 'role-1',
    organizationId: 'org-1',
    title: 'Summer Research Intern - AI Lab',
    type: 'internship',
    location: 'Doha, Qatar',
    deadline: '2026-03-15',
    status: 'open',
    requirements: ['Python', 'Machine Learning', 'Research Experience'],
    description: 'Work on cutting-edge AI research projects at Qatar Foundation Research Institute',
    applicantsCount: 47,
    qualityScore: 78,
    challengeTemplateId: 'tpl-2',
    createdAt: '2026-01-01T10:00:00Z',
  },
  {
    id: 'role-2',
    organizationId: 'org-1',
    title: 'Event Volunteer - Sustainability Summit',
    type: 'volunteer',
    location: 'Education City, Doha',
    deadline: '2026-02-28',
    status: 'open',
    requirements: ['Event Management', 'Sustainability Interest', 'Volunteer Coordination'],
    languages: ['Arabic', 'English'],
    description: 'Support the annual Qatar Sustainability Summit logistics and attendee experience',
    applicantsCount: 89,
    qualityScore: 82,
    challengeTemplateId: 'tpl-1',
    createdAt: '2026-01-03T08:00:00Z',
  },
  {
    id: 'role-3',
    organizationId: 'org-2',
    title: 'Junior Event Coordinator',
    type: 'graduate',
    location: 'Doha, Qatar',
    deadline: '2026-04-01',
    status: 'open',
    requirements: ['Event Planning', 'Project Management', 'Communication'],
    languages: ['Arabic', 'English'],
    description: 'Full-time graduate role managing corporate and public events',
    applicantsCount: 34,
    qualityScore: 85,
    challengeTemplateId: 'tpl-1',
    createdAt: '2026-01-05T12:00:00Z',
  },
  {
    id: 'role-4',
    organizationId: 'org-3',
    title: 'Software Engineering Intern',
    type: 'internship',
    location: 'Remote',
    deadline: '2026-03-20',
    status: 'open',
    requirements: ['React', 'Node.js', 'TypeScript'],
    description: 'Build innovative web applications at a fast-growing startup',
    applicantsCount: 67,
    qualityScore: 73,
    challengeTemplateId: 'tpl-2',
    createdAt: '2026-01-07T09:00:00Z',
  },
  {
    id: 'role-5',
    organizationId: 'org-2',
    title: 'Marketing Intern - Digital Campaigns',
    type: 'internship',
    location: 'Doha, Qatar',
    deadline: '2026-03-10',
    status: 'open',
    requirements: ['Social Media', 'Content Creation', 'Analytics'],
    description: 'Drive digital marketing campaigns for major events',
    applicantsCount: 52,
    qualityScore: 79,
    challengeTemplateId: 'tpl-3',
    createdAt: '2026-01-08T11:00:00Z',
  },
  {
    id: 'role-6',
    organizationId: 'org-1',
    title: 'Community Volunteer - Education Programs',
    type: 'volunteer',
    location: 'Education City, Doha',
    deadline: '2026-02-20',
    status: 'open',
    requirements: ['Teaching', 'Mentoring', 'Curriculum Design'],
    languages: ['Arabic', 'English'],
    description: 'Support educational outreach programs for local schools',
    applicantsCount: 41,
    qualityScore: 88,
    createdAt: '2026-01-10T10:00:00Z',
  },
];

// Candidates
export const candidates: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Fatima Al-Kuwari',
    email: 'fatima.alkuwari@example.com',
    university: 'Qatar University',
    major: 'Computer Science',
    graduationDate: '2026-06-01',
    gpa: 3.86,
    languages: ['Arabic', 'English'],
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Research'],
    availability: 'immediate',
    workPermit: true,
    snoonuPlus: true,
    portfolio: {
      projects: [
        { title: 'Arabic NLP Model', description: 'Built sentiment analysis for Arabic text', url: 'https://github.com/example' },
        { title: 'Traffic Prediction System', description: 'ML model for Doha traffic patterns' },
      ],
      certificates: [
        { title: 'AWS Machine Learning Specialty', issuer: 'Amazon', date: '2025-11-01' },
        { title: 'Deep Learning Specialization', issuer: 'Coursera', date: '2025-09-01' },
      ],
    },
    createdAt: '2025-12-15T10:00:00Z',
  },
  {
    id: 'cand-2',
    name: 'Mohammed Al-Thani',
    email: 'mohammed.althani@example.com',
    university: 'Carnegie Mellon Qatar',
    major: 'Business Administration',
    graduationDate: '2026-05-15',
    gpa: 3.52,
    languages: ['Arabic', 'English', 'French'],
    skills: ['Event Management', 'Project Management', 'Leadership', 'Sustainability'],
    availability: 'flexible',
    workPermit: true,
    snoonuPlus: false,
    portfolio: {
      projects: [
        { title: 'Campus Sustainability Initiative', description: 'Led zero-waste campaign at CMU-Q' },
        { title: 'Student Conference 2025', description: 'Organized 500+ attendee business conference' },
      ],
      certificates: [
        { title: 'PMP Fundamentals', issuer: 'PMI', date: '2025-10-01' },
      ],
    },
    createdAt: '2025-12-20T11:00:00Z',
  },
  {
    id: 'cand-3',
    name: 'Aisha Rahman',
    email: 'aisha.rahman@example.com',
    university: 'Georgetown Qatar',
    major: 'International Relations',
    graduationDate: '2027-06-01',
    gpa: 3.71,
    languages: ['Arabic', 'English', 'Urdu'],
    skills: ['Event Planning', 'Communication', 'Volunteer Coordination', 'Social Media'],
    availability: 'flexible',
    workPermit: true,
    snoonuPlus: true,
    portfolio: {
      projects: [
        { title: 'Youth Leadership Summit', description: 'Co-organized regional youth summit with 300+ attendees' },
      ],
      certificates: [
        { title: 'Event Management Certificate', issuer: 'Qatar Tourism Authority', date: '2025-08-01' },
      ],
    },
    createdAt: '2026-01-02T09:00:00Z',
  },
  {
    id: 'cand-4',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    university: 'Texas A&M Qatar',
    major: 'Mechanical Engineering',
    graduationDate: '2026-12-15',
    gpa: 3.24,
    languages: ['Arabic', 'English'],
    skills: ['CAD', 'Problem Solving', 'Teamwork', 'Sustainability'],
    availability: 'limited',
    workPermit: true,
    snoonuPlus: false,
    portfolio: {
      projects: [
        { title: 'Solar Panel Efficiency Project', description: 'Senior design project on renewable energy' },
      ],
      certificates: [],
    },
    createdAt: '2026-01-05T14:00:00Z',
  },
  {
    id: 'cand-5',
    name: 'Sara Al-Mansoori',
    email: 'sara.almansoori@example.com',
    university: 'Northwestern Qatar',
    major: 'Journalism',
    graduationDate: '2026-05-20',
    gpa: 3.48,
    languages: ['Arabic', 'English'],
    skills: ['Content Creation', 'Social Media', 'Writing', 'Photography', 'Video Editing'],
    availability: 'immediate',
    workPermit: true,
    snoonuPlus: true,
    portfolio: {
      projects: [
        { title: 'Campus Media Campaign', description: 'Created viral social media campaign for student event' },
        { title: 'Documentary: Qatar Youth', description: 'Short documentary on youth entrepreneurship' },
      ],
      certificates: [
        { title: 'Digital Marketing Certification', issuer: 'Google', date: '2025-07-01' },
        { title: 'Adobe Creative Suite', issuer: 'Adobe', date: '2025-06-01' },
      ],
    },
    createdAt: '2026-01-06T10:00:00Z',
  },
  {
    id: 'cand-6',
    name: 'Khalid Al-Muftah',
    email: 'khalid.almuftah@example.com',
    university: 'Qatar University',
    major: 'Software Engineering',
    graduationDate: '2026-06-01',
    gpa: 3.67,
    languages: ['Arabic', 'English'],
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    availability: 'immediate',
    workPermit: true,
    snoonuPlus: false,
    portfolio: {
      projects: [
        { title: 'E-commerce Platform', description: 'Built full-stack marketplace app', url: 'https://github.com/example' },
        { title: 'Mobile Event App', description: 'React Native app for campus events' },
      ],
      certificates: [
        { title: 'AWS Developer Associate', issuer: 'Amazon', date: '2025-11-01' },
      ],
    },
    createdAt: '2026-01-08T12:00:00Z',
  },
  {
    id: 'cand-7',
    name: 'Noor Al-Thaqafi',
    email: 'noor.althaqafi@example.com',
    university: 'Education City',
    major: 'Education',
    graduationDate: '2027-06-01',
    gpa: 3.59,
    languages: ['Arabic', 'English'],
    skills: ['Teaching', 'Mentoring', 'Curriculum Design', 'Child Development'],
    availability: 'flexible',
    workPermit: true,
    snoonuPlus: true,
    portfolio: {
      projects: [
        { title: 'After-School Program', description: 'Designed and led STEM program for elementary students' },
      ],
      certificates: [
        { title: 'Teaching Certificate', issuer: 'Qatar Ministry of Education', date: '2025-09-01' },
      ],
    },
    createdAt: '2026-01-09T11:00:00Z',
  },
  {
    id: 'cand-8',
    name: 'Rashed Al-Kaabi',
    email: 'rashed.alkaabi@example.com',
    university: 'Carnegie Mellon Qatar',
    major: 'Computer Science',
    graduationDate: '2026-05-15',
    gpa: 3.91,
    languages: ['Arabic', 'English'],
    skills: ['Python', 'Java', 'Algorithms', 'System Design', 'Git'],
    availability: 'immediate',
    workPermit: true,
    snoonuPlus: false,
    portfolio: {
      projects: [
        { title: 'Distributed Cache System', description: 'Built Redis-like caching system' },
        { title: 'Compiler Project', description: 'Designed and implemented a toy programming language' },
      ],
      certificates: [],
    },
    createdAt: '2026-01-11T09:00:00Z',
  },
  {
    id: 'cand-9',
    name: 'Maryam Al-Sulaiti',
    email: 'maryam.alsulaiti@example.com',
    university: 'Georgetown Qatar',
    major: 'Marketing',
    graduationDate: '2026-12-01',
    gpa: 3.44,
    languages: ['Arabic', 'English', 'Spanish'],
    skills: ['Digital Marketing', 'Brand Strategy', 'Analytics', 'SEO', 'Content Marketing'],
    availability: 'flexible',
    workPermit: true,
    snoonuPlus: true,
    portfolio: {
      projects: [
        { title: 'Brand Relaunch Campaign', description: 'Led digital rebrand for student organization' },
      ],
      certificates: [
        { title: 'Google Analytics Certification', issuer: 'Google', date: '2025-10-01' },
        { title: 'HubSpot Inbound Marketing', issuer: 'HubSpot', date: '2025-09-01' },
      ],
    },
    createdAt: '2026-01-12T10:00:00Z',
  },
  {
    id: 'cand-10',
    name: 'Hamad Al-Jaber',
    email: 'hamad.aljaber@example.com',
    university: 'Texas A&M Qatar',
    major: 'Electrical Engineering',
    graduationDate: '2027-05-15',
    gpa: 3.18,
    languages: ['Arabic', 'English'],
    skills: ['Circuit Design', 'Programming', 'IoT', 'Robotics'],
    availability: 'limited',
    workPermit: true,
    snoonuPlus: false,
    portfolio: {
      projects: [
        { title: 'Smart Home System', description: 'Built IoT-based home automation prototype' },
      ],
      certificates: [],
    },
    createdAt: '2026-01-13T13:00:00Z',
  },
];

// Transparent, deterministic fit score. No model, no randomness:
// every point comes from a rule below and is listed in the breakdown.
const BASE_POINTS = 50;
const POINTS_PER_SKILL = 10;
const AVAILABILITY_POINTS: Record<Candidate['availability'], number> = {
  immediate: 15,
  flexible: 10,
  limited: 0,
};
const LANGUAGE_POINTS = 10;

function skillMatches(skill: string, requirement: string): boolean {
  const s = skill.toLowerCase();
  const r = requirement.toLowerCase();
  return r.includes(s) || s.includes(r);
}

function matchedRequirements(candidate: Candidate, role: Role): string[] {
  return role.requirements.filter(req =>
    candidate.skills.some(skill => skillMatches(skill, req))
  );
}

function speaksRequiredLanguages(candidate: Candidate, role: Role): boolean {
  return (role.languages ?? []).every(lang => candidate.languages.includes(lang));
}

// Builds the itemised score. The points always sum to the fit score.
function buildScoreBreakdown(candidate: Candidate, role: Role): ScoreLine[] {
  const lines: ScoreLine[] = [{ label: 'Base score for a complete application', points: BASE_POINTS }];

  const matched = matchedRequirements(candidate, role);
  role.requirements.forEach(req => {
    lines.push(matched.includes(req)
      ? { label: `${req} matched`, points: POINTS_PER_SKILL }
      : { label: `${req} not shown`, points: 0 });
  });

  const availabilityLabel = {
    immediate: 'Available immediately',
    flexible: 'Flexible availability',
    limited: 'Limited availability',
  }[candidate.availability];
  lines.push({ label: availabilityLabel, points: AVAILABILITY_POINTS[candidate.availability] });

  // Languages only count when the role asks for them
  if (role.languages && role.languages.length > 0) {
    const required = role.languages.join(' + ');
    lines.push(speaksRequiredLanguages(candidate, role)
      ? { label: `Speaks ${required} (required)`, points: LANGUAGE_POINTS }
      : { label: `Missing a required language (${required})`, points: 0 });
  }

  const raw = lines.reduce((sum, line) => sum + line.points, 0);
  if (raw > 100) {
    lines.push({ label: 'Capped at 100', points: 100 - raw });
  }

  return lines;
}

// Short reason chips, all derived from the same data as the score
function buildFitReasons(candidate: Candidate, role: Role): string[] {
  const reasons: string[] = [];

  const matched = matchedRequirements(candidate, role);
  if (matched.length > 0) {
    reasons.push(`${matched.length}/${role.requirements.length} required skills`);
  }

  if (candidate.availability === 'immediate') {
    reasons.push('Available immediately');
  }

  if (role.languages && role.languages.length > 0 && speaksRequiredLanguages(candidate, role)) {
    reasons.push(role.languages.join(' + '));
  }

  const projects = candidate.portfolio?.projects.length ?? 0;
  if (projects > 0) {
    reasons.push(`${projects} portfolio project${projects > 1 ? 's' : ''}`);
  }

  const certificates = candidate.portfolio?.certificates.length ?? 0;
  if (certificates > 0) {
    reasons.push(`${certificates} certificate${certificates > 1 ? 's' : ''}`);
  }

  // Snoonu Plus is shown as a badge and chip only, it adds no points
  if (candidate.snoonuPlus) {
    return [...reasons.slice(0, 3), 'Snoonu Plus member'];
  }
  return reasons.slice(0, 4);
}

function recommendationFor(fitScore: number): Application['recommendation'] {
  return fitScore > 75 ? 'accept' : fitScore > 60 ? 'hold' : 'reject';
}

type ApplicationFields = Pick<Application, 'id' | 'stage' | 'appliedAt' | 'notes' | 'skillProofSubmission'>;

function buildApplication(candidate: Candidate, role: Role, fields: ApplicationFields): Application {
  const scoreBreakdown = buildScoreBreakdown(candidate, role);
  const fitScore = scoreBreakdown.reduce((sum, line) => sum + line.points, 0);

  return {
    ...fields,
    roleId: role.id,
    candidateId: candidate.id,
    fitScore,
    scoreBreakdown,
    fitReasons: buildFitReasons(candidate, role),
    recommendation: recommendationFor(fitScore),
    confidence: Math.floor(fitScore * 0.9),
  };
}

// Generate applications
export const applications: Application[] = [];

// Role 1 applications (AI Lab Intern)
[0, 1, 5, 7].forEach((candIndex, i) => {
  applications.push(buildApplication(candidates[candIndex], roles[0], {
    id: `app-1-${i + 1}`,
    stage: i === 0 ? 'shortlisted' : i === 1 ? 'reviewed' : 'new',
    appliedAt: `2026-01-${10 + i}T${9 + i}:00:00Z`,
    notes: [],
  }));
});

// Role 2 applications (Sustainability Volunteer)
[1, 2, 3, 6].forEach((candIndex, i) => {
  applications.push(buildApplication(candidates[candIndex], roles[1], {
    id: `app-2-${i + 1}`,
    stage: i === 0 ? 'interview' : i === 1 ? 'shortlisted' : 'reviewed',
    appliedAt: `2026-01-${8 + i}T${10 + i}:00:00Z`,
    notes: i === 0 ? [{
      text: 'Excellent communication skills shown in interview',
      author: 'Sarah (Recruiter)',
      createdAt: '2026-01-14T15:00:00Z',
    }] : [],
  }));
});

// Role 3 applications (Event Coordinator)
[1, 2, 4].forEach((candIndex, i) => {
  applications.push(buildApplication(candidates[candIndex], roles[2], {
    id: `app-3-${i + 1}`,
    stage: i === 0 ? 'shortlisted' : 'new',
    appliedAt: `2026-01-${12 + i}T${11 + i}:00:00Z`,
    notes: [],
  }));
});

// Role 4 applications (Software Intern)
[5, 7, 0, 9].forEach((candIndex, i) => {
  applications.push(buildApplication(candidates[candIndex], roles[3], {
    id: `app-4-${i + 1}`,
    stage: i === 0 ? 'reviewed' : 'new',
    appliedAt: `2026-01-${13 + i}T${9 + i}:00:00Z`,
    notes: [],
  }));
});

// Role 5 applications (Marketing Intern)
[4, 8].forEach((candIndex, i) => {
  applications.push(buildApplication(candidates[candIndex], roles[4], {
    id: `app-5-${i + 1}`,
    stage: i === 0 ? 'shortlisted' : 'new',
    appliedAt: `2026-01-${14 + i}T${10 + i}:00:00Z`,
    notes: [],
    skillProofSubmission: i === 0 ? {
      challengeId: 'tpl-3',
      submittedAt: '2026-01-15T16:00:00Z',
      content: 'Partnership proposal focusing on sustainable event practices...',
      score: 88,
      evaluation: 'Strong persuasiveness and clear value proposition. Excellent use of local market insights.',
    } : undefined,
  }));
});

// Role 6 applications (Education Volunteer)
[6, 2].forEach((candIndex, i) => {
  applications.push(buildApplication(candidates[candIndex], roles[5], {
    id: `app-6-${i + 1}`,
    stage: i === 0 ? 'shortlisted' : 'reviewed',
    appliedAt: `2026-01-${14 + i}T${11 + i}:00:00Z`,
    notes: [],
  }));
});

// Interviews
export const interviews: Interview[] = [
  {
    id: 'int-1',
    applicationId: 'app-2-1', // Mohammed for Sustainability Volunteer
    scheduledAt: '2026-01-20T14:00:00Z',
    duration: 30,
    interviewer: 'Sarah Johnson',
    interviewerEmail: 'sarah.johnson@qatarfoundation.qa',
    status: 'scheduled',
    meetingLink: 'https://meet.snoonu.com/interview-123',
  },
  {
    id: 'int-2',
    applicationId: 'app-1-1', // Fatima for AI Lab
    scheduledAt: '2026-01-21T10:00:00Z',
    duration: 45,
    interviewer: 'Dr. Ahmed Al-Ansari',
    interviewerEmail: 'ahmed.alansari@qatarfoundation.qa',
    status: 'scheduled',
    meetingLink: 'https://meet.snoonu.com/interview-124',
  },
  {
    id: 'int-3',
    applicationId: 'app-3-1', // Mohammed for Event Coordinator
    scheduledAt: '2026-01-22T15:00:00Z',
    duration: 60,
    interviewer: 'Lisa Martinez',
    interviewerEmail: 'lisa.martinez@dohaevents.qa',
    status: 'scheduled',
    meetingLink: 'https://meet.snoonu.com/interview-125',
  },
];
