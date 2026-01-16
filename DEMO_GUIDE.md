# S Talent Console - Demo Guide

## 🎬 Quick Start

1. **Launch:** Visit `http://localhost:3000`
2. **Login Flow:**
   - Select an organization (Qatar Foundation recommended)
   - Choose your role (Recruiter or Admin)
   - Click "Continue as Snoonu Business"

## 🌟 Key Features to Showcase

### 1. AI Triage (⭐ SIGNATURE FEATURE)
**Location:** Applicants page (sidebar menu)

**How to demo:**
1. Navigate to "Applicants" from sidebar
2. Click the **"Enable AI Triage"** button (with sparkle icon)
3. Watch the AI thinking animation (2 seconds)
4. Observe candidates reorder by fit score (100 → 50)
5. Notice AI reasoning chips appear: "Matches availability", "Relevant projects", etc.

**Talking points:**
- "AI analyzes skills overlap, availability, language proficiency, portfolio strength"
- "Each candidate shows explainable reasons for their ranking"
- "Toggle on/off to compare manual vs AI sorting"

### 2. Drag-and-Drop Pipeline (⭐ WOW MOMENT)
**Location:** Pipeline page (sidebar menu)

**How to demo:**
1. Navigate to "Pipeline"
2. Drag a candidate card from "New" to "Reviewed"
3. Watch smooth physics animation
4. See toast notification confirming move
5. Try dragging to "Shortlisted" or "Interview"

**Talking points:**
- "Real-time status updates as you move candidates"
- "Stage conversion rates shown at top of each column"
- "Satisfying physics-based interactions"

### 3. Auto-Scheduler (⭐ WOW MOMENT)
**Location:** Interviews page (sidebar menu)

**How to demo:**
1. Navigate to "Interviews"
2. Click **"Auto-Schedule"** button
3. Modal appears with AI thinking animation
4. See 3 recommended time slots with:
   - Confidence scores (95%, 88%, 82%)
   - Reasoning badges ("Both available", "Preferred time")
5. Click "Schedule Best Slots"
6. Watch success toast

**Talking points:**
- "AI considers interviewer availability, candidate preferences, time zones"
- "Confidence scoring shows reliability of each slot"
- "One-click scheduling for multiple interviews"

### 4. Dashboard Overview
**Location:** Dashboard (default after login)

**Features to highlight:**
- Animated counter KPIs (watch numbers count up)
- AI Triage Queue with top 5 candidates
- Upcoming interviews timeline
- Roles needing attention cards

### 5. Dark/Light Mode Toggle
**Location:** Bottom of sidebar

**How to demo:**
1. Click moon/sun icon at bottom of sidebar
2. Watch smooth theme transition
3. Notice:
   - Dark mode has grid pattern background
   - Light mode has soft, clean aesthetic
   - Snoonu red stays consistent

**Talking points:**
- "Dark mode: hackathon aesthetic (fast, snappy)"
- "Light mode: S City vibe (smooth, friendly)"

### 6. Role Detail Views
**Location:** Roles page → Click any role card

**Features to show:**
- Comprehensive role header with stats
- Tabs: Applicants, Pipeline, Skill Proof, Interviews, Insights
- Fit Score rings with animated counters
- Skill chips and availability indicators

### 7. Bulk Actions
**Location:** Applicants page

**How to demo:**
1. Click checkboxes on multiple candidate cards
2. Action bar appears at top
3. Use buttons: Shortlist, Reject, Message, Interview
4. Watch toast confirmations

## 🎨 Visual Polish to Highlight

### Microinteractions
- **Hover states:** Every button, card, and link has hover feedback
- **Page transitions:** Smooth fade + slide on route changes
- **Card lifts:** Cards rise on hover with shadow
- **Button feedback:** Scale on press
- **Loading states:** Skeleton loaders and spinners

### Animations
- **Fit Score rings:** Circular progress animates in
- **KPI counters:** Numbers count up from 0
- **Stage transitions:** Smooth slide animations
- **AI thinking:** Rotating sparkle icon
- **Toast notifications:** Slide in from right

### Branding
- **Snoonu Red (#D90217):** Used for primary actions, focus states, accents
- **Demo Badge:** Fixed in bottom-right corner
- **Typography:** Modern sans-serif, condensed headings in dark mode

## 📊 Mock Data Overview

### Organizations
- Qatar Foundation (Enterprise)
- Doha Events Co. (Merchant)
- Startup XYZ (Startup)

### Roles (6 total)
- AI Lab Intern (Qatar Foundation)
- Sustainability Volunteer (Qatar Foundation)
- Event Coordinator Graduate (Doha Events Co.)
- Software Intern (Startup XYZ)
- Marketing Intern (Doha Events Co.)
- Education Volunteer (Qatar Foundation)

### Candidates (10 total)
All with:
- University (Qatar University, CMU Qatar, Georgetown Qatar, etc.)
- Major and graduation date
- Skills (5-7 per candidate)
- Languages (Arabic, English, French, etc.)
- Availability status
- Portfolio projects and certificates
- Snoonu Plus badges (some candidates)

### Applications (17 total)
- Fit scores: 55-95 range
- AI reasons: 2-4 per application
- Various stages: New, Reviewed, Shortlisted, Interview

## 🎯 Demo Flow Suggestion

**5-Minute Demo:**
1. Login screen (30 sec) - Select org and role
2. Dashboard (45 sec) - Show KPIs and AI queue
3. Applicants + AI Triage (90 sec) - ⭐ Key feature
4. Pipeline drag-drop (60 sec) - ⭐ Wow moment
5. Auto-scheduler (60 sec) - ⭐ Wow moment
6. Theme toggle (30 sec) - Show dark/light

**Key Phrases:**
- "All powered by fake AI for the hackathon"
- "Smooth animations throughout"
- "Built in [timeframe] with Next.js + Framer Motion"
- "Snoonu brand colors and design language"
- "Ready for real backend integration"

## 🚀 Technical Highlights

**Stack:**
- Next.js 16 with App Router
- TypeScript for type safety
- Framer Motion for animations
- @dnd-kit for drag-and-drop
- Recharts for data viz
- Tailwind CSS 4 with CSS variables

**Performance:**
- Client-side only (no backend)
- Instant page loads
- Smooth 60fps animations
- Responsive design (works on tablet too)

## 🎭 Demo Mode Notes

**All actions are simulated:**
- "Send Message" → Toast notification only
- "Schedule Interview" → Local state update
- "Export" → Toast notification only
- Bulk actions → Toast confirmations

**Data persistence:**
- Theme preference: localStorage
- Org/role selection: localStorage
- Pipeline changes: Session state only (resets on refresh)

## 💡 Questions You Might Get

**Q: Is the AI real?**
A: No, it's deterministic scoring based on skills overlap, availability, and other factors. Perfect for a hackathon demo!

**Q: Can you add more candidates?**
A: Yes! Just add to `lib/data/mock-data.ts` - the fake AI will auto-calculate scores.

**Q: Does drag-and-drop work on mobile?**
A: It's optimized for desktop/tablet. Mobile support would need touch sensors.

**Q: Can you change the theme colors?**
A: Yes! All colors are CSS variables in `app/globals.css`. Easy to customize.

---

**Ready to impress! 🚀**
