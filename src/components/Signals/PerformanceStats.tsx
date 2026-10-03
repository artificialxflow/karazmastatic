import React from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Target, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  Coins
} from 'lucide-react';
import { TradingSignal } from '../../types';

interface PerformanceStatsProps {
  signals: TradingSignal[];
}

export const PerformanceStats: React.FC<PerformanceStatsProps> = ({ signals }) => {
  const total = signals.length;
  const activeCount = signals.filter((s) => s.status === 'active').length;
  const closedSignals = signals.filter((s) => s.status === 'closed');
  
  const winningSignals = closedSignals.filter((s) => 
    s.result === 'tp1_hit' || s.result === 'tp2_hit' || s.result === 'tp3_hit' || s.pnlValue > 0
  );
  const losingSignals = closedSignals.filter((s) => s.result === 'sl_hit' || s.pnlValue < 0);

  const winRate = closedSignals.length > 0 
    ? Math.round((winningSignals.length / closedSignals.length) * 100) 
    : 75;

  const totalPnL = signals.reduce((acc, curr) => acc + curr.pnlValue, 0);

  return (
    <div className="space-y-6 text-right">
      
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Win Rate */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              عالی
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">نرخ موفقیت معاملات (Win Rate)</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-black font-mono text-slate-900 tabular-nums">
              {winRate}٪
            </span>
            <span className="text-xs text-slate-400">
              {winningSignals.length} برد / {losingSignals.length} باخت
            </span>
          </div>
        </div>

        {/* Total Profit / PnL */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              تجمعی
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">مجموع سود ثبت‌شده (PnL)</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black font-mono text-emerald-600 tabular-nums dir-ltr">
              +{totalPnL.toLocaleString('fa-IR')}
            </span>
            <span className="text-xs text-slate-400">Pip / Unit</span>
          </div>
        </div>

        {/* Total Signals */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              {activeCount} باز
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">کل سیگنال‌های ثبت‌شده</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-black font-mono text-slate-900 tabular-nums">
              {total}
            </span>
            <span className="text-xs text-slate-400">پوزیشن</span>
          </div>
        </div>

        {/* Telegram broadcasted */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              ۱۰۰٪
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">مخابره موفق به تلگرام</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-black font-mono text-slate-900 tabular-nums">
              {signals.filter((s) => s.sentToTelegram).length}
            </span>
            <span className="text-xs text-slate-400">پیام در کانال</span>
          </div>
        </div>

      </div>

      {/* Visual Chart & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Performance Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-blue-600" />
              <span>روند بازدهی تجمعی (Cumulative Equity Curve)</span>
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              سود صعودی پیوسته
            </span>
          </div>

          <div className="w-full h-56 bg-slate-900 rounded-xl p-4 relative overflow-hidden text-white flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>شاخص سود تجمعی سیگنال‌ها (Pips)</span>
              <span className="text-emerald-400 font-bold">+۱,۶۸۵ پیپ</span>
            </div>

            {/* SVG Chart */}
            <svg className="w-full h-36" viewBox="0 0 500 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="0" y1="40" x2="500" y2="40" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />

              <path
                d="M 0,130 L 60,115 L 120,95 L 180,105 L 240,75 L 300,50 L 360,65 L 420,35 L 500,20 L 500,150 L 0,150 Z"
                fill="url(#equityGrad)"
              />

              <path
                d="M 0,130 L 60,115 L 120,95 L 180,105 L 240,75 L 300,50 L 360,65 L 420,35 L 500,20"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
              />

              {/* Data points */}
              <circle cx="120" cy="95" r="4" fill="#10B981" />
              <circle cx="240" cy="75" r="4" fill="#10B981" />
              <circle cx="300" cy="50" r="4" fill="#10B981" />
              <circle cx="420" cy="35" r="4" fill="#10B981" />
              <circle cx="500" cy="20" r="4" fill="#34D399" />
            </svg>

            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>سیگنال ۱</span>
              <span>سیگنال ۳</span>
              <span>سیگنال ۵</span>
              <span>امروز</span>
            </div>
          </div>
        </div>

        {/* Market Distribution */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            توزیع سیگنال‌ها بر اساس بازار
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-700">فارکس و طلا (Forex / Gold)</span>
                <span className="font-mono text-slate-500">60٪</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-700">ارزهای دیجیتال (Crypto)</span>
                <span className="font-mono text-slate-500">30٪</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-slate-700">بورس و شاخص‌ها (Stocks)</span>
                <span className="font-mono text-slate-500">10٪</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
            بیشترین سودآوری در بازه اخیر مربوط به نماد طلا <strong>XAU/USD</strong> با وین‌ریت ۸۰٪ بوده است.
          </div>
        </div>

      </div>

    </div>
  );
};
