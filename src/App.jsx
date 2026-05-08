import { useState, useEffect } from 'react';
import { Search, ArrowLeft, ArrowRight, CheckCircle2, Circle, Clock, Sparkles, RotateCcw, Zap, TrendingUp, Target, Compass, Flame, Trophy } from 'lucide-react';

const PLAYBOOKS = [
  {
    id: 'stakeholder-analysis',
    title: 'Stakeholder Analysis',
    category: 'change',
    description: 'Identify, map, and plan engagement for everyone affected by a change.',
    estMinutes: 25,
    steps: [
      { type: 'instruction', title: 'Define the change', body: 'Write a one-sentence description of the change. Be specific about scope: what is changing, for whom, and by when. A clear definition prevents scope creep later.' },
      { type: 'checklist', title: 'Brainstorm stakeholders', body: 'List everyone who will be affected by, contribute to, or have an opinion on this change.', items: ['Direct users of the new process/system', 'Their managers and skip-levels', 'Sponsors and decision-makers', 'Adjacent teams who feed in or receive output', 'Compliance, legal, or risk owners', 'External parties (customers, vendors, regulators)'] },
      { type: 'instruction', title: 'Map influence vs. interest', body: 'Plot each stakeholder on a 2x2 grid: low-to-high influence on the y-axis, low-to-high interest on the x-axis. This tells you how much energy each one needs.' },
      { type: 'reference', title: 'The four quadrants', body: 'High influence + High interest → Manage closely (key players). High influence + Low interest → Keep satisfied (don\'t let them get blindsided). Low influence + High interest → Keep informed (great advocates). Low influence + Low interest → Monitor (minimal effort).' },
      { type: 'checklist', title: 'Plan engagement per stakeholder', body: 'For each key player and "keep satisfied" stakeholder, decide:', items: ['What do they need to know?', 'What do you need from them?', 'Preferred channel (1:1, email, town hall)?', 'Cadence (weekly, milestone-based)?', 'Who owns the relationship?'] },
      { type: 'instruction', title: 'Capture and share', body: 'Document the map and engagement plan in one place. Revisit every 2–4 weeks — stakeholder positions shift as the change progresses.' }
    ]
  },
  {
    id: 'adkar-rollout',
    title: 'ADKAR Change Rollout',
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
      { type: 'reference', title: 'Diagnosing stuck change', body: 'When adoption stalls, ask which ADKAR letter is failing. People resisting? → Desire problem. Making mistakes? → Knowledge or Ability. Reverting after a month? → Reinforcement. Treat the right letter.' }
    ]
  },
  {
    id: 'resistance-management',
    title: 'Managing Resistance to Change',
    category: 'change',
    description: 'Surface, understand, and respond to resistance — without steamrolling it.',
    estMinutes: 30,
    steps: [
      { type: 'reference', title: 'Reframe resistance', body: 'Resistance is data, not defiance. It tells you something about the change, the rollout, or unmet needs. Treat it as feedback to investigate, not a problem to crush.' },
      { type: 'checklist', title: 'Spot the signals', body: 'Resistance shows up in many forms. Look for:', items: ['Vocal pushback in meetings', 'Quiet non-compliance ("I forgot")', 'Excessive questions designed to delay', 'Rumours and side-channel complaints', 'Drop in performance or engagement', 'Active sabotage (rare but real)'] },
      { type: 'instruction', title: 'Diagnose the root cause', body: 'Have 1:1 conversations with resistors. Listen more than you talk. Common roots: loss of status/control, fear of inadequacy, past change fatigue, genuine concerns about the design, or misinformation.' },
      { type: 'reference', title: 'Common roots and responses', body: 'Loss of control → Involve them in design. Fear of inadequacy → Strengthen training and reassurance. Change fatigue → Acknowledge it, slow down, sequence better. Design flaw → Actually fix the design. Misinformation → Communicate clearly and repeatedly.' },
      { type: 'checklist', title: 'Engage, don\'t avoid', body: 'For each significant resistor:', items: ['Hear them out fully before responding', 'Validate the underlying concern', 'Be honest about what can and can\'t change', 'Offer a role in shaping the rollout', 'Follow up — don\'t make it a one-off'] },
      { type: 'instruction', title: 'Know when to hold the line', body: 'Some resistance is genuine input that should change your plan. Some is a refusal to accept a legitimate decision. Distinguish the two. Be flexible on the how, firm on the what and why.' }
    ]
  },
  {
    id: 'requirements-gathering',
    title: 'Requirements Gathering',
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
      { type: 'reference', title: 'Watch for these traps', body: 'Solutions disguised as requirements ("we need a dropdown" → why?). Requirements without owners. Requirements that contradict each other across stakeholders. Silent stakeholders whose needs you missed entirely.' }
    ]
  },
  {
    id: 'process-mapping',
    title: 'Process Mapping (As-Is)',
    category: 'ba',
    description: 'Document how a process actually works today, not how people think it works.',
    estMinutes: 45,
    steps: [
      { type: 'instruction', title: 'Define scope and boundaries', body: 'Pick one process. Define the trigger (what starts it) and the outcome (what ends it). Resist the urge to map everything — a tightly scoped map is far more useful than a sprawling one.' },
      { type: 'checklist', title: 'Identify the cast', body: 'List everyone who touches the process:', items: ['The customer or initiator', 'Each role/team that does work', 'Approvers and decision-makers', 'Systems involved', 'Any external parties'] },
      { type: 'instruction', title: 'Walk the process with real people', body: 'Don\'t map from a desk. Sit with the people who do the work. Ask them to walk you through a recent real example, end to end. The official process and the actual process are almost never the same.' },
      { type: 'reference', title: 'Choose a notation', body: 'Swimlane diagrams (one lane per role) are the most readable for stakeholders. BPMN is more rigorous if your audience knows it. Whichever you pick, be consistent: same shape for the same kind of element throughout.' },
      { type: 'checklist', title: 'Capture the truth, not the ideal', body: 'For each step, note:', items: ['Who does it', 'What system or tool they use', 'How long it takes (range, not average)', 'Common exceptions and workarounds', 'Where it waits or queues', 'Where rework happens'] },
      { type: 'instruction', title: 'Review with participants', body: 'Walk the map back through the people who do the work. They will spot what you missed. Expect at least two revisions before it\'s right.' },
      { type: 'reference', title: 'What "as-is" reveals', body: 'A good as-is map exposes: handoffs (often where delays live), rework loops, shadow processes (workarounds), bottlenecks, and steps that add no value. Note these now — you\'ll target them in the to-be design.' }
    ]
  },
  {
    id: 'gap-analysis',
    title: 'Gap Analysis',
    category: 'ba',
    description: 'Compare current state to desired state and define what bridges the gap.',
    estMinutes: 30,
    steps: [
      { type: 'instruction', title: 'Define the desired future state', body: 'Be concrete. "Better customer service" isn\'t a state — it\'s a wish. "Average first-response time under 4 hours, 90% of tickets resolved on first contact" is a state. Use specific metrics where possible.' },
      { type: 'instruction', title: 'Document the current state', body: 'Measure and describe where you are today, against the same dimensions you used for the future state. Apples-to-apples comparison or the analysis is meaningless.' },
      { type: 'reference', title: 'Dimensions to compare', body: 'Process (how work flows), People (skills and roles), Technology (systems and tools), Data (what\'s captured and how), Performance (KPIs and metrics), Customer experience (what they see and feel).' },
      { type: 'checklist', title: 'Identify each gap', body: 'For each dimension, ask:', items: ['What\'s the difference between current and desired?', 'Is the gap quantitative (numbers) or qualitative (capability)?', 'How big is it — small adjustment or fundamental rework?', 'What\'s the impact of leaving it unaddressed?'] },
      { type: 'instruction', title: 'Prioritise gaps', body: 'You can\'t close every gap at once. Plot gaps on impact vs. effort. Quick wins (high impact, low effort) go first. Major projects (high impact, high effort) need proper planning. Skip the low-impact, high-effort ones unless they\'re mandatory.' },
      { type: 'checklist', title: 'Define the bridge', body: 'For each gap you\'ll address:', items: ['Specific actions or initiatives required', 'Owner and target date', 'Resources and budget needed', 'Dependencies on other gaps closing first', 'How you\'ll measure that the gap is actually closed'] }
    ]
  },
  {
    id: 'five-whys',
    title: '5 Whys Root Cause Analysis',
    category: 'pi',
    description: 'Peel back symptoms to find the actual root cause of a problem.',
    estMinutes: 20,
    steps: [
      { type: 'reference', title: 'What it is', body: 'A simple technique from Toyota: ask "why" repeatedly (typically five times) to move past surface symptoms to root causes. Best for problems with mostly linear cause-and-effect.' },
      { type: 'instruction', title: 'Define the problem precisely', body: 'Write the problem in one specific sentence. Avoid vague framing. "Sales are down" is too broad. "Online conversion rate dropped 18% week-over-week starting March 3rd" is workable.' },
      { type: 'checklist', title: 'Get the right people in the room', body: 'You need:', items: ['Someone close to the work who knows what actually happens', 'Someone with access to data to validate hypotheses', 'A facilitator who keeps the group on track', 'No one whose presence will make people self-censor'] },
      { type: 'instruction', title: 'Ask why — and why again', body: 'Ask "why did that happen?" Take the answer, then ask "why?" of that answer. Continue until you hit something that, if fixed, would actually prevent recurrence. Stop when going further leads to "human nature" or things you can\'t change.' },
      { type: 'reference', title: 'Worked example', body: 'Problem: report was sent late. Why? — The data wasn\'t ready. Why? — The overnight job failed. Why? — A schema change broke it. Why? — The change wasn\'t communicated to the data team. Why? — There\'s no process for upstream teams to flag schema changes. ← Root cause.' },
      { type: 'checklist', title: 'Validate before fixing', body: 'A plausible answer isn\'t a confirmed cause. Before committing to a fix:', items: ['Check the chain against actual evidence (logs, data, interviews)', 'Ask: if we removed this cause, would the problem disappear?', 'Look for other possible causes you may have missed', 'Beware of stopping at the first answer that blames a person — usually there\'s a system cause behind it'] },
      { type: 'instruction', title: 'Design and test the fix', body: 'Address the root cause, not the symptom. Define how you\'ll know the fix worked (a metric, a recurrence check at 30/60/90 days). If the problem comes back, your "root cause" wasn\'t the root cause.' }
    ]
  },
  {
    id: 'value-stream-mapping',
    title: 'Value Stream Mapping',
    category: 'pi',
    description: 'Visualise material and information flow to expose waste end-to-end.',
    estMinutes: 60,
    steps: [
      { type: 'reference', title: 'What VSM does', body: 'A Lean tool that maps every step a product or service goes through, capturing both work time and wait time. Its power is in the ratio: most processes have far more wait than work, and the wait is invisible until you map it.' },
      { type: 'instruction', title: 'Pick one product family', body: 'Choose one specific product, service, or request type. Don\'t try to map everything. The goal is depth on one stream, not coverage of all of them.' },
      { type: 'checklist', title: 'Walk the process — backwards', body: 'Start from the customer end and walk upstream. This keeps you focused on what creates value for the customer. At each step, capture:', items: ['Process step name and who does it', 'Cycle time (active work time)', 'Wait time before this step starts', 'First-pass yield (% done right first time)', 'Inventory/queue size in front of this step', 'Information flows (what triggers this step?)'] },
      { type: 'instruction', title: 'Draw the current state map', body: 'Use standard VSM symbols if your team knows them, or simple boxes and arrows if not. Below the boxes, draw a timeline alternating cycle time and wait time. Sum them at the end — total lead time vs. total value-added time.' },
      { type: 'reference', title: 'The eye-opening number', body: 'Calculate: value-added time ÷ total lead time. In most office processes this is under 5%. Manufacturing is often under 1%. The gap between them is your improvement opportunity.' },
      { type: 'checklist', title: 'Identify waste', body: 'Look for the seven (or eight) wastes:', items: ['Overproduction — making more than needed', 'Waiting — queues, approvals, dependencies', 'Transport — moving things unnecessarily', 'Over-processing — doing more than the customer values', 'Inventory — work-in-progress sitting around', 'Motion — unnecessary movement', 'Defects — rework, errors, returns', 'Unused talent — people doing work below their capability'] },
      { type: 'instruction', title: 'Design the future state', body: 'Don\'t try to fix everything. Pick 2–4 high-impact changes (often: combining steps, reducing batch sizes, eliminating approvals, fixing first-pass yield). Draw a future-state map showing the improved flow.' },
      { type: 'instruction', title: 'Build a transition plan', body: 'Break the future state into a sequence of improvements with owners, dates, and metrics. VSM is most powerful when the map drives a kaizen burst — a focused improvement event with clear scope.' }
    ]
  },
  {
    id: 'kaizen-event',
    title: 'Running a Kaizen Event',
    category: 'pi',
    description: 'Plan and run a focused, time-boxed improvement workshop.',
    estMinutes: 35,
    steps: [
      { type: 'reference', title: 'What a Kaizen event is', body: 'A 2–5 day cross-functional workshop focused on improving one specific process. The team analyses, designs, and implements changes within the event itself — not after it. Speed and focus are the point.' },
      { type: 'checklist', title: 'Pre-event preparation (2–4 weeks before)', body: 'Set up for success:', items: ['Define a tight scope and clear objective with measurable target', 'Select a 5–8 person team — mix of process workers, support roles, and a sponsor', 'Brief participants and clear their calendars completely', 'Gather baseline data (current performance, customer feedback, defect rates)', 'Secure a dedicated room with wall space for mapping', 'Get sponsor commitment to remove blockers in real time'] },
      { type: 'instruction', title: 'Day 1 — Understand', body: 'Train the team on the basics (waste, flow, basic Lean). Walk the actual process — go to where the work happens. Build the current-state map. Resist designing solutions today. Today is for seeing reality clearly.' },
      { type: 'instruction', title: 'Day 2 — Analyse and design', body: 'Identify root causes of the biggest issues. Brainstorm solutions widely before narrowing. Design the future state. Produce a specific implementation plan: what changes, who does it, by when, how it will be measured.' },
      { type: 'instruction', title: 'Days 3–4 — Implement', body: 'Make the changes during the event itself. Move workstations, rewrite procedures, update systems, train people on the new way. Test it with real work. This is what makes Kaizen different from traditional projects — change happens in the room.' },
      { type: 'checklist', title: 'Day 5 — Sustain and report', body: 'Lock in the gains:', items: ['Document the new standard work clearly', 'Train anyone who wasn\'t in the event on the new process', 'Set up daily/weekly measures to track that the change holds', 'Identify any follow-up items that couldn\'t be done in the week', 'Present results to leadership with before/after metrics', 'Recognise the team'] },
      { type: 'reference', title: 'After the event — the 30-day rule', body: 'Most Kaizen events that fail, fail in the 30 days after. Schedule a 30-day check: are the changes still in place? Are metrics holding? If not, find out why immediately. The follow-up is part of the work.' }
    ]
  }
];

const CATEGORIES = {
  change: {
    label: 'Change Management',
    short: 'Change',
    gradient: 'from-fuchsia-500 to-pink-600',
    bg: 'bg-fuchsia-50',
    text: 'text-fuchsia-700',
    border: 'border-fuchsia-200',
    accent: '#d946ef',
    icon: Compass
  },
  ba: {
    label: 'Business Analysis',
    short: 'BA',
    gradient: 'from-indigo-500 to-violet-600',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    accent: '#6366f1',
    icon: Target
  },
  pi: {
    label: 'Process Improvement',
    short: 'Process',
    gradient: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    accent: '#f59e0b',
    icon: TrendingUp
  }
};

// Decorative SVG illustrations for each category
const ChangeIllustration = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="changeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d946ef" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="40" fill="url(#changeGrad)" opacity="0.15" />
    <circle cx="140" cy="100" r="30" fill="url(#changeGrad)" opacity="0.2" />
    <path d="M40 80 Q 80 40, 120 80 T 180 80" stroke="url(#changeGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="40" cy="80" r="8" fill="#d946ef" />
    <circle cx="120" cy="80" r="8" fill="#ec4899" />
    <circle cx="180" cy="80" r="8" fill="#db2777" />
    <path d="M155 70 L 165 80 L 155 90" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BAIllustration = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="baGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect x="30" y="100" width="20" height="40" rx="3" fill="url(#baGrad)" opacity="0.4" />
    <rect x="60" y="80" width="20" height="60" rx="3" fill="url(#baGrad)" opacity="0.6" />
    <rect x="90" y="60" width="20" height="80" rx="3" fill="url(#baGrad)" opacity="0.8" />
    <rect x="120" y="40" width="20" height="100" rx="3" fill="url(#baGrad)" />
    <circle cx="160" cy="40" r="12" fill="none" stroke="url(#baGrad)" strokeWidth="3" />
    <line x1="168" y1="48" x2="178" y2="58" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const PIIllustration = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="piGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="80" r="50" fill="none" stroke="url(#piGrad)" strokeWidth="3" strokeDasharray="8 4" opacity="0.4" />
    <circle cx="100" cy="80" r="30" fill="url(#piGrad)" opacity="0.2" />
    <circle cx="100" cy="80" r="14" fill="url(#piGrad)" />
    <path d="M100 30 L 105 45 L 100 50 L 95 45 Z" fill="#f59e0b" />
    <path d="M170 80 L 155 85 L 150 80 L 155 75 Z" fill="#ea580c" />
    <path d="M100 130 L 95 115 L 100 110 L 105 115 Z" fill="#f59e0b" />
    <path d="M30 80 L 45 75 L 50 80 L 45 85 Z" fill="#ea580c" />
  </svg>
);

const HeroBlob = () => (
  <svg className="absolute -top-20 -right-20 w-96 h-96 opacity-20 pointer-events-none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heroBlob" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <path d="M200 50 Q 320 80, 340 200 Q 320 320, 200 350 Q 80 320, 60 200 Q 80 80, 200 50" fill="url(#heroBlob)" />
  </svg>
);

const HeroBlob2 = () => (
  <svg className="absolute -bottom-32 -left-32 w-96 h-96 opacity-15 pointer-events-none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heroBlob2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    <circle cx="200" cy="200" r="180" fill="url(#heroBlob2)" />
  </svg>
);

const StepIcon = ({ type }) => {
  const config = {
    instruction: { bg: 'bg-gradient-to-br from-indigo-500 to-violet-600', icon: Zap },
    checklist: { bg: 'bg-gradient-to-br from-fuchsia-500 to-pink-600', icon: CheckCircle2 },
    reference: { bg: 'bg-gradient-to-br from-amber-400 to-orange-500', icon: Sparkles }
  };
  const { bg, icon: Icon } = config[type] || config.instruction;
  return (
    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shadow-lg shadow-black/5`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('library');
  const [activePlaybook, setActivePlaybook] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState({});
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (view === 'runner' && activePlaybook) {
      const saved = progress[activePlaybook.id];
      if (saved && saved.lastStep !== undefined && saved.completed < activePlaybook.steps.length) {
        setActiveStep(saved.lastStep);
      } else {
        setActiveStep(0);
      }
    }
  }, [view, activePlaybook]);

  const filteredPlaybooks = PLAYBOOKS.filter(p => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  const startPlaybook = (pb) => {
    setActivePlaybook(pb);
    setView('runner');
  };

  const exitToLibrary = () => {
    if (activePlaybook) {
      const completedSteps = progress[activePlaybook.id]?.steps || {};
      const completedCount = Object.values(completedSteps).filter(Boolean).length;
      setProgress(prev => ({
        ...prev,
        [activePlaybook.id]: {
          steps: completedSteps,
          completed: completedCount,
          lastStep: activeStep
        }
      }));
    }
    setView('library');
    setActivePlaybook(null);
    setActiveStep(0);
  };

  const toggleStepComplete = (stepIdx) => {
    if (!activePlaybook) return;
    const current = progress[activePlaybook.id]?.steps || {};
    const updated = { ...current, [stepIdx]: !current[stepIdx] };
    const completedCount = Object.values(updated).filter(Boolean).length;

    setProgress(prev => ({
      ...prev,
      [activePlaybook.id]: {
        steps: updated,
        completed: completedCount,
        lastStep: activeStep
      }
    }));

    if (completedCount === activePlaybook.steps.length) {
      setShowCelebration(true);
    }
  };

  const resetPlaybook = (pbId) => {
    setProgress(prev => {
      const next = { ...prev };
      delete next[pbId];
      return next;
    });
  };

  const goToStep = (idx) => {
    if (!activePlaybook) return;
    if (idx < 0 || idx >= activePlaybook.steps.length) return;
    setActiveStep(idx);
    setProgress(prev => ({
      ...prev,
      [activePlaybook.id]: {
        ...(prev[activePlaybook.id] || { steps: {}, completed: 0 }),
        lastStep: idx
      }
    }));
  };

  // ============ RUNNER VIEW ============
  if (view === 'runner' && activePlaybook) {
    const step = activePlaybook.steps[activeStep];
    const completedSteps = progress[activePlaybook.id]?.steps || {};
    const completedCount = Object.values(completedSteps).filter(Boolean).length;
    const totalSteps = activePlaybook.steps.length;
    const progressPct = Math.round((completedCount / totalSteps) * 100);
    const cat = CATEGORIES[activePlaybook.category];
    const isComplete = completedSteps[activeStep];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-pink-100 to-violet-100 opacity-50" />
              <div className="relative">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-400 via-pink-500 to-violet-500 flex items-center justify-center shadow-xl shadow-pink-500/30">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Nailed it! 🎉</h2>
                <p className="text-slate-600 mb-6 text-lg">You finished <span className="font-semibold text-slate-900">{activePlaybook.title}</span>. Now go apply it.</p>
                <button onClick={() => { setShowCelebration(false); exitToLibrary(); }} className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-semibold hover:bg-slate-800 transition-all hover:scale-[1.02] shadow-lg">
                  Back to library
                </button>
              </div>
            </div>
          </div>
        )}

        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={exitToLibrary} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition group">
              <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Library</span>
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-slate-900">{activeStep + 1}</span>
              <span className="text-slate-400">of {totalSteps}</span>
            </div>
          </div>
          <div className="h-1.5 bg-slate-100">
            <div className={`h-full bg-gradient-to-r ${cat.gradient} transition-all duration-500`} style={{ width: `${progressPct}%` }} />
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-8 pb-32">
          <div className="mb-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${cat.gradient} text-white shadow-md mb-4`}>
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{activePlaybook.title}</h1>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 mb-6 shadow-sm">
            <div className="flex items-start gap-4 mb-5">
              <StepIcon type={step.type} />
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">
                  {step.type === 'instruction' && '⚡ How to'}
                  {step.type === 'checklist' && '✓ Checklist'}
                  {step.type === 'reference' && '✦ Reference'}
                </div>
                <h2 className={`text-2xl font-bold text-slate-900 leading-tight ${isComplete ? 'line-through text-slate-400' : ''}`}>{step.title}</h2>
              </div>
              <button onClick={() => toggleStepComplete(activeStep)} className="flex-shrink-0 transition-transform hover:scale-110 active:scale-95">
                {isComplete ?
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  :
                  <div className="w-10 h-10 rounded-full border-2 border-slate-300 hover:border-slate-500 transition flex items-center justify-center" />
                }
              </button>
            </div>

            <div>
              <p className="text-slate-700 leading-relaxed mb-4 text-base md:text-lg">{step.body}</p>
              {step.items && (
                <ul className="space-y-3 mt-5">
                  {step.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 bg-slate-50 rounded-xl p-3 hover:bg-slate-100 transition">
                      <div className={`mt-1 w-6 h-6 rounded-md bg-gradient-to-br ${cat.gradient} flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-sm`}>
                        {idx + 1}
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {activePlaybook.steps.map((_, idx) => (
              <button key={idx} onClick={() => goToStep(idx)} className={`flex-shrink-0 w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                idx === activeStep
                  ? `bg-gradient-to-br ${cat.gradient} text-white shadow-lg scale-110`
                  : completedSteps[idx]
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}>
                {completedSteps[idx] ? '✓' : idx + 1}
              </button>
            ))}
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
            <button onClick={() => goToStep(activeStep - 1)} disabled={activeStep === 0} className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition font-semibold">
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
            <div className="text-sm font-medium text-slate-500 hidden sm:flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              {completedCount} of {totalSteps} done
            </div>
            <button onClick={() => goToStep(activeStep + 1)} disabled={activeStep === totalSteps - 1} className={`flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r ${cat.gradient} text-white hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition font-semibold shadow-lg`}>
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============ LIBRARY VIEW ============
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <header className="relative bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 overflow-hidden">
        <HeroBlob />
        <HeroBlob2 />
        <div className="relative max-w-5xl mx-auto px-4 py-12 md:py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive playbooks for practitioners</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
            Run a playbook.<br />
            <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-violet-300 bg-clip-text text-transparent">Finish a thing.</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed">
            Step-by-step interactive playbooks for change management, business analysis, and process improvement. Built for people who actually do the work.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-medium">{PLAYBOOKS.length} playbooks ready</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-sm">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-medium">20–60 min each</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Search + filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search playbooks..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilter('all')} className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${filter === 'all' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300'}`}>
              All ({PLAYBOOKS.length})
            </button>
            {Object.entries(CATEGORIES).map(([key, cat]) => {
              const count = PLAYBOOKS.filter(p => p.category === key).length;
              const Icon = cat.icon;
              return (
                <button key={key} onClick={() => setFilter(key)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  filter === key
                    ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300'
                }`}>
                  <Icon className="w-4 h-4" />
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Category showcase strip when filter is 'all' */}
        {filter === 'all' && !search && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {Object.entries(CATEGORIES).map(([key, cat]) => {
              const Illustration = key === 'change' ? ChangeIllustration : key === 'ba' ? BAIllustration : PIIllustration;
              const count = PLAYBOOKS.filter(p => p.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className="relative group overflow-hidden rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-300 p-5 text-left transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Illustration className="absolute -right-4 -top-4 w-32 h-32 opacity-40 group-hover:opacity-60 transition" />
                  <div className="relative">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-gradient-to-r ${cat.gradient} text-white mb-2`}>
                      <cat.icon className="w-3 h-3" />
                      {count} playbooks
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{cat.label}</h3>
                    <p className="text-sm text-slate-600">Browse →</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Playbook grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {filteredPlaybooks.map(pb => {
            const cat = CATEGORIES[pb.category];
            const Icon = cat.icon;
            const pbProgress = progress[pb.id];
            const completedCount = pbProgress?.completed || 0;
            const isStarted = completedCount > 0;
            const isDone = completedCount === pb.steps.length;
            const progressPct = Math.round((completedCount / pb.steps.length) * 100);

            return (
              <div key={pb.id} className="relative bg-white rounded-2xl border-2 border-slate-200 hover:border-slate-300 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 group">
                <div className={`h-1.5 bg-gradient-to-r ${cat.gradient}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r ${cat.gradient} text-white shadow-sm`}>
                      <Icon className="w-3 h-3" />
                      {cat.short}
                    </div>
                    {isDone && (
                      <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                        <Trophy className="w-3 h-3" />
                        Done
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{pb.title}</h2>
                  <p className="text-slate-600 mb-4 leading-relaxed text-sm">{pb.description}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-4 font-medium">
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{pb.estMinutes} min</div>
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    <div>{pb.steps.length} steps</div>
                  </div>
                  {isStarted && !isDone && (
                    <div className="mb-4 bg-slate-50 rounded-xl p-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-amber-500" />
                          {completedCount} of {pb.steps.length} done
                        </span>
                        <span className="text-slate-900">{progressPct}%</span>
                      </div>
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${cat.gradient} transition-all duration-500`} style={{ width: `${progressPct}%` }} />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <button onClick={() => startPlaybook(pb)} className={`flex-1 bg-gradient-to-r ${cat.gradient} text-white py-3 rounded-xl font-bold hover:opacity-90 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2`}>
                      {isDone ? 'Review' : isStarted ? 'Resume' : 'Start'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {isStarted && (
                      <button onClick={() => resetPlaybook(pb.id)} className="p-3 rounded-xl border-2 border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition" title="Reset progress">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPlaybooks.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-700 font-semibold mb-1">No playbooks match your search</p>
            <p className="text-slate-500 text-sm">Try a different keyword or category</p>
          </div>
        )}

        <footer className="mt-16 pt-8 border-t-2 border-slate-100 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Built for practitioners. Run them, learn from them, adapt them.
          </div>
        </footer>
      </main>
    </div>
  );
}
