import { useState, useEffect } from 'react';
import { Search, ArrowLeft, ArrowRight, CheckCircle2, Circle, Clock, Sparkles, RotateCcw, Zap, TrendingUp, Target, Compass, Flame, Trophy, LogOut, User, Mail, Lock, Eye, EyeOff, AlertCircle, Quote, LogIn, FileText, Download, Briefcase, X, Copy, Check, BookOpen, Database, BarChart3, Calculator } from 'lucide-react';

const QUOTES = [
  { text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.", author: "Alan Watts" },
  { text: "It is not the strongest of the species that survives, but the one most responsive to change.", author: "Charles Darwin" },
  { text: "Progress is impossible without change, and those who cannot change their minds cannot change anything.", author: "George Bernard Shaw" },
  { text: "If you don't like change, you're going to like irrelevance even less.", author: "General Eric Shinseki" },
  { text: "The art and science of asking questions is the source of all knowledge.", author: "Thomas Berger" },
  { text: "If I had an hour to solve a problem, I'd spend 55 minutes thinking about the problem and 5 minutes thinking about solutions.", author: "Albert Einstein" },
  { text: "Quality is never an accident; it is always the result of intelligent effort.", author: "John Ruskin" },
  { text: "However beautiful the strategy, you should occasionally look at the results.", author: "Winston Churchill" },
  { text: "It is not the answer that enlightens, but the question.", author: "Eugène Ionesco" },
  { text: "Without data, you're just another person with an opinion.", author: "W. Edwards Deming" },
  { text: "Excellence is never an accident. It is always the result of high intention, sincere effort, and intelligent execution.", author: "Aristotle" },
  { text: "We can't solve problems by using the same kind of thinking we used when we created them.", author: "Albert Einstein" },
  { text: "The biggest room in the world is the room for improvement.", author: "Helmut Schmidt" },
  { text: "Continuous improvement is better than delayed perfection.", author: "Mark Twain" },
  { text: "Good business leaders create a vision, articulate the vision, passionately own the vision, and relentlessly drive it to completion.", author: "Jack Welch" },
  { text: "If you can't describe what you are doing as a process, you don't know what you're doing.", author: "W. Edwards Deming" },
  { text: "Change before you have to.", author: "Jack Welch" },
  { text: "The greatest danger in times of turbulence is not the turbulence; it is to act with yesterday's logic.", author: "Peter Drucker" },
  { text: "What gets measured gets managed.", author: "Peter Drucker" },
  { text: "The single biggest problem in communication is the illusion that it has taken place.", author: "George Bernard Shaw" },
  { text: "Behaviour is a function of the person and their environment.", author: "Kurt Lewin" },
  { text: "There is nothing so practical as a good theory.", author: "Kurt Lewin" },
  { text: "Between stimulus and response there is a space. In that space is our power to choose our response.", author: "Viktor Frankl" },
  { text: "People do not resist change. They resist being changed.", author: "Peter Senge" },
  { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
  { text: "Insanity is doing the same thing over and over and expecting different results.", author: "Often attributed to Einstein" },
  { text: "If you want to go fast, go alone. If you want to go far, go together.", author: "African proverb" },
  { text: "The whole is greater than the sum of its parts.", author: "Aristotle" },
  { text: "Make everything as simple as possible, but not simpler.", author: "Albert Einstein" },
  { text: "A goal without a plan is just a wish.", author: "Antoine de Saint-Exupéry" },
  { text: "Plans are nothing; planning is everything.", author: "Dwight D. Eisenhower" },
  { text: "The pessimist complains about the wind; the optimist expects it to change; the realist adjusts the sails.", author: "William Arthur Ward" },
  { text: "Do not wait to strike till the iron is hot, but make it hot by striking.", author: "William Butler Yeats" },
  { text: "An organisation's ability to learn, and translate that learning into action rapidly, is the ultimate competitive advantage.", author: "Jack Welch" },
  { text: "The most dangerous phrase in the language is, 'We've always done it this way.'", author: "Grace Hopper" },
  { text: "Culture eats strategy for breakfast.", author: "Peter Drucker" },
  { text: "Vision without execution is hallucination.", author: "Thomas Edison" },
  { text: "If you do not change direction, you may end up where you are heading.", author: "Lao Tzu" },
  { text: "Listen with the will to learn.", author: "Unknown" },
  { text: "The first responsibility of a leader is to define reality. The last is to say thank you. In between, the leader is a servant.", author: "Max De Pree" }
];

function getDailyQuote() {
  // Same quote for everyone on the same day; rotates at midnight
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const index = (dayOfYear + today.getFullYear()) % QUOTES.length;
  return QUOTES[index];
}

// ==================== FREELANCE TEMPLATES ====================
const TEMPLATES = [
  {
    id: 'client-proposal',
    title: 'Client Proposal Template',
    category: 'proposals',
    description: 'A clean structure for proposing a project to a new client — overview, objectives, approach, timeline, pricing.',
    sections: [
      { heading: 'Project Overview', body: "Brief summary of the client's challenge and your proposed solution." },
      { heading: 'Objectives', body: 'Key goals and outcomes the client should expect.' },
      { heading: 'Approach', body: 'Outline your phases of work, methodology, and tools.' },
      { heading: 'Timeline', body: 'Estimated start and end dates, along with milestones.' },
      { heading: 'Pricing', body: 'Project-based pricing, optional extras, and payment terms.' },
      { heading: 'Next Steps', body: 'Instructions for the client to proceed or book a call.' }
    ]
  },
  {
    id: 'discovery-phase',
    title: 'Project Discovery Phase Template',
    category: 'discovery',
    description: 'Comprehensive discovery doc covering objectives, stakeholders, requirements, risks, timeline, and budget.',
    sections: [
      { heading: '1. Project Overview', body: 'Project Name: [Insert Project Name]\nPrepared By: [Your Name/Team]\nDate: [Insert Date]\nVersion: [Version Number]' },
      { heading: '2. Objectives', body: 'Business Goals: [Clearly define what the business aims to achieve with this project.]\nProduct Vision: [Describe the overarching vision for the product or solution.]' },
      { heading: '3. Stakeholder Identification', body: 'Primary Stakeholders:\n• Name: [Stakeholder Name]\n• Role: [Stakeholder Role]\n• Contact Information: [Email/Phone]\n• Responsibilities: [Brief description of their involvement]\n\nSecondary Stakeholders: [Repeat as necessary]' },
      { heading: '4. Target Audience', body: 'User Personas:\n• Persona Name: [e.g., "Tech-Savvy Young Professional"]\n• Demographics: [Age, Gender, Location, etc.]\n• Needs and Pain Points: [What challenges does this persona face?]\n• Behavioural Traits: [How does this persona typically interact with similar products/services?]' },
      { heading: '5. Functional Requirements', body: 'Core Features:\n• [Feature Name]: [Description and purpose]\n\nUser Stories:\n• As a [user role], I want to [action], so that [benefit].' },
      { heading: '6. Non-Functional Requirements', body: 'Performance: [e.g., System should handle 1,000 concurrent users without performance degradation.]\nSecurity: [e.g., Data encryption standards, compliance requirements.]\nUsability: [e.g., The application should be accessible to users with disabilities.]\nScalability: [e.g., Ability to add more servers to handle increased load.]' },
      { heading: '7. Technical Constraints', body: 'Platforms: [e.g., iOS, Android, Web]\nTechnologies: [e.g., Specific programming languages, frameworks, or third-party services]\nIntegration Needs: [e.g., APIs, databases, external systems]' },
      { heading: '8. Risk Assessment', body: 'Potential Risks:\n• Risk: [Description]\n• Impact: [High/Medium/Low]\n• Mitigation Strategy: [Steps to minimise or manage the risk]' },
      { heading: '9. Project Timeline', body: 'Phases and Milestones:\n• Phase: [e.g., Discovery, Design, Development, Testing, Deployment]\n• Start Date: [DD/MM/YYYY]\n• End Date: [DD/MM/YYYY]\n• Deliverables: [List of expected outputs for the phase]' },
      { heading: '10. Budget Estimate', body: 'Resource Allocation:\n• Resource: [e.g., Developer, Designer, Project Manager]\n• Hours: [Estimated number of hours]\n• Cost: [Hourly rate or fixed cost]\n\nTotal Estimated Budget: [Sum of all costs]' },
      { heading: '11. Assumptions and Dependencies', body: 'Assumptions: [e.g., "Users will have internet access."]\nDependencies: [e.g., "Completion of the backend API by the integration team."]' },
      { heading: '12. Approval', body: 'Signatures:\nProject Sponsor: _________________________ Date: ___________\nProduct Owner: _________________________ Date: ___________\nProject Manager: _________________________ Date: ___________' }
    ]
  },
  {
    id: 'discovery-interview-toolkit',
    title: 'Enterprise Discovery Interview Toolkit',
    category: 'discovery',
    description: 'A full toolkit for running enterprise-wide discovery interviews — universal questions, function-specific overlays, stakeholder tailoring, mapping templates.',
    sections: [
      { heading: 'Overview', body: 'This toolkit is designed for consultants conducting enterprise-wide discovery interviews across all business functions and stakeholder levels. It includes a universal question set, function-specific overlays, stakeholder tailoring, editable note sections, stakeholder mapping template, and pre/post interview checklists.' },
      { heading: '1. Universal Core Questions — Role & Context', body: '• Describe your role and responsibilities.\n• What are your current priorities?\n• Who do you collaborate with most?' },
      { heading: '1.1 Operating Model & Ways of Working', body: '• How does your team fit into the broader operating model?\n• What processes are most critical to your function?\n• Where do you experience bottlenecks or duplication of effort?' },
      { heading: '1.2 Technology & Data', body: '• What core systems/tools do you rely on?\n• Where does data help or hinder decision-making?\n• Are there any workarounds or manual processes you rely on?' },
      { heading: '1.3 KPIs & Success Measures', body: '• How is performance measured in your area?\n• Do the current metrics reflect what success really looks like?\n• What\'s working well — and what isn\'t?' },
      { heading: '1.4 Pain Points & Opportunities', body: '• What frustrates you or slows you down?\n• What has the team raised repeatedly but hasn\'t been addressed?\n• Where do you see quick wins or major change potential?' },
      { heading: '1.5 Transformation Readiness', body: '• Has your area experienced recent change? How was it handled?\n• How open is your team to doing things differently?\n• What support would you need to make meaningful improvements?' },
      { heading: '2. Function-Specific Overlays — Finance', body: '• How are budgets set and tracked across departments?\n• Where do you see inefficiencies in cost management or forecasting?\n• Are there challenges in getting timely, accurate financial data?\n• What\'s the process for tracking profitability by product/customer/channel?' },
      { heading: '2.1 Operations / Supply Chain', body: '• What are the critical processes driving daily operations?\n• Where are delays, waste, or quality issues occurring?\n• How well are suppliers/vendors integrated into your processes?\n• What\'s the level of automation vs. manual effort?' },
      { heading: '2.2 Sales & Commercial', body: '• How are leads generated, qualified, and closed?\n• What\'s the process for pricing, discounts, and approvals?\n• How is sales performance measured and improved?\n• Are there disconnects between sales, marketing, and delivery?' },
      { heading: '2.3 Marketing', body: '• What channels and campaigns are driving results?\n• How is ROI measured on marketing spend?\n• Where are there disconnects between marketing and sales?\n• Are you able to personalise or segment based on real-time data?' },
      { heading: '2.4 HR / People / Talent', body: '• How are roles, responsibilities, and org structures defined?\n• What\'s the current state of recruitment, onboarding, and retention?\n• Are performance management and development processes effective?\n• How do employees raise issues or feedback?' },
      { heading: '2.5 Technology / IT', body: '• What are your core platforms and who owns them?\n• Where do tech limitations hold the business back?\n• How is tech support delivered and prioritised?\n• How is innovation or automation being approached?' },
      { heading: '2.6 Procurement / Legal / Compliance', body: '• What is the procurement process from need to contract?\n• Where are delays, risks, or compliance issues common?\n• How are contracts stored, managed, and monitored?\n• Are compliance requirements adding unnecessary complexity?' },
      { heading: '3. Stakeholder-Level Tailoring — Executives / Senior Leaders', body: '• What are your strategic priorities?\n• Where does the org underperform vs potential?\n• What worries you most about the future?\n• Where do you see the biggest need (or resistance) to change?\n• If you had a blank cheque, what would you fix?' },
      { heading: '3.1 Middle Management', body: '• What are the top 3 processes your team runs regularly?\n• How are these processes measured and improved?\n• Where do you spend the most time firefighting?\n• What do you need more of — resources, systems, clarity, etc.?\n• How do you pass feedback up or down the chain?' },
      { heading: '3.2 SMEs / Frontline / Operational Staff', body: '• Walk me through a typical day or workflow — what\'s smooth, what\'s not?\n• What tools or systems do you use, and where do they fall short?\n• What steps do you take outside the "official" process to get things done?\n• What\'s the most frustrating or repetitive part of your job?\n• If you could automate or change one task, what would it be?' },
      { heading: '4. Stakeholder Mapping Template', body: 'Track stakeholders across functions and engagement.\n\nColumns: Name | Role | Function | Influence (High/Med/Low) | Interview Status | Notes' },
      { heading: '5. Pre-Interview Checklist', body: '• Review available org charts, decks, or process maps (if any).\n• Understand the function\'s role in the value chain.\n• Customise questions based on role and business area.\n• Set clear meeting objectives in calendar invites.\n• Be prepared to explain purpose and confidentiality of session.' },
      { heading: '6. Post-Interview Checklist', body: '• Summarise insights: pain points, blockers, quick wins.\n• Note recurring quotes, phrases, or themes.\n• Capture stakeholder sentiment and change readiness.\n• Update stakeholder map with new intelligence.\n• Log areas needing further validation or deep-dive.' }
    ]
  },
  {
    id: 'client-onboarding',
    title: 'Client Onboarding Form',
    category: 'discovery',
    description: 'A simple onboarding form to capture company details, objectives, stakeholders, and access needs.',
    sections: [
      { heading: 'Company Information', body: 'Name, address, registration number, key contacts.' },
      { heading: 'Project Background', body: 'Brief description of current challenges.' },
      { heading: 'Key Objectives', body: 'Top goals and desired outcomes.' },
      { heading: 'Stakeholders', body: 'Names and roles of decision-makers.' },
      { heading: 'Access Needs', body: 'Systems, documents, or teams you\'ll need access to.' },
      { heading: 'Preferred Communication', body: 'Email, video, phone, frequency.' }
    ]
  },
  {
    id: 'consultancy-agreement',
    title: 'Freelance Consultancy Agreement',
    category: 'contracts',
    description: 'A full freelance consultancy agreement covering scope, payment, IP, confidentiality, and termination.',
    sections: [
      { heading: 'Preamble', body: 'This Freelance Consultancy Agreement (the "Agreement") is made and entered into on this [DATE], by and between the Client (hereinafter referred to as "Client") and the Consultant (hereinafter referred to as "Consultant").' },
      { heading: '1. Scope of Work', body: 'Consultant shall provide Business Transformation consultancy services to Client. The nature, scope, and deliverables of the services shall be mutually agreed in writing prior to the start of each project phase or engagement.' },
      { heading: '2. Payment Terms', body: 'Client agrees to pay Consultant on a project basis, with invoices issued monthly. Payment shall be made within 14 days of receipt of invoice. Late payments may be subject to a 5% late fee.' },
      { heading: '3. Work Location', body: 'Consultant may perform services remotely and/or on-site at the Client\'s location, as required. Travel and related expenses for on-site work shall be pre-approved by Client and reimbursed in full.' },
      { heading: '4. Intellectual Property', body: 'Consultant retains ownership of all intellectual property, frameworks, templates, and materials created during services. Client is granted a non-exclusive, non-transferable licence to use the deliverables solely for internal business purposes.' },
      { heading: '5. Confidentiality', body: 'Both parties agree to maintain the confidentiality of any proprietary or sensitive information disclosed during the engagement.' },
      { heading: '6. Termination', body: 'Either party may terminate this Agreement with 14 days\' written notice. Client shall pay Consultant for all work completed up to the termination date.' },
      { heading: '7. Governing Law', body: 'This Agreement shall be governed by and construed in accordance with the laws of England and Wales.' },
      { heading: 'Signatures', body: 'IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first written above.\n\n__________________________          __________________________\nClient Name                                            Consultant Name' }
    ]
  },
  {
    id: 'statement-of-work',
    title: 'Statement of Work Template',
    category: 'contracts',
    description: 'A clear SoW covering scope, timeline, responsibilities, payment, and acceptance criteria.',
    sections: [
      { heading: 'Scope of Services', body: 'Detailed description of the services and deliverables.' },
      { heading: 'Project Timeline', body: 'Start date, end date, and major milestones.' },
      { heading: 'Roles and Responsibilities', body: 'What you handle vs what the client handles.' },
      { heading: 'Payment Terms', body: 'Project fee, invoice schedule, and payment method.' },
      { heading: 'Acceptance Criteria', body: 'How and when the client will approve the work.' },
      { heading: 'Signatures', body: 'Space for sign-off from both sides.' }
    ]
  },
  {
    id: 'nda',
    title: 'NDA Template',
    category: 'contracts',
    description: 'A standard non-disclosure agreement covering confidentiality scope, obligations, exclusions, and duration.',
    sections: [
      { heading: 'Definition of Confidential Information', body: 'Covers what counts as confidential between you and the client.' },
      { heading: 'Obligations of Receiving Party', body: 'The client agrees not to disclose or misuse your confidential info.' },
      { heading: 'Exclusions', body: 'Information that is public or already known is not covered.' },
      { heading: 'Duration', body: 'Usually 2–5 years. Define how long confidentiality is required.' },
      { heading: 'Governing Law', body: 'Subject to the laws of England and Wales.' },
      { heading: 'Signatures', body: 'Space for both parties to sign and date.' }
    ]
  },
  {
    id: 'privacy-policy',
    title: 'Privacy & Data Protection Policy',
    category: 'contracts',
    description: 'A UK GDPR-compliant privacy policy template for client-facing data practices.',
    sections: [
      { heading: 'Data Collected', body: 'Names, emails, project data, and other client-submitted info.' },
      { heading: 'Usage of Data', body: 'Only for agreed consulting purposes.' },
      { heading: 'Data Storage', body: 'How and where client data is stored securely.' },
      { heading: 'Client Rights', body: 'Right to access, correct, or delete their data.' },
      { heading: 'Contact', body: 'Your details for data-related queries.' },
      { heading: 'Governing Law', body: 'Complies with UK GDPR.' }
    ]
  },
  {
    id: 'invoice-standard',
    title: 'Invoice Template (Standard)',
    category: 'finance',
    description: 'A clean, professional invoice template for consulting services with VAT support.',
    sections: [
      { heading: 'Header', body: 'INVOICE\n\nConsultant Name: [Your Full Name]\nBusiness Address: [Your Address]\nEmail: [Your Email Address]\nPhone: [Your Phone Number]\n\nInvoice Date: [Date]\nInvoice Number: [Unique Number]' },
      { heading: 'Bill To', body: 'Client Name: [Client\'s Name]\nClient Company: [Client\'s Company Name]\nClient Address: [Client\'s Address]' },
      { heading: 'Line Items', body: 'Description | Hours/Days | Rate | Amount\n———————————————————————————————\nBusiness Transformation Consulting Services for [Month] | [e.g. 10] | £[Rate] | £[Total]' },
      { heading: 'Totals', body: 'Subtotal: £[Subtotal]\nVAT (if applicable): £[VAT]\nTotal Amount Due: £[Total Amount]' },
      { heading: 'Payment Terms', body: 'Payment is due within 14 days of invoice date.\n\nBank Details: [Your Bank Name, Sort Code, Account Number]\n\nThank you for your business!' }
    ]
  },
  {
    id: 'invoice-logo',
    title: 'Invoice Template (With Logo)',
    category: 'finance',
    description: 'Invoice template with a placeholder for your logo and a default day rate.',
    sections: [
      { heading: 'Header', body: 'INVOICE\n\n[YOUR LOGO HERE]\n\nConsultant Name: [Your Full Name]\nBusiness Address: [Your Address]\nEmail: [Your Email Address]\nPhone: [Your Phone Number]\n\nInvoice Date: [Date]\nInvoice Number: [Unique Number]' },
      { heading: 'Bill To', body: 'Client Name: [Client\'s Name]\nClient Company: [Client\'s Company Name]\nClient Address: [Client\'s Address]' },
      { heading: 'Line Items', body: 'Description | Days | Rate | Amount\n———————————————————————————————\nBusiness Transformation Consulting Services for [Month] | [e.g. 10] | £500 | £[Total]' },
      { heading: 'Totals', body: 'Subtotal: £[Subtotal]\nVAT (if applicable): £[VAT]\nTotal Amount Due: £[Total Amount]' },
      { heading: 'Payment Terms', body: 'Payment is due within 14 days of invoice date.\n\nBank Details: [Your Bank Name, Sort Code, Account Number]\n\nThank you for your business!' }
    ]
  },
  {
    id: 'expense-report',
    title: 'Expense Report Template',
    category: 'finance',
    description: 'Track client-billable expenses with a simple, repeatable format.',
    sections: [
      { heading: 'How to Use', body: 'Fill out this form for each client-billable expense.' },
      { heading: 'Table Format', body: 'Include: Date | Description | Amount | Receipt Attached (Y/N)' },
      { heading: 'Submission', body: 'Include this report with your invoice.' }
    ]
  }
];

const TEMPLATE_CATEGORIES = {
  proposals: { label: 'Proposals', short: 'Proposals', gradient: 'from-cyan-500 to-blue-600', icon: FileText },
  discovery: { label: 'Discovery & Onboarding', short: 'Discovery', gradient: 'from-emerald-500 to-teal-600', icon: Search },
  contracts: { label: 'Contracts', short: 'Contracts', gradient: 'from-rose-500 to-red-600', icon: Briefcase },
  finance: { label: 'Finance & Admin', short: 'Finance', gradient: 'from-amber-500 to-orange-600', icon: TrendingUp }
};

function downloadTemplate(template) {
  const content = `${template.title}\n${'='.repeat(template.title.length)}\n\n${template.description}\n\n` +
    template.sections.map(s => `${s.heading}\n${'-'.repeat(s.heading.length)}\n${s.body}`).join('\n\n');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${template.id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==================== CHEAT SHEETS ====================
const CHEAT_SHEETS = [
  {
    id: 'excel-essentials',
    title: 'Excel Essentials for BAs',
    category: 'spreadsheets',
    description: 'The Excel knowledge a business analyst actually uses — formulas, lookups, conditional logic, and pivot tables.',
    sections: [
      { heading: 'Cell References', body: 'Relative: A1 — moves when copied\nAbsolute: $A$1 — never moves\nMixed: $A1 (column locked) or A$1 (row locked)\n\nRule of thumb: lock what shouldn\'t change. If you\'re copying a formula down a column but always want it to refer to the same lookup table, lock the table reference with $.' },
      { heading: 'Logical Functions', body: 'IF — single condition\n=IF(A1>100, "High", "Low")\n\nIFS — multiple conditions, returns first match\n=IFS(A1>=90,"A", A1>=80,"B", A1>=70,"C", TRUE,"Fail")\n\nAND / OR — combine conditions\n=IF(AND(A1>100, B1<50), "Yes", "No")\n\nIFERROR — fallback if formula fails\n=IFERROR(A1/B1, 0)' },
      { heading: 'Lookups (the BA\'s most-used skill)', body: 'XLOOKUP (modern, recommended)\n=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])\n=XLOOKUP("Acme", A:A, B:B, "Not found")\n\nVLOOKUP (legacy, still common)\n=VLOOKUP(lookup_value, table, column_number, FALSE)\n=VLOOKUP("Acme", A:C, 2, FALSE)\n\nINDEX/MATCH (flexible, works in any direction)\n=INDEX(B:B, MATCH("Acme", A:A, 0))' },
      { heading: 'Counting and Summing with Conditions', body: 'COUNTIF — count matching cells\n=COUNTIF(A:A, ">100")\n=COUNTIF(A:A, "London")\n\nSUMIF — sum matching cells\n=SUMIF(A:A, "London", B:B)\n\nMultiple conditions:\n=COUNTIFS(A:A, "London", B:B, ">100")\n=SUMIFS(C:C, A:A, "London", B:B, ">100")\n\nAVERAGEIFS — same pattern' },
      { heading: 'Text Functions', body: 'LEN — length of a string\nLEFT / RIGHT / MID — extract characters\n  =LEFT(A1, 3) returns first 3 characters\n  =MID(A1, 4, 5) starts at position 4, takes 5 characters\n\nUPPER / LOWER / PROPER — change case\n\nTRIM — remove extra spaces (essential before lookups)\n=TRIM(A1)\n\nCONCAT or & — join strings\n=A1 & " — " & B1\n\nTEXTSPLIT (modern) — split on a delimiter\n=TEXTSPLIT(A1, ",")' },
      { heading: 'Date Functions', body: 'TODAY() — current date\nNOW() — current date and time\nYEAR / MONTH / DAY — extract parts of a date\nWEEKDAY — returns day number (1=Sun by default, use 2 for Mon=1)\nDATEDIF — difference between dates\n=DATEDIF(start, end, "d") — days\n=DATEDIF(start, end, "m") — months\n=DATEDIF(start, end, "y") — years\nEOMONTH — last day of the month\n=EOMONTH(A1, 0) — current month\n=EOMONTH(A1, 1) — next month' },
      { heading: 'Pivot Tables — the BA\'s power tool', body: '1. Select your data (or click in any cell of a clean dataset)\n2. Insert → PivotTable → choose where to place it\n3. Drag fields into:\n   • Rows — categories you want to break down\n   • Columns — secondary breakdown (optional)\n   • Values — what to count, sum, or average\n   • Filters — top-level filters\n\nKey tricks:\n• Right-click a value → Summarise Values By → change Sum to Count, Average, etc.\n• Right-click → Show Values As → % of Grand Total, % of Row\n• Group dates by month/quarter/year via right-click → Group\n• Refresh after data changes (Data → Refresh All)' },
      { heading: 'Filtering and Sorting Data', body: 'FILTER — return rows that match a condition (modern Excel)\n=FILTER(A2:C100, B2:B100>50)\n\nSORT — sort an array by a column\n=SORT(A2:C100, 2, -1) — sort by column 2, descending\n\nUNIQUE — distinct values from a range\n=UNIQUE(A2:A100)\n\nThese three combined replace 80% of pivot table use cases for simple analysis.' },
      { heading: 'Common BA Formulas', body: 'Year-over-year change:\n=(this_year/last_year)-1\n\nRunning total:\n=SUM($B$2:B2) — drag down\n\nFlag duplicates:\n=COUNTIF($A:$A, A1)>1\n\nClassify with thresholds:\n=IFS(A1>=10000,"Enterprise", A1>=1000,"Mid", TRUE,"Small")\n\nCount unique values:\n=COUNTA(UNIQUE(A2:A100))\n\nLast value in a column:\n=LOOKUP(2, 1/(A:A<>""), A:A)' },
      { heading: 'Keyboard Shortcuts Worth Knowing', body: 'Ctrl+Arrow — jump to edge of data\nCtrl+Shift+Arrow — select to edge\nCtrl+T — turn data into a Table (then formulas auto-extend)\nCtrl+Shift+L — toggle filters\nF4 — toggle absolute/relative reference (when editing a formula)\nAlt+= — auto-sum\nCtrl+; — insert today\'s date\nCtrl+Shift+: — insert current time\nCtrl+E — Flash Fill (auto-detect a pattern)' }
    ]
  },
  {
    id: 'sql-for-bas',
    title: 'SQL for Business Analysts',
    category: 'sql',
    description: 'Practical SQL for BAs — pulling, filtering, joining, and aggregating data without needing a developer.',
    sections: [
      { heading: 'The Anatomy of a SELECT Statement', body: 'SELECT column1, column2  -- which columns\nFROM table_name           -- which table\nWHERE condition           -- filter rows\nGROUP BY column           -- aggregate by\nHAVING aggregate_filter   -- filter aggregates\nORDER BY column           -- sort\nLIMIT n;                  -- only n rows\n\nThe order you write it differs from the order it runs. Always start with FROM (where), then WHERE (filter), then SELECT (columns).' },
      { heading: 'Selecting Columns', body: '-- All columns (use sparingly on big tables)\nSELECT * FROM customers;\n\n-- Specific columns\nSELECT customer_id, name, email FROM customers;\n\n-- Rename a column in the output\nSELECT name AS customer_name FROM customers;\n\n-- Distinct values\nSELECT DISTINCT country FROM customers;' },
      { heading: 'Filtering with WHERE', body: '-- Equality\nWHERE country = \'UK\'\n\n-- Inequality\nWHERE status <> \'Closed\'\n\n-- Numeric ranges\nWHERE order_value > 100\nWHERE order_value BETWEEN 100 AND 500\n\n-- Multiple values\nWHERE country IN (\'UK\', \'France\', \'Spain\')\n\n-- Pattern matching\nWHERE email LIKE \'%@gmail.com\'\nWHERE name LIKE \'A%\'\n\n-- Missing data\nWHERE phone IS NULL\nWHERE phone IS NOT NULL\n\n-- Combining\nWHERE country = \'UK\' AND status = \'Open\'\nWHERE country = \'UK\' OR country = \'France\'' },
      { heading: 'Aggregating Data', body: 'COUNT(*) — count all rows\nCOUNT(column) — count non-null values\nCOUNT(DISTINCT column) — count unique values\nSUM(column) — total\nAVG(column) — mean\nMIN / MAX(column) — extremes\n\nExample:\nSELECT\n  COUNT(*) AS total_orders,\n  SUM(order_value) AS revenue,\n  AVG(order_value) AS avg_order\nFROM orders;' },
      { heading: 'Grouping with GROUP BY', body: 'Whenever SELECT mixes aggregate functions with regular columns, every regular column must be in GROUP BY.\n\nSELECT\n  country,\n  COUNT(*) AS orders,\n  SUM(order_value) AS revenue\nFROM orders\nGROUP BY country\nORDER BY revenue DESC;\n\n-- Filter aggregates with HAVING (not WHERE)\nSELECT country, COUNT(*) AS orders\nFROM orders\nGROUP BY country\nHAVING COUNT(*) > 50;' },
      { heading: 'Joining Tables', body: 'INNER JOIN — only rows that match in both tables\nLEFT JOIN — all rows from the left table; null for unmatched right rows\nRIGHT JOIN — opposite of LEFT (rare in practice)\nFULL JOIN — all rows from both sides\n\nSELECT\n  o.order_id,\n  c.name,\n  o.order_value\nFROM orders o\nLEFT JOIN customers c\n  ON o.customer_id = c.customer_id;\n\n-- Always alias tables (o, c) for readable joins\n-- Always specify the join type explicitly' },
      { heading: 'Useful Patterns BAs Hit Daily', body: '-- Top N records\nSELECT * FROM orders\nORDER BY order_value DESC\nLIMIT 10;\n\n-- Records this month\nWHERE order_date >= DATE_TRUNC(\'month\', CURRENT_DATE)\n\n-- Records in last 30 days\nWHERE order_date >= CURRENT_DATE - INTERVAL \'30 days\'\n\n-- Find duplicates\nSELECT email, COUNT(*)\nFROM customers\nGROUP BY email\nHAVING COUNT(*) > 1;\n\n-- Customers who haven\'t ordered\nSELECT c.*\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.order_id IS NULL;' },
      { heading: 'Conditional Logic with CASE', body: 'CASE\n  WHEN order_value >= 1000 THEN \'High\'\n  WHEN order_value >= 100 THEN \'Medium\'\n  ELSE \'Low\'\nEND AS value_band\n\n-- Often used inside aggregates for pivoting\nSELECT\n  country,\n  SUM(CASE WHEN status=\'Open\' THEN 1 ELSE 0 END) AS open_orders,\n  SUM(CASE WHEN status=\'Closed\' THEN 1 ELSE 0 END) AS closed_orders\nFROM orders\nGROUP BY country;' },
      { heading: 'Window Functions (the BA superpower)', body: 'Window functions calculate across a set of rows without collapsing them.\n\n-- Running total\nSUM(order_value) OVER (ORDER BY order_date) AS running_total\n\n-- Rank within a group\nRANK() OVER (PARTITION BY country ORDER BY order_value DESC) AS country_rank\n\n-- Compare to previous row\nLAG(order_value) OVER (ORDER BY order_date) AS previous_order\n\n-- Running average over last 7 rows\nAVG(order_value) OVER (\n  ORDER BY order_date\n  ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n) AS rolling_7_day' },
      { heading: 'Common Pitfalls to Avoid', body: '• NULLs don\'t equal anything, even themselves. Use IS NULL, never = NULL.\n• COUNT(column) ignores NULLs; COUNT(*) counts all rows. Know which you want.\n• WHERE filters before grouping; HAVING filters after. Don\'t mix them up.\n• Always check JOIN cardinality. If a join unexpectedly multiplies row counts, you have duplicates somewhere.\n• Date types differ between databases. Test date logic on a small sample first.\n• Production queries should always have a LIMIT during exploration.' }
    ]
  },
  {
    id: 'data-storytelling',
    title: 'Data Storytelling for Practitioners',
    category: 'storytelling',
    description: 'How to turn analysis into insight that drives decisions — structuring narratives, choosing visuals, and presenting to stakeholders.',
    sections: [
      { heading: 'What Data Storytelling Actually Is', body: 'Data storytelling combines three things:\n\n• Data — the underlying numbers and analysis\n• Visuals — charts and graphics that make patterns visible\n• Narrative — the human framing that gives it meaning\n\nA chart without narrative is decoration. A narrative without data is opinion. A story without visuals is hard to follow. The skill is weaving all three.' },
      { heading: 'Start with the Audience, Not the Data', body: 'Before building a single chart, answer:\n\n• Who is the audience? (Executive, peer, frontline)\n• What do they already know?\n• What decision are they trying to make?\n• What\'s their tolerance for detail?\n• What\'s in it for them?\n\nThe same data needs three different stories for an executive, an operational lead, and a peer analyst. Tailor relentlessly.' },
      { heading: 'The Three Audience Types', body: 'EXECUTIVES — basic data literacy, prioritise outcomes\n• Lead with the decision and the recommendation\n• 1–2 charts max per page\n• Skip methodology unless asked\n\nDATA-LITERATE PEERS — care about rigour\n• Show your working\n• Discuss methodology and caveats\n• Be open about uncertainty\n\nOPERATIONAL STAFF — care about what to do differently\n• Focus on tactical implications\n• Make the next action obvious\n• Keep technical content minimal' },
      { heading: 'The Narrative Arc', body: 'Good data stories follow a structure, not a pile of charts:\n\n1. Context — what\'s the situation?\n2. Change/Trigger — what\'s different or worth attention?\n3. Tension — what\'s at stake or in conflict?\n4. Insight — what does the data reveal?\n5. Recommendation — what should happen?\n\n"Sales were stable for two years (context). In Q3 they dropped 18% (change). At current rates we\'ll miss target by £4M (tension). The drop is concentrated in two products and one region (insight). We should reallocate marketing spend (recommendation)."' },
      { heading: 'Choosing the Right Chart', body: 'COMPARISON across categories → bar chart\nCHANGE over time → line chart\nDISTRIBUTION of values → histogram or box plot\nPART-TO-WHOLE → bar chart (better than pie)\nRELATIONSHIP between two variables → scatter plot\nSINGLE KPI → big number with context\n\nDefault rule: if you\'re reaching for a pie chart, try a bar chart instead. They\'re almost always more readable.' },
      { heading: 'Decluttering Visuals', body: 'Remove anything that isn\'t the message:\n\n• Drop chart borders, gridlines, and unnecessary legends\n• Label data directly when possible (no legend hunting)\n• Use a single accent colour to highlight what matters; mute the rest\n• Cut decimal places that don\'t change the story (£1,234,567 → £1.2M)\n• Sort categorical data deliberately (largest first, or chronological — never alphabetical unless lookup is the point)\n• Remove data labels if they create visual noise; keep axes if you can\'t' },
      { heading: 'Using Colour with Intent', body: 'Three types of palette:\n\nQUALITATIVE — distinct hues for unordered categories (regions, products)\nSEQUENTIAL — single hue, varying intensity for ordered values (low to high)\nDIVERGING — two hues for values around a midpoint (negative/positive variance)\n\nRules:\n• Use grey for context, colour for emphasis\n• Limit to 1–3 colours where possible\n• Avoid red/green only — colour-blind users miss the contrast\n• Be consistent across charts in the same deck\n• Don\'t encode meaningful data in chart-style decoration' },
      { heading: 'Using Text in Visuals', body: 'Text is part of the visualisation, not separate from it:\n\n• Put the insight in the title, not a generic description ("Sales fell 18% in Q3" beats "Quarterly sales")\n• Use the subtitle for context ("Driven by product line A and the EMEA region")\n• Annotate key data points directly on the chart\n• Don\'t make the reader work — call out what they should notice' },
      { heading: 'Avoiding Misleading Stories', body: 'Common ways data stories mislead:\n\n• Truncated y-axes that exaggerate small changes\n• Cherry-picked time ranges that hide the bigger trend\n• Aggregate metrics that mask underlying variation\n• Sample sizes too small to support claims\n• Correlation presented as causation\n\nIntegrity test: would I be comfortable showing this to someone who disagreed with my conclusion? If they\'d cry foul, fix the chart.' },
      { heading: 'Choosing the Format', body: 'PRESENTATION — for live discussion and decisions\n• Big visuals, minimal text per slide\n• One idea per slide\n• Reserve detail for appendix\n\nWRITTEN REPORT — for async consumption and reference\n• Executive summary up front (TL;DR)\n• Full context and methodology\n• Specific recommendations with owners\n\nDASHBOARD — for ongoing monitoring\n• Most important metric top-left\n• Group related metrics\n• Make filters and refresh dates visible\n• Always include a "what should I do?" cue\n\nMatch the format to how the audience will actually consume it.' },
      { heading: 'The 30-Second Test', body: 'Strip your data story down to a 30-second elevator pitch:\n\n• What\'s the headline insight?\n• What\'s the recommendation?\n• What\'s the most important supporting evidence?\n\nIf you can\'t do it in 30 seconds, you don\'t understand your own analysis well enough yet. Iterate until you can.' }
    ]
  },
  {
    id: 'stats-for-bas',
    title: 'Statistics for Practitioners',
    category: 'stats',
    description: 'The descriptive statistics, probability concepts, and distributions a practitioner needs to interpret data without a maths degree.',
    sections: [
      { heading: 'Why Stats Matters for BAs', body: 'You don\'t need to derive formulas. You do need to:\n\n• Know which summary statistic to use\n• Spot when an "average" is misleading\n• Recognise when a sample is too small to draw conclusions\n• Read a distribution chart correctly\n• Push back when someone misuses correlation\n\nThis cheat sheet covers the practical 20% you\'ll use 80% of the time.' },
      { heading: 'Measures of Centre', body: 'MEAN (average) — sum ÷ count\n• Best for symmetric data\n• Pulled toward outliers (a few huge values skew it)\n\nMEDIAN — middle value when sorted\n• Best for skewed data (income, house prices)\n• Robust to outliers\n\nMODE — most frequent value\n• Best for categorical data\n• Useful when distribution is multi-peaked\n\nRule: if mean and median are very different, the data is skewed. Always check both.' },
      { heading: 'Measures of Spread', body: 'RANGE — max minus min\n• Quick but heavily affected by outliers\n\nINTERQUARTILE RANGE (IQR) — Q3 minus Q1\n• Range of the middle 50%\n• Robust to outliers\n\nVARIANCE — average squared deviation from the mean\n• Mathematical foundation; not directly interpretable\n\nSTANDARD DEVIATION — square root of variance\n• Same units as the data\n• Roughly: 68% of normal data falls within 1 SD of the mean, 95% within 2 SDs\n\nA mean without a measure of spread tells you very little.' },
      { heading: 'Percentiles and Quartiles', body: 'PERCENTILE — the value below which X% of data falls\n• 50th percentile = median\n• 90th percentile = top 10% threshold\n\nQUARTILES — split data into 4 equal groups\n• Q1 = 25th percentile\n• Q2 = median (50th)\n• Q3 = 75th percentile\n\nUse percentiles when reporting performance. "Median load time is 1.2s, but the 95th percentile is 8s" tells a much truer story than "average load time is 2s".' },
      { heading: 'Distributions to Recognise', body: 'NORMAL (bell curve)\n• Symmetric around mean = median\n• Lots of natural data (heights, measurement errors)\n\nSKEWED\n• Right-skewed: long tail on the right (income, sales values)\n  Mean > Median\n• Left-skewed: long tail on the left (less common)\n  Mean < Median\n\nBIMODAL — two peaks\n• Often signals two populations mixed together\n• Investigate before treating as one group\n\nUNIFORM — flat\n• Each value equally likely (often signals randomness or coverage)' },
      { heading: 'Correlation', body: 'Measures how two variables move together. Scored from -1 to +1.\n\n+1 — perfect positive (X up, Y up)\n+0.7 — strong positive\n+0.3 — weak positive\n0 — no linear relationship\n-0.3 — weak negative\n-1 — perfect negative\n\nThree critical caveats:\n• Correlation only catches LINEAR relationships. Curves can show as 0.\n• Correlation ≠ causation. Ice cream sales correlate with drowning. Both are caused by summer.\n• A single outlier can drastically change correlation. Always plot before believing the number.' },
      { heading: 'Probability Basics', body: 'P(A) — probability of event A, between 0 and 1\nP(not A) = 1 - P(A)\n\nMUTUALLY EXCLUSIVE events (can\'t both happen):\n• P(A or B) = P(A) + P(B)\n• P(A and B) = 0\n\nINDEPENDENT events (one doesn\'t affect the other):\n• P(A and B) = P(A) × P(B)\n\nCONDITIONAL probability — P(A | B), probability of A given B happened:\n• Useful for diagnostic thinking\n• Often misused — see Bayes\' theorem if exploring further' },
      { heading: 'Counts vs Proportions', body: 'COUNTS tell you size: "We had 47 complaints this month"\nPROPORTIONS tell you context: "47 complaints out of 4,200 customers = 1.1%"\n\nAlways present both when possible. A raw count can be alarming or trivial depending on the denominator.\n\n"Conversions doubled" is meaningless if you don\'t know whether they went from 5 to 10 or 5,000 to 10,000.' },
      { heading: 'Sample Size — When Can You Trust It?', body: 'Rough guide for "is this sample reliable?":\n\n• Under 30 — treat as anecdotal, not statistical\n• 30–100 — useful directionally, wide error bars\n• 100–1,000 — reasonable confidence in patterns\n• Over 1,000 — small effects become detectable\n\nRule: the smaller the sample, the bigger the effect needs to be before you trust it. With 10 customers, a 20% difference might be noise. With 10,000, a 0.5% difference is real.\n\nAlso: a biased sample of 100,000 is worse than a representative sample of 100. Check who\'s in it before checking how many.' },
      { heading: 'Common Statistical Mistakes', body: '• Using the mean on heavily skewed data → use median\n• Ignoring distribution shape and reporting only summary stats\n• Drawing conclusions from very small samples\n• Comparing groups without considering different group sizes\n• Treating correlation as causation\n• Cherry-picking time periods to support a conclusion\n• Confusing statistical significance with practical importance\n• Ignoring sampling bias (who got included, who didn\'t)\n• Reporting precision the data doesn\'t support (£1,234,567.89 from a rough estimate)' },
      { heading: 'Sanity Checks Before Sharing', body: 'Before presenting any statistical finding, ask:\n\n• Is the sample size large enough to support this claim?\n• Could selection bias explain the result?\n• Is there a confounding variable?\n• Have I checked the distribution, not just the summary?\n• Would the conclusion change if I removed outliers?\n• Am I conflating correlation with causation?\n• Is the precision I\'m reporting actually supported by the data?\n\nIf any answer is "I don\'t know", caveat your finding accordingly.' }
    ]
  }
];

const CHEAT_SHEET_CATEGORIES = {
  spreadsheets: { label: 'Spreadsheets', short: 'Excel', gradient: 'from-emerald-600 to-green-700', icon: Calculator },
  sql: { label: 'SQL & Data', short: 'SQL', gradient: 'from-blue-600 to-indigo-700', icon: Database },
  storytelling: { label: 'Storytelling', short: 'Story', gradient: 'from-pink-600 to-rose-700', icon: BookOpen },
  stats: { label: 'Statistics', short: 'Stats', gradient: 'from-purple-600 to-violet-700', icon: BarChart3 }
};

function downloadCheatSheet(sheet) {
  const content = `${sheet.title}\n${'='.repeat(sheet.title.length)}\n\n${sheet.description}\n\n` +
    sheet.sections.map(s => `${s.heading}\n${'-'.repeat(s.heading.length)}\n${s.body}`).join('\n\n');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${sheet.id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

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
    id: 'communications-plan',
    title: 'Change Communications Plan',
    category: 'change',
    description: 'Build a structured comms plan that lands with every audience at the right moment.',
    estMinutes: 30,
    steps: [
      { type: 'reference', title: 'Why comms make or break change', body: 'Most change failures are diagnosed as "people resisted" but trace back to communication: unclear why, wrong messenger, wrong moment, wrong channel. A plan turns ad-hoc messaging into deliberate influence.' },
      { type: 'instruction', title: 'Define the core narrative', body: 'Write a one-page narrative covering: why now, what\'s changing, what\'s not changing, what success looks like, and what we\'re asking of people. Every other comm flows from this. If you can\'t fit it on one page, you don\'t understand it well enough yet.' },
      { type: 'checklist', title: 'Segment your audiences', body: 'Different groups need different messages. Common segments:', items: ['Executives — strategic context and ROI', 'People managers — what they need to do for their teams', 'Directly affected staff — what changes for them and when', 'Indirectly affected teams — heads-up so they\'re not blindsided', 'External (customers, partners, regulators) — only what they need'] },
      { type: 'instruction', title: 'Match messengers to audiences', body: 'The "from" matters as much as the message. Senior leaders deliver the why. Line managers deliver the what-it-means-for-you. Peers deliver the social proof. Don\'t let one voice carry it all — credibility comes from hearing it from the right person.' },
      { type: 'reference', title: 'The communications matrix', body: 'Build a grid: rows are audiences, columns are key milestones (announcement, training, go-live, post-launch). Each cell answers: what message, from whom, through which channel, by when. This single artefact catches gaps faster than any narrative.' },
      { type: 'checklist', title: 'Pick channels deliberately', body: 'Rule of thumb: high-stakes messages need rich channels; reminders can be lean.', items: ['Town halls and live Q&A — for major announcements', '1:1s and team meetings — for personal impact', 'Email — for record and reference', 'Intranet/Slack — for ongoing updates and FAQs', 'Posters and physical reminders — for behaviour change', 'Manager talking points — to enable cascade'] },
      { type: 'instruction', title: 'Plan repetition, not just announcements', body: 'People need to hear a message 5–7 times before it sinks in. Plan reinforcing comms across the change lifecycle, not a single launch. Vary the format so it doesn\'t feel like spam.' },
      { type: 'instruction', title: 'Build a feedback loop', body: 'Comms is two-way. Set up channels for questions and concerns: drop-in sessions, anonymous forms, listening posts with managers. Review what\'s coming in weekly and adjust the plan based on what you hear.' }
    ]
  },
  {
    id: 'change-impact-assessment',
    title: 'Change Impact Assessment',
    category: 'change',
    description: 'Map exactly who is affected, how, and how much — before you roll out.',
    estMinutes: 35,
    steps: [
      { type: 'reference', title: 'Why impact assessment matters', body: 'Without it, you\'re flying blind. You\'ll under-invest in the most affected groups and over-invest in groups that barely notice. A good assessment turns "everyone\'s affected" into a targeted plan.' },
      { type: 'instruction', title: 'List every group touched by the change', body: 'Go beyond the obvious. Include teams whose inputs change, whose outputs you consume, whose tools you share, and whose metrics will move. Err on the side of listing too many — you can drop them later.' },
      { type: 'checklist', title: 'Assess impact across dimensions', body: 'For each group, score impact (low/medium/high) on:', items: ['Process — how their day-to-day work changes', 'Tools/systems — what they\'ll need to learn or replace', 'Skills — new capabilities they\'ll need', 'Roles/responsibilities — what gets added, removed, or shifted', 'Performance metrics — how they\'ll be measured differently', 'Reporting lines — any organisational moves', 'Culture/identity — how their sense of role might shift'] },
      { type: 'instruction', title: 'Quantify where you can', body: 'Numbers focus attention. "Approximately 40 people will need 8 hours of training" is more useful than "people will need training". Estimate hours of disruption, retraining time, and productivity dip during transition.' },
      { type: 'reference', title: 'The heat map view', body: 'Build a grid: rows are stakeholder groups, columns are impact dimensions, cells are colour-coded (red/amber/green). The visual makes it obvious where to focus support — usually the deep-red rows with multiple high-impact dimensions.' },
      { type: 'checklist', title: 'Translate impact into support needs', body: 'For each high-impact group, define:', items: ['Specific training and development needed', 'Communications cadence and depth', 'Coaching or hand-holding required', 'Interim arrangements during transition', 'Backfill or capacity relief', 'Recognition for what they\'re giving up'] },
      { type: 'instruction', title: 'Validate with the affected groups', body: 'Don\'t assess in a vacuum. Run your impact ratings past representatives of each group. They\'ll often reveal impacts you missed and downgrade ones you over-weighted. Update accordingly.' }
    ]
  },
  {
    id: 'change-champions',
    title: 'Building a Change Champion Network',
    category: 'change',
    description: 'Recruit and equip a network of peers who carry the change inside their teams.',
    estMinutes: 25,
    steps: [
      { type: 'reference', title: 'Why champions work', body: 'People trust peers more than project teams. A change champion network spreads change through trusted relationships, surfaces local issues fast, and gives the project team eyes and ears across the organisation.' },
      { type: 'checklist', title: 'Profile of a good champion', body: 'Pick for influence, not seniority:', items: ['Respected by their peers (not necessarily their manager\'s favourite)', 'Curious and open to change — early adopter type', 'Honest enough to push back internally', 'Good communicator in their own way (not necessarily polished)', 'Has bandwidth — don\'t pile this on someone already stretched', 'Represents the team\'s working reality, not just the loudest voices'] },
      { type: 'instruction', title: 'Recruit deliberately, not by volunteer call', body: 'Open volunteer calls give you the keenest, not the most representative. Identify candidates by talking to managers, then invite them personally. Explain why you picked them — it builds commitment.' },
      { type: 'instruction', title: 'Define the role explicitly', body: 'Champions need a clear scope: time commitment (e.g., 2 hours a week), responsibilities (sharing updates, gathering feedback, modelling behaviours), and what success looks like. Vague roles fizzle out within a month.' },
      { type: 'checklist', title: 'Equip them properly', body: 'Champions can\'t carry the message without ammunition:', items: ['Early access to information (before broader announcements)', 'A simple toolkit: talking points, FAQs, slide deck', 'A regular forum to connect with each other (weekly or biweekly)', 'Direct line to the project team for questions', 'Recognition that visibly values their contribution'] },
      { type: 'instruction', title: 'Use them as a two-way channel', body: 'Champions aren\'t just broadcasters. Their highest-value contribution is feedback: what\'s landing, what\'s confusing, what\'s being grumbled about in side-channels. Build a structured way to capture this — a 15-minute weekly check-in, not a survey.' },
      { type: 'reference', title: 'When networks fail', body: 'Watch for: champions becoming complaint-collectors with no visible follow-up (kills credibility), the network being seen as project-team mouthpieces (loses peer trust), or champions being asked to defend things they don\'t agree with (burns them out). Address these fast.' }
    ]
  },
  {
    id: 'training-strategy',
    title: 'Designing a Training Strategy',
    category: 'change',
    description: 'Plan training that actually changes behaviour, not just box-ticks completion.',
    estMinutes: 30,
    steps: [
      { type: 'reference', title: 'Training is not the same as learning', body: 'Most training fails because it confuses delivery (a course was run) with outcomes (people work differently). Design backwards from the behaviour you want, not forwards from the content you have.' },
      { type: 'instruction', title: 'Define behavioural outcomes first', body: 'Write down the specific actions people should take differently after training. "Understands the new system" is not an outcome. "Can complete a refund within 3 minutes using the new workflow" is. If you can\'t see the behaviour, you can\'t train for it.' },
      { type: 'checklist', title: 'Segment your learners', body: 'Different roles need different training:', items: ['Power users — depth on advanced functionality', 'Standard users — fluent on common workflows', 'Occasional users — quick reference, not deep training', 'Approvers/managers — oversight tasks only', 'Trainers and champions — train-the-trainer plus pedagogy'] },
      { type: 'instruction', title: 'Choose modalities by purpose', body: 'No single format works for everything. Live sessions are best for nuance, judgement, and Q&A. Async videos work for procedural how-tos. Job aids and quick reference cards work for the moment of need. Practice environments work for skill-building. Mix and match by topic.' },
      { type: 'reference', title: 'The 70-20-10 reality', body: 'Roughly 70% of learning happens on the job, 20% from peers and managers, 10% from formal training. Plan for all three: don\'t over-invest in the 10% and ignore the rest. Coaching, communities of practice, and team-based learning carry most of the weight.' },
      { type: 'checklist', title: 'Plan for the moment of need', body: 'People forget 50%+ of training within a week. Reduce reliance on memory:', items: ['Job aids embedded where the work happens', 'Searchable knowledge base for self-service', 'A clear escalation path for "I\'m stuck"', 'Champions or super-users on each team', 'Refresher sessions 30 and 90 days post-launch'] },
      { type: 'instruction', title: 'Measure what matters', body: 'Smile sheets (did they enjoy it?) tell you nothing useful. Measure: behaviour change at 30/60/90 days, error rates on the new way, support tickets, time-to-competency. If these aren\'t moving, your training isn\'t working — regardless of completion stats.' }
    ]
  },
  {
    id: 'post-implementation-review',
    title: 'Post-Implementation Review',
    category: 'change',
    description: 'Run a proper PIR that captures lessons and improves the next change.',
    estMinutes: 40,
    steps: [
      { type: 'reference', title: 'PIR vs. project closure', body: 'Project closure asks "did we deliver?". A PIR asks "did it work, and what should we learn?". Closure happens at go-live. PIR happens 60–90 days later, once the change has had time to land or fail.' },
      { type: 'instruction', title: 'Time it correctly', body: 'Too early (under a month) and you\'re measuring honeymoon, not adoption. Too late (over six months) and people have moved on, memories are fuzzy, and findings are stale. 60–90 days post-go-live is the sweet spot for most changes.' },
      { type: 'checklist', title: 'Gather evidence before opinions', body: 'Start with data, not interviews:', items: ['Did we hit the success metrics defined in the business case?', 'How does post-change performance compare to baseline?', 'What\'s the support ticket / error / escalation pattern?', 'What\'s adoption like — % of users, frequency, depth?', 'What was actual cost vs. forecast?', 'How long did it take to reach steady state?'] },
      { type: 'instruction', title: 'Then capture qualitative experience', body: 'Numbers tell you what; people tell you why. Run focused conversations with affected staff, managers, sponsors, and the project team. Same questions, different lenses. Look for patterns across groups, not just isolated complaints.' },
      { type: 'reference', title: 'The four-question frame', body: 'Keep the structure simple: What worked well and should be repeated? What didn\'t work and should be stopped? What was missing that we needed? What surprised us, good or bad? Anything more elaborate gets bogged down.' },
      { type: 'checklist', title: 'Distinguish three types of finding', body: 'Sort each lesson into:', items: ['Project-specific issues — fix on this project before fully closing', 'Methodology issues — change how we run future projects of this type', 'Organisational issues — broader patterns that need leadership attention', 'Things that worked unusually well — codify so they\'re repeated'] },
      { type: 'instruction', title: 'Make the lessons actually used', body: 'Most PIR documents die in SharePoint. To prevent this: assign owners and dates to every action, present findings to a forum that makes decisions (not just records them), and reference the PIR explicitly when scoping the next similar change. Lessons not reused are lessons not learned.' }
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
    id: 'user-stories',
    title: 'Writing Effective User Stories',
    category: 'ba',
    description: 'Write user stories that drive useful conversations and shippable work.',
    estMinutes: 25,
    steps: [
      { type: 'reference', title: 'What user stories are for', body: 'A user story is a placeholder for a conversation, not a complete specification. Its job is to capture who, what, and why — the detail emerges through discussion. A perfect story you never discuss is worse than a rough story you do.' },
      { type: 'instruction', title: 'Use the standard format', body: 'As a [role], I want [capability], so that [benefit]. The benefit is the part most often missed and the most important — without it, you can\'t evaluate alternative solutions or know when you\'re done.' },
      { type: 'checklist', title: 'Test stories with INVEST', body: 'A good story is:', items: ['Independent — can be built without depending on other stories', 'Negotiable — open to discussion, not a fixed contract', 'Valuable — delivers value to a user or business', 'Estimable — clear enough that a team can size it', 'Small — fits in a single iteration', 'Testable — has clear acceptance criteria'] },
      { type: 'instruction', title: 'Write acceptance criteria', body: 'Use Given/When/Then format: Given [context], When [action], Then [outcome]. Cover the happy path and key edge cases. Acceptance criteria turn the story from a wish into something you can verify.' },
      { type: 'reference', title: 'Common anti-patterns', body: 'Solution stories ("As a user, I want a dropdown" — that\'s a UI choice, not a need). Roleless stories ("the system should..." — whose need?). Mega-stories that span weeks of work. Stories with vague benefits ("so that it works better"). Catch these in story-writing sessions, not after the build.' },
      { type: 'checklist', title: 'Splitting stories that are too big', body: 'When a story can\'t fit in a sprint, split by:', items: ['Workflow steps (do part of the journey first)', 'Data variations (cover one data type before others)', 'User roles (build for one persona before others)', 'Business rules (basic rules first, edge cases later)', 'Operations (read first, then create, then edit, then delete)', 'Happy path first, error handling later'] },
      { type: 'instruction', title: 'Keep stories alive, not archived', body: 'Stories aren\'t a write-once artefact. Refine them at backlog grooming sessions: clarify, split, deprioritise, or delete based on what\'s been learned. A story that\'s been sitting for six months untouched is usually a story you no longer need.' }
    ]
  },
  {
    id: 'moscow-prioritisation',
    title: 'MoSCoW Prioritisation',
    category: 'ba',
    description: 'Use MoSCoW properly so it actually narrows scope instead of blessing it all.',
    estMinutes: 20,
    steps: [
      { type: 'reference', title: 'What MoSCoW is — and isn\'t', body: 'MoSCoW classifies requirements as Must, Should, Could, or Won\'t (this time). Used well, it forces hard trade-offs. Used badly, it produces mostly Musts and a sprinkle of Coulds, which prioritises nothing.' },
      { type: 'instruction', title: 'Anchor on a fixed timebox', body: 'MoSCoW only works against a constraint. Without one, every requirement looks important enough to be a Must. Set the constraint first: "for the next release in 8 weeks" or "for the £200k budget". Now choices have to be made.' },
      { type: 'checklist', title: 'Define each category clearly', body: 'Be strict:', items: ['Must — the release fails without this; non-negotiable for go-live', 'Should — important and painful to omit, but the release still works without it', 'Could — desirable, included if there\'s capacity left', 'Won\'t (this time) — explicitly out of scope, prevents scope creep'] },
      { type: 'reference', title: 'The 60-20-20 rule of thumb', body: 'A common guideline: aim for ~60% Musts, ~20% Shoulds, ~20% Coulds (by effort, not count). If you have 90% Musts, you haven\'t prioritised — you\'ve just made a list. Push back until the proportions are realistic.' },
      { type: 'instruction', title: 'Run the workshop carefully', body: 'Get the right people: business stakeholders for value, technical leads for effort and feasibility. Go through each requirement asking "what happens if this isn\'t there?". The answer determines the rating. Don\'t accept "it\'d be bad" — push for specifics.' },
      { type: 'checklist', title: 'Defend the line on Musts', body: 'Stakeholders will try to elevate everything. Hold the line by asking:', items: ['Would the user accept the release without this?', 'Is there a workaround, even an awkward one?', 'Does it fail a regulatory or contractual obligation?', 'Does it block another Must?', 'If the answer to all four is no, it\'s probably not a Must.'] },
      { type: 'instruction', title: 'Treat Won\'ts as decisions, not omissions', body: 'The Won\'t list is the most powerful part of MoSCoW. It records what you explicitly chose not to do this time, which prevents endless re-litigation and gives a clear backlog for next time. Don\'t skip it.' }
    ]
  },
  {
    id: 'business-case',
    title: 'Building a Business Case for Process Improvement',
    category: 'ba',
    description: 'Make a compelling, numbers-backed case that wins funding and commitment.',
    estMinutes: 40,
    steps: [
      { type: 'reference', title: 'What a business case has to do', body: 'It has one job: give a decision-maker enough confidence to fund the work. That means showing the problem, the proposed change, the expected return, the cost, and the risk — clearly enough that someone who doesn\'t know the detail can make the call.' },
      { type: 'instruction', title: 'Lead with the problem, not the solution', body: 'Open with what\'s broken, in numbers people care about. Cost, time, customer impact, risk. If you start with "let\'s implement X", reviewers question the solution before agreeing on the problem. Get alignment on the problem first.' },
      { type: 'checklist', title: 'Quantify the current state', body: 'Get specific:', items: ['Volume and frequency of the problem', 'Direct cost (people, tech, errors, rework)', 'Indirect cost (customer churn, reputation, opportunity cost)', 'Time impact (cycle time, wait time, manual effort)', 'Risk exposure (compliance, security, financial)', 'How this scales as the business grows'] },
      { type: 'instruction', title: 'Compare options, not just the preferred one', body: 'Always present alternatives, even if you favour one. At minimum: do nothing, minimal fix, your recommendation, and "gold-plated" version. This shows you\'ve thought it through and lets the decision-maker pick consciously rather than just rubber-stamp.' },
      { type: 'reference', title: 'Build the financial model', body: 'Cover: one-off costs (tech, people, training), ongoing costs (licences, support), savings or revenue uplift (with assumptions), and the time profile. Use payback period (months to break even), NPV, or ROI depending on what your finance function expects. Be conservative — a case that overshoots once will face years of scepticism.' },
      { type: 'checklist', title: 'Include the non-financial case', body: 'Numbers don\'t carry the whole argument:', items: ['Strategic alignment (which corporate goals it supports)', 'Customer experience improvement', 'Employee experience and retention impact', 'Risk reduction (regulatory, operational, reputational)', 'Capability building for the future', 'Dependencies blocked by not doing this'] },
      { type: 'instruction', title: 'Be honest about risk', body: 'Every business case has risks. Listing them transparently builds credibility, not doubt. Include: implementation risk, adoption risk, benefits realisation risk, and what mitigations are in place. Reviewers worry more when risks aren\'t mentioned.' },
      { type: 'instruction', title: 'Plan benefits realisation upfront', body: 'A case that wins funding but never delivers measured benefits damages your credibility. Define: how each benefit will be tracked, who owns it, the baseline measure, target measure, and review cadence. This is part of the case, not an afterthought.' }
    ]
  },
  {
    id: 'to-be-process',
    title: 'Designing the To-Be Process',
    category: 'ba',
    description: 'Move from current state to a redesigned future process people will actually adopt.',
    estMinutes: 45,
    steps: [
      { type: 'reference', title: 'Don\'t skip As-Is', body: 'A To-Be design without a solid As-Is is wishful thinking. You can\'t redesign what you don\'t fully understand. If As-Is is rough, fix that first — even a quick walk-through is better than designing in the abstract.' },
      { type: 'instruction', title: 'Set design principles before drawing', body: 'Agree on principles up-front: e.g., "minimise handoffs", "first-time-right over speed", "automate decisions, judge exceptions", "single source of truth for data". When trade-offs come up later, principles arbitrate. Without them, the loudest voice wins.' },
      { type: 'checklist', title: 'Target the wastes you found', body: 'For each major issue in As-Is, decide the design response:', items: ['Handoffs — combine steps or create clearer SLAs', 'Approvals — challenge whether each one adds value', 'Rework loops — fix root causes upstream', 'Wait time — parallel where possible, batch less', 'Manual data entry — automate or eliminate', 'Workarounds — formalise the good ones, eliminate the rest'] },
      { type: 'instruction', title: 'Design from the customer outward', body: 'Start with what the customer experiences and works backwards. This prevents internal-convenience designs that are efficient for staff but miserable for customers. The customer journey is the spine the rest of the design hangs from.' },
      { type: 'reference', title: 'Levels of "future"', body: 'Distinguish three horizons: realistic (what we can achieve in 6 months with current tools), aspirational (what we could do in 18 months with investment), and visionary (what would be possible if constraints were removed). Show all three — it grounds the conversation and avoids "this is all we get".' },
      { type: 'checklist', title: 'Design for exceptions, not just the happy path', body: 'Most failures are exception failures. For each major step:', items: ['What\'s the standard path?', 'What goes wrong most often?', 'Who handles each exception type?', 'How does the system flag exceptions for attention?', 'How does data on exceptions feed back into improvement?'] },
      { type: 'instruction', title: 'Test the design with operators', body: 'Walk the new process with the people who\'ll do the work. Use a real example. Watch where they hesitate or push back — that\'s where the design has gaps. Iterate before locking it. A design that staff helped shape is one they\'ll defend.' },
      { type: 'instruction', title: 'Document at the right level', body: 'Process maps for the overview, swimlanes for handoffs, work instructions for the operator, RACI for accountability. Match the documentation to who needs it. Over-documenting in one place and under-documenting in another is a common failure mode.' }
    ]
  },
  {
    id: 'workshop-facilitation',
    title: 'Facilitating a Workshop',
    category: 'ba',
    description: 'Run productive workshops where the right decisions get made by the right people.',
    estMinutes: 30,
    steps: [
      { type: 'reference', title: 'Workshop vs. meeting', body: 'A meeting shares information. A workshop produces an output — a decision, a design, a prioritised list. If you can\'t name the output you\'re creating, don\'t run a workshop. Run a meeting, or send an email.' },
      { type: 'instruction', title: 'Define the output before anything else', body: 'Write down what will exist at the end that doesn\'t exist now. "Aligned on stakeholder map and engagement plan for Phase 1" beats "discuss stakeholders". The output drives the agenda, the attendees, and the materials.' },
      { type: 'checklist', title: 'Get the right people in the room', body: 'Workshop attendees should be:', items: ['Decision-makers for the topic at hand', 'People with the relevant knowledge or experience', 'People affected by the outcome (or their representatives)', 'A facilitator who isn\'t also a participant', 'Maximum 8–10 for working sessions; smaller for decisions', 'Avoid: spectators, people there "just in case", and substitutes who can\'t commit'] },
      { type: 'instruction', title: 'Pre-work is the workshop', body: 'Don\'t use workshop time to share information that could have been read in advance. Send pre-reads, ask for pre-thinking, and start the workshop assuming people did it. If they didn\'t, that\'s a signal — call it out gently and continue.' },
      { type: 'reference', title: 'The diverge-converge pattern', body: 'Most good workshops follow: frame the problem, diverge (generate options/inputs broadly, no judgement), converge (narrow down, evaluate, decide). Skip the diverge and you get groupthink. Skip the converge and you get a list of unprioritised ideas.' },
      { type: 'checklist', title: 'Manage energy and dynamics', body: 'A two-hour workshop is a managed performance:', items: ['Vary activity types every 20–30 minutes', 'Mix individual, pair, and group work', 'Make the introvert input visible (sticky notes before discussion)', 'Watch for the loud voice dominating — invite quieter people directly', 'Park off-topic items visibly so they\'re not lost', 'Take breaks; people make worse decisions when tired'] },
      { type: 'instruction', title: 'Close with explicit decisions and owners', body: 'Don\'t end on a high. End on commitments. Walk through every decision and action, name an owner, set a date, and confirm out loud. Send the summary within 24 hours — the gap is where misunderstanding lives.' }
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
  },
  {
    id: 'fishbone',
    title: 'Fishbone (Ishikawa) Analysis',
    category: 'pi',
    description: 'Structured root cause analysis when 5 Whys is too linear for the problem.',
    estMinutes: 30,
    steps: [
      { type: 'reference', title: 'When to use a fishbone', body: 'Use a fishbone when a problem likely has multiple contributing causes that interact. 5 Whys assumes a single causal chain; fishbones map a web. Manufacturing defects, service failures, project misses — all benefit from the wider lens.' },
      { type: 'instruction', title: 'Define the problem at the head', body: 'Write the problem statement at the "head" of the fish — the right-hand side. Be specific: "first-call resolution dropped 12% in Q3" beats "customer service issues". Vague problem, vague analysis.' },
      { type: 'checklist', title: 'Pick your category bones', body: 'The classic 6Ms work for most cases:', items: ['Manpower (People) — skills, training, motivation, capacity', 'Methods — procedures, processes, policies, decisions', 'Machines — tools, equipment, technology, systems', 'Materials — inputs, data, supplies, information', 'Measurement — metrics, monitoring, calibration, definitions', 'Environment — culture, physical setting, external factors'] },
      { type: 'instruction', title: 'Adapt categories to the problem', body: 'For service problems, swap to: People, Process, Policy, Place, Product, Procedure (the 6Ps). For software issues: People, Process, Code, Data, Infrastructure, External. The categories are scaffolding — change them if they don\'t fit.' },
      { type: 'instruction', title: 'Brainstorm causes per branch', body: 'Take each main bone and ask "what could be contributing to this problem from this angle?". Capture every plausible cause as a sub-bone. Don\'t evaluate yet — generation and evaluation are separate phases. Going broad is the point.' },
      { type: 'reference', title: 'Push deeper with mini-Whys', body: 'On each cause, ask "why does that happen?" once or twice. This adds smaller bones off the sub-bones and gets you closer to root causes rather than symptoms. The completed diagram should look genuinely fishlike, not skeletal.' },
      { type: 'checklist', title: 'Identify likely root causes', body: 'Once the diagram is full, evaluate:', items: ['Which causes appear in multiple branches?', 'Which have the strongest evidence behind them?', 'Which would have the biggest effect if removed?', 'Which can you actually do something about?', 'Pick 2–4 to investigate further with data.'] },
      { type: 'instruction', title: 'Validate before fixing', body: 'A plausible cause is not a confirmed cause. Test the top candidates against data — incident logs, usage patterns, error rates, interviews. Then design fixes for the validated root causes. Skipping validation leads to expensive fixes for things that weren\'t the problem.' }
    ]
  },
  {
    id: 'sipoc',
    title: 'Building a SIPOC Diagram',
    category: 'pi',
    description: 'Map a process at a glance to align stakeholders before diving into detail.',
    estMinutes: 20,
    steps: [
      { type: 'reference', title: 'What SIPOC is for', body: 'SIPOC stands for Suppliers, Inputs, Process, Outputs, Customers. It\'s a high-level view that fits on one page and answers "what is this process doing, end to end?" — useful for kicking off improvement work, onboarding new people, or aligning leadership before detail.' },
      { type: 'instruction', title: 'Start in the middle: the Process', body: 'Define the process in 4–7 high-level steps. Not 20 steps. Not 3 vague ones. Each step is a verb-noun phrase: "receive request", "validate eligibility", "issue refund", "notify customer". This level of granularity is what makes SIPOC powerful.' },
      { type: 'checklist', title: 'Define Outputs and Customers', body: 'Work right from the process to the right side:', items: ['What does the process produce? (decisions, documents, products, services)', 'Who receives each output? (customers can be internal or external)', 'What does each customer need from the output? (timeliness, accuracy, format)'] },
      { type: 'instruction', title: 'Define Inputs and Suppliers', body: 'Work left from the process: what does the process need to operate? Forms, data, signatures, materials. Who supplies each one? Be specific — "the customer", "the legal team", "the upstream system" — not "various". You\'ll often discover unmet input needs in this step.' },
      { type: 'reference', title: 'Why SIPOC reveals so much', body: 'Three common findings: outputs no one actually uses (waste), customers whose needs aren\'t met (defects), inputs the process depends on but doesn\'t consistently get (disruption). Each is a candidate for improvement.' },
      { type: 'checklist', title: 'Validate with stakeholders', body: 'Walk the SIPOC through:', items: ['The process owner — does this match how it works?', 'Suppliers — do you supply what we say you supply?', 'Customers — is what you receive what you need?', 'Operators — are these the actual steps in the order they happen?', 'Updates after each round — usually 2–3 iterations'] },
      { type: 'instruction', title: 'Use it as a launchpad', body: 'SIPOC is a starting artefact, not an ending one. From it you scope the deep-dive: which step needs process mapping, where are the worst customer satisfaction gaps, which inputs need supplier conversations. The detailed work follows from the SIPOC, not before it.' }
    ]
  },
  {
    id: 'pdca',
    title: 'Running a PDCA Cycle',
    category: 'pi',
    description: 'Use Plan-Do-Check-Act to drive structured, evidence-based improvement.',
    estMinutes: 30,
    steps: [
      { type: 'reference', title: 'Why PDCA still matters', body: 'PDCA (Plan, Do, Check, Act) is the simplest sustainable improvement loop ever designed. Most "improvement" fails because teams skip Check (did it actually work?) or Act (what do we do with what we learned?). The full loop is what creates compounding gains.' },
      { type: 'instruction', title: 'Plan — define the change as a hypothesis', body: 'Write the change as: "If we [do X], we expect [Y to change] because [reasoning]. We\'ll measure success by [metric]." This forces clarity on intent, mechanism, and evidence. Vague plans produce vague results.' },
      { type: 'checklist', title: 'Plan well before doing', body: 'A solid plan covers:', items: ['The specific change (one variable at a time, ideally)', 'Who, when, where the change happens', 'Baseline measurement before the change', 'Target measurement and how it will be captured', 'Duration of the test', 'What you\'d need to see to call it a success vs. failure'] },
      { type: 'instruction', title: 'Do — run the change as designed', body: 'Implement the change exactly as planned, not a modified version. If you change two things at once, you won\'t know which one worked. Capture what actually happens during the run, including unexpected events that might affect interpretation.' },
      { type: 'instruction', title: 'Check — compare results to expectations', body: 'Now compare actual to expected. Did the metric move? In the right direction? By the predicted amount? Did anything else change unexpectedly? Be honest — the temptation to declare victory prematurely is enormous and corrupts the learning.' },
      { type: 'reference', title: 'Three possible outcomes', body: 'Worked as expected → standardise the change. Worked partially → keep it but iterate further. Didn\'t work → don\'t just abandon the area; revisit your hypothesis. "We were wrong about why" is a valuable result and prevents the next bad guess.' },
      { type: 'checklist', title: 'Act — institutionalise or iterate', body: 'Based on results:', items: ['If successful — update standard work, train people, lock it in, measure to ensure it holds', 'If partially successful — refine and run another PDCA', 'If unsuccessful — document what was tried and why it didn\'t work, so others don\'t repeat it', 'In all cases — share the learning beyond the immediate team'] },
      { type: 'instruction', title: 'Cycle, don\'t stop', body: 'PDCA isn\'t a one-shot. After Act, identify the next biggest opportunity and Plan again. Sustained improvement comes from many small loops, not one big project. Teams that do PDCA monthly outperform teams that do it as a special initiative.' }
    ]
  },
  {
    id: 'pareto',
    title: 'Pareto Analysis (80/20)',
    category: 'pi',
    description: 'Find the vital few causes responsible for most of the impact — and ignore the rest for now.',
    estMinutes: 25,
    steps: [
      { type: 'reference', title: 'The Pareto principle', body: 'Roughly 80% of effects come from 20% of causes. The actual ratio varies — it might be 70/30 or 90/10 — but the pattern holds. The point: not all causes are equal. Pareto analysis tells you which few to focus on.' },
      { type: 'instruction', title: 'Define what you\'re analysing', body: 'Pick one specific issue: customer complaints, defects, downtime causes, support tickets, reasons for missed deadlines. Mixing types muddies the analysis. Keep it tightly scoped to one defect, one process, or one timeframe.' },
      { type: 'checklist', title: 'Categorise the data', body: 'For your dataset:', items: ['Choose categories that are mutually exclusive', 'Categories should be at the same level of detail', 'Avoid an "Other" category bigger than 10–15% — split it further', 'Keep total categories to 6–10 for readability', 'Use existing classifications if they exist; create new ones only if needed'] },
      { type: 'instruction', title: 'Count occurrences per category', body: 'For each category, count: how many incidents, complaints, defects, etc., fall into it? Use frequency for simple analysis. For higher-impact analysis, use cost or time per incident as the unit — sometimes a low-frequency category causes most of the cost.' },
      { type: 'reference', title: 'Build the chart', body: 'Sort categories from highest to lowest count. Plot bars in that order. Add a cumulative percentage line on top. Where the line crosses ~80% is your "vital few" cutoff. The categories to the left of that line are where to focus.' },
      { type: 'checklist', title: 'Avoid common mistakes', body: 'Be careful of:', items: ['Counting frequency when impact varies wildly per incident', 'Categories that are themselves causes-of-causes (go deeper)', 'Time periods too short to show real patterns', 'Treating outliers as the norm, or vice versa', 'Skipping validation that "vital few" really are vital'] },
      { type: 'instruction', title: 'Act on the vital few', body: 'For each of the top categories, run root cause analysis (5 Whys or fishbone) and design countermeasures. Don\'t spread effort across all categories — that\'s precisely what Pareto tells you not to do. The "useful many" can wait.' },
      { type: 'instruction', title: 'Re-run after fixing', body: 'Once you\'ve addressed the top 1–2 categories, run Pareto again on fresh data. The chart will look different — what was second is now first. This rotating focus is how compounding improvement works in practice.' }
    ]
  },
  {
    id: 'standard-work',
    title: 'Documenting Standard Work',
    category: 'pi',
    description: 'Capture the current best way to do a task so improvements have something to build on.',
    estMinutes: 25,
    steps: [
      { type: 'reference', title: 'Why standard work matters', body: 'Without a documented standard, every operator works slightly differently. Variation hides waste, makes training inconsistent, and means improvements have nothing to compare against. Standard work isn\'t about removing autonomy — it\'s about creating a baseline you can improve from.' },
      { type: 'instruction', title: 'Standard work isn\'t a manual', body: 'Forget 40-page procedure documents. Standard work is concise: typically one page per task, focused on the steps that matter, the right sequence, and the elements that affect quality, safety, or timing. If it\'s too long to be useful at the workstation, it\'s too long.' },
      { type: 'checklist', title: 'Capture the three core elements', body: 'Every standard work document includes:', items: ['Takt time — the rate at which the task should be completed', 'Work sequence — the order of steps to follow', 'Standard work-in-progress — the materials/inputs needed at each step', 'Plus key quality checks at each step', 'Plus safety considerations where relevant'] },
      { type: 'instruction', title: 'Write it with the operator, not for them', body: 'The best person to document standard work is someone who does it well — not a manager describing what they think happens. Watch them work, take notes, then draft together. The operator catches what an outside observer misses.' },
      { type: 'reference', title: 'Format for the workstation', body: 'Use simple visual layouts: numbered steps, a column for "what to look for", a column for "what to do if X happens". Photos beat text where possible. Diagrams beat photos where layout matters. The goal is glanceable, not comprehensive.' },
      { type: 'checklist', title: 'Validate the standard works', body: 'Before locking it in:', items: ['Have a different operator follow it cold — can they complete the task?', 'Watch for steps they skip or improvise — those need clarification', 'Time it — does the takt time hold up in practice?', 'Check quality outcomes — are they consistent when the standard is followed?', 'Iterate based on what you observe; expect 2–3 revisions'] },
      { type: 'instruction', title: 'Use it as the basis for improvement', body: 'Standard work isn\'t a final answer — it\'s today\'s best known way. When someone finds a better way, the standard gets updated. Without a standard, "better" is meaningless. With one, every improvement is captured and shared. This is the engine of continuous improvement.' },
      { type: 'instruction', title: 'Keep it alive', body: 'A standard nobody updates is a standard nobody follows. Build in a quarterly review. Audit adherence by observation, not self-report. When deviations are found, ask whether the standard is wrong or the practice is — sometimes the operator has improved on it without telling anyone.' }
    ]
  }
];

const CATEGORIES = {
  change: { label: 'Change Management', short: 'Change', gradient: 'from-fuchsia-500 to-pink-600', bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', border: 'border-fuchsia-200', accent: '#d946ef', icon: Compass },
  ba: { label: 'Business Analysis', short: 'BA', gradient: 'from-indigo-500 to-violet-600', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', accent: '#6366f1', icon: Target },
  pi: { label: 'Process Improvement', short: 'Process', gradient: 'from-amber-400 to-orange-500', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', accent: '#f59e0b', icon: TrendingUp }
};

const ChangeIllustration = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="changeGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d946ef" /><stop offset="100%" stopColor="#db2777" /></linearGradient></defs>
    <circle cx="60" cy="60" r="40" fill="url(#changeGrad)" opacity="0.15" /><circle cx="140" cy="100" r="30" fill="url(#changeGrad)" opacity="0.2" />
    <path d="M40 80 Q 80 40, 120 80 T 180 80" stroke="url(#changeGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="40" cy="80" r="8" fill="#d946ef" /><circle cx="120" cy="80" r="8" fill="#ec4899" /><circle cx="180" cy="80" r="8" fill="#db2777" />
    <path d="M155 70 L 165 80 L 155 90" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BAIllustration = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="baGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
    <rect x="30" y="100" width="20" height="40" rx="3" fill="url(#baGrad)" opacity="0.4" /><rect x="60" y="80" width="20" height="60" rx="3" fill="url(#baGrad)" opacity="0.6" />
    <rect x="90" y="60" width="20" height="80" rx="3" fill="url(#baGrad)" opacity="0.8" /><rect x="120" y="40" width="20" height="100" rx="3" fill="url(#baGrad)" />
    <circle cx="160" cy="40" r="12" fill="none" stroke="url(#baGrad)" strokeWidth="3" /><line x1="168" y1="48" x2="178" y2="58" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const PIIllustration = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="piGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#ea580c" /></linearGradient></defs>
    <circle cx="100" cy="80" r="50" fill="none" stroke="url(#piGrad)" strokeWidth="3" strokeDasharray="8 4" opacity="0.4" />
    <circle cx="100" cy="80" r="30" fill="url(#piGrad)" opacity="0.2" /><circle cx="100" cy="80" r="14" fill="url(#piGrad)" />
    <path d="M100 30 L 105 45 L 100 50 L 95 45 Z" fill="#f59e0b" /><path d="M170 80 L 155 85 L 150 80 L 155 75 Z" fill="#ea580c" />
    <path d="M100 130 L 95 115 L 100 110 L 105 115 Z" fill="#f59e0b" /><path d="M30 80 L 45 75 L 50 80 L 45 85 Z" fill="#ea580c" />
  </svg>
);

const HeroBlob = () => (
  <svg className="absolute -top-20 -right-20 w-96 h-96 opacity-20 pointer-events-none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="heroBlob" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fbbf24" /><stop offset="50%" stopColor="#ec4899" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
    <path d="M200 50 Q 320 80, 340 200 Q 320 320, 200 350 Q 80 320, 60 200 Q 80 80, 200 50" fill="url(#heroBlob)" />
  </svg>
);

const HeroBlob2 = () => (
  <svg className="absolute -bottom-32 -left-32 w-96 h-96 opacity-15 pointer-events-none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="heroBlob2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#6366f1" /></linearGradient></defs>
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
  return (<div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shadow-lg shadow-black/5`}><Icon className="w-5 h-5 text-white" /></div>);
};

// ==================== TEMPLATE VIEWER MODAL ====================
function TemplateViewer({ template, onClose, onDownload, categoryMap = TEMPLATE_CATEGORIES }) {
  const [copied, setCopied] = useState(false);
  const cat = categoryMap[template.category];

  const handleCopy = () => {
    const content = `${template.title}\n\n${template.description}\n\n` +
      template.sections.map(s => `${s.heading}\n${s.body}`).join('\n\n');
    navigator.clipboard?.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md p-4 overflow-y-auto" onClick={onClose}>
      <div className="max-w-3xl mx-auto my-8 bg-white rounded-3xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className={`bg-gradient-to-r ${cat.gradient} p-6 md:p-8 text-white relative`}>
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition">
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-white/20 backdrop-blur-sm mb-3">
            <cat.icon className="w-3 h-3" />
            {cat.label}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-2">{template.title}</h2>
          <p className="text-white/90 text-sm md:text-base leading-relaxed">{template.description}</p>
        </div>

        <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {template.sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cat.gradient}`} />
                  {section.heading}
                </h3>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm md:text-base pl-4 border-l-2 border-slate-100">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 transition font-semibold"
          >
            {copied ? <><Check className="w-4 h-4 text-emerald-600" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy to clipboard</>}
          </button>
          <button
            onClick={() => onDownload(template)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r ${cat.gradient} text-white hover:opacity-90 transition font-bold shadow-lg`}
          >
            <Download className="w-4 h-4" />
            Download as .txt
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== AUTH SCREEN ====================
function AuthScreen({ users, onLogin, onSignUp, onClose, isModal = false, contextMessage }) {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    setError('');

    if (!email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailLower = email.trim().toLowerCase();

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your name.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (users[emailLower]) {
        setError('An account with this email already exists. Try signing in.');
        return;
      }
      onSignUp({ email: emailLower, name: name.trim(), password });
    } else {
      const user = users[emailLower];
      if (!user) {
        setError('No account found with that email. Try signing up.');
        return;
      }
      if (user.password !== password) {
        setError('Incorrect password.');
        return;
      }
      onLogin(emailLower);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setPassword('');
  };

  const wrapperClass = isModal
    ? "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto"
    : "min-h-screen relative bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden";

  return (
    <div className={wrapperClass}>
      {!isModal && <HeroBlob />}
      {!isModal && <HeroBlob2 />}

      <div className="relative w-full max-w-md my-8">
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white/70 hover:text-white text-sm font-medium flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to library
          </button>
        )}

        {/* Brand */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Work Playbooks</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-slate-300 text-base">
            {contextMessage || (mode === 'signup' ? 'Start running playbooks in under a minute.' : 'Pick up where you left off.')}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-7 md:p-8">
          {/* Mode toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => switchMode('signin')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === 'signin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                mode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Sign up
            </button>
          </div>

          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition text-slate-900 placeholder:text-slate-400"
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition text-slate-900 placeholder:text-slate-400"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
                  className="w-full pl-11 pr-11 py-3 rounded-xl border-2 border-slate-200 bg-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition text-slate-900 placeholder:text-slate-400"
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-600 text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition-all hover:scale-[1.01] shadow-lg shadow-pink-500/30 mt-2"
            >
              {mode === 'signup' ? 'Create account' : 'Sign in'}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-slate-500">
            {mode === 'signup' ? (
              <>Already have an account? <button type="button" onClick={() => switchMode('signin')} className="text-violet-600 font-semibold hover:underline">Sign in</button></>
            ) : (
              <>New here? <button type="button" onClick={() => switchMode('signup')} className="text-violet-600 font-semibold hover:underline">Create an account</button></>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6 px-4 leading-relaxed">
          Accounts are stored locally on this device. Your progress saves automatically.
        </p>
      </div>
    </div>
  );
}

// ==================== DAILY QUOTE WIDGET ====================
function DailyQuoteWidget({ quote }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-900 p-8 md:p-10 mb-8 shadow-xl">
      {/* Decorative blobs */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 opacity-20 blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Quote of the day
          </div>
        </div>

        <div className="flex items-start gap-4 md:gap-5">
          <Quote className="w-10 h-10 md:w-14 md:h-14 text-white/20 flex-shrink-0 -mt-1" strokeWidth={1.5} />
          <div className="flex-1">
            <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed mb-3">
              {quote.text}
            </p>
            <p className="text-amber-200 font-medium text-sm md:text-base">
              — {quote.author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  // Auth state
  const [users, setUsers] = useState({}); // { email: { name, password, progress: {} } }
  const [currentUser, setCurrentUser] = useState(null); // email of current user

  // App state
  const [view, setView] = useState('library');
  const [section, setSection] = useState('playbooks'); // 'playbooks' | 'templates' | 'cheatsheets'
  const [activePlaybook, setActivePlaybook] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [activeCheatSheet, setActiveCheatSheet] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [templateFilter, setTemplateFilter] = useState('all');
  const [cheatSheetFilter, setCheatSheetFilter] = useState('all');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [pendingPlaybook, setPendingPlaybook] = useState(null);
  const [pendingTemplate, setPendingTemplate] = useState(null);
  const [pendingCheatSheet, setPendingCheatSheet] = useState(null);

  const dailyQuote = getDailyQuote();

  // Get current user's progress
  const progress = currentUser && users[currentUser]?.progress ? users[currentUser].progress : {};

  useEffect(() => {
    if (view === 'runner' && activePlaybook) {
      const saved = progress[activePlaybook.id];
      if (saved && saved.lastStep !== undefined && saved.completed < activePlaybook.steps.length) {
        setActiveStep(saved.lastStep);
      } else {
        setActiveStep(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, activePlaybook]);

  const handleSignUp = ({ email, name, password }) => {
    setUsers(prev => ({
      ...prev,
      [email]: { name, password, progress: {} }
    }));
    setCurrentUser(email);
    setShowAuthGate(false);
    if (pendingPlaybook) {
      setActivePlaybook(pendingPlaybook);
      setView('runner');
      setPendingPlaybook(null);
    }
    if (pendingTemplate) {
      setActiveTemplate(pendingTemplate);
      setPendingTemplate(null);
    }
    if (pendingCheatSheet) {
      setActiveCheatSheet(pendingCheatSheet);
      setPendingCheatSheet(null);
    }
  };

  const handleLogin = (email) => {
    setCurrentUser(email);
    setShowAuthGate(false);
    if (pendingPlaybook) {
      setActivePlaybook(pendingPlaybook);
      setView('runner');
      setPendingPlaybook(null);
    }
    if (pendingTemplate) {
      setActiveTemplate(pendingTemplate);
      setPendingTemplate(null);
    }
    if (pendingCheatSheet) {
      setActiveCheatSheet(pendingCheatSheet);
      setPendingCheatSheet(null);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('library');
    setActivePlaybook(null);
    setActiveStep(0);
    setShowAccountMenu(false);
    setFilter('all');
    setSearch('');
  };

  const updateProgress = (updater) => {
    if (!currentUser) return;
    setUsers(prev => {
      const user = prev[currentUser];
      if (!user) return prev;
      const newProgress = updater(user.progress || {});
      return {
        ...prev,
        [currentUser]: { ...user, progress: newProgress }
      };
    });
  };

  const filteredPlaybooks = PLAYBOOKS.filter(p => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  const startPlaybook = (pb) => {
    if (!currentUser) {
      setPendingPlaybook(pb);
      setShowAuthGate(true);
      return;
    }
    setActivePlaybook(pb);
    setView('runner');
  };

  const openTemplate = (template) => {
    if (!currentUser) {
      setPendingTemplate(template);
      setShowAuthGate(true);
      return;
    }
    setActiveTemplate(template);
  };

  const openCheatSheet = (sheet) => {
    if (!currentUser) {
      setPendingCheatSheet(sheet);
      setShowAuthGate(true);
      return;
    }
    setActiveCheatSheet(sheet);
  };

  const filteredTemplates = TEMPLATES.filter(t => {
    const matchesSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = templateFilter === 'all' || t.category === templateFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredCheatSheets = CHEAT_SHEETS.filter(s => {
    const matchesSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = cheatSheetFilter === 'all' || s.category === cheatSheetFilter;
    return matchesSearch && matchesFilter;
  });

  const exitToLibrary = () => {
    if (activePlaybook) {
      const completedSteps = progress[activePlaybook.id]?.steps || {};
      const completedCount = Object.values(completedSteps).filter(Boolean).length;
      updateProgress(p => ({
        ...p,
        [activePlaybook.id]: { steps: completedSteps, completed: completedCount, lastStep: activeStep }
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

    updateProgress(p => ({
      ...p,
      [activePlaybook.id]: { steps: updated, completed: completedCount, lastStep: activeStep }
    }));

    if (completedCount === activePlaybook.steps.length) {
      setShowCelebration(true);
    }
  };

  const resetPlaybook = (pbId) => {
    updateProgress(p => {
      const next = { ...p };
      delete next[pbId];
      return next;
    });
  };

  const goToStep = (idx) => {
    if (!activePlaybook) return;
    if (idx < 0 || idx >= activePlaybook.steps.length) return;
    setActiveStep(idx);
    updateProgress(p => ({
      ...p,
      [activePlaybook.id]: { ...(p[activePlaybook.id] || { steps: {}, completed: 0 }), lastStep: idx }
    }));
  };

  // ============ AUTH MODAL (shown when trying to access a playbook) ============
  // Note: we no longer gate the whole app — auth shows as a modal when needed.

  const user = currentUser ? users[currentUser] : null;

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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
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
                idx === activeStep ? `bg-gradient-to-br ${cat.gradient} text-white shadow-lg scale-110` : completedSteps[idx] ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
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
      {showAuthGate && (
        <AuthScreen
          users={users}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
          onClose={() => { setShowAuthGate(false); setPendingPlaybook(null); setPendingTemplate(null); setPendingCheatSheet(null); }}
          isModal={true}
          contextMessage={
            pendingPlaybook ? `Sign in to start "${pendingPlaybook.title}" and save your progress.` :
            pendingTemplate ? `Sign in to access "${pendingTemplate.title}".` :
            pendingCheatSheet ? `Sign in to access "${pendingCheatSheet.title}".` :
            undefined
          }
        />
      )}

      {activeTemplate && (
        <TemplateViewer
          template={activeTemplate}
          onClose={() => setActiveTemplate(null)}
          onDownload={downloadTemplate}
        />
      )}

      {activeCheatSheet && (
        <TemplateViewer
          template={activeCheatSheet}
          categoryMap={CHEAT_SHEET_CATEGORIES}
          onClose={() => setActiveCheatSheet(null)}
          onDownload={downloadCheatSheet}
        />
      )}

      <header className="relative bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 overflow-hidden">
        <HeroBlob />
        <HeroBlob2 />

        {/* Account / Sign in button */}
        <div className="absolute top-4 right-4 z-20">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 via-pink-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium hidden sm:inline">{user?.name || 'Account'}</span>
              </button>

              {showAccountMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowAccountMenu(false)} />
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-20">
                    <div className="p-4 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Signed in as</div>
                      <div className="font-semibold text-slate-900 truncate">{user?.name}</div>
                      <div className="text-sm text-slate-500 truncate">{currentUser}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthGate(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition text-sm font-semibold"
            >
              <LogIn className="w-4 h-4" />
              Sign in
            </button>
          )}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-12 md:py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{currentUser ? `Welcome back, ${user?.name?.split(' ')[0]}` : 'Interactive playbooks for practitioners'}</span>
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
        {/* Daily quote widget */}
        <DailyQuoteWidget quote={dailyQuote} />

        {/* Section tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1 bg-slate-100 rounded-2xl w-fit">
          <button
            onClick={() => { setSection('playbooks'); setSearch(''); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
              section === 'playbooks' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            Playbooks
            <span className={`text-xs px-2 py-0.5 rounded-full ${section === 'playbooks' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>{PLAYBOOKS.length}</span>
          </button>
          <button
            onClick={() => { setSection('templates'); setSearch(''); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
              section === 'templates' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Freelance Toolkit
            <span className={`text-xs px-2 py-0.5 rounded-full ${section === 'templates' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>{TEMPLATES.length}</span>
          </button>
          <button
            onClick={() => { setSection('cheatsheets'); setSearch(''); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
              section === 'cheatsheets' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Cheat Sheets
            <span className={`text-xs px-2 py-0.5 rounded-full ${section === 'cheatsheets' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>{CHEAT_SHEETS.length}</span>
          </button>
        </div>

        {section === 'playbooks' && (<>
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search playbooks..." className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition text-slate-900 placeholder:text-slate-400 font-medium" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilter('all')} className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${filter === 'all' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300'}`}>
              All ({PLAYBOOKS.length})
            </button>
            {Object.entries(CATEGORIES).map(([key, cat]) => {
              const count = PLAYBOOKS.filter(p => p.category === key).length;
              const Icon = cat.icon;
              return (
                <button key={key} onClick={() => setFilter(key)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${filter === key ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg` : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300'}`}>
                  <Icon className="w-4 h-4" />
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {filter === 'all' && !search && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {Object.entries(CATEGORIES).map(([key, cat]) => {
              const Illustration = key === 'change' ? ChangeIllustration : key === 'ba' ? BAIllustration : PIIllustration;
              const count = PLAYBOOKS.filter(p => p.category === key).length;
              return (
                <button key={key} onClick={() => setFilter(key)} className="relative group overflow-hidden rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-300 p-5 text-left transition-all hover:shadow-lg hover:-translate-y-0.5">
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
        </>)}

        {section === 'templates' && (<>
          <div className="mb-6 bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 opacity-20 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider mb-3">
                <Briefcase className="w-3 h-3 text-amber-300" />
                Freelance Toolkit
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">Everything you need to run a consulting practice.</h2>
              <p className="text-slate-300 leading-relaxed">From the first discovery call to the final invoice — proposals, contracts, discovery toolkits, onboarding forms, and finance templates. Battle-tested, ready to customise.</p>
            </div>
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition text-slate-900 placeholder:text-slate-400 font-medium"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setTemplateFilter('all')} className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${templateFilter === 'all' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300'}`}>
                All ({TEMPLATES.length})
              </button>
              {Object.entries(TEMPLATE_CATEGORIES).map(([key, cat]) => {
                const count = TEMPLATES.filter(t => t.category === key).length;
                const Icon = cat.icon;
                return (
                  <button key={key} onClick={() => setTemplateFilter(key)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${templateFilter === key ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg` : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300'}`}>
                    <Icon className="w-4 h-4" />
                    {cat.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {filteredTemplates.map(template => {
              const cat = TEMPLATE_CATEGORIES[template.category];
              const Icon = cat.icon;
              return (
                <div key={template.id} className="relative bg-white rounded-2xl border-2 border-slate-200 hover:border-slate-300 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 group">
                  <div className={`h-1.5 bg-gradient-to-r ${cat.gradient}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r ${cat.gradient} text-white shadow-sm`}>
                        <Icon className="w-3 h-3" />
                        {cat.short}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                        <FileText className="w-3 h-3" />
                        {template.sections.length} sections
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{template.title}</h2>
                    <p className="text-slate-600 mb-4 leading-relaxed text-sm">{template.description}</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openTemplate(template)} className={`flex-1 bg-gradient-to-r ${cat.gradient} text-white py-3 rounded-xl font-bold hover:opacity-90 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2`}>
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button
                        onClick={() => {
                          if (!currentUser) {
                            setPendingTemplate(template);
                            setShowAuthGate(true);
                            return;
                          }
                          downloadTemplate(template);
                        }}
                        className="p-3 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-700 font-semibold mb-1">No templates match your search</p>
              <p className="text-slate-500 text-sm">Try a different keyword or category</p>
            </div>
          )}
        </>)}

        {section === 'cheatsheets' && (<>
          <div className="mb-6 bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 opacity-25 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 opacity-20 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider mb-3">
                <BookOpen className="w-3 h-3 text-amber-300" />
                Cheat Sheets
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">The technical reference, BA-style.</h2>
              <p className="text-slate-300 leading-relaxed">Quick reference guides for Excel, SQL, statistics, and data storytelling — written for practitioners who need answers fast, not theory at length.</p>
            </div>
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cheat sheets..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition text-slate-900 placeholder:text-slate-400 font-medium"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setCheatSheetFilter('all')} className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${cheatSheetFilter === 'all' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300'}`}>
                All ({CHEAT_SHEETS.length})
              </button>
              {Object.entries(CHEAT_SHEET_CATEGORIES).map(([key, cat]) => {
                const count = CHEAT_SHEETS.filter(s => s.category === key).length;
                const Icon = cat.icon;
                return (
                  <button key={key} onClick={() => setCheatSheetFilter(key)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${cheatSheetFilter === key ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg` : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300'}`}>
                    <Icon className="w-4 h-4" />
                    {cat.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {filteredCheatSheets.map(sheet => {
              const cat = CHEAT_SHEET_CATEGORIES[sheet.category];
              const Icon = cat.icon;
              return (
                <div key={sheet.id} className="relative bg-white rounded-2xl border-2 border-slate-200 hover:border-slate-300 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 group">
                  <div className={`h-1.5 bg-gradient-to-r ${cat.gradient}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r ${cat.gradient} text-white shadow-sm`}>
                        <Icon className="w-3 h-3" />
                        {cat.short}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                        <FileText className="w-3 h-3" />
                        {sheet.sections.length} sections
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{sheet.title}</h2>
                    <p className="text-slate-600 mb-4 leading-relaxed text-sm">{sheet.description}</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openCheatSheet(sheet)} className={`flex-1 bg-gradient-to-r ${cat.gradient} text-white py-3 rounded-xl font-bold hover:opacity-90 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2`}>
                        <Eye className="w-4 h-4" />
                        Open
                      </button>
                      <button
                        onClick={() => {
                          if (!currentUser) {
                            setPendingCheatSheet(sheet);
                            setShowAuthGate(true);
                            return;
                          }
                          downloadCheatSheet(sheet);
                        }}
                        className="p-3 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCheatSheets.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-700 font-semibold mb-1">No cheat sheets match your search</p>
              <p className="text-slate-500 text-sm">Try a different keyword or category</p>
            </div>
          )}
        </>)}

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
