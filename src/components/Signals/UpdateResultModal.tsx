import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  Send, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { TradingSignal, SignalResult, SignalStatus } from '../../types';

interface UpdateResultModalProps {
  signal: TradingSignal | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveResult: (
    signalId: string, 
    result: SignalResult, 
    pnlValue: number, 
    status: SignalStatus, 
    sendToTelegram: boolean,
    notes?: string
  ) => void;
  telegramChannelName: string;
}

export const UpdateResultModal: React.FC<UpdateResultModalProps> = ({
  signal,
  isOpen,
  onClose,
  onSaveResult,
  telegramChannelName,
}) => {
  if (!isOpen || !signal) return null;

  const [result, setResult] = useState<SignalResult>(
    signal.result === 'pending' ? 'tp1_hit' : signal.result
  );
  const [pnlValue, setPnlValue] = useState<string>(
    signal.pnlValue ? String(signal.pnlValue) : '50'
  );
  const [status, setStatus] = useState<SignalStatus>(signal.status);
  const [sendToTelegram, setSendToTelegram] = useState(true);
  const [customNote, setCustomNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pnlNum = parseFloat(pnlValue) || 0;
    onSaveResult(signal.id, result, pnlNum, status, sendToTelegram, customNote);
    onClose();
  };

  const handleResultSelect = (newResult: SignalResult) => {
    setResult(newResult);
    if (newResult === 'tp1_hit') {
      setPnlValue('45');
    } else if (newResult === 'tp2_hit') {
      setPnlValue('90');
      setStatus('closed');
    } else if (newResult === 'tp3_hit') {
      setPnlValue('160');
      setStatus('closed');
    } else if (newResult === 'sl_hit') {
      setPnlValue('-35');
      setStatus('closed');
    } else if (newResult === 'breakeven') {
      setPnlValue('0');
      setStatus('closed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-right animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                ثبت و به‌روزرسانی نتیجه سیگنال
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {signal.pair} · {signal.type} @ {signal.entryPrice}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Signal context snippet */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="text-slate-400 block text-[10px]">نقطه ورود:</span>
              <span className="font-mono font-bold text-slate-800">{signal.entryPrice}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">حد ضرر (SL):</span>
              <span className="font-mono font-bold text-red-600">{signal.stopLoss}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">تارگت‌ها:</span>
              <span className="font-mono font-bold text-emerald-600">{signal.tp1} / {signal.tp2}</span>
            </div>
          </div>

          {/* Result Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              نتیجه حاصل‌شده برای این موقعیت:
            </label>
            <div className="grid grid-cols-2 gap-2">
              
              <button
                type="button"
                onClick={() => handleResultSelect('tp1_hit')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-right flex items-center justify-between cursor-pointer ${
                  result === 'tp1_hit'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>🎯 تارگت اول لمس شد (TP1)</span>
                {result === 'tp1_hit' && <span className="text-emerald-600 font-bold">✓</span>}
              </button>

              <button
                type="button"
                onClick={() => handleResultSelect('tp2_hit')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-right flex items-center justify-between cursor-pointer ${
                  result === 'tp2_hit'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>🎯🎯 تارگت دوم (TP2)</span>
                {result === 'tp2_hit' && <span className="text-emerald-600 font-bold">✓</span>}
              </button>

              <button
                type="button"
                onClick={() => handleResultSelect('tp3_hit')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-right flex items-center justify-between cursor-pointer ${
                  result === 'tp3_hit'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>🎯🎯🎯 تارگت نهایی (TP3)</span>
                {result === 'tp3_hit' && <span className="text-emerald-600 font-bold">✓</span>}
              </button>

              <button
                type="button"
                onClick={() => handleResultSelect('sl_hit')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-right flex items-center justify-between cursor-pointer ${
                  result === 'sl_hit'
                    ? 'bg-red-50 border-red-400 text-red-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>🛑 لمس حد ضرر (SL Hit)</span>
                {result === 'sl_hit' && <span className="text-red-600 font-bold">✓</span>}
              </button>

              <button
                type="button"
                onClick={() => handleResultSelect('breakeven')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-right flex items-center justify-between cursor-pointer ${
                  result === 'breakeven'
                    ? 'bg-blue-50 border-blue-400 text-blue-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>⚖️ خروج ریسک‌فری (0)</span>
                {result === 'breakeven' && <span className="text-blue-600 font-bold">✓</span>}
              </button>

              <button
                type="button"
                onClick={() => handleResultSelect('cancelled')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-right flex items-center justify-between cursor-pointer ${
                  result === 'cancelled'
                    ? 'bg-slate-200 border-slate-400 text-slate-800 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>❌ لغو شده بدون معامله</span>
                {result === 'cancelled' && <span className="text-slate-700 font-bold">✓</span>}
              </button>

            </div>
          </div>

          {/* PnL Value and Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                سود یا زیان ثبت‌شده (پیپ / دلار / درصد)
              </label>
              <input
                type="number"
                step="any"
                required
                dir="ltr"
                value={pnlValue}
                onChange={(e) => setPnlValue(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none text-right"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                وضعیت معامله
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as SignalStatus)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
              >
                <option value="active">همچنان فعال (باقی ماندن بخشی از حجم)</option>
                <option value="closed">بسته‌شده و تسویه کامل (Closed)</option>
              </select>
            </div>
          </div>

          {/* Custom message note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              یادداشت نتیجه برای کانال (اختیاری)
            </label>
            <input
              type="text"
              placeholder="مثال: سیو سود ۵۰٪ حجم انجام شد و استاپ به نقطه ورود منتقل گردید."
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Telegram notification toggle */}
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sendResultTelegram"
                checked={sendToTelegram}
                onChange={(e) => setSendToTelegram(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
              />
              <label htmlFor="sendResultTelegram" className="cursor-pointer font-medium">
                ارسال پیام اعلام نتیجه به کانال تلگرام ({telegramChannelName})
              </label>
            </div>
            <Send className="w-3.5 h-3.5 text-blue-600" />
          </div>

          {/* Footer buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              انصراف
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>ذخیره نتیجه و اعمال</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
