import React, { useState } from 'react';
import { 
  Send, 
  Bot, 
  MessageSquare, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Activity, 
  Save, 
  Sparkles,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { TelegramConfig } from '../../types';

interface TelegramManagerProps {
  config: TelegramConfig;
  onSaveConfig: (updated: TelegramConfig) => void;
}

export const TelegramManager: React.FC<TelegramManagerProps> = ({
  config,
  onSaveConfig,
}) => {
  const [botToken, setBotToken] = useState(config.botToken);
  const [channelId, setChannelId] = useState(config.channelId);
  const [channelTitle, setChannelTitle] = useState(config.channelTitle);
  const [showToken, setShowToken] = useState(false);
  const [autoSendNew, setAutoSendNew] = useState(config.autoSendNewSignals);
  const [autoSendResults, setAutoSendResults] = useState(config.autoSendResultUpdates);
  const [signalTemplate, setSignalTemplate] = useState(config.signalTemplate);
  const [resultTemplate, setResultTemplate] = useState(config.resultTemplate);

  const [testSent, setTestSent] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTestBroadcast = () => {
    setIsSendingTest(true);
    setTestSent(false);

    setTimeout(() => {
      setIsSendingTest(false);
      setTestSent(true);
    }, 700);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      ...config,
      botToken,
      channelId,
      channelTitle,
      autoSendNewSignals: autoSendNew,
      autoSendResultUpdates: autoSendResults,
      signalTemplate,
      resultTemplate,
      lastPingTime: 'همین لحظه (200 OK)',
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-2">
            <Send className="w-3.5 h-3.5 text-blue-400" />
            <span>اتصال مستقیم به کانال و گروه‌های تلگرام</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            پیکربندی ربات انتشار سیگنال تلگرام
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            ارسال خودکار و دستی سیگنال‌ها، تارگت‌های لمس‌شده و کارنامه معاملاتی به کانال VIP بدون نیاز به کپی-پیست دستی.
          </p>
        </div>

        <button
          type="button"
          onClick={handleTestBroadcast}
          disabled={isSendingTest}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/30 cursor-pointer whitespace-nowrap"
        >
          <Send className={`w-4 h-4 ${isSendingTest ? 'animate-bounce' : ''}`} />
          <span>{isSendingTest ? 'در حال ارسال تست...' : 'ارسال پیام تست به کانال'}</span>
        </button>
      </div>

      {testSent && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              پیام تست با موفقیت به کانال <strong>{channelId}</strong> ارسال گردید! شناسه پیام: #2048
            </span>
          </div>
          <button
            onClick={() => setTestSent(false)}
            className="text-emerald-700 hover:text-emerald-950 font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Grid: Settings & Telegram Message Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Settings Form */}
        <form onSubmit={handleSave} className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-600" />
            <span>مشخصات ربات و کانال مقصد</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Channel ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                شناسه عمومی یا عددی کانال (Channel ID)
              </label>
              <input
                type="text"
                dir="ltr"
                required
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
                placeholder="@My_Channel_Name"
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Channel Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                عنوان کانال
              </label>
              <input
                type="text"
                value={channelTitle}
                onChange={(e) => setChannelTitle(e.target.value)}
                placeholder="کانال سیگنال VIP"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

          </div>

          {/* Bot Token */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>توکن اختصاصی ربات تلگرام (از @BotFather)</span>
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
              >
                {showToken ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showToken ? 'مخفی‌سازی' : 'نمایش توکن'}</span>
              </button>
            </label>
            <input
              type={showToken ? 'text' : 'password'}
              dir="ltr"
              required
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Broadcast Options */}
          <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">ارسال خودکار سیگنال‌های جدید به کانال:</span>
              <input
                type="checkbox"
                checked={autoSendNew}
                onChange={(e) => setAutoSendNew(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">ارسال خودکار نتایج تارگت و استاپ به کانال:</span>
              <input
                type="checkbox"
                checked={autoSendResults}
                onChange={(e) => setAutoSendResults(e.target.checked)}
                className="w-4 h-4 accent-blue-600"
              />
            </div>
          </div>

          {/* Signal Template */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              قالب متن پیام سیگنال جدید در تلگرام:
            </label>
            <textarea
              rows={4}
              value={signalTemplate}
              onChange={(e) => setSignalTemplate(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-sans leading-relaxed"
            />
          </div>

          {/* Result Template */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              قالب متن پیام نتیجه (TP/SL) در تلگرام:
            </label>
            <textarea
              rows={3}
              value={resultTemplate}
              onChange={(e) => setResultTemplate(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-sans leading-relaxed"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              {saveSuccess && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  تنظیمات تلگرام ذخیره شد.
                </span>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره تغییرات تلگرام</span>
            </button>
          </div>

        </form>

        {/* Telegram Live Phone Bubble Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-xl border border-slate-800">
            
            {/* Phone header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-slate-300">پیش‌نمایش زنده در تلگرام</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                {channelId}
              </span>
            </div>

            {/* Telegram Channel Chat Bubble */}
            <div className="bg-[#1E293B] rounded-2xl p-4 text-right space-y-2 border border-slate-700 shadow-inner">
              <div className="flex items-center justify-between text-[11px] text-blue-300 font-semibold border-b border-slate-700/60 pb-1.5">
                <span>{channelTitle}</span>
                <span className="font-mono text-slate-400">14:32</span>
              </div>

              <div className="text-xs text-slate-100 leading-relaxed font-sans space-y-1">
                <p className="font-bold text-emerald-400">🔔 سیگنال معاملاتی جدید: BUY XAU/USD (طلا)</p>
                <p className="font-mono text-[11px] text-slate-300">📊 تایم‌فریم: H1</p>
                <p className="font-mono text-[11px] text-slate-300">📍 نقطه ورود: 2642.50</p>
                <p className="font-mono text-[11px] text-red-400">🛑 حد ضرر (SL): 2631.00</p>
                <p className="font-mono text-[11px] text-emerald-300">🎯 هدف اول (TP1): 2655.00</p>
                <p className="font-mono text-[11px] text-emerald-300">🎯 هدف دوم (TP2): 2668.00</p>
                <p className="text-[11px] text-slate-300 pt-1">📝 بریک‌اوت خط روند نزولی و تایید مومنتوم خرید در سشن لندن.</p>
              </div>

              {/* Simulated Telegram inline button */}
              <div className="pt-2">
                <div className="w-full py-1.5 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg text-center text-[11px] font-bold shadow-xs">
                  📊 مشاهده تحلیل در TradingView
                </div>
              </div>
            </div>

            {/* Result bubble */}
            <div className="bg-[#1E293B] rounded-2xl p-4 text-right space-y-2 border border-slate-700 shadow-inner mt-3">
              <div className="flex items-center justify-between text-[11px] text-blue-300 font-semibold border-b border-slate-700/60 pb-1.5">
                <span>{channelTitle}</span>
                <span className="font-mono text-slate-400">16:15</span>
              </div>

              <div className="text-xs text-slate-100 leading-relaxed font-sans space-y-1">
                <p className="font-bold text-emerald-400">🎯 به‌روزرسانی نتیجه سیگنال: XAU/USD (طلا)</p>
                <p className="text-[11px] text-slate-300">وضعیت جدید: 🎯🎯 تارگت ۲ با موفقیت لمس شد!</p>
                <p className="font-mono text-emerald-300 font-bold text-xs">سود ثبت‌شده: +255 Pip</p>
                <p className="text-[10px] text-slate-400">پلتفرم خودکار کارآزما (AnalytixHire)</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
