# S Talent — Org Console

A hackathon-grade prototype for Snoonu's HR/Recruiter view, designed for receiving and managing applications for internships, volunteers, and fresh graduates.

## 🎯 Features Implemented

### Core Screens

#### 1. **Org Login / Org Switch**
- Clean onboarding flow with organization selection
- Role selection (Admin / Recruiter / Hiring Manager)
- "Continue as Snoonu Business" entry point
- Organizations: Qatar Foundation, Doha Events Co., Startup XYZ

#### 2. **Dashboard**
- **Animated KPI Cards:**
  - Open Roles (with trend indicators)
  - New Applications Today
  - Shortlisted Candidates
  - Interviews This Week
- **AI Triage Queue:** Top candidates across all roles with fit scores
- **Upcoming Interviews:** Timeline view
- **Roles Needing Attention:** High-volume or deadline-approaching roles

#### 3. **Roles List + Detail**
- **Roles List:**
  - Search and filters (type: internship/volunteer/graduate)
  - Role cards with applicant count, quality score, deadline
  - Visual role type indicators
- **Role Detail:**
  - Comprehensive header with role info and quick stats
  - Tabs: Applicants, Pipeline, Skill Proof, Interviews, Insights
  - Full applicant list with fit scores and AI reasons

#### 4. **Applicants List** (⭐ SIGNATURE FEATURE)
- **AI Triage Toggle:**
  - Real-time AI ranking animation
  - Candidates reordered by fit score (0-100)
  - AI reasoning chips: "Matches availability", "Relevant projects", "Arabic + English", etc.
  - Explainability badges on each candidate
- **Views:** Card and Table layouts
- **Filters:** University, skills, availability, Snoonu Plus badge
- **Bulk Actions:** Shortlist, Reject, Message, Schedule Interview
- **Multi-select:** Checkbox selection with action bar

#### 5. **Pipeline Board** (⭐ WOW MOMENT)
- **Interactive Drag-and-Drop:**
  - Smooth physics-based animations
  - Stages: New → Reviewed → Shortlisted → Interview → Offer → Hired
  - Real-time stage updates with toast notifications
  - Stage-level analytics (conversion rates)
- **Visual Feedback:**
  - Drag overlay with candidate card
  - Stage highlighting on hover
  - Animated transitions

#### 6. **Interviews Page**
- **Auto-Scheduler (⭐ WOW MOMENT):**
  - AI-powered optimal time slot recommendations
  - Confidence scores for each slot (95%, 88%, 82%)
  - Reasoning: "Both available", "Preferred time", etc.
  - "AI thinking" animation (2 seconds)
- **Interview Cards:**
  - Date badges (today highlighted in red)
  - Interviewer, duration, meeting link
  - Quick actions: Join, Reschedule, Cancel

#### 7. **Insights Page**
- Key metrics with trend indicators
- Application trend line chart
- Applications by type bar chart
- Top talent sources with animated progress bars

## 🎨 Design System

### Themes
- **Dark Mode (Default):** Hackathon-inspired with grid pattern, sharp animations
- **Light Mode:** S City-inspired clean look with soft shadows
- **Snoonu Brand Red:** `#D90217` used consistently
- **Theme Toggle:** Persistent in localStorage

### Components Built
- StatusPill, SkillChip, FitScoreRing, ConfidenceMeter
- Card, Button, Input with hover states
- Toast notifications system
- Skeleton loaders
- Command palette (⌘K trigger)
- Animated counters

### Microinteractions
- Page transitions (fade + slide)
- Hover states on all interactive elements
- Card lift animations
- Button press feedback
- Loading spinners and AI thinking states
- Smooth drag-and-drop physics

## 🔢 Hardcoded Data

All data is structured and deterministic:
- **10 candidates** with portfolios, skills, universities
- **6 roles** across 3 organizations
- **17 applications** with AI fit scores (calculated from skills overlap + availability)
- **3 scheduled interviews**
- **AI reasons** pre-generated based on candidate attributes

### Fake AI Logic
- **Fit Score:** Base 50 + skills match (10 pts each) + availability (15 pts) + Snoonu Plus (5 pts) + Arabic (10 pts)
- **AI Reasons:** Generated from candidate data (projects, languages, availability, Plus status)
- **Recommendations:** Accept (>75), Hold (60-75), Reject (<60)

## 🚀 Getting Started

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

## 📂 Project Structure

\`\`\`
app/
  page.tsx                 # Org login
  dashboard/page.tsx       # Dashboard with KPIs
  roles/page.tsx           # Roles list
  roles/[id]/page.tsx      # Role detail with tabs
  applicants/page.tsx      # AI Triage + applicants list
  pipeline/page.tsx        # Drag-drop pipeline board
  interviews/page.tsx      # Auto-scheduler
  insights/page.tsx        # Analytics
components/
  layout/MainLayout.tsx    # Sidebar navigation
  ui/common.tsx           # Reusable UI components
  ui/Toast.tsx            # Toast notification system
lib/
  data/types.ts           # TypeScript types
  data/mock-data.ts       # All hardcoded data
  contexts/ThemeContext.tsx # Theme provider
\`\`\`

## 🎭 Demo Mode

- **Fixed badge** in bottom-right: "🎭 DEMO MODE"
- All actions are fake (toasts confirm actions)
- Data persists only in session

## 💡 Key Technical Choices

- **Next.js 14+** with App Router
- **Framer Motion** for all animations
- **@dnd-kit** for accessible drag-and-drop
- **Recharts** for data visualization
- **Lucide React** for consistent icons
- **Tailwind CSS 4** with custom CSS variables
- **TypeScript** for type safety

## 🌟 Highlights

1. **AI Triage is the hero feature** - toggle triggers smooth animation, instant reordering
2. **Pipeline physics feel premium** - satisfying drag-and-drop with toast feedback
3. **Auto-scheduler is polished** - modal with 3 recommended slots, confidence meters
4. **Dark mode has grid pattern** - hackathon aesthetic, snappy animations
5. **Fit Score rings animate in** - circular progress with color coding
6. **Everything is responsive** - works on desktop and tablet

## 🎯 What's Hardcoded (Intentionally)

- ✅ All candidate data, applications, interviews
- ✅ AI fit scores and reasons
- ✅ Org switcher (non-functional selector)
- ✅ Command palette (shows mock results)
- ✅ Skill proof (placeholder UI)
- ✅ All "Send Message", "Export", etc. actions

## 🔮 Future Enhancements (Beyond Hackathon)

- Real backend integration
- Actual AI model for ranking
- Video interview integration
- Candidate messaging
- Advanced filters and search
- Team collaboration features
- Analytics dashboard expansion
- Mobile app

---

**Built for Snoonu Hackathon 2026** 🚀
