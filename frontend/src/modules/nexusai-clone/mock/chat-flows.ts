/**
 * chat-flows.ts
 *
 * Defines the 3-step guided discovery flow that mirrors nexusai-db.netlify.app.
 * When a user selects a task card the system walks them through:
 *   Step 1 → WHO IT'S FOR
 *   Step 2 → YOUR EXPERIENCE
 *   Step 3 → YOUR BUDGET
 * then generates a personalised AI prompt.
 *
 * Future upgrade: replace generatePrompt() with a real ML API call.
 */
import type { ChatFlowStep } from '../types';

// ─── The 3 universal guided steps ──────────────────────────────────────────

export const GUIDED_STEP_1: ChatFlowStep = {
  categoryTag:   "WHO IT'S FOR",
  categoryColor: '#C8622A',
  question:      'Who will be using this AI?',
  subtitle:      "This helps match the right tool style",
  statusLabel:   'NexusAI Hub · guided setup',
  choices: [
    { icon: '👤', label: 'Just me',          description: 'Personal use'            },
    { icon: '👥', label: 'My team',           description: 'Small group, work'       },
    { icon: '🏢', label: 'My company',        description: 'Business / enterprise'   },
    { icon: '🛒', label: 'My customers',      description: 'Building for end-users'  },
    { icon: '🎓', label: 'Students',          description: 'Education / learning'    },
    { icon: '🌐', label: 'Anyone / public',   description: 'Open to the world'       },
  ],
};

export const GUIDED_STEP_2: ChatFlowStep = {
  categoryTag:   'YOUR EXPERIENCE',
  categoryColor: '#C8622A',
  question:      'How comfortable are you with tech / AI?',
  subtitle:      "Totally fine to be brand new — that's what I'm here for!",
  statusLabel:   'NexusAI Hub · guided setup',
  choices: [
    { icon: '🔰', label: 'Complete beginner', description: 'Never used AI before'       },
    { icon: '😊', label: 'Some experience',   description: 'Used ChatGPT etc.'          },
    { icon: '💻', label: 'Developer',          description: 'I can write code'           },
    { icon: '🔬', label: 'AI researcher',      description: 'Deep technical knowledge'   },
  ],
};

export const GUIDED_STEP_3: ChatFlowStep = {
  categoryTag:   'YOUR BUDGET',
  categoryColor: '#C8622A',
  question:      "What's your budget?",
  subtitle:      "I'll only show you what fits",
  statusLabel:   'NexusAI Hub · guided setup',
  choices: [
    { icon: '🆓', label: 'Free only',    description: 'No credit card'              },
    { icon: '💳', label: 'Pay as I go',  description: 'Small monthly costs OK'      },
    { icon: '📋', label: 'Fixed plan',   description: 'Predictable monthly bill'    },
    { icon: '🏗️', label: 'Enterprise',   description: 'Scale, SLAs, support'        },
  ],
};

// ─── Task intro messages ────────────────────────────────────────────────────

export const TASK_INTROS: Record<string, string> = {
  'Write content':
    'Great choice! 🎯 "Write content" — I can already think of some excellent models for that.\n\nNow, quick question:',
  'Create images':
    'Awesome! 🎨 "Create images" — there are some incredible image generation models available.\n\nNow, quick question:',
  'Build something':
    'Love it! 🔧 "Build something" — code generation and developer tools are some of the most powerful AI capabilities.\n\nNow, quick question:',
  'Automate work':
    'Smart thinking! ⚡ "Automate work" — AI automation is transforming how teams work every day.\n\nNow, quick question:',
  'Analyse data':
    'Great choice! 📊 "Analyse data" — some models are exceptional at reasoning through complex data.\n\nNow, quick question:',
  'Just exploring':
    "Perfect place to start! 🔎 \"Just exploring\" — I'll guide you through what's possible, step by step.\n\nNow, quick question:",
};

// ─── Acknowledgement messages per step ─────────────────────────────────────

export const STEP1_ACKS: Record<string, string> = {
  'Just me':
    'Perfect — "Just me". That helps a lot! 💡\n\nOne more:',
  'My team':
    'Great — "My team". Team tools need to be reliable and easy to collaborate on. 👥\n\nOne more:',
  'My company':
    'Got it — "My company". Enterprise scale means I\'ll focus on robust, scalable options. 🏢\n\nOne more:',
  'My customers':
    'Interesting — "My customers". Building for end-users means UX and reliability matter most. 🛒\n\nOne more:',
  'Students':
    'Wonderful — "Students". I\'ll prioritise accessible and educational tools. 🎓\n\nOne more:',
  'Anyone / public':
    "Open to the world! 🌐 I'll recommend versatile, general-purpose models.\n\nOne more:",
};

export const STEP2_ACKS: Record<string, string> = {
  'Complete beginner':
    "No worries at all! 🌱 We'll start simple and I'll guide you every step of the way.\n\nLast question:",
  'Some experience':
    'Great — "Some experience". I\'ll skip the basics and show you something immediately useful. 😊\n\nLast question:',
  'Developer':
    'Got it — "Developer". Almost there! 🚀\n\nLast question:',
  'AI researcher':
    'Excellent! "AI researcher" — I\'ll give you the full technical picture. 🔬\n\nLast question:',
};

// ─── Prompt generator ───────────────────────────────────────────────────────

const ROLE_MAP: Record<string, string> = {
  'Write content':   'You are a professional content writer.',
  'Create images':   'You are an expert creative director specialising in AI image generation.',
  'Build something': 'You are a senior software engineer and system architect.',
  'Automate work':   'You are a workflow automation specialist.',
  'Analyse data':    'You are a senior data analyst and insights expert.',
  'Just exploring':  'You are a knowledgeable AI guide and educator.',
};

const AUDIENCE_MAP: Record<string, string> = {
  'Just me':          'This is for my personal use.',
  'My team':          'This is for a small team at work.',
  'My company':       'This is for company-wide use at an enterprise level.',
  'My customers':     'This will be used by end customers in a product.',
  'Students':         'This is for student / educational use.',
  'Anyone / public':  'This will be available to the general public.',
};

const EXPERIENCE_MAP: Record<string, string> = {
  'Complete beginner': 'Please use plain language and explain any technical terms clearly.',
  'Some experience':   'Assume I understand the basics. Keep it practical and actionable.',
  'Developer':         'I can write code — feel free to use technical terms and code snippets.',
  'AI researcher':     'I have deep technical knowledge. Be precise, detailed, and thorough.',
};

const BUDGET_MAP: Record<string, string> = {
  'Free only':    'Focus only on free and open-source solutions — no paid API costs.',
  'Pay as I go':  'Small, variable costs are acceptable. Focus on the best value for money.',
  'Fixed plan':   'I prefer predictable monthly pricing over usage-based billing.',
  'Enterprise':   'Cost is secondary to reliability, SLAs, and scalability.',
};

/**
 * Generates a personalised AI prompt based on the 3 guided answers.
 * Future: replace with real ML API call.
 */
export function generatePrompt(
  task:       string,
  audience:   string,
  experience: string,
  budget:     string,
): string {
  const lines = [
    ROLE_MAP[task]             ?? 'You are an expert AI assistant.',
    `Help me with: ${task}.`,
    '',
    AUDIENCE_MAP[audience]     ?? '',
    EXPERIENCE_MAP[experience] ?? '',
    BUDGET_MAP[budget]         ?? '',
    '',
    'Please give a clear, structured response with practical steps I can act on immediately.',
    'Focus on the best solution and note any significant costs or tradeoffs.',
    'Start with a concise overview, then walk me through the most effective approach step by step.',
  ];
  return lines.filter(Boolean).join('\n');
}
