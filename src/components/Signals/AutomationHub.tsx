import React, { useState } from 'react';
import { 
  Zap, 
  Bot, 
  Code2, 
  Copy, 
  Check, 
  CheckCircle2, 
  RefreshCw, 
  Play, 
  ShieldCheck, 
  Sliders, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AutomationConfig, TradingSignal } from '../../types';

interface AutomationHubProps {
  config: AutomationConfig;
  onUpdateConfig: (updated: AutomationConfig) => void;
  onSimulateWebhookSignal: (signal: Omit<TradingSignal, 'id' | 'createdAt' | 'status' | 'result' | 'pnlValue'>) => void;
}

export const AutomationHub: React.FC<AutomationHubProps> = ({
  config,
  onUpdateConfig,
  onSimulateWebhookSignal,
}) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [simulationSuccess, setSimulationSuccess] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const sampleJsonPayload = `{
  "secret": "${config.webhookSecret}",
  "pair": "SOL/USDT",
  "market": "crypto",
  "type": "BUY",
  "entry": 148.50,
  "sl": 142.00,
  "tp1": 156.00,
  "tp2": 165.00,
  "timeframe": "H1",
  "notes": "الگوریتم بریک‌اوت کارآزما: واگرایی پنهان مثبت در استوکاستیک"
}`;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(config.webhookEndpoint);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(sampleJsonPayload);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleTriggerSimulation = () => {
    setIsSimulating(true);
    setSimulationSuccess(false);

    setTimeout(() => {
      setIsSimulating(false);
      onSimulateWebhookSignal({
        pair: 'SOL/USDT',
        market: 'crypto',
        type: 'BUY',
        entryPrice: 148.50,
        stopLoss: 142.00,
        tp1: 156.00,
        tp2: 165.00,
        timeframe: 'H1',
        notes: 'دریافت خودکار از وب‌هوک TradingView (PineScript Strategy v5).',
        sentToTelegram: config.mode === 'full_auto',
        source: 'automated',
      });
      setSimulationSuccess(true);
      setTimeout(() => setSimulationSuccess(false), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>بستر اتوماسیون و اتصال الگوریتم‌ها</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            موتور پردازش خودکار سیگنال‌ها (Automation Engine)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            قابلیت سوییچ آنی میان حالت دستی و خودکار، پذیرش سیگنال از طریق وب‌هوک تریدینگ‌ویو و متاتریدر، و انتشار خودکار در تلگرام.
          </p>
        </div>

        <button
          onClick={handleTriggerSimulation}
          disabled={isSimulating}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-500/30 cursor-pointer whitespace-nowrap"
        >
          <Play className={`w-4 h-4 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'در حال ارسال پکت...' : 'تست شبیه‌ساز وب‌هوک TradingView'}</span>
        </button>
      </div>

      {simulationSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              یک سیگنال الگوریتمی جدید (SOL/USDT) از طریق وب‌هوک تریدینگ‌ویو با موفقیت پردازش شد و به لیست سیگنال‌ها اضافه گردید!
            </span>
          </div>
          <span className="font-bold font-mono text-emerald-700">200 OK</span>
        </div>
      )}

      {/* Mode Switcher: 3 Modes */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>تعیین سطح اتوماسیون سیستم</span>
          </h3>
          <span className="text-xs text-slate-500">انتخاب نحوه دخالت انسانی در ارسال سیگنال</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Manual */}
          <div
            onClick={() => onUpdateConfig({ ...config, mode: 'manual' })}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-right ${
              config.mode === 'manual'
                ? 'bg-blue-50/70 border-blue-600 shadow-xs'
                : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>✍️</span>
                <span>حالت تمام‌دستی (Manual)</span>
              </span>
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  config.mode === 'manual' ? 'border-blue-600 bg-blue-600' : 'border-slate-400'
                }`}
              >
                {config.mode === 'manual' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              تمامی سیگنال‌ها و نتایج منحصراً توسط خود شما در فرم دستی وارد و تایید می‌شوند. هیچ سیگنالی خودکار به تلگرام نمی‌رود.
            </p>
          </div>

          {/* Semi-Auto */}
          <div
            onClick={() => onUpdateConfig({ ...config, mode: 'semi_auto' })}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-right ${
              config.mode === 'semi_auto'
                ? 'bg-indigo-50/70 border-indigo-600 shadow-xs'
                : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>⚡</span>
                <span>حالت نیمه‌خودکار (Semi-Auto)</span>
              </span>
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  config.mode === 'semi_auto' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-400'
                }`}
              >
                {config.mode === 'semi_auto' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              وب‌هوک سیگنال را از چارت تحلیلی دریافت کرده و در پنل آماده می‌کند؛ شما پس از یک نگاه و با یک کلیک آن را به تلگرام می‌فرستید.
            </p>
          </div>

          {/* Full-Auto */}
          <div
            onClick={() => onUpdateConfig({ ...config, mode: 'full_auto' })}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-right ${
              config.mode === 'full_auto'
                ? 'bg-emerald-50/70 border-emerald-600 shadow-xs'
                : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>🤖</span>
                <span>حالت تمام‌خودکار (Full-Auto)</span>
              </span>
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  config.mode === 'full_auto' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-400'
                }`}
              >
                {config.mode === 'full_auto' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              به محض صادر شدن هشدار استراتژی در تریدینگ‌ویو، سیگنال خودکار ثبت و در صدم ثانیه به کانال تلگرام مخابره می‌شود.
            </p>
          </div>

        </div>
      </div>

      {/* Webhook Endpoint & Integration Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Webhook URL & Secret */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Code2 className="w-4 h-4 text-blue-600" />
            <span>مشخصات آدرس وب‌هوک اختصاصی (TradingView Webhook)</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              آدرس وب‌هوک (Webhook URL جهت قرار دادن در تریدینگ‌ویو):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                dir="ltr"
                value={config.webhookEndpoint}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl"
              />
              <button
                onClick={handleCopyKey}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer shrink-0"
                title="کپی آدرس وب‌هوک"
              >
                {copiedKey ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              کلید محرمانه وب‌هوک (Secret Token):
            </label>
            <input
              type="text"
              readOnly
              dir="ltr"
              value={config.webhookSecret}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">محاسبه خودکار نسبت ریسک به ریوارد:</span>
              <input
                type="checkbox"
                checked={config.autoCalculateRR}
                onChange={(e) => onUpdateConfig({ ...config, autoCalculateRR: e.target.checked })}
                className="w-4 h-4 accent-blue-600"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">پشتیبانی از دستورات تریلینگ استاپ (Trailing SL):</span>
              <input
                type="checkbox"
                checked={config.autoTrailingStop}
                onChange={(e) => onUpdateConfig({ ...config, autoTrailingStop: e.target.checked })}
                className="w-4 h-4 accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Right: PineScript / JSON Payload Guide */}
        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold text-slate-200">فرمت بدنه هشدار (Alert JSON Payload)</span>
            </div>
            <button
              onClick={handleCopyJson}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono"
            >
              {copiedJson ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedJson ? 'کپی شد' : 'کپی نمونه'}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            در پنل Alert تریدینگ‌ویو، تیک <strong>Webhook URL</strong> را فعال کرده و ساختار زیر را در بخش Message قرار دهید:
          </p>

          <pre className="p-3 bg-black/60 rounded-xl text-[11px] font-mono text-emerald-300 overflow-x-auto dir-ltr">
            {sampleJsonPayload}
          </pre>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ارتباط رمزنگاری‌شده با بررسی امضای Secret Token</span>
          </div>
        </div>

      </div>

    </div>
  );
};
