import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Trash2, 
  Edit3, 
  ExternalLink,
  Target,
  Sparkles,
  Zap
} from 'lucide-react';
import { TradingSignal, SignalResult, SignalStatus } from '../../types';

interface SignalListProps {
  signals: TradingSignal[];
  onOpenNewSignalModal: () => void;
  onOpenUpdateResultModal: (signal: TradingSignal) => void;
  onSendToTelegram: (signal: TradingSignal) => void;
  onDeleteSignal: (signalId: string) => void;
}

export const SignalList: React.FC<SignalListProps> = ({
  signals,
  onOpenNewSignalModal,
  onOpenUpdateResultModal,
  onSendToTelegram,
  onDeleteSignal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [resultFilter, setResultFilter] = useState<string>('all');

  const filteredSignals = signals.filter((sig) => {
    const matchesSearch = 
      sig.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sig.timeframe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sig.notes && sig.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || sig.status === statusFilter;
    const matchesResult = resultFilter === 'all' || sig.result === resultFilter;

    return matchesSearch && matchesStatus && matchesResult;
  });

  const getResultBadge = (result: SignalResult) => {
    switch (result) {
      case 'tp1_hit':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span>🎯</span> تارگت ۱ خورد
          </span>
        );
      case 'tp2_hit':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span>🎯🎯</span> تارگت ۲ خورد
          </span>
        );
      case 'tp3_hit':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-200 text-emerald-900 border border-emerald-400">
            <span>🎯🎯🎯</span> تارگت ۳ لمس شد
          </span>
        );
      case 'sl_hit':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
            <span>🛑</span> استاپ‌لاس خورد
          </span>
        );
      case 'breakeven':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span>⚖️</span> ریسک‌فری شد
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <span>❌</span> لغو شده
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span>⏳</span> در انتظار نتیجه
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>مدیریت و بایگانی سیگنال‌های معاملاتی</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            ثبت دستی پوزیشن‌ها، به‌روزرسانی نتایج تارگت/استاپ و ارسال پیام به کانال تلگرام
          </p>
        </div>

        <button
          onClick={onOpenNewSignalModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
        >
          <TrendingUp className="w-4 h-4" />
          <span>+ ثبت سیگنال دستی جدید</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="جستجو در نمادها (مثال: XAU/USD یا BTC) یا یادداشت‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-colors"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">وضعیت معامله (همه)</option>
            <option value="active">معاملات فعال (Active)</option>
            <option value="closed">معاملات بسته‌شده (Closed)</option>
          </select>

          <select
            value={resultFilter}
            onChange={(e) => setResultFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">نتیجه (همه)</option>
            <option value="pending">در انتظار نتیجه</option>
            <option value="tp1_hit">تارگت ۱ خورده</option>
            <option value="tp2_hit">تارگت ۲ خورده</option>
            <option value="sl_hit">استاپ‌لاس خورده</option>
            <option value="breakeven">ریسک‌فری</option>
          </select>
        </div>
      </div>

      {/* Signal Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="py-3.5 px-4">نماد و موقعیت</th>
                <th className="py-3.5 px-4">نقطه ورود</th>
                <th className="py-3.5 px-4">حد ضرر (SL)</th>
                <th className="py-3.5 px-4">اهداف سود (TP)</th>
                <th className="py-3.5 px-4 text-center">نتیجه و سود</th>
                <th className="py-3.5 px-4 text-center">وضعیت تلگرام</th>
                <th className="py-3.5 px-4 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSignals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    هیچ سیگنالی با این مشخصات یافت نشد. می‌توانید با دکمه بالا سیگنال جدیدی ثبت کنید.
                  </td>
                </tr>
              ) : (
                filteredSignals.map((sig) => (
                  <tr key={sig.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Pair & Type */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-[11px] shrink-0 ${
                            sig.type === 'BUY' ? 'bg-emerald-600' : 'bg-red-600'
                          }`}
                        >
                          {sig.type === 'BUY' ? 'BUY' : 'SELL'}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900 font-mono">{sig.pair}</p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <span>تایم: {sig.timeframe}</span>
                            <span>·</span>
                            <span>{sig.source === 'automated' ? '🤖 اتومات' : '✍️ دستی'}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Entry Price */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800 tabular-nums">
                      {sig.entryPrice}
                    </td>

                    {/* Stop Loss */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-red-600 tabular-nums">
                      {sig.stopLoss}
                    </td>

                    {/* Targets */}
                    <td className="py-3.5 px-4 font-mono text-emerald-700">
                      <div>
                        <span>TP1: {sig.tp1}</span>
                        <span className="block text-[11px] text-slate-400">TP2: {sig.tp2}</span>
                      </div>
                    </td>

                    {/* Result and PnL */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="space-y-1">
                        <div>{getResultBadge(sig.result)}</div>
                        {sig.pnlValue !== 0 && (
                          <span className={`font-mono text-xs font-bold tabular-nums dir-ltr inline-block ${
                            sig.pnlValue > 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {sig.pnlValue > 0 ? `+${sig.pnlValue}` : sig.pnlValue} Pip/Unit
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Telegram Badge */}
                    <td className="py-3.5 px-4 text-center">
                      {sig.sentToTelegram ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          <CheckCircle2 className="w-3 h-3 text-blue-600" />
                          ارسال‌شده
                        </span>
                      ) : (
                        <button
                          onClick={() => onSendToTelegram(sig)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-2 py-0.5 rounded border border-slate-200 transition-colors cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          ارسال به کانال
                        </button>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        
                        {/* Update Result Button */}
                        <button
                          onClick={() => onOpenUpdateResultModal(sig)}
                          className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer border border-blue-200"
                          title="ثبت یا تغییر نتیجه سیگنال"
                        >
                          ثبت نتیجه
                        </button>

                        {/* Send to Telegram again */}
                        <button
                          onClick={() => onSendToTelegram(sig)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="بازارسال به تلگرام"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => onDeleteSignal(sig.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="حذف سیگنال"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
