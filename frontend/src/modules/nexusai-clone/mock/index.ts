/**
 * Mock data for nexusai module.
 * Based on the real models visible on nexusai-db.netlify.app/marketplace.
 */
import type { CloneModel, CloneAgent, CloneResearchItem } from '../types';

export const CLONE_MOCK_MODELS: CloneModel[] = [
  {
    id: 'gpt-5', name: 'GPT-5', provider: 'OpenAI',
    description: 'OpenAI flagship. Native computer-use agents, advanced reasoning, 2M context.',
    capabilities: ['Flagship', 'Agents', 'Multimodal', 'Reasoning'],
    badge: 'hot', status: 'live', rating: 4.9, reviewCount: 4210,
    pricePerMToken: 7.50, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '🧠', iconBg: '#FDE8D8', contextWindow: '2M',
  },
  {
    id: 'gpt-5-2', name: 'GPT-5.2', provider: 'OpenAI',
    description: 'Mid-tier GPT-5 variant with improved instruction-following and multimodal support.',
    capabilities: ['Multimodal', 'Balanced', 'Instruction'],
    badge: 'new', status: 'live', rating: 4.8, reviewCount: 2180,
    pricePerMToken: 4.00, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '🌟', iconBg: '#FFF3D6', contextWindow: '128K',
  },
  {
    id: 'gpt-5-turbo', name: 'GPT-5 Turbo', provider: 'OpenAI',
    description: 'Fast, cost-effective GPT-5 for high-volume deployments.',
    capabilities: ['Fast', 'Cost-Effective', 'High-Volume'],
    badge: 'hot', status: 'live', rating: 4.8, reviewCount: 3560,
    pricePerMToken: 2.50, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '⚡', iconBg: '#FFF3D6', contextWindow: '128K',
  },
  {
    id: 'gpt-4-5', name: 'GPT-4.5', provider: 'OpenAI',
    description: 'Bridging model with improved creativity and long-form generation.',
    capabilities: ['Creative', 'Long-form', 'Language'],
    badge: null, status: 'live', rating: 4.7, reviewCount: 1980,
    pricePerMToken: 3.00, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '✨', iconBg: '#E8F4FD', contextWindow: '128K',
  },
  {
    id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI',
    description: 'Multimodal flagship combining text, vision, and audio in one unified model.',
    capabilities: ['Multimodal', 'Vision', 'Audio', 'Coding'],
    badge: null, status: 'live', rating: 4.7, reviewCount: 5120,
    pricePerMToken: 2.50, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '🔮', iconBg: '#F0E8FF', contextWindow: '128K',
  },
  {
    id: 'claude-opus-4-6', name: 'Claude Opus 4.6', provider: 'Anthropic',
    description: 'Most intelligent Claude. Adaptive Thinking, 1M token context (beta), 128K max output, Extended Thinking.',
    capabilities: ['Reasoning', 'Agents', 'Coding', 'Extended Thinking'],
    badge: 'hot', status: 'live', rating: 4.9, reviewCount: 1820,
    pricePerMToken: 15.00, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '👑', iconBg: '#FDE8D8', contextWindow: '1M',
  },
  {
    id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', provider: 'Anthropic',
    description: 'Best speed/intelligence balance. Adaptive Thinking, 1M context (beta), 64K max output.',
    capabilities: ['Balanced', 'Fast', 'Reasoning'],
    badge: 'new', status: 'live', rating: 4.8, reviewCount: 3240,
    pricePerMToken: 3.00, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '🎯', iconBg: '#E2F5EF', contextWindow: '1M',
  },
  {
    id: 'gemini-2-5-pro', name: 'Gemini 2.5 Pro', provider: 'Google DeepMind',
    description: 'Google\'s most capable model with native multimodal understanding and 2M context.',
    capabilities: ['Multimodal', 'Long-context', 'Research'],
    badge: 'new', status: 'live', rating: 4.8, reviewCount: 2670,
    pricePerMToken: 7.00, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '💎', iconBg: '#EBF0FC', contextWindow: '2M',
  },
  {
    id: 'gemini-2-flash', name: 'Gemini 2.0 Flash', provider: 'Google DeepMind',
    description: 'Blazing-fast multimodal model for high-throughput production workloads.',
    capabilities: ['Fast', 'Multimodal', 'Cost-Effective'],
    badge: null, status: 'live', rating: 4.6, reviewCount: 3890,
    pricePerMToken: 0.10, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '🌊', iconBg: '#E8F4FD', contextWindow: '1M',
  },
  {
    id: 'llama-4-maverick', name: 'Llama 4 Maverick', provider: 'Meta',
    description: 'Meta\'s most capable open-source model with mixture-of-experts architecture.',
    capabilities: ['Open Source', 'Reasoning', 'Multilingual'],
    badge: 'hot', status: 'live', rating: 4.7, reviewCount: 4120,
    pricePerMToken: 0.30, pricingType: 'pay-per-use', licence: 'open-source',
    icon: '🦙', iconBg: '#EBF0FC', contextWindow: '128K',
  },
  {
    id: 'deepseek-r2', name: 'DeepSeek R2', provider: 'DeepSeek',
    description: 'State-of-the-art reasoning model matching frontier performance at fraction of cost.',
    capabilities: ['Reasoning', 'Math', 'Science', 'Budget'],
    badge: 'new', status: 'live', rating: 4.8, reviewCount: 2930,
    pricePerMToken: 0.55, pricingType: 'pay-per-use', licence: 'open-source',
    icon: '🔍', iconBg: '#E2F5EF', contextWindow: '64K',
  },
  {
    id: 'o3', name: 'o3', provider: 'OpenAI',
    description: 'OpenAI\'s advanced reasoning model with chain-of-thought for complex tasks.',
    capabilities: ['Reasoning', 'Math', 'Science', 'Logic'],
    badge: 'hot', status: 'live', rating: 4.8, reviewCount: 1640,
    pricePerMToken: 15.00, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '🧩', iconBg: '#F0E8FF', contextWindow: '200K',
  },
  {
    id: 'mistral-large-3', name: 'Mistral Large 3', provider: 'Mistral AI',
    description: 'Mistral\'s most powerful model with advanced reasoning and code generation.',
    capabilities: ['Coding', 'Reasoning', 'Multilingual'],
    badge: null, status: 'live', rating: 4.6, reviewCount: 1250,
    pricePerMToken: 2.00, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '🌬️', iconBg: '#FDE8D8', contextWindow: '128K',
  },
  {
    id: 'qwen-3-235b', name: 'Qwen3-235B', provider: 'Alibaba (Qwen)',
    description: 'Alibaba\'s frontier mixture-of-experts model with exceptional multilingual performance.',
    capabilities: ['Multilingual', 'Reasoning', 'Long-context'],
    badge: 'new', status: 'live', rating: 4.7, reviewCount: 870,
    pricePerMToken: 0.80, pricingType: 'pay-per-use', licence: 'open-source',
    icon: '🏯', iconBg: '#FFF3D6', contextWindow: '128K',
  },
  {
    id: 'grok-3', name: 'Grok 3', provider: 'xAI / Grok',
    description: 'xAI\'s most capable model with real-time data access and deep reasoning.',
    capabilities: ['Real-time', 'Reasoning', 'Research'],
    badge: 'hot', status: 'live', rating: 4.6, reviewCount: 1430,
    pricePerMToken: 3.00, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '⚡', iconBg: '#F0E8FF', contextWindow: '131K',
  },
  {
    id: 'phi-4-reasoning', name: 'Phi-4 Reasoning', provider: 'Microsoft',
    description: 'Microsoft\'s compact reasoning specialist with outstanding math and science performance.',
    capabilities: ['Reasoning', 'Math', 'Science', 'Edge'],
    badge: 'new', status: 'live', rating: 4.5, reviewCount: 760,
    pricePerMToken: 0.40, pricingType: 'pay-per-use', licence: 'open-source',
    icon: '🔷', iconBg: '#EBF0FC', contextWindow: '16K',
  },
  {
    id: 'titan-express', name: 'Titan Express', provider: 'Amazon',
    description: 'Amazon\'s enterprise-grade text model optimized for business applications.',
    capabilities: ['Enterprise', 'Instruction', 'Balanced'],
    badge: null, status: 'live', rating: 4.4, reviewCount: 540,
    pricePerMToken: 0.20, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '🏢', iconBg: '#FFF3D6', contextWindow: '32K',
  },
  {
    id: 'command-r-plus', name: 'Command R+', provider: 'Cohere',
    description: 'Enterprise RAG model with advanced retrieval augmentation and tool use.',
    capabilities: ['RAG', 'Tool Use', 'Enterprise'],
    badge: null, status: 'live', rating: 4.5, reviewCount: 920,
    pricePerMToken: 2.50, pricingType: 'pay-per-use', licence: 'commercial',
    icon: '📡', iconBg: '#E2F5EF', contextWindow: '128K',
  },
  {
    id: 'flux-1-1-pro', name: 'FLUX 1.1 Pro', provider: 'Black Forest Labs',
    description: 'State-of-the-art image generation with photorealistic quality and prompt adherence.',
    capabilities: ['Image Gen', 'Photorealistic', 'Creative'],
    badge: 'hot', status: 'live', rating: 4.8, reviewCount: 3560,
    pricingType: 'pay-per-use', licence: 'commercial',
    icon: '🎨', iconBg: '#FDE8D8',
  },
  {
    id: 'llama-3-3-70b', name: 'Llama 3.3 70B', provider: 'Meta',
    description: 'Highly capable open-source model balancing quality and cost for production use.',
    capabilities: ['Open Source', 'Balanced', 'Budget'],
    badge: null, status: 'live', rating: 4.5, reviewCount: 5230,
    pricePerMToken: 0.23, pricingType: 'free', licence: 'open-source',
    icon: '🦙', iconBg: '#EBF0FC', contextWindow: '128K',
  },
];

export const CLONE_PROVIDERS: string[] = CLONE_MOCK_MODELS
  .map((m) => m.provider)
  .filter((v, i, arr) => arr.indexOf(v) === i);

export const CLONE_CAPABILITIES = [
  'All', 'Language', 'Vision', 'Code', 'Image Gen', 'Audio', 'Open Source',
];

export const CLONE_MOCK_AGENTS: CloneAgent[] = [
  { id: 'research-pro',   name: 'Research Pro',     description: 'Deep-dive research on any topic with source citations.', category: 'Research',    icon: '🔬', uses: 45200 },
  { id: 'code-reviewer',  name: 'Code Reviewer',    description: 'Automated code review with suggestions and best practices.', category: 'Coding',   icon: '💻', uses: 38700 },
  { id: 'seo-writer',     name: 'SEO Writer',        description: 'Create SEO-optimised blog posts and landing pages.',          category: 'Writing',  icon: '✍️', uses: 31500 },
  { id: 'data-analyst',   name: 'Data Analyst',      description: 'Analyse spreadsheets, CSVs, and charts with insights.',       category: 'Analysis', icon: '📊', uses: 28900 },
  { id: 'email-assistant',name: 'Email Assistant',   description: 'Draft, improve, and reply to emails professionally.',          category: 'Writing',  icon: '📧', uses: 26100 },
  { id: 'image-creator',  name: 'Image Creator',     description: 'Generate stunning images from detailed text prompts.',         category: 'Creative', icon: '🎨', uses: 54300 },
];

export const CLONE_MOCK_RESEARCH: CloneResearchItem[] = [
  { id: 'r1', title: 'Scaling Laws for Neural Language Models', description: 'Research into how model performance scales with compute, data, and parameters.', source: 'OpenAI Research', date: '2026-03-28', tags: ['Scaling', 'LLMs', 'Research'], isNew: false },
  { id: 'r2', title: 'Mixture of Experts at Scale', description: 'How MoE architecture enables frontier performance with lower inference cost.', source: 'Google DeepMind', date: '2026-03-30', tags: ['MoE', 'Architecture', 'Efficiency'], isNew: true },
  { id: 'r3', title: 'RLHF Beyond Reward Hacking', description: 'New approaches to alignment that reduce reward hacking in large models.', source: 'Anthropic', date: '2026-04-01', tags: ['Alignment', 'RLHF', 'Safety'], isNew: true },
  { id: 'r4', title: 'Multimodal Reasoning Benchmarks', description: 'A comprehensive evaluation framework for vision-language model reasoning.', source: 'Meta AI', date: '2026-03-25', tags: ['Multimodal', 'Benchmarks', 'Vision'], isNew: false },
  { id: 'r5', title: 'Efficient Fine-tuning with LoRA at Scale', description: 'Practical guide to parameter-efficient fine-tuning for production models.', source: 'Microsoft Research', date: '2026-03-22', tags: ['Fine-tuning', 'LoRA', 'Production'], isNew: false },
  { id: 'r6', title: 'Constitutional AI: Red-teaming Results', description: 'Comprehensive red-team results from constitutional AI training methodology.', source: 'Anthropic', date: '2026-03-18', tags: ['Safety', 'Constitutional AI', 'Alignment'], isNew: false },
];
