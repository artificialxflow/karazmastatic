import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { PersonalWorkspace } from './components/PersonalWorkspace';
import { 
  INITIAL_SIGNALS, 
  INITIAL_TELEGRAM_CONFIG, 
  INITIAL_AUTOMATION_CONFIG 
} from './data/mockData';
import { TradingSignal, TelegramConfig, AutomationConfig } from './types';

export default function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>('مدیر سیستم (Admin)');

  // Signals and settings state
  const [signals, setSignals] = useState<TradingSignal[]>(INITIAL_SIGNALS);
  const [telegramConfig, setTelegramConfig] = useState<TelegramConfig>(INITIAL_TELEGRAM_CONFIG);
  const [automationConfig, setAutomationConfig] = useState<AutomationConfig>(INITIAL_AUTOMATION_CONFIG);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLoginSuccess = (user: string) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    showToast(`خوش آمدید! ورود به میز کار سیگنال با موفقیت انجام شد.`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    showToast('از حساب کاربری خارج شدید.');
  };

  // Add new signal
  const handleAddSignal = (
    newSigData: Omit<TradingSignal, 'id' | 'createdAt' | 'status' | 'result' | 'pnlValue'>
  ) => {
    const newSignal: TradingSignal = {
      ...newSigData,
      id: `sig-${Date.now()}`,
      status: 'active',
      result: 'pending',
      pnlValue: 0,
      createdAt: 'امروز - همین لحظه',
    };

    setSignals((prev) => [newSignal, ...prev]);

    if (newSigData.sentToTelegram) {
      showToast(`سیگنال ${newSigData.pair} ثبت شد و به کانال ${telegramConfig.channelId} ارسال گردید.`);
    } else {
      showToast(`سیگنال ${newSigData.pair} با موفقیت در دیتابیس شخصی ثبت شد.`);
    }
  };

  // Update signal result (TP, SL, Breakeven, etc.)
  const handleUpdateSignalResult = (
    signalId: string,
    result: TradingSignal['result'],
    pnlValue: number,
    status: TradingSignal['status'],
    sendToTelegram: boolean,
    notes?: string
  ) => {
    setSignals((prev) =>
      prev.map((sig) => {
        if (sig.id === signalId) {
          return {
            ...sig,
            result,
            pnlValue,
            status,
            closedAt: status === 'closed' ? 'امروز - ثبت نتیجه' : sig.closedAt,
            notes: notes ? `${sig.notes || ''} | نتیجه: ${notes}` : sig.notes,
          };
        }
        return sig;
      })
    );

    if (sendToTelegram) {
      showToast(`نتیجه معامله ثبت شد و پیام موفقیت به کانال ${telegramConfig.channelId} ارسال گردید.`);
    } else {
      showToast('نتیجه معامله با موفقیت در سیستم به‌روزرسانی شد.');
    }
  };

  // Delete a signal
  const handleDeleteSignal = (signalId: string) => {
    setSignals((prev) => prev.filter((s) => s.id !== signalId));
    showToast('سیگنال مورد نظر از آرشیو حذف گردید.');
  };

  // Manual broadcast to Telegram
  const handleSendToTelegram = (signal: TradingSignal) => {
    setSignals((prev) =>
      prev.map((s) => (s.id === signal.id ? { ...s, sentToTelegram: true } : s))
    );
    showToast(`سیگنال ${signal.pair} به کانال تلگرام (${telegramConfig.channelId}) مخابره شد.`);
  };

  // Update configs
  const handleUpdateTelegramConfig = (config: TelegramConfig) => {
    setTelegramConfig(config);
    showToast('تنظیمات ربات تلگرام با موفقیت به‌روزرسانی شد.');
  };

  const handleUpdateAutomationConfig = (config: AutomationConfig) => {
    setAutomationConfig(config);
    showToast(`حالت اتوماسیون به (${
      config.mode === 'manual' ? 'تمام‌دستی' : config.mode === 'semi_auto' ? 'نیمه‌خودکار' : 'تمام‌خودکار'
    }) تغییر یافت.`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-600 selection:text-white" dir="rtl">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {!isAuthenticated ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <PersonalWorkspace
          currentUser={currentUser}
          onLogout={handleLogout}
          signals={signals}
          telegramConfig={telegramConfig}
          automationConfig={automationConfig}
          onAddSignal={handleAddSignal}
          onUpdateSignalResult={handleUpdateSignalResult}
          onDeleteSignal={handleDeleteSignal}
          onSendToTelegram={handleSendToTelegram}
          onUpdateTelegramConfig={handleUpdateTelegramConfig}
          onUpdateAutomationConfig={handleUpdateAutomationConfig}
        />
      )}

    </div>
  );
}
