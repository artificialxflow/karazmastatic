import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Send, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { TradingSignal, MarketType, SignalType } from '../../types';

interface NewSignalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSignal: (signal: Omit<TradingSignal, 'id' | 'createdAt' | 'status' | 'result' | 'pnlValue'>) => void;
  telegramChannelName: string;
}

export const NewSignalModal: React.FC<NewSignalModalProps> = ({
  isOpen,
  onClose,
  onAddSignal,
  telegramChannelName,
}) => {
  const [pair, setPair] = useState('XAU/USD (طلا)');
  const [market, setMarket] = useState<MarketType>('forex');
  const [type, setType] = useState<SignalType>('BUY');
  const [entryPrice, setEntryPrice] = useState('2650.00');
  const [stopLoss, setStopLoss] = useState('2638.00');
  const [tp1, setTp1] = useState('2662.00');
  const [tp2, setTp2] = useState('2675.00');
  const [tp3, setTp3] = useState('2690.00');
  const [timeframe, setTimeframe] = useState('H1');
  const [notes, setNotes] = useState('شکست مقاومت استاتیک و تایید حجم خرید در سشن معاملاتی نیویورک.');
  const [sendToTelegram, setSendToTelegram] = useState(true);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const entryNum = parseFloat(entryPrice);
    const slNum = parseFloat(stopLoss);
    const tp1Num = parseFloat(tp1);
    const tp2Num = parseFloat(tp2);
    const tp3Num = tp3 ? parseFloat(tp3) : undefined;

    if (isNaN(entryNum) || isNaN(slNum) || isNaN(tp1Num) || isNaN(tp2Num)) {
      setError('لطفاً مقادیر معتبر عددی برای نقطه ورود، حد ضرر و تارگت‌ها وارد فرمایید.');
      return;
    }

    onAddSignal({
      pair: pair.trim(),
      market,
      type,
      entryPrice: entryNum,
      stopLoss: slNum,
      tp1: tp1Num,
      tp2: tp2Num,
      tp3: tp3Num,
      timeframe,
      notes: notes.trim(),
      sentToTelegram: sendToTelegram,
      source: 'manual',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-right animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white ${
              type === 'BUY' ? 'bg-emerald-600' : 'bg-red-600'
            }`}>
              {type === 'BUY' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                ثبت دستی سیگنال معاملاتی جدید
              </h3>
              <p className="text-xs text-slate-500">
                درج در دیتابیس سیگنال‌ها و ارسال مستقیم به کانال تلگرام
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Type & Market */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* BUY / SELL Switcher */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                نوع موقعیت (Position)
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setType('BUY')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    type === 'BUY'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>خرید (BUY)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setType('SELL')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    type === 'SELL'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>فروش (SELL)</span>
                </button>
              </div>
            </div>

            {/* Market selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                حوزه بازار
              </label>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value as MarketType)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
              >
                <option value="forex">فارکس و طلا (Forex / Metals)</option>
                <option value="crypto">ارز دیجیتال (Crypto)</option>
                <option value="stocks">بورس و شاخص‌ها (Indices / Stocks)</option>
              </select>
            </div>

          </div>

          {/* Pair & Timeframe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                نماد معاملاتی (Pair / Asset) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: XAU/USD یا BTC/USDT یا EUR/USD"
                value={pair}
                onChange={(e) => setPair(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                تایم‌فریم تحلیلی
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-mono"
              >
                <option value="M5">5 دقیقه (M5)</option>
                <option value="M15">15 دقیقه (M15)</option>
                <option value="M30">30 دقیقه (M30)</option>
                <option value="H1">1 ساعته (H1)</option>
                <option value="H4">4 ساعته (H4)</option>
                <option value="D1">روزانه (D1)</option>
              </select>
            </div>
          </div>

          {/* Pricing parameters: Entry, SL, TP1, TP2, TP3 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                نقطه ورود (Entry)
              </label>
              <input
                type="number"
                step="any"
                required
                dir="ltr"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-right"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-red-600 mb-1">
                حد ضرر (Stop Loss)
              </label>
              <input
                type="number"
                step="any"
                required
                dir="ltr"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-red-200 text-red-600 rounded-lg focus:border-red-500 focus:outline-none text-right"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-emerald-600 mb-1">
                تارگت اول (TP 1)
              </label>
              <input
                type="number"
                step="any"
                required
                dir="ltr"
                value={tp1}
                onChange={(e) => setTp1(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-emerald-200 text-emerald-700 rounded-lg focus:border-emerald-500 focus:outline-none text-right"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-emerald-600 mb-1">
                تارگت دوم (TP 2)
              </label>
              <input
                type="number"
                step="any"
                required
                dir="ltr"
                value={tp2}
                onChange={(e) => setTp2(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-emerald-200 text-emerald-700 rounded-lg focus:border-emerald-500 focus:outline-none text-right"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-emerald-600 mb-1">
                تارگت سوم اختیاری (TP 3)
              </label>
              <input
                type="number"
                step="any"
                dir="ltr"
                placeholder="اختیاری"
                value={tp3}
                onChange={(e) => setTp3(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none text-right"
              />
            </div>

            <div className="flex flex-col justify-end">
              <span className="text-[10px] text-slate-400">ریسک به ریوارد تقریبی:</span>
              <span className="text-xs font-bold text-blue-600 font-mono mt-0.5">
                R:R حداقل ۱:۲
              </span>
            </div>

          </div>

          {/* Analysis notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              توضیحات و سناریوی تحلیلی (ارسال در متن سیگنال)
            </label>
            <textarea
              rows={2}
              placeholder="نکات کلیدی برای اعضای کانال (سطح فیبوناچی، اخبار اقتصادی، مدیریت حجم)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Telegram broadcast option */}
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sendTelegram"
                checked={sendToTelegram}
                onChange={(e) => setSendToTelegram(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
              />
              <label htmlFor="sendTelegram" className="cursor-pointer font-medium">
                ارسال خودکار سیگنال به کانال تلگرام ({telegramChannelName})
              </label>
            </div>
            <span className="text-[11px] font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
              ربات متصل
            </span>
          </div>

          {/* Modal footer */}
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
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ثبت سیگنال و انتشار</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
