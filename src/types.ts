export type MarketType = 'forex' | 'crypto' | 'stocks';
export type SignalType = 'BUY' | 'SELL';
export type SignalStatus = 'active' | 'closed';
export type SignalResult = 
  | 'pending' 
  | 'tp1_hit' 
  | 'tp2_hit' 
  | 'tp3_hit' 
  | 'sl_hit' 
  | 'breakeven' 
  | 'cancelled';

export interface TradingSignal {
  id: string;
  pair: string;
  market: MarketType;
  type: SignalType;
  entryPrice: number;
  stopLoss: number;
  tp1: number;
  tp2: number;
  tp3?: number;
  timeframe: string;
  status: SignalStatus;
  result: SignalResult;
  pnlValue: number; // profit in pips or percent
  createdAt: string;
  closedAt?: string;
  notes?: string;
  sentToTelegram: boolean;
  source: 'manual' | 'automated';
}

export interface TelegramConfig {
  botToken: string;
  channelId: string;
  channelTitle: string;
  autoSendNewSignals: boolean;
  autoSendResultUpdates: boolean;
  signalTemplate: string;
  resultTemplate: string;
  status: 'connected' | 'disconnected';
  lastPingTime: string;
}

export interface AutomationConfig {
  mode: 'manual' | 'semi_auto' | 'full_auto';
  webhookSecret: string;
  webhookEndpoint: string;
  autoCalculateRR: boolean;
  tradingViewAlertsEnabled: boolean;
  metatraderBridgeEnabled: boolean;
  autoTrailingStop: boolean;
}

export interface UserSession {
  isAuthenticated: boolean;
  username: string;
  name: string;
  role: string;
}
