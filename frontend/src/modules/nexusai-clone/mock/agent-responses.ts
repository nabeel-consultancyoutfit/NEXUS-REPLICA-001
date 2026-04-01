/**
 * agent-responses.ts
 *
 * Predefined mock responses for the three NexusAI agents.
 * Used in the free-chat phase to simulate real agentic responses.
 *
 * Structure mirrors the expected ML API response format so that
 * future integration only requires swapping the data source,
 * not the UI or chat flow logic.
 *
 * Future upgrade: replace getNextResponse() with:
 *   const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ prompt }) });
 */
import type { AgentMockResponse } from '../types';

// ─── Mock response banks keyed by intent ────────────────────────────────────

export const AGENT_RESPONSES: Record<string, AgentMockResponse[]> = {

  dashboard: [
    {
      agent:      'frontend-agent',
      status:     'proposal',
      message:    'Proposing UI implementation for the dashboard module.',
      plan: [
        'Create DashboardPage at pages/ai/dashboard/index.tsx',
        'Build StatsCard component — icon + metric value + trend indicator',
        'Build RecentActivityTable with sortable columns',
        'Add responsive grid layout via MUI Grid container',
        'Wire RTK Query for GET /api/analytics/summary',
      ],
      components: ['DashboardPage', 'StatsCard', 'RecentActivityTable', 'TrendBadge'],
    },
  ],

  marketplace: [
    {
      agent:      'frontend-agent',
      status:     'proposal',
      message:    'Proposing the AI model marketplace browse page.',
      plan: [
        'Create MarketplacePage — model card grid with pagination',
        'Build FilterSidebar — provider, capability, pricing, licence filters',
        'Build ModelCard — icon tile + name + badge + capability chips + star rating + price',
        'Add SearchBar with 300ms debounce',
        'Wire RTK Query for GET /api/models with query params',
        'Add loading skeleton + empty state + error state',
      ],
      components: ['MarketplacePage', 'ModelCard', 'FilterSidebar', 'CapabilityChip', 'SearchBar', 'ModelCardSkeleton'],
    },
    {
      agent:      'backend-agent',
      status:     'proposal',
      message:    'Proposing the models API module for marketplace integration.',
      plan: [
        'Create backend/src/models/ NestJS module',
        'Design Model Mongoose schema with all required fields',
        'Create DTOs: CreateModelDto, UpdateModelDto, ModelResponseDto',
        'Build GET /api/models — paginated + filterable',
        'Build GET /api/models/:id — full model detail',
        'Build GET /api/models/providers — provider list for filter dropdown',
        'Add Swagger documentation on all endpoints',
        'Register ModelsModule in AppModule',
      ],
      endpoints: [
        'GET  /api/models              (public)  paginated + search + filters',
        'GET  /api/models/:id          (public)  single model detail',
        'GET  /api/models/providers    (public)  provider list',
        'POST /api/models/:id/bookmark (JWT)     toggle bookmark',
      ],
    },
  ],

  auth: [
    {
      agent:    'backend-agent',
      status:   'complete',
      message:  'Auth module is already live. All endpoints are available.',
      endpoints: [
        'POST /api/auth/signup  (public)  Register new user — returns JWT',
        'POST /api/auth/login   (public)  Login with email + password — returns JWT',
        'GET  /api/auth/me      (JWT)     Get current user profile',
      ],
    },
    {
      agent:      'frontend-agent',
      status:     'proposal',
      message:    'Proposing auth integration — wiring the sign-in / get-started modals to the backend.',
      plan: [
        'Create Redux auth slice — stores accessToken + user object',
        'Create RTK Query auth service — signup + login endpoints',
        'Build SignInModal component — email + password form',
        'Build GetStartedModal component — name + email + password form',
        'Wire CloneNavbar sign-in and get-started buttons to modals',
        'Add token to localStorage for persistence on reload',
      ],
      components: ['SignInModal', 'GetStartedModal', 'AuthProvider'],
    },
  ],

  models: [
    {
      agent:    'backend-agent',
      status:   'proposal',
      message:  'Proposing the models backend module.',
      plan: [
        'Create backend/src/models/ with schema + DTOs + controller + service',
        'Model schema: name, provider, description, capabilities[], badge, status, rating, pricingType, price, licence, contextWindow, tags',
        'Add text index on name + description for full-text search',
        'Paginate all list endpoints — default pageSize 20, max 100',
        'Seed script for initial 525 models from mock data',
      ],
      endpoints: [
        'GET  /api/models',
        'GET  /api/models/:id',
        'GET  /api/models/providers',
        'POST /api/models/:id/bookmark',
      ],
    },
  ],

  testing: [
    {
      agent:   'qa-agent',
      status:  'proposal',
      message: 'Proposing a QA test suite for the current Auth + Users implementation.',
      testCases: [
        'TC01 — POST /api/auth/signup valid payload          → 201 + token returned',
        'TC02 — POST /api/auth/signup duplicate email        → 409 Conflict',
        'TC03 — POST /api/auth/signup missing required field → 400 Bad Request',
        'TC04 — POST /api/auth/login correct credentials     → 200 + token',
        'TC05 — POST /api/auth/login wrong password          → 401 Unauthorized',
        'TC06 — GET  /api/auth/me with valid token           → 200 user profile',
        'TC07 — GET  /api/auth/me without token              → 401 Unauthorized',
        'TC08 — Sign-in modal empty submit                   → validation errors shown',
        'TC09 — Sign-in modal invalid email format           → field error shown',
        'TC10 — Sign-in modal valid submit                   → token stored + navbar updates',
      ],
    },
  ],

  agents: [
    {
      agent:      'frontend-agent',
      status:     'proposal',
      message:    'Proposing the Agent Builder page.',
      plan: [
        'Create AgentsPage at pages/ai/agents/index.tsx',
        'Build AgentCard grid — name + description + category + use count',
        'Build "Build your own" dashed CTA card',
        'Add "Ask the Hub" guided chat integration panel',
        'Wire to GET /api/agents for agent template list',
      ],
      components: ['AgentsPage', 'AgentCard', 'BuildAgentCard', 'AskHubPanel'],
    },
    {
      agent:    'backend-agent',
      status:   'proposal',
      message:  'Proposing the agents backend module.',
      plan: [
        'Create backend/src/agents/ NestJS module',
        'AgentTemplate schema: name, description, category, icon, uses, steps[]',
        'UserAgent schema: userId, templateId, name, config, status',
        'Seed 6 default agent templates from mock data',
      ],
      endpoints: [
        'GET  /api/agents           (public)  list agent templates',
        'GET  /api/agents/:id       (public)  template detail',
        'POST /api/agents/user      (JWT)     create user agent',
        'GET  /api/agents/user/mine (JWT)     list my agents',
        'PATCH /api/agents/user/:id (JWT)     update my agent',
      ],
    },
  ],

  discover: [
    {
      agent:      'frontend-agent',
      status:     'proposal',
      message:    'Proposing the Discover / Research Feed page.',
      plan: [
        'Create DiscoverPage at pages/ai/discover/index.tsx',
        'Build ResearchCard — date badge + source + title + tags + isNew badge',
        'Add infinite scroll or pagination',
        'Wire to GET /api/research for live feed',
      ],
      components: ['DiscoverPage', 'ResearchCard', 'DateBadge', 'SourceLabel'],
    },
  ],

  default: [
    {
      agent:   'frontend-agent',
      status:  'info',
      message:
        "I'm the NexusAI assistant. I can help you explore the platform, find AI models, build agents, or understand how everything works. What would you like to explore?",
    },
    {
      agent:   'frontend-agent',
      status:  'info',
      message:
        'The NexusAI platform has 525+ AI models across providers like OpenAI, Anthropic, Google DeepMind, Meta, Mistral, and more. Use the Marketplace to browse and filter by capability, price, or provider.',
    },
    {
      agent:   'frontend-agent',
      status:  'info',
      message:
        "Try selecting one of the task cards to start a guided discovery flow, or head to the Marketplace to browse models directly. I can also help you build an agent or explore the research feed.",
    },
    {
      agent:   'backend-agent',
      status:  'info',
      message:
        'The backend currently has Auth + Users modules live on port 3008. Next planned modules: Models, Agents, Discover, Chat — each following the NestJS module convention with full Swagger documentation.',
    },
    {
      agent:   'qa-agent',
      status:  'info',
      message:
        'QA testing is not yet active. Once the Auth + Users integration is complete, I can run a full test suite covering API tests (TC01–TC10), UI validation tests, and end-to-end auth flow tests.',
    },
  ],
};

// ─── Intent matcher ──────────────────────────────────────────────────────────

/**
 * Maps a free-text prompt to a response category.
 * Future upgrade: replace with ML intent classification.
 */
export function matchResponseCategory(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('dashboard'))                                              return 'dashboard';
  if (p.includes('marketplace') || p.includes('browse') || p.includes('filter') || p.includes('card')) return 'marketplace';
  if (p.includes('auth') || p.includes('login') || p.includes('signup') || p.includes('sign in') || p.includes('password')) return 'auth';
  if (p.includes('model') || p.includes('endpoint') || p.includes('api')) return 'models';
  if (p.includes('test') || p.includes('qa') || p.includes('bug') || p.includes('spec')) return 'testing';
  if (p.includes('agent') || p.includes('builder') || p.includes('automate'))             return 'agents';
  if (p.includes('discover') || p.includes('research') || p.includes('feed'))             return 'discover';
  return 'default';
}

// ─── Round-robin response picker ─────────────────────────────────────────────

const _counters: Record<string, number> = {};

/**
 * Returns the next response for a category (round-robins through the bank).
 * Future upgrade: replace with real API call.
 */
export function getNextResponse(category: string): AgentMockResponse {
  const list = AGENT_RESPONSES[category] ?? AGENT_RESPONSES['default'];
  const idx  = _counters[category] ?? 0;
  _counters[category] = (idx + 1) % list.length;
  return list[idx];
}

/**
 * Formats an AgentMockResponse into a human-readable chat string.
 */
export function formatAgentResponse(r: AgentMockResponse): string {
  const agentLabel: Record<string, string> = {
    'frontend-agent': '🎨 Frontend Agent',
    'backend-agent':  '⚙️  Backend Agent',
    'qa-agent':       '🧪 QA Agent',
  };
  const statusLabel: Record<string, string> = {
    proposal: '📋 PROPOSAL',
    complete: '✅ COMPLETE',
    error:    '❌ ERROR',
    info:     'ℹ️  INFO',
  };

  const lines: string[] = [
    `${agentLabel[r.agent] ?? r.agent}  ·  ${statusLabel[r.status] ?? r.status}`,
    '',
    r.message,
  ];

  if (r.plan?.length) {
    lines.push('', 'Implementation Plan:');
    r.plan.forEach((step, i) => lines.push(`  ${i + 1}. ${step}`));
  }
  if (r.components?.length) {
    lines.push('', `Components: ${r.components.join(', ')}`);
  }
  if (r.endpoints?.length) {
    lines.push('', 'Endpoints:');
    r.endpoints.forEach((ep) => lines.push(`  ${ep}`));
  }
  if (r.testCases?.length) {
    lines.push('', 'Test Cases:');
    r.testCases.forEach((tc) => lines.push(`  ${tc}`));
  }

  return lines.join('\n');
}
