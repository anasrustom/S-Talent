// SkillProof rubrics: fixed, transparent rules that run in the browser.
// Every check lists the points it gave, and the points always sum to the score.

export type RubricCheck = {
  label: string;
  detail: string;
  points: number;
  max: number;
};

export type RubricResult = {
  score: number;
  checks: RubricCheck[];
};

function words(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

function sentences(text: string): string[] {
  return text.split(/[.!?]+/).map(s => s.trim()).filter(s => words(s).length >= 3);
}

// Which of the terms appear in the text, case-insensitive and at the start of a word.
// With wholeWord, only simple endings (s, es, d, ed, ing) may follow the term.
function termsFound(text: string, terms: string[], wholeWord = false): string[] {
  const lower = text.toLowerCase();
  return terms.filter(term => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const ending = wholeWord ? '(s|es|d|ed|ing)?(?![a-z0-9])' : '';
    return new RegExp(`(^|[^a-z0-9])${escaped}${ending}`).test(lower);
  });
}

// Full points at `needed` hits, proportional below that
function partial(max: number, hits: number, needed: number): number {
  return Math.round(max * Math.min(1, hits / needed));
}

function check(label: string, detail: string, points: number, max: number): RubricCheck {
  return { label, detail, points, max };
}

function result(checks: RubricCheck[]): RubricResult {
  return { score: checks.reduce((sum, c) => sum + c.points, 0), checks };
}

// Design: checkout critique, three written answers
const DESIGN_ISSUE_TERMS = ['tap target', 'touch target', 'contrast', 'cta', 'call to action', 'button', 'error', 'label', 'form', 'field', 'progress', 'trust', 'hierarchy', 'spacing'];
const DESIGN_CHANGE_VERBS = ['move', 'increase', 'enlarge', 'group', 'reduce', 'remove', 'add', 'combine', 'replace', 'place', 'make', 'use', 'split', 'highlight'];
const ACCESSIBILITY_TERMS = ['contrast', 'wcag', 'screen reader', 'alt text', 'aria', 'label', 'focus', 'keyboard', 'font size', '44', 'colour blind', 'color blind'];

export function scoreDesignCritique(answers: { [key: number]: string }): RubricResult {
  const issues = answers[1] ?? '';
  const hierarchy = answers[2] ?? '';
  const accessibility = answers[3] ?? '';

  // Count list items or sentences as separate issues
  const listed = Math.max(issues.split(/\n|\d[.)]/).filter(s => words(s).length >= 2).length, sentences(issues).length);
  const issueTerms = termsFound(issues, DESIGN_ISSUE_TERMS);
  const changeVerbs = termsFound(hierarchy, DESIGN_CHANGE_VERBS, true);
  const a11yTerms = termsFound(accessibility, ACCESSIBILITY_TERMS);
  const totalWords = words(`${issues} ${hierarchy} ${accessibility}`).length;

  return result([
    check('Names three separate issues', `${Math.min(listed, 3)} of 3 found`, partial(20, listed, 3), 20),
    check('Issues are concrete UI problems', issueTerms.length > 0 ? `Mentions ${issueTerms.slice(0, 3).join(', ')}` : 'No specific UI element named', partial(20, issueTerms.length, 2), 20),
    check('Proposes concrete changes', changeVerbs.length > 0 ? `${changeVerbs.length} action verbs (${changeVerbs.slice(0, 3).join(', ')})` : 'No concrete change proposed', partial(20, changeVerbs.length, 2), 20),
    check('Covers accessibility specifics', a11yTerms.length > 0 ? `Mentions ${a11yTerms.slice(0, 3).join(', ')}` : 'No accessibility term found', partial(20, a11yTerms.length, 2), 20),
    check('Depth of critique', `${totalWords} words, 120 for full points`, partial(20, totalWords, 120), 20),
  ]);
}

// Marketing: social campaign launch
const KEY_MESSAGE_GROUPS = [
  { name: 'premium partners', terms: ['premium', 'restaurant', 'partner', 'chef'] },
  { name: 'fast delivery', terms: ['fast', '30', 'minute', 'min', 'quick'] },
  { name: 'exclusive menu', terms: ['exclusive', 'menu', 'only on', 'signature'] },
];
const CTA_TERMS = ['order', 'download', 'try', 'tap', 'link in bio', 'get', 'book', 'join'];
const PLAN_TERMS = ['launch', 'week', 'day', 'instagram', 'twitter', 'tiktok', 'influencer', 'story', 'stories', 'reel', 'promo', 'budget'];

export function scoreMarketingCampaign(input: { caption: string; tweet: string; hashtag: string; strategy: string }): RubricResult {
  const copy = `${input.caption} ${input.tweet}`;
  const coveredGroups = KEY_MESSAGE_GROUPS.filter(group => termsFound(copy, group.terms).length > 0);
  const ctas = termsFound(copy, CTA_TERMS, true);
  const tag = input.hashtag.trim();
  const tagWellFormed = /^#[A-Za-z][A-Za-z0-9_]{4,24}$/.test(tag);
  const tweetUsesTag = tag.length > 1 && input.tweet.toLowerCase().includes(tag.toLowerCase());
  const strategySentences = sentences(input.strategy).length;
  const planTerms = termsFound(input.strategy, PLAN_TERMS);

  return result([
    check('Covers the three key messages', coveredGroups.length > 0 ? `${coveredGroups.length} of 3 (${coveredGroups.map(g => g.name).join(', ')})` : '0 of 3 key messages', coveredGroups.length * 10, 30),
    check('Has a call to action', ctas.length > 0 ? `Uses "${ctas[0]}"` : 'No call to action found', ctas.length > 0 ? 15 : 0, 15),
    check('Tweet uses the campaign hashtag', tweetUsesTag ? `${tag} appears in the tweet` : 'Hashtag missing from the tweet', tweetUsesTag ? 15 : 0, 15),
    check('Hashtag is well formed', tagWellFormed ? `${tag} is 5 to 25 characters` : 'Needs # plus 5 to 25 letters or digits', tagWellFormed ? 10 : 0, 10),
    check('Strategy is 3 to 5 sentences', `${strategySentences} sentence${strategySentences === 1 ? '' : 's'}`, strategySentences >= 3 && strategySentences <= 5 ? 15 : 0, 15),
    check('Strategy names timing and channels', planTerms.length > 0 ? `Mentions ${planTerms.slice(0, 3).join(', ')}` : 'No timing or channel named', partial(15, planTerms.length, 2), 15),
  ]);
}

// Finance: marketing budget allocation
export type BudgetChannel = { name: string; historicalROI: number; minBudget: number; recommendedPercent: number };

const FINANCE_REASONING_TERMS = ['roi', 'cac', 'return', 'cost per', 'diversif', 'risk', 'minimum'];

export function scoreBudgetAllocation(input: {
  channels: BudgetChannel[];
  allocations: { [key: string]: number };
  totalBudget: number;
  estimatedCustomers: number;
  actualCAC: number;
  reasoning: string;
}): RubricResult {
  const { channels, allocations, totalBudget, reasoning } = input;
  const metMinimum = channels.filter(c => (allocations[c.name] || 0) >= c.minBudget).length;
  const meetsTargets = input.estimatedCustomers >= 500 && input.actualCAC > 0 && input.actualCAC <= 100;

  // Blended return of the candidate's mix vs the recommended mix
  const blended = channels.reduce((sum, c) => sum + (allocations[c.name] || 0) * c.historicalROI, 0) / totalBudget;
  const benchmark = channels.reduce((sum, c) => sum + (c.recommendedPercent / 100) * c.historicalROI, 0);
  const largestShare = Math.max(...channels.map(c => (allocations[c.name] || 0) / totalBudget));
  const reasoningTerms = termsFound(reasoning, FINANCE_REASONING_TERMS);
  const citesNumbers = /\d/.test(reasoning);
  const reasoningWords = words(reasoning).length;

  return result([
    check('Every channel gets its minimum budget', `${metMinimum} of ${channels.length} channels`, metMinimum * 4, 20),
    check('Hits 500 customers at CAC of $100 or less', `${input.estimatedCustomers} customers at $${input.actualCAC.toFixed(0)} CAC`, meetsTargets ? 20 : 0, 20),
    check('Blended return beats the recommended mix', `${blended.toFixed(2)}x vs ${benchmark.toFixed(2)}x`, blended >= benchmark ? 20 : 0, 20),
    check('No channel above 40% of budget', `Largest channel takes ${Math.round(largestShare * 100)}%`, largestShare <= 0.4 ? 10 : 0, 10),
    check('Reasoning cites numbers', citesNumbers ? 'Uses figures' : 'No figures in the reasoning', citesNumbers ? 10 : 0, 10),
    check('Reasoning names ROI, CAC or risk', reasoningTerms.length > 0 ? `Mentions ${reasoningTerms.slice(0, 3).join(', ')}` : 'No financial term found', reasoningTerms.length > 0 ? 10 : 0, 10),
    check('Depth of reasoning', `${reasoningWords} words, 40 for full points`, partial(10, reasoningWords, 40), 10),
  ]);
}

export function verdictFor(score: number): string {
  return score >= 80 ? 'Strong submission' : score >= 60 ? 'Solid submission' : 'Needs more work';
}
