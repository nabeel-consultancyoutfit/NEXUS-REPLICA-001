# NexusAI — Complete Product Specification
## Reverse-Engineered for Full Functional Rebuild

---

## 1. PRODUCT OVERVIEW

**Product Name:** NexusAI — AI Model Marketplace
**Tagline:** "Discover, Compare & Deploy"
**URL:** https://nexusai-db.netlify.app/
**Architecture:** Single Page Application (SPA) with client-side routing
**Hosting:** Netlify (static site with client-side rendering)

**Core Mission:** Enable users — especially non-technical ones — to discover, compare, and deploy AI models through a centralized marketplace with guided discovery, agent-building tools, and a research feed.

**Key Platform Statistics (displayed in UI):**

| Metric | Value |
|--------|-------|
| Total AI Models | 525+ |
| Active Builders | 82,000+ |
| AI Labs/Providers | 28+ |
| Average Model Rating | 4.8 / 5.0 |
| Supported Languages | 15+ |
| Update Frequency | Daily |

---

## 2. COMPLETE SITEMAP & PAGE MAP

```
/ ...................................... Homepage (public landing + discovery hub)
│
├── /chat ................................ Chat Hub (guided discovery + model interaction)
│   ├── [model-selector-sidebar] ........ Left panel: searchable model list (525+)
│   ├── [chat-area] ..................... Center: conversational AI interface
│   ├── [quick-actions-sidebar] ......... Right panel: shortcuts & tools
│   └── [model-switcher-dropdown] ....... Inline model switching during chat
│
├── /marketplace ........................ Model Marketplace (browse + filter + compare)
│   ├── [search-bar] ................... Full-text search with voice input
│   ├── [filter-sidebar] ............... Advanced filters (provider, price, rating, license)
│   ├── [lab-filter-bar] ............... Horizontal scrollable lab pills
│   ├── [capability-filter-chips] ...... Language / Vision / Code / Image Gen / Audio / Open Source
│   ├── [model-card-grid] .............. Paginated card grid (4-5 per row)
│   └── /marketplace/model/[id] ........ Model Detail Panel (modal/expanded view)
│       ├── [overview-tab] ............. Description, specs, capabilities
│       ├── [how-to-use-tab] ........... API setup, SDK examples, deployment
│       ├── [pricing-tab] .............. Pay-per-use, Pro, Enterprise tiers
│       ├── [prompt-guide-tab] ......... Model-specific prompt engineering
│       ├── [agent-creation-tab] ....... 6-step agent setup guide
│       └── [reviews-tab] .............. User ratings, testimonials, distribution
│
├── /agents ............................. Agent Builder
│   ├── [new-agent-button] ............. Start from scratch
│   ├── [ai-guide-chat] ................ "Ask the Hub" for personalized setup plan
│   └── [templates-grid] ............... Pre-built agent templates
│       ├── research-agent
│       ├── customer-support-agent
│       ├── code-review-agent
│       ├── data-analysis-agent
│       └── content-writer-agent
│
├── /discover ........................... Discover New / AI Research Feed
│   └── [feed-list] .................... Chronological research & release entries
│       ├── [date-badge]
│       ├── [source-lab]
│       ├── [category-badge] ........... Just Released / Hot / Open Source / Coding / etc.
│       └── [entry-detail]
│
├── /auth ............................... Authentication (inferred)
│   ├── [sign-in-modal] ................ Existing user login
│   └── [get-started-modal] ............ New user registration + onboarding
│
├── /api ................................ API Documentation (footer link)
├── /privacy ............................ Privacy Policy (footer link)
├── /terms .............................. Terms of Service (footer link)
│
└── [global-elements]
    ├── [top-nav-bar] .................. Logo, Chat Hub, Marketplace, Discover, Agents, Lang, Auth
    ├── [language-selector] ............. 15+ language dropdown
    ├── [newsletter-subscription] ....... Email capture form
    └── [footer] ....................... Models, Research, API, Privacy, Terms
```

**Important Routing Note:** This is an SPA — all routes are handled client-side. Direct URL access to sub-routes may 404; the app resolves views through internal navigation state.

---

## 3. DETAILED PAGE SPECIFICATIONS

### 3.1 HOMEPAGE ( / )

**Purpose:** Public landing page, discovery hub, and marketing funnel entry point.

#### Section 1: Top Navigation Bar
- Logo (links to home)
- **Chat Hub** — primary feature tab
- **Marketplace** — browse models tab
- **Discover New** — research feed tab
- **Agents** — agent builder tab
- Language selector dropdown (15+ languages: EN, AR, FR, DE, ES, PT, ZH, JA, KO, HI, UR, TR, RU, IT, NL)
- "Sign In" button (secondary)
- "Get Started" button (primary CTA, orange)

#### Section 2: Hero
- Headline: "Find your perfect AI model with guided discovery"
- Subtitle: "You don't need to know anything about AI to get started..."
- Live stat badge: "347 models live · Updated daily"
- Interactive chat input box with:
  - Text input placeholder: "Click here and type anything — or just say hi!"
  - Voice conversation button
  - Voice typing button
  - Video button
  - Screen sharing button
  - File attachment button
  - Image upload button
  - "Let's go" CTA button
- Secondary links: "Skip — search directly" / "Not sure, skip"

#### Section 3: Quick-Action Grid (14 actions)
- Headline: "What would you like to do today?"
- Grid of action cards:
  1. Create Image
  2. Generate Audio
  3. Create Video
  4. Create Slides
  5. Create Infographics
  6. Create Quiz
  7. Create Flashcards
  8. Create Mind Map
  9. Analyze Data
  10. Write Content
  11. Code Generation
  12. Document Analysis
  13. Translate
  14. Just Exploring

#### Section 4: Key Metrics Bar
- 525+ AI Models
- 82K Builders
- 28 AI Labs
- 4.8★ Avg Rating

#### Section 5: Featured Models Carousel
- Headline: "Featured Models"
- Horizontal scrollable model cards (20+)
- Each card: name, provider, badge (Hot/New/Open Source), description, capability tags, star rating, review count, input/output pricing
- CTA: "Browse all 525 →"

#### Section 6: Browse by AI Lab
- Headline: "Browse by AI Lab"
- Horizontal scrollable lab cards (30+)
- Each card: lab logo, lab name, model count, flagship model examples
- Labs include: OpenAI, Anthropic, Google DeepMind, xAI, DeepSeek, Meta, Alibaba (Qwen), Mistral, NVIDIA NIM, GLM (Zhipu), Moonshot (Kimi), Cohere, Microsoft, Amazon, Baidu, Perplexity, Together AI, Stability AI, Runway, Hugging Face, and more
- CTA: "See all labs →"

#### Section 7: Flagship Model Comparison Table
- Headline: "Flagship Model Comparison"
- Subtitle: "Side-by-side view of leading models. Input/Output prices per 1M tokens."
- Table columns: MODEL | LAB | CONTEXT | INPUT $/1M | OUTPUT $/1M | MULTIMODAL | SPEED | BEST FOR
- 14+ rows with models from all major labs
- Disclaimer: "Prices shown are approximate..."
- CTA: "Compare all →"

**Models in comparison table:**

| Model | Lab | Context | Input $/1M | Output $/1M | Multimodal | Speed | Best For |
|-------|-----|---------|-----------|------------|-----------|-------|----------|
| GPT-5.4 | OpenAI | 1.05M | $2.50 | $15 | Yes | Fast | High-precision professional tasks |
| Claude Opus 4.6 | Anthropic | 200K/1M | $5 | $25 | Yes | Moderate | Agents & advanced coding |
| Claude Sonnet 4.6 | Anthropic | 200K/1M | $3 | $15 | Yes | Fast | Code & content at scale |
| Claude Haiku 4.5 | Anthropic | 200K | $1 | $5 | Yes | Fastest | Real-time high-volume |
| Gemini 3.1 Pro | Google | 2M-5M | $2 | $12 | Yes | Moderate | Deep reasoning & long context |
| Gemini 3.1 Flash | Google | 1M | $2 | $12 | Yes | Moderate | High-volume chat & coding |
| Gemini 3.1 Flash-Lite | Google | 1M | $0.10 | $0.40 | Yes | Fastest | Low-cost agents & translation |
| Grok-4.1 Fast | xAI | 2000K | $0.20 | $0.50 | Yes | Moderate | Real-time X data analysis |
| DeepSeek-V3 | DeepSeek | 128K | $0.07 | $0.28 | No | Moderate | Budget general model |
| Llama 4 Maverick | Meta | 128K | Free | Free | Yes | Moderate | Open-source multimodal |
| Qwen3-Max | Alibaba | 128K | $0.40 | $1.20 | Yes | Moderate | Multilingual & APAC |
| Devstral 2 | Mistral | 256K | $0.40 | $2 | No | Fastest | Software engineering agents |
| Nemotron Ultra 256B | NVIDIA | 131K | $0.60 | $1.80 | No | Moderate | Enterprise reasoning & RAG |
| kimi-k2.5 | Moonshot | 262K | $0.60 | $3 | Yes | Fastest | Multi-agent RAG & visual coding |

#### Section 8: Trending This Week
- Headline: "Trending This Week 🔥"
- 6 research/release cards in chronological order
- Each card: date badge, source lab, title, description, category badge
- CTA: "View research feed →"

#### Section 9: Find Models by Budget (4 tiers)
- Headline: "Find Models by Budget"
- Tier cards with color backgrounds:
  1. **Free & Open Source** — Self-host with zero API cost (6 models)
  2. **Budget — Under $0.50/1M** — Best performance per dollar (9 models)
  3. **Mid-Range — $1–$5/1M** — Top-tier for demanding workloads (11 models)
  4. **Premium — $5+/1M** — Maximum quality (5 models)

#### Section 10: Quick-Start by Use Case (8 categories)
- Headline: "Quick-Start by Use Case"
- Use case cards with recommended models and CTAs:
  1. **Code Generation** → Claude Opus 4.6, Devstral 2, GPT-5.4, Qwen3-Coder → "Start building →"
  2. **Image Generation** → gpt-image-15, Grok-Imagine-Pro, Gemini Flash Image → "Create images →"
  3. **AI Agents** → GPT-5.4, Claude Opus 4.6, kimi-k2.5, Grok-4.1 → "Build agents →"
  4. **Document Analysis** → Claude Sonnet 4.6, Gemini 3.1 Pro, Nemotron Ultra → "Analyse docs →"
  5. **Video Generation** → Sora 2 Pro, Veo 3.1, Grok-Imagine-Video → "Create video →"
  6. **Voice & Audio** → Gemini-TTS, ElevenLabs, Whisper v3 → "Add voice →"
  7. **Multilingual / Translation** → Qwen3-Max (119 langs), Gemini Flash-Lite, GLM-4.7 → "Go multilingual →"
  8. **Math & Research** → DeepSeek-R1, QwQ-32B, Gemini 3.1 Pro → "Start researching →"

#### Section 11: Built for Every Builder (6 features)
- Headline: "Built for every builder"
- Feature cards:
  1. **Guided Discovery Chat** — Conversational model recommendation
  2. **Prompt Engineering Guide** — Per-model templates and best practices
  3. **Agent Builder** — Step-by-step agent creation
  4. **Flexible Pricing** — Free, pay-per-use, subscription, enterprise
  5. **User Reviews & Ratings** — Verified builder reviews with benchmarks
  6. **Research Feed** — Daily curated AI research and releases

#### Section 12: Newsletter Subscription
- Headline: "New models drop every week. Don't miss a release."
- Subtitle: "Get a curated weekly digest..."
- Email input field + "Subscribe free →" button
- Trust text: "No spam. Unsubscribe any time. Trusted by 62K builders."

#### Section 13: Footer
- Brand: "NexusAI Model Marketplace"
- Links: Models | Research | API | Privacy | Terms

---

### 3.2 CHAT HUB ( /chat )

**Purpose:** Interactive AI-powered guided discovery and conversation interface.

#### Left Sidebar — Model Selector
- "MODELS" header
- Search box: "Search 525 models..."
- Scrollable list of all models with: icon, name, provider, selection checkmark
- Models grouped by provider (OpenAI models first, then Anthropic, etc.)

#### Center — Chat Area
- Welcome card: "Welcome! I'm here to help you 👋"
- Subtitle: "No tech background needed..."
- 6 quick-start action buttons:
  1. Write content (Emails, posts, stories)
  2. Create Images (Art, photos, designs)
  3. Build something (Apps, tools, websites)
  4. Automate work (Save hours every week)
  5. Analyse data (PDFs, sheets, reports)
  6. Just exploring (Show me what's possible)
- Message input with toolbar: microphone, phone, video, chat bubbles, attachment, plus icon
- Model selector dropdown on input bar (e.g., "GPT-5.4")
- Send button (orange)
- Quick action bar below input: Use cases, Monitor, Create prototype, Business plan, Content, Analyze & research, Learn something
- Suggested prompts section:
  - "Help me find the best AI model for my project"
  - "Generate realistic images for my marketing campaign"
  - "Create AI agents for workflow automation"
  - "I want to build an AI chatbot for my website"
  - "Analyse documents and extract key information"
  - "Add voice and speech recognition to my app"

#### Right Sidebar — Quick Actions & Navigation
- **QUICK ACTIONS:** Browse Marketplace, Build an Agent, How to use Guide, Prompt Engineering, View Pricing
- **NAVIGATION & TOOLS:** Browse Marketplace, Build an Agent, How to use Guide, Prompt Engineering
- **CREATE & GENERATE:** Create image, Generate Audio, Create video, Create slides, Create Infographs, Create quiz, Create Flashcards, Create Mind map
- **ANALYSE & WRITE:** Analyze Data, Write content, Code Generation, Document Analysis

---

### 3.3 MARKETPLACE ( /marketplace )

**Purpose:** Full model browsing, filtering, comparison, and selection interface.

#### Top Controls
- Page title: "Model Marketplace"
- Search bar: "Search models, capabilities..."
- Voice search button, pin button, grid/gallery toggle
- Capability filter chips: All | Language | Vision | Code | Image Gen | Audio | Open Source

#### Lab Filter Bar
- Horizontal scrollable pills showing all 28+ labs with model counts
- "All Labs (Total)" default selected
- Each pill shows: lab name + model count (e.g., "OpenAI (11)")
- Selected labs show "x" to clear

#### Left Sidebar — Advanced Filters
- **PROVIDER** — Checkboxes for each provider
- **PRICING MODEL** — Pay-per-use, Subscription, Free tier, Enterprise
- **MAX PRICE /1M TOKENS** — Slider: "Up to $100"
- **MIN RATING** — Radio buttons: Any, 4+, 4.5+
- **LICENCE** — Commercial, Open Source, Research Only
- **"Need help choosing?"** CTA → Links to Chat Hub AI guide

#### Main Grid — Model Cards
Each card displays:
- Model icon + name + badge (Hot/New/Open Source)
- Provider/lab name
- 2-3 line description
- Capability tags (colored pills): Flagship, Agents, Multimodal, Reasoning, Coding, etc.
- Star rating + review count (e.g., "⭐ 4.9 (4,210)")
- Pricing: input/output per 1M tokens
- "How to Use →" link

#### Model Detail Panel (expanded when clicking a model card)
6 tabs:
1. **Overview** — Full description, I/O specs, context window, latency, use cases, benchmark scores (MMLU, HumanEval, MATH)
2. **How to Use** — API access setup, SDK code examples (Python), parameter guidance, playground testing
3. **Pricing** — Pay-per-use rates, Pro subscription discounts, Enterprise pricing, cost comparison visualization
4. **Prompt Engineering** — 4 core principles, code examples, temperature/parameter recommendations, tips per use case
5. **Agent Creation** — 6-step guide: system prompts, tool configuration, memory setup (short-term + long-term vector storage), testing, deployment
6. **Reviews** — Star rating summary, review count, star distribution (%), individual review cards with: reviewer name/role, date, rating, feedback text, use case examples

**Specifications Panel (sidebar in detail view):**
- Context window (e.g., "128K tokens")
- Input latency (~1.2s average)
- Maximum output length (4,096 tokens)
- Supported input modalities
- Multimodal capabilities

**Usage Overview Widget (for authenticated users):**
- Requests made
- Average latency
- Daily cost calculation

---

### 3.4 AGENTS ( /agents )

**Purpose:** Build, configure, and deploy custom AI agents.

#### Header
- Title: "Agent Builder"
- Subtitle: "Create powerful AI agents using any model. Pick a template or start from scratch."

#### Left Sidebar
- "New Agent" button (orange, primary CTA)

#### Main Canvas
- Empty state message: "Not sure where to start?"
- Suggestion: "Chat with our AI guide — describe what you want your agent to do and get a personalised setup plan."
- Link: "Ask the Hub →"

#### Agent Templates Grid
5 pre-built templates:

1. **Research Agent** 🔍 — Automates web research, summarises findings, generates structured reports. Tags: GPT-4o, Web search, Reports. CTA: "Use template →"
2. **Customer Support Agent** 🎧 — Handles tickets, FAQs, escalates complex issues. Tags: GPT-4o, Ticketing, Escalation. CTA: "Use template →"
3. **Code Review Agent** 💻 — Reviews PRs, flags bugs, suggests improvements. Tags: Claude 3.7, GitHub, Code. CTA: "Use template →"
4. **Data Analysis Agent** 📊 — Processes spreadsheets, generates insights, creates visualisations. Tags: Gemini, Spreadsheets, Charts. CTA: "Use template →"
5. **Content Writer Agent** ✍️ — Creates blog posts, social media, email campaigns with brand voice. Tags: Claude Opus, Content, Marketing. CTA: "Use template →"

#### Agent Configuration (inferred from detail tab)
- Agent name & description
- Model selection
- System prompt editor
- Tool/API connections
- Memory configuration: short-term (conversation history) + long-term (vector storage)
- Test suite interface
- Deployment with monitoring

---

### 3.5 DISCOVER NEW ( /discover )

**Purpose:** Chronological AI research feed with latest releases and breakthroughs.

#### Page Title
- "AI Research Feed"

#### Feed Items (reverse chronological)
Each entry displays:
- Date badge (e.g., "MAR 26")
- Source/Lab name
- Category badge (Just Released / Hot / Computer Use / Real-Time / Open Source / Coding / Research)
- Title (bold)
- Description (2-3 sentences)

**Sample entries:**
1. MAR 26 | Google DeepMind — "Gemini 2.5 Pro achieves new SOTA on reasoning benchmarks" [Hot]
2. MAR 22 | MIT CSAIL — "Scaling laws for multimodal models: new empirical findings" [Research]
3. MAR 18 | Anthropic — "Constitutional AI v2: improved alignment through iterative refinement" [Just Released]
4. MAR 15 | Meta AI — "Llama 4 Scout & Maverick: natively multimodal" [Open Source]
5. MAR 10 | Stanford NLP — "Long-context recall: how models handle 1M+ token windows" [Computer Use]
6. MAR 5 | DeepSeek — "DeepSeek-R1 open weights: reproducing frontier reasoning at minimal cost" [Coding]

---

### 3.6 AUTHENTICATION (inferred)

- **Sign In** — Existing user login (modal or page)
- **Get Started** — New user registration with onboarding flow
- API key management (referenced in Chat Hub usage tracking)
- Subscription tier selection: Free, Pro, Enterprise

---

## 4. MODULE BREAKDOWN

### Module 1: Authentication & User Management
- User registration (email-based signup)
- User login / sign-in
- Session management
- User profile storage
- API key generation and management
- Subscription tier management (Free / Pro / Enterprise)

### Module 2: Model Catalog & Marketplace
- Model database (525+ entries with full metadata)
- Model search (full-text across names, descriptions, capabilities)
- Multi-dimensional filtering (provider, price, rating, license, capability type)
- Model comparison engine (side-by-side table generation)
- Model detail views with tabbed content (overview, usage, pricing, prompts, agents, reviews)
- Budget-tier browsing (Free, Budget, Mid-Range, Premium)
- Use-case-based discovery (8 categories with curated model lists)

### Module 3: AI Lab Directory
- Lab profiles with logos, descriptions, model counts
- Lab-based model filtering
- Flagship model highlighting per lab
- 28+ lab entries maintained

### Module 4: Chat Hub / Guided Discovery
- Conversational AI interface for guided model discovery
- Real-time model switching mid-conversation
- Multi-modal input: text, voice, video, screen share, file upload, image upload
- Usage tracking dashboard (requests, latency, daily cost)
- Suggested prompts and quick-start actions
- Context-aware model recommendations

### Module 5: Agent Builder
- Template-based agent creation (5 pre-built templates)
- Blank canvas agent creation
- System prompt editor
- Tool and API integration configuration
- Memory configuration (short-term conversation + long-term vector storage)
- Agent testing sandbox
- Agent deployment and monitoring
- AI-guided setup via Chat Hub integration

### Module 6: Research Feed
- Chronological research and model release entries
- Categorized by badge (Just Released, Hot, Open Source, Coding, Research, Computer Use, Real-Time)
- Source attribution (lab/institution)
- Trending section ("Trending This Week")
- Daily updates

### Module 7: Prompt Engineering Guides
- Per-model prompt templates
- Best practices and principles
- Example prompts for different use cases
- Temperature and parameter tuning recommendations
- Integrated into model detail views

### Module 8: Reviews & Ratings
- Star rating system (0-5 scale)
- Review submission and display
- Rating distribution (% by star level)
- Review cards with: reviewer name, role, date, rating, detailed text, use case
- Aggregate metrics (average rating, total review count)

### Module 9: Pricing & Billing
- Transparent per-model pricing display (input/output per 1M tokens)
- Pricing tier comparison (Pay-per-use / Pro / Enterprise)
- Budget-based model discovery
- Usage tracking and daily cost calculation (for authenticated users)
- Price range slider in filters

### Module 10: Newsletter & Communications
- Email subscription capture
- Weekly digest: new model releases, benchmarks, pricing changes, prompt tips
- Trust messaging ("No spam, trusted by 62K builders")

### Module 11: Localization / i18n
- Language selector in navigation (15+ languages)
- Full UI translation support
- Supported: English, Arabic, French, German, Spanish, Portuguese, Chinese, Japanese, Korean, Hindi, Urdu, Turkish, Russian, Italian, Dutch

### Module 12: Content Generation Tools (via Chat Hub)
- Create Image
- Generate Audio
- Create Video
- Create Slides
- Create Infographics
- Create Quiz
- Create Flashcards
- Create Mind Map
- Analyze Data
- Write Content
- Code Generation
- Document Analysis
- Translate

---

## 5. USER FLOW ANALYSIS

### Flow 1: New User Discovery & Onboarding
1. User lands on homepage
2. Reads hero section — "Find your perfect AI model"
3. Option A: Clicks "Let's go" → enters guided chat discovery
4. Option B: Clicks "Skip — search directly" → goes to marketplace
5. Option C: Clicks a quick-action card (e.g., "Create Image") → filtered view
6. Browses featured models, labs, comparison table
7. Clicks "Get Started" CTA
8. Enters registration flow
9. Accesses Chat Hub with full model selection

### Flow 2: Model Discovery via Chat Hub
1. User navigates to Chat Hub
2. Sees welcome card with 6 quick-start actions
3. Option A: Clicks action (e.g., "Build something") → AI guide asks clarifying questions
4. Option B: Types free-form query → AI recommends models
5. AI guide suggests 2-3 models with rationale
6. User selects a model from sidebar or recommendation
7. Model loads as active chat partner
8. User interacts, tests model capabilities
9. User views usage metrics (requests, latency, cost)

### Flow 3: Model Comparison via Marketplace
1. User navigates to Marketplace
2. Applies filters: selects lab(s), capability type, price range, rating
3. Grid updates showing matching models
4. User browses model cards, compares ratings and pricing
5. Clicks "How to Use →" on a model card
6. Detail panel opens with 6 tabs
7. User reviews Overview, Pricing, Reviews tabs
8. User compares 2-3 models side-by-side via comparison table
9. User selects preferred model → clicks "Try" or "Open in Chat Hub"

### Flow 4: Agent Creation
1. User navigates to Agents page
2. Option A: Clicks a template (e.g., "Research Agent") → pre-configured setup
3. Option B: Clicks "New Agent" → blank canvas
4. Option C: Clicks "Ask the Hub" → AI guide creates personalized setup plan
5. Configures: agent name, description, system prompt
6. Selects base model
7. Configures tools and API integrations
8. Sets memory: short-term + long-term storage
9. Tests agent in sandbox
10. Deploys agent with monitoring

### Flow 5: Research & Staying Updated
1. User navigates to Discover New section (or clicks "View research feed →")
2. Browses chronological feed of AI research entries
3. Reads about latest model releases and benchmark results
4. Clicks through to relevant model detail pages
5. Scrolls to newsletter section at bottom of homepage
6. Enters email, clicks "Subscribe free →"
7. Receives weekly digest emails

### Flow 6: Budget-Based Model Selection
1. User scrolls to "Find Models by Budget" on homepage
2. Clicks a budget tier (e.g., "Budget — Under $0.50/1M")
3. Marketplace filters to show only models in that price range
4. User browses filtered results
5. Selects a model and views details
6. Proceeds to usage or agent creation

---

## 6. DATA STRUCTURE ESTIMATION

### Entity: User
```
User {
  id: UUID
  email: string
  name: string
  password_hash: string
  avatar_url: string (optional)
  role: string (optional)
  subscription_tier: enum [free, pro, enterprise]
  api_keys: ApiKey[]
  preferred_language: string (default: "en")
  created_at: datetime
  updated_at: datetime
}
```

### Entity: AI Model
```
Model {
  id: UUID
  name: string
  slug: string
  provider_id: FK → Lab
  description_short: string
  description_full: text
  icon_url: string
  badge: enum [hot, new, open_source, beta, computer_use, real_time, coding] (nullable)
  capabilities: string[] (e.g., ["Flagship", "Agents", "Multimodal", "Reasoning"])
  input_modalities: string[] (e.g., ["text", "images", "audio", "PDFs"])
  context_window: integer (tokens)
  max_output_length: integer (tokens)
  input_price_per_million: decimal
  output_price_per_million: decimal
  pricing_model: enum [pay_per_use, subscription, free, enterprise]
  is_multimodal: boolean
  speed_tier: enum [fastest, fast, moderate]
  best_for: string
  license_type: enum [commercial, open_source, research_only]
  benchmark_mmlu: decimal (nullable)
  benchmark_humaneval: decimal (nullable)
  benchmark_math: decimal (nullable)
  avg_latency_ms: integer
  avg_rating: decimal
  review_count: integer
  is_featured: boolean
  is_trending: boolean
  availability: enum [live, beta, coming_soon]
  released_at: datetime
  created_at: datetime
  updated_at: datetime
}
```

### Entity: AI Lab (Provider)
```
Lab {
  id: UUID
  name: string
  slug: string
  logo_url: string
  description: string
  model_count: integer
  flagship_models: Model[] (computed)
  website_url: string (optional)
  created_at: datetime
}
```

### Entity: Agent Template
```
AgentTemplate {
  id: UUID
  name: string
  description: string
  icon: string
  tags: string[]
  default_model_id: FK → Model
  system_prompt: text
  tools: string[] (e.g., ["Web search", "Reports", "Ticketing"])
  memory_config: JSON { short_term: boolean, long_term: boolean }
  created_at: datetime
}
```

### Entity: User Agent (custom)
```
UserAgent {
  id: UUID
  user_id: FK → User
  template_id: FK → AgentTemplate (nullable)
  name: string
  description: string
  model_id: FK → Model
  system_prompt: text
  tools: JSON[]
  memory_config: JSON
  status: enum [draft, testing, deployed]
  created_at: datetime
  updated_at: datetime
}
```

### Entity: Review
```
Review {
  id: UUID
  model_id: FK → Model
  user_id: FK → User
  rating: integer (1-5)
  title: string (optional)
  body: text
  reviewer_name: string
  reviewer_role: string (optional)
  is_verified: boolean
  created_at: datetime
}
```

### Entity: Research Feed Entry
```
ResearchEntry {
  id: UUID
  title: string
  description: text
  source_lab: string
  category: enum [just_released, hot, computer_use, real_time, open_source, coding, research]
  published_date: date
  related_model_ids: FK[] → Model (optional)
  external_url: string (optional)
  created_at: datetime
}
```

### Entity: Newsletter Subscriber
```
Subscriber {
  id: UUID
  email: string (unique)
  subscribed_at: datetime
  is_active: boolean
}
```

### Entity: Use Case
```
UseCase {
  id: UUID
  name: string
  icon: string
  description: string
  recommended_model_ids: FK[] → Model
  cta_text: string
  cta_link: string
  sort_order: integer
}
```

### Entity: Chat Conversation
```
Conversation {
  id: UUID
  user_id: FK → User
  model_id: FK → Model
  messages: Message[]
  created_at: datetime
  updated_at: datetime
}

Message {
  id: UUID
  conversation_id: FK → Conversation
  role: enum [user, assistant, system]
  content: text
  attachments: JSON[] (optional)
  created_at: datetime
}
```

### Entity: Usage Metrics
```
UsageMetric {
  id: UUID
  user_id: FK → User
  model_id: FK → Model
  requests_count: integer
  total_input_tokens: integer
  total_output_tokens: integer
  total_cost: decimal
  avg_latency_ms: integer
  date: date
}
```

### Relationships
```
User → has many → Conversations
User → has many → UserAgents
User → has many → Reviews
User → has many → UsageMetrics
User → has many → ApiKeys

Lab → has many → Models
Model → belongs to → Lab
Model → has many → Reviews
Model → appears in many → UseCases
Model → appears in many → ResearchEntries

AgentTemplate → references → Model (default)
UserAgent → belongs to → User
UserAgent → based on → AgentTemplate (optional)
UserAgent → uses → Model

Conversation → belongs to → User
Conversation → uses → Model
Conversation → has many → Messages
```

---

## 7. COMPLETE FEATURE CHECKLIST

### Authentication & Accounts
- [ ] User registration (email + password)
- [ ] User login / sign-in
- [ ] Session management
- [ ] Password reset
- [ ] API key generation
- [ ] API key management (view, revoke)
- [ ] Subscription tier selection (Free / Pro / Enterprise)
- [ ] User profile management

### Model Catalog
- [ ] Display 525+ model entries
- [ ] Model card component (icon, name, provider, badge, description, tags, rating, pricing)
- [ ] Model detail panel with 6 tabs (Overview, How to Use, Pricing, Prompt Guide, Agent Creation, Reviews)
- [ ] Full-text search across models
- [ ] Filter by provider/lab (28+ options, multi-select checkboxes)
- [ ] Filter by capability type (Language, Vision, Code, Image Gen, Audio, Open Source)
- [ ] Filter by pricing model (Pay-per-use, Subscription, Free tier, Enterprise)
- [ ] Filter by price range (slider, 0-$100)
- [ ] Filter by minimum rating (Any, 4+, 4.5+)
- [ ] Filter by license type (Commercial, Open Source, Research Only)
- [ ] Sort models (Featured, Newest, Highest-rated, Price asc/desc)
- [ ] Paginated model grid display
- [ ] Model comparison table (side-by-side)
- [ ] Budget-tier browsing (4 tiers with pre-filtered views)
- [ ] Use-case-based discovery (8 categories)
- [ ] Featured models carousel
- [ ] Trending models section

### AI Lab Directory
- [ ] Lab profile cards (logo, name, model count, flagships)
- [ ] Lab-based model filtering
- [ ] "See all labs" expanded view
- [ ] 28+ lab entries

### Chat Hub
- [ ] Conversational AI interface
- [ ] Model selector sidebar (searchable, 525+ models)
- [ ] Model switching mid-conversation
- [ ] Text input with send
- [ ] Voice input (microphone)
- [ ] Voice conversation mode
- [ ] Video input
- [ ] Screen sharing
- [ ] File attachment upload
- [ ] Image upload
- [ ] Quick-start action buttons (6 categories)
- [ ] Suggested prompt templates
- [ ] Quick action bar (7 shortcuts)
- [ ] Right sidebar with navigation tools
- [ ] Create & Generate tools (8 content types)
- [ ] Analyse & Write tools (4 categories)
- [ ] Usage tracking widget (requests, latency, daily cost)

### Agent Builder
- [ ] Agent templates grid (5 pre-built templates)
- [ ] "New Agent" blank canvas creation
- [ ] "Ask the Hub" AI-guided setup
- [ ] Agent name and description editor
- [ ] Model selection for agent
- [ ] System prompt editor
- [ ] Tool/API integration configuration
- [ ] Memory configuration (short-term + long-term vector)
- [ ] Agent testing sandbox
- [ ] Agent deployment
- [ ] Agent monitoring dashboard

### Research Feed
- [ ] Chronological research entry list
- [ ] Date badges
- [ ] Source/lab attribution
- [ ] Category badges (7 types)
- [ ] Entry title and description
- [ ] "Trending This Week" homepage section
- [ ] "View research feed" link

### Reviews & Ratings
- [ ] Star rating display (per model)
- [ ] Review count display
- [ ] Rating distribution chart (% per star level)
- [ ] Individual review cards (name, role, date, rating, text, use case)
- [ ] Review submission form
- [ ] Verified review badges
- [ ] Aggregate rating calculation

### Pricing Display
- [ ] Per-model input/output pricing per 1M tokens
- [ ] Pricing tier comparison (Pay-per-use / Pro / Enterprise)
- [ ] Price range slider in filters
- [ ] Budget-based discovery (4 tiers)
- [ ] Usage cost calculator (daily cost tracking)
- [ ] Pricing disclaimer notice

### Newsletter
- [ ] Email capture form
- [ ] "Subscribe free" submission
- [ ] Trust messaging display
- [ ] Weekly digest email (implied backend)

### Localization
- [ ] Language selector dropdown in navigation
- [ ] 15+ language support
- [ ] Full UI translation

### Content Generation (via Chat)
- [ ] Create Image
- [ ] Generate Audio
- [ ] Create Video
- [ ] Create Slides
- [ ] Create Infographics
- [ ] Create Quiz
- [ ] Create Flashcards
- [ ] Create Mind Map
- [ ] Analyze Data
- [ ] Write Content
- [ ] Code Generation
- [ ] Document Analysis
- [ ] Translate

### Navigation & Global UI
- [ ] Top navigation bar with 5 main tabs
- [ ] Logo home link
- [ ] Language selector
- [ ] Sign In button
- [ ] Get Started CTA button
- [ ] Footer with 5 links (Models, Research, API, Privacy, Terms)
- [ ] Responsive layout (desktop-first with mobile optimization)

---

## 8. TECHNICAL ARCHITECTURE SUGGESTION

### Recommended Stack for Rebuild

**Frontend:**
- React 18+ or Next.js (for SPA with potential SSR/SSG)
- React Router or Next.js App Router (client-side routing)
- State management: Zustand or Redux Toolkit
- Styling: Tailwind CSS or CSS Modules
- i18n: next-intl or react-i18next

**Backend:**
- Node.js with Express or Fastify (REST API)
- Alternative: Next.js API routes (if using Next.js)
- Authentication: JWT-based with refresh tokens (or Auth0/Clerk)
- Rate limiting and API key management

**Database:**
- PostgreSQL (primary relational data: users, models, labs, reviews, agents)
- Redis (caching: search results, session data, rate limiting)
- Vector database (Pinecone/Weaviate) for agent long-term memory

**Search:**
- Elasticsearch or Meilisearch (full-text model search with faceted filtering)
- Alternative: PostgreSQL full-text search for simpler setup

**File Storage:**
- S3-compatible storage (model icons, lab logos, user uploads)

**Email:**
- SendGrid or Resend (newsletter digest, transactional emails)

**Deployment:**
- Vercel or Netlify (frontend)
- Railway or Fly.io (backend)
- Managed PostgreSQL (Supabase, Neon, or Railway)

### Suggested API Endpoints

```
# Authentication
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me

# Models
GET    /api/models                    # List with filters, search, pagination
GET    /api/models/:id                # Full model detail
GET    /api/models/:id/reviews        # Model reviews
GET    /api/models/compare            # Compare multiple models
GET    /api/models/featured           # Featured models
GET    /api/models/trending           # Trending models

# Labs
GET    /api/labs                      # All labs
GET    /api/labs/:id                  # Lab detail with models

# Agents
GET    /api/agents/templates          # Pre-built templates
POST   /api/agents                    # Create custom agent
GET    /api/agents/:id                # Agent detail
PUT    /api/agents/:id                # Update agent
DELETE /api/agents/:id                # Delete agent
POST   /api/agents/:id/test          # Test agent
POST   /api/agents/:id/deploy        # Deploy agent

# Chat
POST   /api/chat/conversations        # Create conversation
GET    /api/chat/conversations/:id     # Get conversation history
POST   /api/chat/conversations/:id/messages  # Send message (streamed response)

# Research Feed
GET    /api/research                  # List feed entries (paginated)
GET    /api/research/:id              # Entry detail

# Reviews
POST   /api/reviews                   # Submit review
GET    /api/reviews/:id               # Review detail

# Use Cases
GET    /api/use-cases                 # All use cases with recommended models

# Newsletter
POST   /api/newsletter/subscribe      # Subscribe
POST   /api/newsletter/unsubscribe    # Unsubscribe

# Usage & Billing
GET    /api/usage                     # User usage metrics
GET    /api/usage/daily               # Daily breakdown
GET    /api/billing/subscription      # Current plan

# API Keys
GET    /api/keys                      # List API keys
POST   /api/keys                      # Generate new key
DELETE /api/keys/:id                  # Revoke key

# Search
GET    /api/search?q=...              # Global search across models, labs, use cases
```

---

## 9. KEY BUSINESS METRICS TRACKED

| Metric | Display Location | Purpose |
|--------|-----------------|---------|
| 525+ Models | Homepage stats bar | Social proof |
| 82K Builders | Homepage stats bar | Community size |
| 28 AI Labs | Homepage stats bar | Coverage breadth |
| 4.8★ Average | Homepage stats bar | Quality signal |
| 62K Subscribers | Newsletter section | Trust signal |
| Per-model review count | Model cards | Individual trust |
| Per-model star rating | Model cards | Quality ranking |
| Usage metrics (requests, latency, cost) | Chat Hub widget | User engagement |
| Models live count | Hero badge ("347 models live") | Freshness signal |

---

## 10. CONTENT & COPY TONE

- **Approachable:** "You don't need to know anything about AI to get started"
- **Guiding:** "I'll greet you, ask about your goals, and have a genuine conversation"
- **Empowering:** "No overwhelming lists"
- **Transparent:** "No hidden fees"
- **Community:** "Trusted by 62K builders"
- **Forward-looking:** "Stay ahead of the curve"
- **Non-technical:** "Zero tech knowledge needed"

---

*This document provides all structural, functional, and data specifications needed to rebuild NexusAI with identical functionality while applying a completely new UI/UX design.*