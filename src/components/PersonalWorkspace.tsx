import React, { useState } from 'react';
import { 
  Target, 
  Zap, 
  Send, 
  BarChart2, 
  PlusCircle, 
  LogOut, 
  User, 
  ShieldCheck, 
  Bell,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { SignalList } from './Signals/SignalList';
import { AutomationHub } from './Signals/AutomationHub';
import { TelegramManager } from './Signals/TelegramManager';
import { PerformanceStats } from './Signals/PerformanceStats';
import { NewSignalModal } from './Signals/NewSignalModal';
import { UpdateResultModal } from './Signals/UpdateResultModal';
import { TradingSignal, TelegramConfig, AutomationConfig } from '../types';

interface PersonalWorkspaceProps {
  currentUser: string;
  onLogout: () => void;
  signals: TradingSignal[];
  telegramConfig: TelegramConfig;
  automationConfig: AutomationConfig;
  onAddSignal: (signal: Omit<TradingSignal, 'id' | 'createdAt' | 'status' | 'result' | 'pnlValue'>) => void;
  onUpdateSignalResult: (
    signalId: string, 
    result: TradingSignal['result'], 
    pnlValue: number, 
    status: TradingSignal['status'], 
    sendToTelegram: boolean,
    notes?: string
  ) => void;
  onDeleteSignal: (signalId: string) => void;
  onSendToTelegram: (signal: TradingSignal) => void;
  onUpdateTelegramConfig: (config: TelegramConfig) => void;
  onUpdateAutomationConfig: (config: AutomationConfig) => void;
}

export const PersonalWorkspace: React.FC<PersonalWorkspaceProps> = ({
  currentUser,
  onLogout,
  signals,
  telegramConfig,
  automationConfig,
  onAddSignal,
  onUpdateSignalResult,
  onDeleteSignal,
  onSendToTelegram,
  onUpdateTelegramConfig,
  onUpdateAutomationConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'signals' | 'automation' | 'telegram' | 'stats'>('signals');
  const [isNewSignalModalOpen, setIsNewSignalModalOpen] = useState(false);
  const [selectedSignalToUpdate, setSelectedSignalToUpdate] = useState<TradingSignal | null>(null);

  const activeSignalsCount = signals.filter((s) => s.status === 'active').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-right">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand element */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                  کارآزما
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-sans">
                    AnalytixHire
                  </span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  میز کار شخصی سیگنال و ربات تلگرام
                </span>
              </div>
            </div>

            {/* Quick Actions & User Profile */}
            <div className="flex items-center gap-3">
              
              {/* Add Signal Quick CTA */}
              <button
                onClick={() => setIsNewSignalModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm shadow-blue-500/20 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ ثبت سیگنال</span>
              </button>

              {/* Automation Mode Badge */}
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-600">مود:</span>
                <span className="font-bold text-slate-900">
                  {automationConfig.mode === 'manual' ? 'دستی' : automationConfig.mode === 'semi_auto' ? 'نیمه‌خودکار' : 'تمام‌خودکار'}
                </span>
              </div>

              {/* User and Logout */}
              <div className="flex items-center gap-2 border-r border-slate-200 pr-3 mr-1">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {currentUser}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {telegramConfig.channelId}
                  </span>
                </div>

                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  title="خروج از حساب"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Workspace Tab Bar */}
        <div className="border-t border-slate-100 bg-slate-50/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2">
              
              <button
                onClick={() => setActiveTab('signals')}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'signals'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>مدیریت و ثبت سیگنال‌ها</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === 'signals' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {activeSignalsCount} فعال
                </span>
              </button>

              <button
                onClick={() => setActiveTab('automation')}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'automation'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>بستر اتوماسیون و وب‌هوک</span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold">
                  TradingView
                </span>
              </button>

              <button
                onClick={() => setActiveTab('telegram')}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'telegram'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>ارتباط با تلگرام (کانال VIP)</span>
                <span className="text-[10px] text-blue-600 font-mono">
                  {telegramConfig.channelId}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === 'stats'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>آمار و عملکرد تحلیلی</span>
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'signals' && (
          <SignalList
            signals={signals}
            onOpenNewSignalModal={() => setIsNewSignalModalOpen(true)}
            onOpenUpdateResultModal={(sig) => setSelectedSignalToUpdate(sig)}
            onSendToTelegram={onSendToTelegram}
            onDeleteSignal={onDeleteSignal}
          />
        )}

        {activeTab === 'automation' && (
          <AutomationHub
            config={automationConfig}
            onUpdateConfig={onUpdateAutomationConfig}
            onSimulateWebhookSignal={onAddSignal}
          />
        )}

        {activeTab === 'telegram' && (
          <TelegramManager
            config={telegramConfig}
            onSaveConfig={onUpdateTelegramConfig}
          />
        )}

        {activeTab === 'stats' && (
          <PerformanceStats signals={signals} />
        )}
      </main>

      {/* Modals */}
      <NewSignalModal
        isOpen={isNewSignalModalOpen}
        onClose={() => setIsNewSignalModalOpen(false)}
        onAddSignal={onAddSignal}
        telegramChannelName={telegramConfig.channelTitle}
      />

      <UpdateResultModal
        signal={selectedSignalToUpdate}
        isOpen={selectedSignalToUpdate !== null}
        onClose={() => setSelectedSignalToUpdate(null)}
        onSaveResult={onUpdateSignalResult}
        telegramChannelName={telegramConfig.channelTitle}
      />

    </div>
  );
};
