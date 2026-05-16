import { useState, useEffect, useRef } from 'react'
import {
  Search, ArrowLeft, ArrowRight, CheckCircle2, Clock, Sparkles,
  RotateCcw, TrendingUp, Target, Compass, Trophy, LogOut, User,
  Mail, Lock, Eye, EyeOff, AlertCircle, Quote, LogIn, FileText,
  Download, Briefcase, X, Copy, Check, BookOpen, Database,
  BarChart3, Calculator, Zap, Flame, ChevronRight, LayoutGrid,
  BookMarked, Star
} from 'lucide-react'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const QUOTES = [
  { text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.", author: "Alan Watts" },
  { text: "Progress is impossible without change, and those who cannot change their minds cannot change anything.", author: "George Bernard Shaw" },
  { text: "Without data, you're just another person with an opinion.", author: "W. Edwards Deming" },
  { text: "Culture eats strategy for breakfast.", author: "Peter Drucker" },
  { text: "Vision without execution is hallucination.", author: "Thomas Edison" },
  { text: "What gets measured gets managed.", author: "Peter Drucker" },
  { text: "People do not resist change. They resist being changed.", author: "Peter Senge" },
  { text: "The most dangerous phrase in the language is 'We've always done it this way.'", author: "Grace Hopper" },
  { text: "If you can't describe what you are doing as a process, you don't know what you're doing.", author: "W. Edwards Deming" },
  { text: "Make everything as simple as possible, but not simpler.", author: "Albert Einstein" },
  { text: "Continuous improvement is better than delayed perfection.", author: "Mark Twain" },
  { text: "Plans are nothing; planning is everything.", author: "Dwight D. Eisenhower" },
  { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
  { text: "A goal without a plan is just a wish.", author: "Antoine de Saint-Exupéry" },
  { text: "The greatest danger in times of turbulence is not the turbulence; it is to act with yesterday's logic.", author: "Peter Drucker" },
  { text: "Quality is never an accident; it is always the result of intelligent effort.", author: "John Ruskin" },
  { text: "Behaviour is a function of the person and their environment.", author: "Kurt Lewin" },
  { text: "Between stimulus and response there is a space. In that space is our power to choose our response.", author: "Viktor Frankl" },
  { text: "The first responsibility of a leader is to define reality. The last is to say thank you.", author: "Max De Pree" },
  { text: "If you want to go fast, go alone. If you want to go far, go together.", author: "African proverb" },
  { text: "Insanity is doing the same thing over and over and expecting different results.", author: "Often attributed to Einstein" },
  { text: "The whole is greater than the sum of its parts.", author: "Aristotle" },
  { text: "However beautiful the strategy, you should occasionally look at the results.", author: "Winston Churchill" },
  { text: "Change before you have to.", author: "Jack Welch" },
  { text: "The pessimist complains about the wind; the optimist expects it to change; the realist adjusts the sails.", author: "William Arthur Ward" },
  { text: "An organisation's ability to learn, and translate that learning into action rapidly, is the ultimate competitive advantage.", author: "Jack Welch" },
  { text: "Listen with the will to learn.", author: "Unknown" },
  { text: "If you do not change direction, you may end up where you are heading.", author: "Lao Tzu" },
  { text: "The single biggest problem in communication is the illusion that it has taken place.", author: "George Bernard Shaw" },
  { text: "Good business leaders create a vision, articulate the vision, passionately own the vision, and relentlessly drive it to completion.", author: "Jack Welch" },
]

function getDailyQuote() {
  const today = new Date()
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000)
  return QUOTES[(dayOfYear + today.getFullYear()) % QUOTES.length]
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────

const PLAYBOOK_CATEGORIES = {
  change: {
    label: 'Change management',
    short: 'Change',
    gradient: 'from-violet-600 to-purple-700',
    color: '#7c3aed',
    lightBg: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200',
    icon: Compass,
    description: 'Stakeholder engagement, comms, resistance, and adoption playbooks',
  },
  ba: {
    label: 'Business analysis',
    short: 'BA',
    gradient: 'from-blue-600 to-indigo-700',
    color: '#2563eb',
    lightBg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: Target,
    description: 'Requirements, process mapping, user stories, workshops, and more',
  },
  pi: {
    label: 'Process improvement',
    short: 'Process',
    gradient: 'from-amber-500 to-orange-600',
    color: '#d97706',
    lightBg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    icon: TrendingUp,
    description: 'Lean tools — 5 Whys, Kaizen, PDCA, Pareto, VSM, SIPOC',
  },
}

const TEMPLATE_CATEGORIES = {
  proposals: { label: 'Proposals', short: 'Proposals', gradient: 'from-cyan-500 to-sky-600', color: '#0891b2', icon: FileText },
  discovery: { label: 'Discovery & onboarding', short: 'Discovery', gradient: 'from-emerald-500 to-teal-600', color: '#059669', icon: Search },
  contracts: { label: 'Contracts', short: 'Contracts', gradient: 'from-rose-500 to-red-600', color: '#dc2626', icon: Briefcase },
  finance: { label: 'Finance & admin', short: 'Finance', gradient: 'from-amber-500 to-orange-600', color: '#d97706', icon: TrendingUp },
}

const CHEATSHEET_CATEGORIES = {
  spreadsheets: { label: 'Spreadsheets', short: 'Excel', gradient: 'from-emerald-600 to-green-700', color: '#16a34a', icon: Calculator },
  sql: { label: 'SQL & data', short: 'SQL', gradient: 'from-blue-600 to-indigo-700', color: '#2563eb', icon: Database },
  storytelling: { label: 'Data storytelling', short: 'Story', gradient: 'from-pink-600 to-rose-700', color: '#be185d', icon: BookOpen },
  stats: { label: 'Statistics', short: 'Stats', gradient: 'from-purple-600 to-violet-700', color: '#7c3aed', icon: BarChart3 },
}

// ─── PLAYBOOKS DATA ────────────────────────────────────────────────────────────

const PLAYBOOKS = [
  {
    id: 'stakeholder-analysis',
    title: 'Stakeholder analysis',
    category: 'change',
    description: 'Identify, map, and plan engagement for everyone affected by a change.',
    estMinutes: 25,
    steps: [
      { type: 'instruction', title: 'Define the change', body: 'Write a one-sentence description of the change. Be specific about scope: what is changing, for whom, and by when. A clear definition prevents scope creep later.' },
      { type: 'checklist', title: 'Brainstorm stakeholders', body: 'List everyone who will be affected by, contribute to, or have an opinion on this change.', items: ['Direct users of the new process/system', 'Their managers and skip-levels', 'Sponsors and decision-makers', 'Adjacent teams who feed in or receive output', 'Compliance, legal, or risk owners', 'External parties (customers, vendors, regulators)'] },
      { type: 'instruction', title: 'Map influence vs. interest', body: 'Plot each stakeholder on a 2×2 grid: low-to-high influence on the y-axis, low-to-high interest on the x-axis. This tells you how much energy each one needs.' },
      { type: 'reference', title: 'The four quadrants', body: 'High influence + High interest → Manage closely (key players). High influence + Low interest → Keep satisfied (don\'t let them get blindsided). Low influence + High interest → Keep informed (great advocates). Low influence + Low interest → Monitor (minimal effort).' },
      { type: 'checklist', title: 'Plan engagement per stakeholder', body: 'For each key player and "keep satisfied" stakeholder, decide:', items: ['What do they need to know?', 'What do you need from them?', 'Preferred channel (1:1, email, town hall)?', 'Cadence (weekly, milestone-based)?', 'Who owns the relationship?'] },
      { type: 'instruction', title: 'Capture and share', body: 'Document the map and engagement plan in one place. Revisit every 2–4 weeks — stakeholder positions shift as the change progresses.' },
    ],
  },
  {
    id: 'adkar-rollout',
    title: 'ADKAR change rollout',
    category: 'change',
    description: 'Move people through Awareness, Desire, Knowledge, Ability, and Reinforcement.',
    estMinutes: 40,
    steps: [
      { type: 'reference', title: 'What is ADKAR?', body: 'A people-focused change model from Prosci. Each letter is a milestone an individual must hit, in order, for a change to stick. Skip one and adoption collapses.' },
      { type: 'instruction', title: 'Awareness — why this change?', body: 'Craft a clear "why now" message. Cover the business reason, the cost of doing nothing, and how it connects to strategy. Communicate through multiple channels and from multiple voices.' },
      { type: 'checklist', title: 'Desire — what\'s in it for them?', body: 'Build personal motivation. For each affected group, identify:', items: ['Concrete benefits to their day-to-day', 'Pain points the change removes', 'WIIFM (What\'s In It For Me) talking points', 'Influencers and early adopters who can model desire'] },
      { type: 'instruction', title: 'Knowledge — how to change', body: 'Design training that covers the new behaviour, tools, and processes. Mix formats: live sessions for nuance, async videos for reference, job aids for the moment of need.' },
      { type: 'checklist', title: 'Ability — practise in context', body: 'Knowledge alone doesn\'t change behaviour. Provide:', items: ['Hands-on practice in a safe environment', 'Coaching from managers or change champions', 'A clear way to ask for help', 'Time to be slow before being fast'] },
      { type: 'instruction', title: 'Reinforcement — make it stick', body: 'Without reinforcement, people revert. Plan: recognition for adoption, removal of old systems/processes, metrics that track the new behaviour, and a feedback loop to catch slippage early.' },
      { type: 'reference', title: 'Diagnosing stuck change', body: 'When adoption stalls, ask which ADKAR letter is failing. People resisting? → Desire problem. Making mistakes? → Knowledge or Ability. Reverting after a month? → Reinforcement. Treat the right letter.' },
    ],
  },
  {
    id: 'resistance-management',
    title: 'Managing resistance to change',
    category: 'change',
    description: 'Surface, understand, and respond to resistance — without steamrolling it.',
    estMinutes: 30,
    steps: [
      { type: 'reference', title: 'Reframe resistance', body: 'Resistance is data, not defiance. It tells you something about the change, the rollout, or unmet needs. Treat it as feedback to investigate, not a problem to crush.' },
      { type: 'checklist', title: 'Spot the signals', body: 'Resistance shows up in many forms. Look for:', items: ['Vocal pushback in meetings', 'Quiet non-compliance ("I forgot")', 'Excessive questions designed to delay', 'Rumours and side-channel complaints', 'Drop in performance or engagement', 'Active sabotage (rare but real)'] },
      { type: 'instruction', title: 'Diagnose the root cause', body: 'Have 1:1 conversations with resistors. Listen more than you talk. Common roots: loss of status/control, fear of inadequacy, past change fatigue, genuine concerns about the design, or misinformation.' },
      { type: 'reference', title: 'Common roots and responses', body: 'Loss of control → Involve them in design.\nFear of inadequacy → Strengthen training and reassurance.\nChange fatigue → Acknowledge it, slow down, sequence better.\nDesign flaw → Actually fix the design.\nMisinformation → Communicate clearly and repeatedly.' },
      { type: 'checklist', title: 'Engage, don\'t avoid', body: 'For each significant resistor:', items: ['Hear them out fully before responding', 'Validate the underlying concern', 'Be honest about what can and can\'t change', 'Offer a role in shaping the rollout', 'Follow up — don\'t make it a one-off'] },
      { type: 'instruction', title: 'Know when to hold the line', body: 'Some resistance is genuine input that should change your plan. Some is a refusal to accept a legitimate decision. Distinguish the two. Be flexible on the how, firm on the what and why.' },
    ],
  },
  {
    id: 'communications-plan',
    title: 'Change communications plan',
    category: 'change',
    description: 'Build a structured comms plan that lands with every audience at the right moment.',
    estMinutes: 30,
    steps: [
      { type: 'reference', title: 'Why comms make or break change', body: 'Most change failures are diagnosed as "people resisted" but trace back to communication: unclear why, wrong messenger, wrong moment, wrong channel. A plan turns ad-hoc messaging into deliberate influence.' },
      { type: 'instruction', title: 'Define the core narrative', body: 'Write a one-page narrative covering: why now, what\'s changing, what\'s not changing, what success looks like, and what we\'re asking of people. Every other comm flows from this.' },
      { type: 'checklist', title: 'Segment your audiences', body: 'Different groups need different messages:', items: ['Executives — strategic context and ROI', 'People managers — what they need to do for their teams', 'Directly affected staff — what changes for them and when', 'Indirectly affected teams — heads-up so they\'re not blindsided', 'External (customers, partners, regulators) — only what they need'] },
      { type: 'instruction', title: 'Match messengers to audiences', body: 'The "from" matters as much as the message. Senior leaders deliver the why. Line managers deliver the what-it-means-for-you. Peers deliver the social proof. Don\'t let one voice carry it all.' },
      { type: 'reference', title: 'The communications matrix', body: 'Build a grid: rows are audiences, columns are key milestones (announcement, training, go-live, post-launch). Each cell answers: what message, from whom, through which channel, by when.' },
      { type: 'checklist', title: 'Pick channels deliberately', body: 'High-stakes messages need rich channels; reminders can be lean.', items: ['Town halls and live Q&A — for major announcements', '1:1s and team meetings — for personal impact', 'Email — for record and reference', 'Intranet/Slack — for ongoing updates and FAQs', 'Manager talking points — to enable cascade'] },
      { type: 'instruction', title: 'Plan repetition, not just announcements', body: 'People need to hear a message 5–7 times before it sinks in. Plan reinforcing comms across the change lifecycle. Vary the format so it doesn\'t feel like spam.' },
    ],
  },
  {
    id: 'change-impact',
    title: 'Change impact assessment',
    category: 'change',
    description: 'Map exactly who is affected, how, and how much — before you roll out.',
    estMinutes: 35,
    steps: [
      { type: 'reference', title: 'Why impact assessment matters', body: 'Without it, you\'re flying blind. You\'ll under-invest in the most affected groups and over-invest in groups that barely notice.' },
      { type: 'instruction', title: 'List every group touched by the change', body: 'Go beyond the obvious. Include teams whose inputs change, whose outputs you consume, whose tools you share, and whose metrics will move.' },
      { type: 'checklist', title: 'Assess impact across dimensions', body: 'For each group, score impact (low/medium/high) on:', items: ['Process — how their day-to-day work changes', 'Tools/systems — what they\'ll need to learn or replace', 'Skills — new capabilities they\'ll need', 'Roles/responsibilities — what gets added, removed, or shifted', 'Performance metrics — how they\'ll be measured differently'] },
      { type: 'reference', title: 'The heat map view', body: 'Build a grid: rows are stakeholder groups, columns are impact dimensions, cells are colour-coded (red/amber/green). The visual makes it obvious where to focus support.' },
      { type: 'checklist', title: 'Translate impact into support needs', body: 'For each high-impact group, define:', items: ['Specific training and development needed', 'Communications cadence and depth', 'Coaching or hand-holding required', 'Interim arrangements during transition', 'Recognition for what they\'re giving up'] },
      { type: 'instruction', title: 'Validate with the affected groups', body: 'Don\'t assess in a vacuum. Run your impact ratings past representatives of each group. They\'ll often reveal impacts you missed. Update accordingly.' },
    ],
  },
  {
    id: 'change-champions',
    title: 'Building a change champion network',
    category: 'change',
    description: 'Recruit and equip a network of peers who carry the change inside their teams.',
    estMinutes: 25,
    steps: [
      { type: 'reference', title: 'Why champions work', body: 'People trust peers more than project teams. A change champion network spreads change through trusted relationships, surfaces local issues fast, and gives the project team eyes and ears across the organisation.' },
      { type: 'checklist', title: 'Profile of a good champion', body: 'Pick for influence, not seniority:', items: ['Respected by their peers (not necessarily their manager\'s favourite)', 'Curious and open to change — early adopter type', 'Honest enough to push back internally', 'Good communicator in their own way', 'Has bandwidth — don\'t pile this on someone already stretched'] },
      { type: 'instruction', title: 'Recruit deliberately, not by volunteer call', body: 'Open volunteer calls give you the keenest, not the most representative. Identify candidates by talking to managers, then invite them personally. Explain why you picked them — it builds commitment.' },
      { type: 'checklist', title: 'Equip them properly', body: 'Champions can\'t carry the message without ammunition:', items: ['Early access to information (before broader announcements)', 'A simple toolkit: talking points, FAQs, slide deck', 'A regular forum to connect with each other (weekly or biweekly)', 'Direct line to the project team for questions', 'Recognition that visibly values their contribution'] },
      { type: 'instruction', title: 'Use them as a two-way channel', body: 'Champions aren\'t just broadcasters. Their highest-value contribution is feedback: what\'s landing, what\'s confusing, what\'s being grumbled about in side-channels. Build a structured way to capture this.' },
    ],
  },
  {
    id: 'training-strategy',
    title: 'Designing a training strategy',
    category: 'change',
    description: 'Plan training that actually changes behaviour, not just box-ticks completion.',
    estMinutes: 30,
    steps: [
      { type: 'reference', title: 'Training is not the same as learning', body: 'Most training fails because it confuses delivery (a course was run) with outcomes (people work differently). Design backwards from the behaviour you want, not forwards from the content you have.' },
      { type: 'instruction', title: 'Define behavioural outcomes first', body: '"Understands the new system" is not an outcome. "Can complete a refund within 3 minutes using the new workflow" is. If you can\'t see the behaviour, you can\'t train for it.' },
      { type: 'checklist', title: 'Segment your learners', body: 'Different roles need different training:', items: ['Power users — depth on advanced functionality', 'Standard users — fluent on common workflows', 'Occasional users — quick reference, not deep training', 'Approvers/managers — oversight tasks only', 'Trainers and champions — train-the-trainer plus pedagogy'] },
      { type: 'reference', title: 'The 70-20-10 reality', body: 'Roughly 70% of learning happens on the job, 20% from peers and managers, 10% from formal training. Plan for all three — don\'t over-invest in the 10% and ignore the rest.' },
      { type: 'checklist', title: 'Plan for the moment of need', body: 'People forget 50%+ of training within a week. Reduce reliance on memory:', items: ['Job aids embedded where the work happens', 'Searchable knowledge base for self-service', 'A clear escalation path for "I\'m stuck"', 'Champions or super-users on each team', 'Refresher sessions 30 and 90 days post-launch'] },
      { type: 'instruction', title: 'Measure what matters', body: 'Smile sheets tell you nothing useful. Measure: behaviour change at 30/60/90 days, error rates on the new way, support tickets, time-to-competency. If these aren\'t moving, your training isn\'t working.' },
    ],
  },
  {
    id: 'post-implementation-review',
    title: 'Post-implementation review',
    category: 'change',
    description: 'Run a proper PIR that captures lessons and improves the next change.',
    estMinutes: 40,
    steps: [
      { type: 'reference', title: 'PIR vs. project closure', body: 'Project closure asks "did we deliver?". A PIR asks "did it work, and what should we learn?". PIR happens 60–90 days after go-live, once the change has had time to land or fail.' },
      { type: 'instruction', title: 'Time it correctly', body: 'Too early (under a month) and you\'re measuring honeymoon, not adoption. Too late (over six months) and people have moved on. 60–90 days post-go-live is the sweet spot for most changes.' },
      { type: 'checklist', title: 'Gather evidence before opinions', body: 'Start with data, not interviews:', items: ['Did we hit the success metrics defined in the business case?', 'How does post-change performance compare to baseline?', 'What\'s the support ticket / error / escalation pattern?', 'What\'s adoption like — % of users, frequency, depth?', 'What was actual cost vs. forecast?'] },
      { type: 'reference', title: 'The four-question frame', body: 'What worked well and should be repeated?\nWhat didn\'t work and should be stopped?\nWhat was missing that we needed?\nWhat surprised us, good or bad?' },
      { type: 'instruction', title: 'Make the lessons actually used', body: 'Most PIR documents die in SharePoint. Assign owners and dates to every action, present findings to a decision-making forum, and reference the PIR when scoping the next similar change.' },
    ],
  },
  {
    id: 'requirements-gathering',
    title: 'Requirements gathering',
    category: 'ba',
    description: 'Run effective elicitation sessions and capture requirements that survive contact with reality.',
    estMinutes: 35,
    steps: [
      { type: 'instruction', title: 'Clarify the problem first', body: 'Before gathering requirements, agree on the problem. Write a problem statement in one sentence: who is affected, what\'s wrong, and the impact. Requirements are answers — make sure you have the right question.' },
      { type: 'checklist', title: 'Pick the right elicitation techniques', body: 'Different sources need different tools:', items: ['1:1 interviews — for depth and sensitive topics', 'Workshops — for cross-functional alignment', 'Observation/shadowing — for "how it really works"', 'Document analysis — for existing systems and policies', 'Surveys — for breadth across many users', 'Prototyping — when people can\'t articulate until they see it'] },
      { type: 'instruction', title: 'Prepare before every session', body: 'Send an agenda. Share artefacts in advance. Have specific questions ready but leave space for discovery. Decide who will facilitate and who will scribe — never the same person.' },
      { type: 'reference', title: 'Question hierarchy', body: 'Start broad ("Walk me through how you do X today"), then narrow ("What happens when Y is missing?"), then validate ("So if I changed Z, would that work?"). Avoid leading questions and yes/no questions early on.' },
      { type: 'checklist', title: 'Capture requirements well', body: 'Each requirement should be:', items: ['Specific (no vague words like "fast" or "user-friendly")', 'Measurable (testable acceptance criteria)', 'Attributed (who asked for it)', 'Prioritised (MoSCoW: Must/Should/Could/Won\'t)', 'Traceable (linked to the underlying need)'] },
      { type: 'instruction', title: 'Validate, don\'t assume', body: 'Play back what you heard. Send written summaries within 24 hours. Get explicit sign-off on must-haves. Requirements you didn\'t validate will come back as scope changes later.' },
    ],
  },
  {
    id: 'process-mapping',
    title: 'Process mapping (as-is)',
    category: 'ba',
    description: 'Document how a process actually works today, not how people think it works.',
    estMinutes: 45,
    steps: [
      { type: 'instruction', title: 'Define scope and boundaries', body: 'Pick one process. Define the trigger (what starts it) and the outcome (what ends it). Resist the urge to map everything — a tightly scoped map is far more useful than a sprawling one.' },
      { type: 'checklist', title: 'Identify the cast', body: 'List everyone who touches the process:', items: ['The customer or initiator', 'Each role/team that does work', 'Approvers and decision-makers', 'Systems involved', 'Any external parties'] },
      { type: 'instruction', title: 'Walk the process with real people', body: 'Don\'t map from a desk. Sit with the people who do the work. Ask them to walk you through a recent real example, end to end. The official process and the actual process are almost never the same.' },
      { type: 'reference', title: 'Choose a notation', body: 'Swimlane diagrams (one lane per role) are the most readable for stakeholders. BPMN is more rigorous if your audience knows it. Be consistent: same shape for the same kind of element throughout.' },
      { type: 'checklist', title: 'Capture the truth, not the ideal', body: 'For each step, note:', items: ['Who does it', 'What system or tool they use', 'How long it takes (range, not average)', 'Common exceptions and workarounds', 'Where it waits or queues', 'Where rework happens'] },
      { type: 'instruction', title: 'Review with participants', body: 'Walk the map back through the people who do the work. They will spot what you missed. Expect at least two revisions before it\'s right.' },
    ],
  },
  {
    id: 'user-stories',
    title: 'Writing effective user stories',
    category: 'ba',
    description: 'Write user stories that drive useful conversations and shippable work.',
    estMinutes: 25,
    steps: [
      { type: 'reference', title: 'What user stories are for', body: 'A user story is a placeholder for a conversation, not a complete specification. Its job is to capture who, what, and why — the detail emerges through discussion.' },
      { type: 'instruction', title: 'Use the standard format', body: 'As a [role], I want [capability], so that [benefit]. The benefit is the part most often missed and the most important — without it, you can\'t evaluate alternative solutions or know when you\'re done.' },
      { type: 'checklist', title: 'Test stories with INVEST', body: 'A good story is:', items: ['Independent — can be built without depending on other stories', 'Negotiable — open to discussion, not a fixed contract', 'Valuable — delivers value to a user or business', 'Estimable — clear enough that a team can size it', 'Small — fits in a single iteration', 'Testable — has clear acceptance criteria'] },
      { type: 'instruction', title: 'Write acceptance criteria', body: 'Use Given/When/Then format: Given [context], When [action], Then [outcome]. Cover the happy path and key edge cases. Acceptance criteria turn the story from a wish into something you can verify.' },
      { type: 'reference', title: 'Common anti-patterns', body: 'Solution stories ("As a user, I want a dropdown" — that\'s a UI choice, not a need). Roleless stories. Mega-stories that span weeks. Stories with vague benefits. Catch these in story-writing sessions, not after the build.' },
    ],
  },
  {
    id: 'moscow-prioritisation',
    title: 'MoSCoW prioritisation',
    category: 'ba',
    description: 'Use MoSCoW properly so it actually narrows scope instead of blessing it all.',
    estMinutes: 20,
    steps: [
      { type: 'reference', title: 'What MoSCoW is — and isn\'t', body: 'MoSCoW classifies requirements as Must, Should, Could, or Won\'t (this time). Used well, it forces hard trade-offs. Used badly, it produces mostly Musts and a sprinkle of Coulds, which prioritises nothing.' },
      { type: 'instruction', title: 'Anchor on a fixed timebox', body: 'MoSCoW only works against a constraint. Without one, every requirement looks like a Must. Set the constraint first: "for the next release in 8 weeks" or "for the £200k budget". Now choices have to be made.' },
      { type: 'checklist', title: 'Define each category clearly', body: 'Be strict:', items: ['Must — the release fails without this; non-negotiable for go-live', 'Should — important and painful to omit, but the release still works without it', 'Could — desirable, included if there\'s capacity left', 'Won\'t (this time) — explicitly out of scope, prevents scope creep'] },
      { type: 'reference', title: 'The 60-20-20 rule', body: 'Aim for ~60% Musts, ~20% Shoulds, ~20% Coulds (by effort, not count). If you have 90% Musts, you haven\'t prioritised — you\'ve just made a list. Push back until the proportions are realistic.' },
      { type: 'checklist', title: 'Defend the line on Musts', body: 'Stakeholders will try to elevate everything. Hold the line by asking:', items: ['Would the user accept the release without this?', 'Is there a workaround, even an awkward one?', 'Does it fail a regulatory or contractual obligation?', 'Does it block another Must?'] },
    ],
  },
  {
    id: 'business-case',
    title: 'Building a business case',
    category: 'ba',
    description: 'Make a compelling, numbers-backed case that wins funding and commitment.',
    estMinutes: 40,
    steps: [
      { type: 'reference', title: 'What a business case has to do', body: 'It has one job: give a decision-maker enough confidence to fund the work. Show the problem, the proposed change, the expected return, the cost, and the risk — clearly enough that someone who doesn\'t know the detail can make the call.' },
      { type: 'instruction', title: 'Lead with the problem, not the solution', body: 'Open with what\'s broken, in numbers people care about: cost, time, customer impact, risk. If you start with "let\'s implement X", reviewers question the solution before agreeing on the problem.' },
      { type: 'checklist', title: 'Quantify the current state', body: 'Get specific:', items: ['Volume and frequency of the problem', 'Direct cost (people, tech, errors, rework)', 'Indirect cost (customer churn, opportunity cost)', 'Time impact (cycle time, manual effort)', 'Risk exposure (compliance, financial)'] },
      { type: 'reference', title: 'Build the financial model', body: 'Cover: one-off costs, ongoing costs, savings or revenue uplift (with assumptions), and the time profile. Use payback period, NPV, or ROI. Be conservative — a case that overshoots once will face years of scepticism.' },
      { type: 'instruction', title: 'Be honest about risk', body: 'Every business case has risks. Listing them transparently builds credibility. Include: implementation risk, adoption risk, benefits realisation risk, and mitigations.' },
      { type: 'instruction', title: 'Plan benefits realisation upfront', body: 'Define how each benefit will be tracked, who owns it, the baseline measure, target measure, and review cadence. This is part of the case, not an afterthought.' },
    ],
  },
  {
    id: 'gap-analysis',
    title: 'Gap analysis',
    category: 'ba',
    description: 'Compare current state to desired state and define what bridges the gap.',
    estMinutes: 30,
    steps: [
      { type: 'instruction', title: 'Define the desired future state', body: '"Better customer service" isn\'t a state — it\'s a wish. "Average first-response time under 4 hours, 90% of tickets resolved on first contact" is a state. Use specific metrics where possible.' },
      { type: 'instruction', title: 'Document the current state', body: 'Measure and describe where you are today, against the same dimensions you used for the future state. Apples-to-apples comparison or the analysis is meaningless.' },
      { type: 'reference', title: 'Dimensions to compare', body: 'Process (how work flows), People (skills and roles), Technology (systems and tools), Data (what\'s captured and how), Performance (KPIs and metrics), Customer experience (what they see and feel).' },
      { type: 'checklist', title: 'Identify each gap', body: 'For each dimension, ask:', items: ['What\'s the difference between current and desired?', 'Is the gap quantitative (numbers) or qualitative (capability)?', 'How big is it — small adjustment or fundamental rework?', 'What\'s the impact of leaving it unaddressed?'] },
      { type: 'checklist', title: 'Define the bridge', body: 'For each gap you\'ll address:', items: ['Specific actions or initiatives required', 'Owner and target date', 'Resources and budget needed', 'How you\'ll measure that the gap is actually closed'] },
    ],
  },
  {
    id: 'workshop-facilitation',
    title: 'Facilitating a workshop',
    category: 'ba',
    description: 'Run productive workshops where the right decisions get made by the right people.',
    estMinutes: 30,
    steps: [
      { type: 'reference', title: 'Workshop vs. meeting', body: 'A meeting shares information. A workshop produces an output — a decision, a design, a prioritised list. If you can\'t name the output you\'re creating, run a meeting, or send an email.' },
      { type: 'instruction', title: 'Define the output before anything else', body: 'Write down what will exist at the end that doesn\'t exist now. The output drives the agenda, the attendees, and the materials.' },
      { type: 'checklist', title: 'Get the right people in the room', body: 'Workshop attendees should be:', items: ['Decision-makers for the topic at hand', 'People with the relevant knowledge or experience', 'People affected by the outcome (or their representatives)', 'A facilitator who isn\'t also a participant', 'Maximum 8–10 for working sessions'] },
      { type: 'reference', title: 'The diverge-converge pattern', body: 'Frame the problem → diverge (generate options broadly, no judgement) → converge (narrow down, evaluate, decide). Skip diverge and you get groupthink. Skip converge and you get a list of unprioritised ideas.' },
      { type: 'instruction', title: 'Close with explicit decisions and owners', body: 'Don\'t end on a high. End on commitments. Walk through every decision and action, name an owner, set a date, and confirm out loud. Send the summary within 24 hours.' },
    ],
  },
  {
    id: 'five-whys',
    title: '5 Whys root cause analysis',
    category: 'pi',
    description: 'Peel back symptoms to find the actual root cause of a problem.',
    estMinutes: 20,
    steps: [
      { type: 'reference', title: 'What it is', body: 'A simple technique from Toyota: ask "why" repeatedly (typically five times) to move past surface symptoms to root causes. Best for problems with mostly linear cause-and-effect.' },
      { type: 'instruction', title: 'Define the problem precisely', body: 'Write the problem in one specific sentence. "Sales are down" is too broad. "Online conversion rate dropped 18% week-over-week starting March 3rd" is workable.' },
      { type: 'checklist', title: 'Get the right people in the room', body: 'You need:', items: ['Someone close to the work who knows what actually happens', 'Someone with access to data to validate hypotheses', 'A facilitator who keeps the group on track', 'No one whose presence will make people self-censor'] },
      { type: 'instruction', title: 'Ask why — and why again', body: 'Ask "why did that happen?" Take the answer, then ask "why?" of that answer. Continue until you hit something that, if fixed, would actually prevent recurrence.' },
      { type: 'reference', title: 'Worked example', body: 'Problem: report was sent late.\nWhy? → Data wasn\'t ready.\nWhy? → Overnight job failed.\nWhy? → A schema change broke it.\nWhy? → The change wasn\'t communicated to the data team.\nWhy? → There\'s no process for flagging schema changes. ← Root cause.' },
      { type: 'instruction', title: 'Design and test the fix', body: 'Address the root cause, not the symptom. Define how you\'ll know the fix worked (a metric, a recurrence check at 30/60/90 days). If the problem comes back, your "root cause" wasn\'t the root cause.' },
    ],
  },
  {
    id: 'kaizen-event',
    title: 'Running a Kaizen event',
    category: 'pi',
    description: 'Plan and run a focused, time-boxed improvement workshop.',
    estMinutes: 35,
    steps: [
      { type: 'reference', title: 'What a Kaizen event is', body: 'A 2–5 day cross-functional workshop focused on improving one specific process. The team analyses, designs, and implements changes within the event itself — not after it. Speed and focus are the point.' },
      { type: 'checklist', title: 'Pre-event preparation (2–4 weeks before)', body: 'Set up for success:', items: ['Define a tight scope and clear objective with measurable target', 'Select a 5–8 person team — mix of process workers, support roles, and a sponsor', 'Brief participants and clear their calendars completely', 'Gather baseline data (current performance, defect rates)', 'Secure a dedicated room with wall space for mapping'] },
      { type: 'instruction', title: 'Day 1 — Understand', body: 'Train the team on the basics. Walk the actual process — go to where the work happens. Build the current-state map. Resist designing solutions today. Today is for seeing reality clearly.' },
      { type: 'instruction', title: 'Days 2–4 — Analyse, design, implement', body: 'Identify root causes of the biggest issues. Design the future state. Then make the changes during the event itself. This is what makes Kaizen different from traditional projects — change happens in the room.' },
      { type: 'checklist', title: 'Day 5 — Sustain and report', body: 'Lock in the gains:', items: ['Document the new standard work clearly', 'Set up daily/weekly measures to track that the change holds', 'Present results to leadership with before/after metrics', 'Recognise the team'] },
      { type: 'reference', title: 'After the event — the 30-day rule', body: 'Schedule a 30-day check: are the changes still in place? Are metrics holding? If not, find out why immediately. The follow-up is part of the work.' },
    ],
  },
  {
    id: 'pareto',
    title: 'Pareto analysis (80/20)',
    category: 'pi',
    description: 'Find the vital few causes responsible for most of the impact.',
    estMinutes: 25,
    steps: [
      { type: 'reference', title: 'The Pareto principle', body: 'Roughly 80% of effects come from 20% of causes. The actual ratio varies, but the pattern holds. Not all causes are equal. Pareto analysis tells you which few to focus on.' },
      { type: 'instruction', title: 'Define what you\'re analysing', body: 'Pick one specific issue: customer complaints, defects, downtime causes, support tickets, reasons for missed deadlines. Mixing types muddies the analysis.' },
      { type: 'checklist', title: 'Categorise the data', body: 'For your dataset:', items: ['Choose categories that are mutually exclusive', 'Avoid an "Other" category bigger than 10–15% — split it further', 'Keep total categories to 6–10 for readability'] },
      { type: 'reference', title: 'Build the chart', body: 'Sort categories from highest to lowest count. Plot bars in that order. Add a cumulative percentage line on top. Where the line crosses ~80% is your "vital few" cutoff.' },
      { type: 'instruction', title: 'Act on the vital few', body: 'For each of the top categories, run root cause analysis and design countermeasures. Don\'t spread effort across all categories — that\'s precisely what Pareto tells you not to do.' },
      { type: 'instruction', title: 'Re-run after fixing', body: 'Once you\'ve addressed the top 1–2 categories, run Pareto again on fresh data. The chart will look different — this rotating focus is how compounding improvement works.' },
    ],
  },
  {
    id: 'sipoc',
    title: 'SIPOC diagram',
    category: 'pi',
    description: 'Map a process at a glance to align stakeholders before diving into detail.',
    estMinutes: 20,
    steps: [
      { type: 'reference', title: 'What SIPOC is for', body: 'SIPOC = Suppliers, Inputs, Process, Outputs, Customers. A high-level view that fits on one page and answers "what is this process doing, end to end?"' },
      { type: 'instruction', title: 'Start in the middle: the Process', body: 'Define the process in 4–7 high-level steps. Not 20 steps. Not 3 vague ones. Each step is a verb-noun phrase: "receive request", "validate eligibility", "issue refund", "notify customer".' },
      { type: 'checklist', title: 'Define Outputs and Customers', body: 'Work right from the process:', items: ['What does the process produce? (decisions, documents, products, services)', 'Who receives each output? (customers can be internal or external)', 'What does each customer need from the output?'] },
      { type: 'instruction', title: 'Define Inputs and Suppliers', body: 'Work left from the process: what does the process need to operate? Who supplies each one? You\'ll often discover unmet input needs in this step.' },
      { type: 'instruction', title: 'Validate with stakeholders', body: 'Walk the SIPOC through the process owner, suppliers, customers, and operators. Expect 2–3 iterations before it\'s right.' },
    ],
  },
  {
    id: 'pdca',
    title: 'Running a PDCA cycle',
    category: 'pi',
    description: 'Use Plan-Do-Check-Act to drive structured, evidence-based improvement.',
    estMinutes: 30,
    steps: [
      { type: 'reference', title: 'Why PDCA still matters', body: 'Most "improvement" fails because teams skip Check (did it actually work?) or Act (what do we do with what we learned?). The full loop is what creates compounding gains.' },
      { type: 'instruction', title: 'Plan — define the change as a hypothesis', body: 'Write the change as: "If we [do X], we expect [Y to change] because [reasoning]. We\'ll measure success by [metric]." Vague plans produce vague results.' },
      { type: 'instruction', title: 'Do — run the change as designed', body: 'Implement the change exactly as planned, not a modified version. If you change two things at once, you won\'t know which one worked.' },
      { type: 'instruction', title: 'Check — compare results to expectations', body: 'Did the metric move? In the right direction? By the predicted amount? Be honest — the temptation to declare victory prematurely is enormous and corrupts the learning.' },
      { type: 'reference', title: 'Three possible outcomes', body: 'Worked as expected → standardise the change.\nWorked partially → keep it but iterate further.\nDidn\'t work → revisit your hypothesis. "We were wrong about why" is a valuable result.' },
      { type: 'checklist', title: 'Act — institutionalise or iterate', body: 'Based on results:', items: ['If successful — update standard work, train people, lock it in', 'If partially successful — refine and run another PDCA', 'If unsuccessful — document what was tried and why it didn\'t work, so others don\'t repeat it'] },
    ],
  },
]

// ─── TEMPLATES DATA ────────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: 'client-proposal',
    title: 'Client proposal template',
    category: 'proposals',
    description: 'A clean structure for proposing a project to a new client — overview, objectives, approach, timeline, pricing.',
    sections: [
      { heading: 'Project overview', body: "Brief summary of the client's challenge and your proposed solution." },
      { heading: 'Objectives', body: 'Key goals and outcomes the client should expect.' },
      { heading: 'Approach', body: 'Outline your phases of work, methodology, and tools.' },
      { heading: 'Timeline', body: 'Estimated start and end dates, along with milestones.' },
      { heading: 'Pricing', body: 'Project-based pricing, optional extras, and payment terms.' },
      { heading: 'Next steps', body: 'Instructions for the client to proceed or book a call.' },
    ],
  },
  {
    id: 'discovery-phase',
    title: 'Project discovery phase template',
    category: 'discovery',
    description: 'Comprehensive discovery doc covering objectives, stakeholders, requirements, risks, timeline, and budget.',
    sections: [
      { heading: '1. Project overview', body: 'Project Name: [Insert Project Name]\nPrepared By: [Your Name/Team]\nDate: [Insert Date]\nVersion: [Version Number]' },
      { heading: '2. Objectives', body: 'Business Goals: [Clearly define what the business aims to achieve with this project.]\nProduct Vision: [Describe the overarching vision for the product or solution.]' },
      { heading: '3. Stakeholder identification', body: 'Primary Stakeholders:\n• Name: [Stakeholder Name]\n• Role: [Stakeholder Role]\n• Contact Information: [Email/Phone]\n• Responsibilities: [Brief description]' },
      { heading: '4. Target audience', body: 'User Personas:\n• Persona Name: [e.g., "Tech-Savvy Young Professional"]\n• Demographics: [Age, Gender, Location, etc.]\n• Needs and Pain Points: [What challenges does this persona face?]\n• Behavioural Traits: [How does this persona interact with similar products?]' },
      { heading: '5. Functional requirements', body: 'Core Features:\n• [Feature Name]: [Description and purpose]\n\nUser Stories:\n• As a [user role], I want to [action], so that [benefit].' },
      { heading: '6. Non-functional requirements', body: 'Performance: [e.g., System should handle 1,000 concurrent users.]\nSecurity: [e.g., Data encryption standards, compliance requirements.]\nUsability: [e.g., Accessible to users with disabilities.]\nScalability: [e.g., Ability to add more servers to handle increased load.]' },
      { heading: '7. Risk assessment', body: 'Potential Risks:\n• Risk: [Description]\n• Impact: [High/Medium/Low]\n• Mitigation Strategy: [Steps to minimise or manage the risk]' },
      { heading: '8. Project timeline', body: 'Phases and Milestones:\n• Phase: [e.g., Discovery, Design, Development, Testing, Deployment]\n• Start Date: [DD/MM/YYYY]\n• End Date: [DD/MM/YYYY]\n• Deliverables: [List of expected outputs]' },
      { heading: '9. Budget estimate', body: 'Resource Allocation:\n• Resource: [e.g., Developer, Designer, Project Manager]\n• Hours: [Estimated hours]\n• Cost: [Hourly rate or fixed cost]\n\nTotal Estimated Budget: [Sum of all costs]' },
      { heading: '10. Approval', body: 'Project Sponsor: _________________________ Date: ___________\nProduct Owner: _________________________ Date: ___________\nProject Manager: _________________________ Date: ___________' },
    ],
  },
  {
    id: 'discovery-interview-toolkit',
    title: 'Enterprise discovery interview toolkit',
    category: 'discovery',
    description: 'A full toolkit for running enterprise-wide discovery interviews — universal questions, function-specific overlays, stakeholder tailoring, and checklists.',
    sections: [
      { heading: 'Overview', body: 'Designed for consultants conducting enterprise-wide discovery interviews across all business functions and stakeholder levels. Includes: universal question set, function-specific overlays, stakeholder tailoring, pre/post interview checklists, and stakeholder mapping template.' },
      { heading: '1. Universal core questions — role & context', body: '• Describe your role and responsibilities.\n• What are your current priorities?\n• Who do you collaborate with most?' },
      { heading: '1.1 Operating model & ways of working', body: '• How does your team fit into the broader operating model?\n• What processes are most critical to your function?\n• Where do you experience bottlenecks or duplication of effort?' },
      { heading: '1.2 Technology & data', body: '• What core systems/tools do you rely on?\n• Where does data help or hinder decision-making?\n• Are there any workarounds or manual processes you rely on?' },
      { heading: '1.3 KPIs & success measures', body: '• How is performance measured in your area?\n• Do the current metrics reflect what success really looks like?\n• What\'s working well — and what isn\'t?' },
      { heading: '1.4 Pain points & opportunities', body: '• What frustrates you or slows you down?\n• What has the team raised repeatedly but hasn\'t been addressed?\n• Where do you see quick wins or major change potential?' },
      { heading: '2. Function overlays — finance', body: '• How are budgets set and tracked across departments?\n• Where do you see inefficiencies in cost management or forecasting?\n• Are there challenges in getting timely, accurate financial data?' },
      { heading: '2.1 Operations / supply chain', body: '• What are the critical processes driving daily operations?\n• Where are delays, waste, or quality issues occurring?\n• What\'s the level of automation vs. manual effort?' },
      { heading: '2.2 Sales & commercial', body: '• How are leads generated, qualified, and closed?\n• What\'s the process for pricing, discounts, and approvals?\n• Are there disconnects between sales, marketing, and delivery?' },
      { heading: '2.3 HR / people / talent', body: '• How are roles, responsibilities, and org structures defined?\n• What\'s the current state of recruitment, onboarding, and retention?\n• How do employees raise issues or feedback?' },
      { heading: '3. Stakeholder-level tailoring — executives', body: '• What are your strategic priorities?\n• Where does the org underperform vs potential?\n• What worries you most about the future?\n• If you had a blank cheque, what would you fix?' },
      { heading: '3.1 Middle management', body: '• What are the top 3 processes your team runs regularly?\n• Where do you spend the most time firefighting?\n• How do you pass feedback up or down the chain?' },
      { heading: '3.2 SMEs / frontline staff', body: '• Walk me through a typical day or workflow — what\'s smooth, what\'s not?\n• What steps do you take outside the "official" process to get things done?\n• If you could automate or change one task, what would it be?' },
      { heading: '4. Pre-interview checklist', body: '• Review available org charts, decks, or process maps.\n• Understand the function\'s role in the value chain.\n• Customise questions based on role and business area.\n• Set clear meeting objectives in calendar invites.' },
      { heading: '5. Post-interview checklist', body: '• Summarise insights: pain points, blockers, quick wins.\n• Note recurring quotes, phrases, or themes.\n• Capture stakeholder sentiment and change readiness.\n• Update stakeholder map with new intelligence.' },
    ],
  },
  {
    id: 'client-onboarding',
    title: 'Client onboarding form',
    category: 'discovery',
    description: 'A simple onboarding form to capture company details, objectives, stakeholders, and access needs.',
    sections: [
      { heading: 'Company information', body: 'Name, address, registration number, key contacts.' },
      { heading: 'Project background', body: 'Brief description of current challenges.' },
      { heading: 'Key objectives', body: 'Top goals and desired outcomes.' },
      { heading: 'Stakeholders', body: 'Names and roles of decision-makers.' },
      { heading: 'Access needs', body: 'Systems, documents, or teams you\'ll need access to.' },
      { heading: 'Preferred communication', body: 'Email, video, phone, frequency.' },
    ],
  },
  {
    id: 'consultancy-agreement',
    title: 'Freelance consultancy agreement',
    category: 'contracts',
    description: 'A full freelance consultancy agreement covering scope, payment, IP, confidentiality, and termination.',
    sections: [
      { heading: 'Preamble', body: 'This Freelance Consultancy Agreement (the "Agreement") is made and entered into on this [DATE], by and between the Client (hereinafter referred to as "Client") and the Consultant (hereinafter referred to as "Consultant").' },
      { heading: '1. Scope of work', body: 'Consultant shall provide Business Transformation consultancy services to Client. The nature, scope, and deliverables of the services shall be mutually agreed in writing prior to the start of each project phase or engagement.' },
      { heading: '2. Payment terms', body: 'Client agrees to pay Consultant on a project basis, with invoices issued monthly. Payment shall be made within 14 days of receipt of invoice. Late payments may be subject to a 5% late fee.' },
      { heading: '3. Work location', body: 'Consultant may perform services remotely and/or on-site at the Client\'s location, as required. Travel and related expenses for on-site work shall be pre-approved by Client and reimbursed in full.' },
      { heading: '4. Intellectual property', body: 'Consultant retains ownership of all intellectual property, frameworks, templates, and materials created during services. Client is granted a non-exclusive, non-transferable licence to use the deliverables solely for internal business purposes.' },
      { heading: '5. Confidentiality', body: 'Both parties agree to maintain the confidentiality of any proprietary or sensitive information disclosed during the engagement.' },
      { heading: '6. Termination', body: 'Either party may terminate this Agreement with 14 days\' written notice. Client shall pay Consultant for all work completed up to the termination date.' },
      { heading: '7. Governing law', body: 'This Agreement shall be governed by and construed in accordance with the laws of England and Wales.' },
      { heading: 'Signatures', body: 'Client Name: _________________________          Date: ___________\nConsultant Name: _________________________   Date: ___________' },
    ],
  },
  {
    id: 'statement-of-work',
    title: 'Statement of work template',
    category: 'contracts',
    description: 'A clear SoW covering scope, timeline, responsibilities, payment, and acceptance criteria.',
    sections: [
      { heading: 'Scope of services', body: 'Detailed description of the services and deliverables.' },
      { heading: 'Project timeline', body: 'Start date, end date, and major milestones.' },
      { heading: 'Roles and responsibilities', body: 'What you handle vs what the client handles.' },
      { heading: 'Payment terms', body: 'Project fee, invoice schedule, and payment method.' },
      { heading: 'Acceptance criteria', body: 'How and when the client will approve the work.' },
      { heading: 'Signatures', body: 'Space for sign-off from both sides.' },
    ],
  },
  {
    id: 'nda',
    title: 'NDA template',
    category: 'contracts',
    description: 'A standard non-disclosure agreement covering confidentiality scope, obligations, exclusions, and duration.',
    sections: [
      { heading: 'Definition of confidential information', body: 'Covers what counts as confidential between you and the client.' },
      { heading: 'Obligations of receiving party', body: 'The client agrees not to disclose or misuse your confidential info.' },
      { heading: 'Exclusions', body: 'Information that is public or already known is not covered.' },
      { heading: 'Duration', body: 'Usually 2–5 years. Define how long confidentiality is required.' },
      { heading: 'Governing law', body: 'Subject to the laws of England and Wales.' },
      { heading: 'Signatures', body: 'Space for both parties to sign and date.' },
    ],
  },
  {
    id: 'privacy-policy',
    title: 'Privacy & data protection policy',
    category: 'contracts',
    description: 'A UK GDPR-compliant privacy policy template for client-facing data practices.',
    sections: [
      { heading: 'Data collected', body: 'Names, emails, project data, and other client-submitted info.' },
      { heading: 'Usage of data', body: 'Only for agreed consulting purposes.' },
      { heading: 'Data storage', body: 'How and where client data is stored securely.' },
      { heading: 'Client rights', body: 'Right to access, correct, or delete their data.' },
      { heading: 'Contact', body: 'Your details for data-related queries.' },
      { heading: 'Governing law', body: 'Complies with UK GDPR.' },
    ],
  },
  {
    id: 'invoice-standard',
    title: 'Invoice template (standard)',
    category: 'finance',
    description: 'A clean, professional invoice template for consulting services with VAT support.',
    sections: [
      { heading: 'Header', body: 'INVOICE\n\nConsultant Name: [Your Full Name]\nBusiness Address: [Your Address]\nEmail: [Your Email Address]\nPhone: [Your Phone Number]\n\nInvoice Date: [Date]\nInvoice Number: [Unique Number]' },
      { heading: 'Bill to', body: 'Client Name: [Client\'s Name]\nClient Company: [Client\'s Company Name]\nClient Address: [Client\'s Address]' },
      { heading: 'Line items', body: 'Description | Hours/Days | Rate | Amount\n———————————————————————\nBusiness Transformation Consulting Services for [Month] | [e.g. 10] | £[Rate] | £[Total]' },
      { heading: 'Totals', body: 'Subtotal: £[Subtotal]\nVAT (if applicable): £[VAT]\nTotal Amount Due: £[Total Amount]' },
      { heading: 'Payment terms', body: 'Payment is due within 14 days of invoice date.\n\nBank Details: [Your Bank Name, Sort Code, Account Number]\n\nThank you for your business!' },
    ],
  },
  {
    id: 'invoice-logo',
    title: 'Invoice template (with logo)',
    category: 'finance',
    description: 'Invoice template with a placeholder for your logo and a default day rate.',
    sections: [
      { heading: 'Header', body: 'INVOICE\n\n[YOUR LOGO HERE]\n\nConsultant Name: [Your Full Name]\nBusiness Address: [Your Address]\nEmail: [Your Email Address]\n\nInvoice Date: [Date]\nInvoice Number: [Unique Number]' },
      { heading: 'Bill to', body: 'Client Name: [Client\'s Name]\nClient Company: [Client\'s Company Name]\nClient Address: [Client\'s Address]' },
      { heading: 'Line items', body: 'Description | Days | Rate | Amount\n———————————————————————\nBusiness Transformation Consulting Services for [Month] | [e.g. 10] | £500 | £[Total]' },
      { heading: 'Totals', body: 'Subtotal: £[Subtotal]\nVAT (if applicable): £[VAT]\nTotal Amount Due: £[Total Amount]' },
      { heading: 'Payment terms', body: 'Payment is due within 14 days of invoice date.\n\nBank Details: [Your Bank Name, Sort Code, Account Number]' },
    ],
  },
  {
    id: 'expense-report',
    title: 'Expense report template',
    category: 'finance',
    description: 'Track client-billable expenses with a simple, repeatable format.',
    sections: [
      { heading: 'How to use', body: 'Fill out this form for each client-billable expense. Include with your monthly invoice.' },
      { heading: 'Table format', body: 'Date | Description | Amount | Receipt Attached (Y/N)\n——————————————————————————\n[Date] | [e.g. Train to London] | £[Amount] | Y\n[Date] | [e.g. Client lunch] | £[Amount] | Y' },
      { heading: 'Submission', body: 'Attach receipts (photos or PDFs). Include this report with your invoice. Pre-approval required for expenses over £[Threshold].' },
    ],
  },
]

// ─── CHEAT SHEETS DATA ─────────────────────────────────────────────────────────

const CHEAT_SHEETS = [
  {
    id: 'excel-essentials',
    title: 'Excel essentials for BAs',
    category: 'spreadsheets',
    description: 'The Excel knowledge a business analyst actually uses — formulas, lookups, conditional logic, and pivot tables.',
    sections: [
      { heading: 'Cell references', body: 'Relative: A1 — moves when copied\nAbsolute: $A$1 — never moves\nMixed: $A1 (column locked) or A$1 (row locked)\n\nRule: lock what shouldn\'t change. If you\'re copying a formula down a column but always want it to refer to the same lookup table, lock the table reference with $.' },
      { heading: 'Logical functions', body: 'IF — single condition\n=IF(A1>100, "High", "Low")\n\nIFS — multiple conditions, returns first match\n=IFS(A1>=90,"A", A1>=80,"B", TRUE,"Fail")\n\nAND / OR — combine conditions\n=IF(AND(A1>100, B1<50), "Yes", "No")\n\nIFERROR — fallback if formula fails\n=IFERROR(A1/B1, 0)' },
      { heading: 'Lookups', body: 'XLOOKUP (modern, recommended)\n=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])\n=XLOOKUP("Acme", A:A, B:B, "Not found")\n\nVLOOKUP (legacy, still common)\n=VLOOKUP(lookup_value, table, column_number, FALSE)\n\nINDEX/MATCH (flexible, works in any direction)\n=INDEX(B:B, MATCH("Acme", A:A, 0))' },
      { heading: 'Counting and summing with conditions', body: 'COUNTIF — count matching cells\n=COUNTIF(A:A, "London")\n\nSUMIF — sum matching cells\n=SUMIF(A:A, "London", B:B)\n\nMultiple conditions:\n=COUNTIFS(A:A, "London", B:B, ">100")\n=SUMIFS(C:C, A:A, "London", B:B, ">100")' },
      { heading: 'Text functions', body: 'LEN — length of a string\nLEFT / RIGHT / MID — extract characters\n  =LEFT(A1, 3) returns first 3 characters\n  =MID(A1, 4, 5) starts at position 4, takes 5 characters\n\nTRIM — remove extra spaces (essential before lookups)\nUPPER / LOWER / PROPER — change case\nCONCAT or & — join strings: =A1 & " — " & B1' },
      { heading: 'Pivot tables — the BA\'s power tool', body: '1. Select your data → Insert → PivotTable\n2. Drag fields into:\n   • Rows — categories you want to break down\n   • Values — what to count, sum, or average\n   • Filters — top-level filters\n\nKey tricks:\n• Right-click a value → Summarise Values By (change Sum to Count, Average, etc.)\n• Right-click → Show Values As → % of Grand Total\n• Group dates by right-click → Group\n• Refresh after data changes: Data → Refresh All' },
      { heading: 'Common BA formulas', body: 'Year-over-year change:\n=(this_year/last_year)-1\n\nRunning total:\n=SUM($B$2:B2) — drag down\n\nFlag duplicates:\n=COUNTIF($A:$A, A1)>1\n\nClassify with thresholds:\n=IFS(A1>=10000,"Enterprise", A1>=1000,"Mid", TRUE,"Small")\n\nCount unique values:\n=COUNTA(UNIQUE(A2:A100))' },
      { heading: 'Keyboard shortcuts worth knowing', body: 'Ctrl+Arrow — jump to edge of data\nCtrl+Shift+Arrow — select to edge\nCtrl+T — turn data into a Table\nCtrl+Shift+L — toggle filters\nF4 — toggle absolute/relative reference\nAlt+= — auto-sum\nCtrl+; — insert today\'s date\nCtrl+E — Flash Fill (auto-detect a pattern)' },
    ],
  },
  {
    id: 'sql-for-bas',
    title: 'SQL for business analysts',
    category: 'sql',
    description: 'Practical SQL for BAs — pulling, filtering, joining, and aggregating data without needing a developer.',
    sections: [
      { heading: 'The anatomy of a SELECT statement', body: 'SELECT column1, column2  -- which columns\nFROM table_name           -- which table\nWHERE condition           -- filter rows\nGROUP BY column           -- aggregate by\nHAVING aggregate_filter   -- filter aggregates\nORDER BY column           -- sort\nLIMIT n;                  -- only n rows\n\nOrder it runs: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT' },
      { heading: 'Filtering with WHERE', body: '-- Equality\nWHERE country = \'UK\'\n\n-- Numeric ranges\nWHERE order_value BETWEEN 100 AND 500\n\n-- Multiple values\nWHERE country IN (\'UK\', \'France\', \'Spain\')\n\n-- Pattern matching\nWHERE email LIKE \'%@gmail.com\'\n\n-- Missing data\nWHERE phone IS NULL\n\n-- Combining\nWHERE country = \'UK\' AND status = \'Open\'' },
      { heading: 'Aggregating data', body: 'COUNT(*) — count all rows\nCOUNT(DISTINCT column) — count unique values\nSUM(column) — total\nAVG(column) — mean\nMIN / MAX(column) — extremes\n\nExample:\nSELECT\n  country,\n  COUNT(*) AS orders,\n  SUM(order_value) AS revenue\nFROM orders\nGROUP BY country\nORDER BY revenue DESC;' },
      { heading: 'Joining tables', body: 'INNER JOIN — only rows that match in both tables\nLEFT JOIN — all rows from the left table; null for unmatched right rows\n\nSELECT\n  o.order_id,\n  c.name,\n  o.order_value\nFROM orders o\nLEFT JOIN customers c\n  ON o.customer_id = c.customer_id;\n\nAlways alias tables (o, c) for readable joins.\nAlways specify the join type explicitly.' },
      { heading: 'Useful patterns BAs hit daily', body: '-- Top N records\nSELECT * FROM orders\nORDER BY order_value DESC\nLIMIT 10;\n\n-- Records in last 30 days\nWHERE order_date >= CURRENT_DATE - INTERVAL \'30 days\'\n\n-- Find duplicates\nSELECT email, COUNT(*)\nFROM customers\nGROUP BY email\nHAVING COUNT(*) > 1;\n\n-- Customers who haven\'t ordered\nSELECT c.*\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.order_id IS NULL;' },
      { heading: 'CASE — conditional logic', body: 'CASE\n  WHEN order_value >= 1000 THEN \'High\'\n  WHEN order_value >= 100 THEN \'Medium\'\n  ELSE \'Low\'\nEND AS value_band\n\n-- Pivoting with CASE:\nSELECT\n  country,\n  SUM(CASE WHEN status=\'Open\' THEN 1 ELSE 0 END) AS open_orders,\n  SUM(CASE WHEN status=\'Closed\' THEN 1 ELSE 0 END) AS closed_orders\nFROM orders\nGROUP BY country;' },
      { heading: 'Window functions — the BA superpower', body: '-- Running total\nSUM(order_value) OVER (ORDER BY order_date) AS running_total\n\n-- Rank within a group\nRANK() OVER (PARTITION BY country ORDER BY order_value DESC) AS country_rank\n\n-- Compare to previous row\nLAG(order_value) OVER (ORDER BY order_date) AS previous_order' },
      { heading: 'Common pitfalls to avoid', body: '• NULLs don\'t equal anything. Use IS NULL, never = NULL.\n• COUNT(column) ignores NULLs; COUNT(*) counts all rows.\n• WHERE filters before grouping; HAVING filters after.\n• Always check JOIN cardinality — unexpected row multiplication means duplicates.\n• Always LIMIT during exploration on production databases.' },
    ],
  },
  {
    id: 'data-storytelling',
    title: 'Data storytelling for practitioners',
    category: 'storytelling',
    description: 'How to turn analysis into insight that drives decisions — structuring narratives, choosing visuals, and presenting to stakeholders.',
    sections: [
      { heading: 'What data storytelling actually is', body: 'Three components, all required:\n\n• Data — the underlying numbers and analysis\n• Visuals — charts that make patterns visible\n• Narrative — the human framing that gives it meaning\n\nA chart without narrative is decoration. A narrative without data is opinion. The skill is weaving all three.' },
      { heading: 'Start with the audience, not the data', body: 'Before building a single chart, answer:\n\n• Who is the audience? (Executive, peer, frontline)\n• What do they already know?\n• What decision are they trying to make?\n• What\'s their tolerance for detail?\n• What\'s in it for them?\n\nThe same data needs three different stories for an executive, an operational lead, and a peer analyst.' },
      { heading: 'The narrative arc', body: '1. Context — what\'s the situation?\n2. Change/Trigger — what\'s different or worth attention?\n3. Tension — what\'s at stake or in conflict?\n4. Insight — what does the data reveal?\n5. Recommendation — what should happen?\n\nExample: "Sales were stable for two years (context). In Q3 they dropped 18% (change). At current rates we\'ll miss target by £4M (tension). The drop is concentrated in two products and one region (insight). We should reallocate marketing spend (recommendation)."' },
      { heading: 'Choosing the right chart', body: 'COMPARISON across categories → bar chart\nCHANGE over time → line chart\nDISTRIBUTION of values → histogram or box plot\nPART-TO-WHOLE → bar chart (not pie)\nRELATIONSHIP between two variables → scatter plot\nSINGLE KPI → big number with context\n\nDefault rule: if you\'re reaching for a pie chart, try a bar chart instead. They\'re almost always more readable.' },
      { heading: 'Decluttering visuals', body: 'Remove anything that isn\'t the message:\n\n• Drop chart borders, gridlines, and unnecessary legends\n• Label data directly when possible (no legend hunting)\n• Use a single accent colour to highlight what matters; mute the rest\n• Cut decimal places that don\'t change the story (£1,234,567 → £1.2M)\n• Sort categorical data deliberately (largest first, or chronological — never alphabetical unless lookup is the point)' },
      { heading: 'Using text in visuals', body: 'Text is part of the visualisation:\n\n• Put the insight in the title, not a generic description\n  "Sales fell 18% in Q3" beats "Quarterly sales"\n• Use the subtitle for context\n  "Driven by product line A and the EMEA region"\n• Annotate key data points directly on the chart\n• Don\'t make the reader work — call out what they should notice' },
      { heading: 'Avoiding misleading stories', body: 'Common ways data stories mislead:\n\n• Truncated y-axes that exaggerate small changes\n• Cherry-picked time ranges that hide the bigger trend\n• Aggregate metrics that mask underlying variation\n• Sample sizes too small to support claims\n• Correlation presented as causation\n\nIntegrity test: would I be comfortable showing this to someone who disagreed with my conclusion?' },
      { heading: 'The 30-second test', body: 'Strip your data story down to a 30-second elevator pitch:\n\n• What\'s the headline insight?\n• What\'s the recommendation?\n• What\'s the most important supporting evidence?\n\nIf you can\'t do it in 30 seconds, you don\'t understand your own analysis well enough yet. Iterate until you can.' },
    ],
  },
  {
    id: 'stats-for-bas',
    title: 'Statistics for practitioners',
    category: 'stats',
    description: 'The descriptive statistics, probability concepts, and distributions a practitioner needs to interpret data without a maths degree.',
    sections: [
      { heading: 'Measures of centre', body: 'MEAN (average) — sum ÷ count\n• Best for symmetric data\n• Pulled toward outliers (a few huge values skew it)\n\nMEDIAN — middle value when sorted\n• Best for skewed data (income, house prices)\n• Robust to outliers\n\nMODE — most frequent value\n• Best for categorical data\n\nRule: if mean and median are very different, the data is skewed. Always check both.' },
      { heading: 'Measures of spread', body: 'RANGE — max minus min\n• Quick but heavily affected by outliers\n\nIQR (Interquartile Range) — Q3 minus Q1\n• Range of the middle 50%\n• Robust to outliers\n\nSTANDARD DEVIATION — square root of variance\n• Same units as the data\n• Roughly: 68% of normal data falls within 1 SD of the mean, 95% within 2 SDs\n\nA mean without a measure of spread tells you very little.' },
      { heading: 'Distributions to recognise', body: 'NORMAL (bell curve)\n• Symmetric around mean = median\n• Lots of natural data (heights, measurement errors)\n\nSKEWED\n• Right-skewed: long tail on the right (income, sales values)\n  Mean > Median\n• Left-skewed: long tail on the left\n  Mean < Median\n\nBIMODAL — two peaks\n• Often signals two populations mixed together\n• Investigate before treating as one group' },
      { heading: 'Correlation', body: 'Measures how two variables move together. Scored from -1 to +1.\n\n+1 — perfect positive (X up, Y up)\n+0.7 — strong positive\n0 — no linear relationship\n-1 — perfect negative\n\nThree critical caveats:\n1. Correlation only catches LINEAR relationships.\n2. Correlation ≠ causation. Ice cream sales correlate with drowning. Both are caused by summer.\n3. A single outlier can drastically change the number. Always plot before believing it.' },
      { heading: 'Sample size quick guide', body: 'Rough guide for "is this sample reliable?":\n\n• Under 30 — treat as anecdotal, not statistical\n• 30–100 — useful directionally, wide error bars\n• 100–1,000 — reasonable confidence in patterns\n• Over 1,000 — small effects become detectable\n\nKey point: a biased sample of 100,000 is worse than a representative sample of 100. Check who\'s in it before checking how many.' },
      { heading: 'Counts vs. proportions', body: 'COUNTS tell you size: "We had 47 complaints this month"\nPROPORTIONS tell you context: "47 complaints out of 4,200 customers = 1.1%"\n\nAlways present both when possible.\n\n"Conversions doubled" is meaningless if you don\'t know whether they went from 5 to 10 or 5,000 to 10,000.' },
      { heading: 'Common statistical mistakes', body: '• Using the mean on heavily skewed data → use median\n• Drawing conclusions from very small samples\n• Treating correlation as causation\n• Cherry-picking time periods to support a conclusion\n• Confusing statistical significance with practical importance\n• Ignoring sampling bias (who got included, who didn\'t)\n• Reporting precision the data doesn\'t support (£1,234,567.89 from a rough estimate)' },
      { heading: 'Sanity checks before sharing', body: 'Before presenting any statistical finding, ask:\n\n• Is the sample size large enough to support this claim?\n• Could selection bias explain the result?\n• Is there a confounding variable?\n• Have I checked the distribution, not just the summary?\n• Would the conclusion change if I removed outliers?\n• Am I conflating correlation with causation?\n• Is the precision I\'m reporting actually supported by the data?\n\nIf any answer is "I don\'t know", caveat your finding accordingly.' },
    ],
  },
]

// ─── DOWNLOAD HELPER ──────────────────────────────────────────────────────────

function downloadAsText(item) {
  const content =
    `${item.title}\n${'='.repeat(item.title.length)}\n\n${item.description}\n\n` +
    item.sections.map(s => `${s.heading}\n${'-'.repeat(s.heading.length)}\n${s.body}`).join('\n\n')
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${item.id}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ─── LOCAL STORAGE ────────────────────────────────────────────────────────────

function loadState() {
  try {
    const raw = localStorage.getItem('wp_v2')
    return raw ? JSON.parse(raw) : { users: {}, currentUser: null, progress: {} }
  } catch {
    return { users: {}, currentUser: null, progress: {} }
  }
}

function saveState(s) {
  try { localStorage.setItem('wp_v2', JSON.stringify(s)) } catch {}
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

function GradientText({ children, gradient }) {
  return (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
      {children}
    </span>
  )
}

function CategoryBadge({ category, catMap, size = 'sm' }) {
  const cat = catMap[category]
  if (!cat) return null
  const Icon = cat.icon
  const padding = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${padding} text-white bg-gradient-to-r ${cat.gradient}`}
    >
      <Icon className="w-3 h-3" />
      {cat.short}
    </span>
  )
}

function StepTypeIcon({ type }) {
  const configs = {
    instruction: { gradient: 'from-indigo-500 to-violet-600', Icon: Zap },
    checklist:   { gradient: 'from-fuchsia-500 to-pink-600',  Icon: CheckCircle2 },
    reference:   { gradient: 'from-amber-400 to-orange-500',  Icon: Star },
  }
  const { gradient, Icon } = configs[type] || configs.instruction
  return (
    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm flex-shrink-0`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
  )
}

// ─── DAILY QUOTE ──────────────────────────────────────────────────────────────

function DailyQuote() {
  const q = getDailyQuote()
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-900 p-6 md:p-8 mb-8 shadow-lg">
      <div className="absolute -top-14 -right-14 w-44 h-44 rounded-full bg-amber-400 opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-violet-500 opacity-15 blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold mb-4">
          <Sparkles className="w-3 h-3 text-amber-300" />
          Quote of the day
        </div>
        <div className="flex gap-3 items-start">
          <Quote className="w-8 h-8 text-white/20 flex-shrink-0 -mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-base md:text-lg font-medium text-white leading-relaxed mb-2">{q.text}</p>
            <p className="text-amber-200 text-sm font-medium">— {q.author}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── AUTH SCREEN ──────────────────────────────────────────────────────────────

function AuthModal({ users, onLogin, onSignUp, onClose, contextMessage }) {
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  const submit = () => {
    setError('')
    const em = email.trim().toLowerCase()
    if (!em || !password) { setError('Please fill in all required fields.'); return }

    if (mode === 'signup') {
      if (!name.trim()) { setError('Please enter your name.'); return }
      if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
      if (users[em]) { setError('An account with this email already exists. Try signing in.'); return }
      onSignUp({ email: em, name: name.trim(), password })
    } else {
      const u = users[em]
      if (!u) { setError('No account found. Try signing up.'); return }
      if (u.password !== password) { setError('Incorrect password.'); return }
      onLogin(em)
    }
  }

  const switchMode = (m) => { setMode(m); setError(''); setPassword('') }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-md my-8 bg-white rounded-3xl shadow-2xl p-7 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3 h-3" />
            Work Playbooks
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h2>
          {contextMessage && <p className="text-slate-500 text-sm">{contextMessage}</p>}
        </div>

        <div className="flex bg-slate-100 rounded-xl p-1 mb-5">
          {['signin', 'signup'].map(m => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {m === 'signin' ? 'Sign in' : 'Sign up'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-violet-500 text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-violet-500 text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPw ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submit()}
                placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
                className="w-full pl-10 pr-10 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-violet-500 text-slate-900 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={submit}
            className="w-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-600 text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-pink-500/25 mt-1"
          >
            {mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          {mode === 'signup' ? 'Already have an account? ' : 'New here? '}
          <button
            onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-violet-600 font-semibold hover:underline"
          >
            {mode === 'signup' ? 'Sign in' : 'Create an account'}
          </button>
        </p>
        <p className="text-center text-xs text-slate-400 mt-3">
          Progress is saved locally on this device.
        </p>
      </div>
    </div>
  )
}

// ─── ITEM MODAL (templates + cheat sheets drill-down) ─────────────────────────

function ItemModal({ item, catMap, onClose, onDownload }) {
  const [copied, setCopied] = useState(false)
  const cat = catMap[item.category]
  const Icon = cat?.icon || FileText

  const handleCopy = async () => {
    const content = `${item.title}\n\n${item.description}\n\n` +
      item.sections.map(s => `${s.heading}\n${s.body}`).join('\n\n')
    try { await navigator.clipboard.writeText(content) } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md p-4 overflow-y-auto flex"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="max-w-2xl w-full mx-auto my-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className={`bg-gradient-to-r ${cat?.gradient || 'from-slate-500 to-slate-700'} p-6 md:p-8 text-white relative flex-shrink-0`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white/95 text-xs font-bold mb-3">
            <Icon className="w-3 h-3" />
            {cat?.label}
          </div>
          <h2 className="text-xl md:text-2xl font-bold leading-tight mb-2">{item.title}</h2>
          <p className="text-white/85 text-sm leading-relaxed">{item.description}</p>
        </div>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5">
          {item.sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                {section.heading}
              </h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm pl-5 border-l-2 border-slate-100">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 md:p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-2 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 transition font-semibold text-sm"
          >
            {copied ? <><Check className="w-4 h-4 text-emerald-600" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy to clipboard</>}
          </button>
          <button
            onClick={() => onDownload(item)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r ${cat?.gradient || 'from-slate-600 to-slate-800'} text-white hover:opacity-90 transition font-bold shadow-md text-sm`}
          >
            <Download className="w-4 h-4" />
            Download .txt
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── CELEBRATION MODAL ────────────────────────────────────────────────────────

function CelebrationModal({ playbookTitle, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-pink-50 to-violet-50 opacity-60" />
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-400 via-pink-500 to-violet-500 flex items-center justify-center shadow-xl">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Nailed it!</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            You finished <span className="font-semibold text-slate-900">{playbookTitle}</span>. Now go apply it.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition shadow-lg"
          >
            Back to library
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── PLAYBOOK RUNNER ──────────────────────────────────────────────────────────

function PlaybookRunner({ playbook, stepIndex, completedSteps, onStepToggle, onNavigate, onExit }) {
  const cat = PLAYBOOK_CATEGORIES[playbook.category]
  const step = playbook.steps[stepIndex]
  const totalSteps = playbook.steps.length
  const completedCount = Object.values(completedSteps).filter(Boolean).length
  const progressPct = Math.round((completedCount / totalSteps) * 100)
  const isComplete = !!completedSteps[stepIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Sticky header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition group"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-medium">Library</span>
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-slate-900">{stepIndex + 1}</span>
            <span className="text-slate-400">of {totalSteps}</span>
          </div>
        </div>
        <div className="h-1 bg-slate-100">
          <div
            className={`h-full bg-gradient-to-r ${cat.gradient} transition-all duration-500`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 pb-28">
        {/* Playbook title */}
        <div className="mb-6">
          <CategoryBadge category={playbook.category} catMap={PLAYBOOK_CATEGORIES} />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3 leading-tight">{playbook.title}</h1>
        </div>

        {/* Step card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-7 mb-5 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <StepTypeIcon type={step.type} />
            <div className="flex-1 min-w-0">
              <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">
                {step.type === 'instruction' && '⚡ How to'}
                {step.type === 'checklist' && '✓ Checklist'}
                {step.type === 'reference' && '✦ Reference'}
              </div>
              <h2 className={`text-xl font-bold leading-tight ${isComplete ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                {step.title}
              </h2>
            </div>
            <button
              onClick={() => onStepToggle(stepIndex)}
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                isComplete
                  ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md'
                  : 'border-2 border-slate-300 hover:border-slate-500'
              }`}
            >
              {isComplete && <CheckCircle2 className="w-5 h-5 text-white" />}
            </button>
          </div>

          <p className="text-slate-600 leading-relaxed mb-4 text-base">{step.body}</p>

          {step.items && (
            <ul className="space-y-2 mt-4">
              {step.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-700 bg-slate-50 rounded-xl p-3 hover:bg-slate-100 transition">
                  <div className={`mt-0.5 w-5 h-5 rounded-md bg-gradient-to-br ${cat.gradient} flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-sm`}>
                    {i + 1}
                  </div>
                  <span className="leading-relaxed text-sm">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Step dots */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {playbook.steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                idx === stepIndex
                  ? `bg-gradient-to-br ${cat.gradient} text-white shadow-md scale-110`
                  : completedSteps[idx]
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {completedSteps[idx] ? '✓' : idx + 1}
            </button>
          ))}
        </div>
      </main>

      {/* Fixed bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={() => onNavigate(stepIndex - 1)}
            disabled={stepIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          <div className="text-sm font-medium text-slate-500 hidden sm:flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            {completedCount} of {totalSteps} done
          </div>
          <button
            onClick={() => onNavigate(stepIndex + 1)}
            disabled={stepIndex === totalSteps - 1}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${cat.gradient} text-white hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition font-semibold shadow-md text-sm`}
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── PLAYBOOKS SECTION ────────────────────────────────────────────────────────

function PlaybooksSection({ progress, onStart, onReset }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = PLAYBOOKS.filter(p => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.category === filter
    return matchSearch && matchFilter
  })

  const showCategoryCards = filter === 'all' && !search

  return (
    <>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search playbooks..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-slate-200 bg-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition text-slate-900 placeholder:text-slate-400 font-medium text-sm"
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${filter === 'all' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300'}`}
        >
          All ({PLAYBOOKS.length})
        </button>
        {Object.entries(PLAYBOOK_CATEGORIES).map(([key, cat]) => {
          const Icon = cat.icon
          const count = PLAYBOOKS.filter(p => p.category === key).length
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === key
                  ? `bg-gradient-to-r ${cat.gradient} text-white shadow-md`
                  : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Category overview cards (landing) */}
      {showCategoryCards && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(PLAYBOOK_CATEGORIES).map(([key, cat]) => {
            const Icon = cat.icon
            const count = PLAYBOOKS.filter(p => p.category === key).length
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="relative overflow-hidden rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-300 p-5 text-left transition-all hover:shadow-lg hover:-translate-y-0.5 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${cat.gradient} text-white mb-2`}>
                  {count} playbooks
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{cat.label}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{cat.description}</p>
                <div className="mt-3 text-xs font-semibold text-slate-400 flex items-center gap-1">
                  Browse <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Playbook cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map(pb => {
          const cat = PLAYBOOK_CATEGORIES[pb.category]
          const Icon = cat.icon
          const prog = progress[pb.id] || { steps: {}, completed: 0 }
          const completedCount = prog.completed || 0
          const isDone = completedCount === pb.steps.length && completedCount > 0
          const isStarted = completedCount > 0 && !isDone
          const pct = Math.round((completedCount / pb.steps.length) * 100)

          return (
            <div key={pb.id} className="relative bg-white rounded-2xl border-2 border-slate-200 hover:border-slate-300 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 group">
              <div className={`h-1.5 bg-gradient-to-r ${cat.gradient}`} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <CategoryBadge category={pb.category} catMap={PLAYBOOK_CATEGORIES} />
                  {isDone && (
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <Trophy className="w-3 h-3" />
                      Done
                    </div>
                  )}
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-1.5 leading-tight">{pb.title}</h2>
                <p className="text-slate-500 mb-3 leading-relaxed text-sm">{pb.description}</p>

                <div className="flex items-center gap-3 text-xs text-slate-400 mb-4 font-medium">
                  <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pb.estMinutes} min</div>
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  <div>{pb.steps.length} steps</div>
                </div>

                {isStarted && (
                  <div className="mb-4 bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-500" />
                        {completedCount}/{pb.steps.length} done
                      </span>
                      <span className="text-slate-900">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${cat.gradient} transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onStart(pb)}
                    className={`flex-1 bg-gradient-to-r ${cat.gradient} text-white py-2.5 rounded-xl font-bold hover:opacity-90 transition shadow-sm flex items-center justify-center gap-2 text-sm`}
                  >
                    {isDone ? 'Review' : isStarted ? 'Resume' : 'Start'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {prog.completed > 0 && (
                    <button
                      onClick={() => onReset(pb.id)}
                      className="p-2.5 rounded-xl border-2 border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition"
                      title="Reset progress"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 mt-2">
          <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-semibold mb-1">No playbooks match your search</p>
          <p className="text-slate-400 text-sm">Try a different keyword or category</p>
        </div>
      )}
    </>
  )
}

// ─── TEMPLATES SECTION ────────────────────────────────────────────────────────

function ItemsSection({ items, catMap, onOpen, onDownload, searchPlaceholder, bannerTitle, bannerDesc, bannerIcon: BannerIcon, bannerColor }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = items.filter(item => {
    const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || item.category === filter
    return matchSearch && matchFilter
  })

  const showCategoryCards = filter === 'all' && !search

  return (
    <>
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl mb-6 p-5 md:p-6" style={{ background: `linear-gradient(135deg, ${bannerColor}ee, ${bannerColor}99)` }}>
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white opacity-10 pointer-events-none" />
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <BannerIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white mb-0.5">{bannerTitle}</h2>
            <p className="text-white/80 text-xs leading-relaxed">{bannerDesc}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-slate-200 bg-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition text-slate-900 placeholder:text-slate-400 font-medium text-sm"
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${filter === 'all' ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300'}`}
        >
          All ({items.length})
        </button>
        {Object.entries(catMap).map(([key, cat]) => {
          const Icon = cat.icon
          const count = items.filter(t => t.category === key).length
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === key
                  ? `bg-gradient-to-r ${cat.gradient} text-white shadow-md`
                  : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Category cards (landing) */}
      {showCategoryCards && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {Object.entries(catMap).map(([key, cat]) => {
            const Icon = cat.icon
            const count = items.filter(t => t.category === key).length
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="relative overflow-hidden rounded-xl bg-white border-2 border-slate-200 hover:border-slate-300 p-4 text-left transition-all hover:shadow-md hover:-translate-y-0.5 group"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-2 group-hover:scale-110 transition`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs font-bold text-slate-900 mb-0.5">{cat.short}</div>
                <div className="text-xs text-slate-400">{count} items</div>
              </button>
            )
          })}
        </div>
      )}

      {/* Item cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map(item => {
          const cat = catMap[item.category]
          const Icon = cat?.icon || FileText
          return (
            <div key={item.id} className="bg-white rounded-2xl border-2 border-slate-200 hover:border-slate-300 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
              <div className={`h-1.5 bg-gradient-to-r ${cat?.gradient || 'from-slate-400 to-slate-600'}`} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <CategoryBadge category={item.category} catMap={catMap} />
                  <span className="text-xs text-slate-400 font-medium">{item.sections.length} sections</span>
                </div>
                <h2 className="text-base font-bold text-slate-900 mb-1.5 leading-tight">{item.title}</h2>
                <p className="text-slate-500 mb-4 leading-relaxed text-sm">{item.description}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpen(item)}
                    className={`flex-1 bg-gradient-to-r ${cat?.gradient} text-white py-2.5 rounded-xl font-bold hover:opacity-90 transition shadow-sm flex items-center justify-center gap-2 text-sm`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Open
                  </button>
                  <button
                    onClick={() => onDownload(item)}
                    className="p-2.5 rounded-xl border-2 border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 mt-2">
          <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-semibold mb-1">No items match your search</p>
          <p className="text-slate-400 text-sm">Try a different keyword or category</p>
        </div>
      )}
    </>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [stored, setStored] = useState(loadState)

  const users = stored.users || {}
  const currentUser = stored.currentUser
  const progress = stored.progress || {}
  const user = currentUser ? users[currentUser] : null

  const [section, setSection] = useState('playbooks')
  const [runner, setRunner] = useState(null)
  const [runnerStep, setRunnerStep] = useState(0)
  const [showAuth, setShowAuth] = useState(false)
  const [pendingPb, setPendingPb] = useState(null)
  const [showCelebrate, setShowCelebrate] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const [activeItemCats, setActiveItemCats] = useState(null)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const menuRef = useRef(null)

  const updateStored = (updater) => {
    setStored(prev => {
      const next = updater(prev)
      saveState(next)
      return next
    })
  }

  const handleSignUp = ({ email, name, password }) => {
    updateStored(s => ({ ...s, users: { ...s.users, [email]: { name, password } }, currentUser: email }))
    setShowAuth(false)
    if (pendingPb) { launchRunner(pendingPb); setPendingPb(null) }
  }

  const handleLogin = (email) => {
    updateStored(s => ({ ...s, currentUser: email }))
    setShowAuth(false)
    if (pendingPb) { launchRunner(pendingPb); setPendingPb(null) }
  }

  const handleLogout = () => {
    updateStored(s => ({ ...s, currentUser: null }))
    setShowAccountMenu(false)
    setRunner(null)
  }

  const launchRunner = (pb) => {
    const prog = progress[pb.id] || { steps: {}, completed: 0, lastStep: 0 }
    const startStep = prog.completed === pb.steps.length ? 0 : (prog.lastStep || 0)
    setRunner(pb)
    setRunnerStep(startStep)
  }

  const startPlaybook = (pb) => {
    if (!currentUser) { setPendingPb(pb); setShowAuth(true); return }
    launchRunner(pb)
  }

  const exitRunner = () => {
    if (runner) {
      updateStored(s => ({
        ...s,
        progress: {
          ...s.progress,
          [runner.id]: { ...(s.progress[runner.id] || {}), lastStep: runnerStep },
        },
      }))
    }
    setRunner(null)
  }

  const toggleStep = (idx) => {
    if (!runner) return
    const current = (progress[runner.id]?.steps) || {}
    const updated = { ...current, [idx]: !current[idx] }
    const completedCount = Object.values(updated).filter(Boolean).length

    updateStored(s => ({
      ...s,
      progress: {
        ...s.progress,
        [runner.id]: { steps: updated, completed: completedCount, lastStep: runnerStep },
      },
    }))

    if (completedCount === runner.steps.length) setShowCelebrate(true)
  }

  const navigate = (idx) => {
    if (!runner || idx < 0 || idx >= runner.steps.length) return
    setRunnerStep(idx)
    updateStored(s => ({
      ...s,
      progress: {
        ...s.progress,
        [runner.id]: { ...(s.progress[runner.id] || {}), lastStep: idx },
      },
    }))
  }

  const resetProgress = (pbId) => {
    updateStored(s => {
      const next = { ...s.progress }
      delete next[pbId]
      return { ...s, progress: next }
    })
  }

  const openItem = (item, cats) => {
    setActiveItem(item)
    setActiveItemCats(cats)
  }

  const downloadItem = (item) => {
    if (!currentUser) { setShowAuth(true); return }
    downloadAsText(item)
  }

  // Close account menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowAccountMenu(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ── Runner view ──
  if (runner) {
    const prog = progress[runner.id] || { steps: {}, completed: 0 }
    return (
      <>
        <PlaybookRunner
          playbook={runner}
          stepIndex={runnerStep}
          completedSteps={prog.steps || {}}
          onStepToggle={toggleStep}
          onNavigate={navigate}
          onExit={exitRunner}
        />
        {showCelebrate && (
          <CelebrationModal
            playbookTitle={runner.title}
            onClose={() => { setShowCelebrate(false); exitRunner() }}
          />
        )}
      </>
    )
  }

  // ── Library view ──
  const TABS = [
    { id: 'playbooks', Icon: Zap, label: 'Playbooks', count: PLAYBOOKS.length },
    { id: 'templates', Icon: Briefcase, label: 'Freelance toolkit', count: TEMPLATES.length },
    { id: 'cheatsheets', Icon: BookMarked, label: 'Cheat sheets', count: CHEAT_SHEETS.length },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Auth modal */}
      {showAuth && (
        <AuthModal
          users={users}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
          onClose={() => { setShowAuth(false); setPendingPb(null) }}
          contextMessage={pendingPb ? `Sign in to start "${pendingPb.title}" and save your progress.` : undefined}
        />
      )}

      {/* Item drill-down modal */}
      {activeItem && (
        <ItemModal
          item={activeItem}
          catMap={activeItemCats}
          onClose={() => setActiveItem(null)}
          onDownload={downloadItem}
        />
      )}

      {/* ── HERO ── */}
      <header className="relative bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-amber-400 opacity-10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-violet-500 opacity-15 blur-3xl pointer-events-none" />

        {/* Account controls */}
        <div className="absolute top-4 right-4 z-10" ref={menuRef}>
          {currentUser ? (
            <>
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium hidden sm:inline">{user?.name?.split(' ')[0]}</span>
              </button>
              {showAccountMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-20">
                  <div className="p-3 border-b border-slate-100 bg-slate-50">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="font-semibold text-slate-900 text-sm truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{currentUser}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-slate-600 hover:bg-slate-50 transition text-sm"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition text-sm font-semibold"
            >
              <LogIn className="w-4 h-4" />
              Sign in
            </button>
          )}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold mb-5">
            <Sparkles className="w-3 h-3 text-amber-300" />
            {currentUser ? `Welcome back, ${user?.name?.split(' ')[0]}` : 'Interactive playbooks for practitioners'}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
            Run a playbook.<br />
            <GradientText gradient="from-amber-300 via-pink-300 to-violet-300">Finish a thing.</GradientText>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed mb-7">
            Step-by-step interactive playbooks for change management, business analysis, and process improvement. Built for people who actually do the work.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {[
              { Icon: Zap, label: `${PLAYBOOKS.length} playbooks ready` },
              { Icon: Clock, label: '20–60 min each' },
              { Icon: LayoutGrid, label: `${TEMPLATES.length} freelance templates` },
              { Icon: BookOpen, label: `${CHEAT_SHEETS.length} cheat sheets` },
            ].map(({ Icon, label }, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/10 text-white/85 text-xs font-medium">
                <Icon className="w-3.5 h-3.5" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Daily quote */}
        <DailyQuote />

        {/* Section tabs */}
        <div className="flex flex-wrap gap-1.5 mb-6 p-1.5 bg-slate-100 rounded-2xl w-fit">
          {TABS.map(({ id, Icon, label, count }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                section === id ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${section === id ? 'bg-slate-900 text-white' : 'bg-white text-slate-500'}`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Sections */}
        {section === 'playbooks' && (
          <PlaybooksSection
            progress={progress}
            onStart={startPlaybook}
            onReset={resetProgress}
          />
        )}

        {section === 'templates' && (
          <ItemsSection
            items={TEMPLATES}
            catMap={TEMPLATE_CATEGORIES}
            onOpen={item => openItem(item, TEMPLATE_CATEGORIES)}
            onDownload={downloadItem}
            searchPlaceholder="Search templates..."
            bannerTitle="Freelance toolkit"
            bannerDesc="Everything you need to run a consulting practice — proposals, contracts, discovery toolkits, onboarding forms, and finance templates."
            bannerIcon={Briefcase}
            bannerColor="#2563eb"
          />
        )}

        {section === 'cheatsheets' && (
          <ItemsSection
            items={CHEAT_SHEETS}
            catMap={CHEATSHEET_CATEGORIES}
            onOpen={item => openItem(item, CHEATSHEET_CATEGORIES)}
            onDownload={downloadItem}
            searchPlaceholder="Search cheat sheets..."
            bannerTitle="Cheat sheets"
            bannerDesc="Quick reference guides for Excel, SQL, statistics, and data storytelling — written for practitioners who need answers fast, not theory at length."
            bannerIcon={BookMarked}
            bannerColor="#7c3aed"
          />
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t-2 border-slate-100 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-400 font-medium">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Built for practitioners. Run them, learn from them, adapt them.
          </div>
        </footer>
      </main>
    </div>
  )
}
