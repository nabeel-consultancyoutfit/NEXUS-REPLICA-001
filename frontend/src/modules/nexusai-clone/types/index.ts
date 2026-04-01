/**
 * Type definitions for the nexusai-clone isolated module.
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
