/**
 * Type definitions for the nexusai isolated module.
 * These types mirror the structure of models on nexusai-db.netlify.app.
 */

export type CloneModelStatus = 'live' | 'beta' | 'deprecated';
export type CloneModelBadge  = 'hot' | 'new' | 'open' | 'beta' | null;
export type ClonePricingType = 'pay-per-use' | 'subscription' | 'free' | 'enterprise';
export type CloneLicence     = 'commercial' | 'open-source' | 'research-only';

export interface CloneModel {
  id:           string;
  name:         string;
  provider:     string;
  description:  string;
  capabilities: string[];     // e.g. ['Reasoning', 'Multimodal', 'Fast']
  badge:        CloneModelBadge;
  status:       CloneModelStatus;
  rating:       number;       // 0–5
  reviewCount:  number;
  pricePerMToken?: number;    // USD per 1M tokens; undefined = free
  pricingType:  ClonePricingType;
  licence:      CloneLicence;
  icon:         string;       // emoji
  iconBg:       string;       // background hex for icon tile
  contextWindow?: string;     // e.g. '128K', '1M'
}

export interface CloneAgent {
  id:           string;
  name:         string;
  description:  string;
  category:     string;
  icon:         string;
  uses:         number;
}

export interface CloneChatMessage {
  id:        string;
  role:      'user' | 'assistant';
  content:   string;
  timestamp: string;
  modelName?: string;
}

export interface CloneResearchItem {
  id:          string;
  title:       string;
  description: string;
  source:      string;
  date:        string;
  tags:        string[];
  isNew:       boolean;
}

// ─── Chat Simulation Types ──────────────────────────────────────────────────

export type ChatPhase =
  | 'welcome'
  | 'guided_step_1'
  | 'guided_step_2'
  | 'guided_step_3'
  | 'prompt_generating'
  | 'prompt_ready'
  | 'free_chat';

/** All the possible item types that appear in the chat area */
export type ChatItemType =
  | 'ai_text'       // left-aligned AI bubble
  | 'user_text'     // right-aligned user bubble
  | 'user_badge'    // right-aligned selection badge (icon + label)
  | 'choice_card'   // left-aligned multi-choice question card
  | 'prompt_card'   // left-aligned generated AI prompt card
  | 'model_recommendation' // left-aligned recommended model list
  | 'model_followup'; // left-aligned model-specific follow-up wizard

export interface ChatFlowChoice {
  icon:        string;
  label:       string;
  description: string;
}

export interface ChatFlowStep {
  categoryTag:   string;   // e.g. 'WHO IT\'S FOR'
  categoryColor: string;   // accent color for the tag
  question:      string;
  subtitle:      string;
  choices:       ChatFlowChoice[];
  statusLabel:   string;   // shown below the card, e.g. 'NexusAI Hub · guided setup'
}

export interface ChatItem {
  id:          string;
  type:        ChatItemType;
  timestamp:   string;
  // ai_text / user_text
  content?:       string;
  modelName?:     string;
  statusLabel?:   string;
  // user_badge
  badgeIcon?:     string;
  badgeLabel?:    string;
  // choice_card
  flowStep?:      ChatFlowStep;
  choiceDisabled?: boolean;           // true after user has made a selection
  selectedChoice?: string;            // which option was chosen
  // prompt_card
  promptText?:    string;
  promptDismissed?: boolean;
  // model_recommendation
  recommendationModelIds?: string[];
  recommendationIntro?: string;
  // model_followup
  followupModelId?: string;
}

export interface AgentMockResponse {
  agent:       string;
  status:      'proposal' | 'complete' | 'error' | 'info';
  message:     string;
  plan?:       string[];
  components?: string[];
  endpoints?:  string[];
  testCases?:  string[];
}