import { TradingSignal, TelegramConfig, AutomationConfig } from '../types';

export const INITIAL_SIGNALS: TradingSignal[] = [
  {
    id: 'sig-101',
    pair: 'XAU/USD (طلا)',
    market: 'forex',
    type: 'BUY',
    entryPrice: 2642.50,
    stopLoss: 2631.00,
    tp1: 2655.00,
    tp2: 2668.00,
    tp3: 2680.00,
    timeframe: 'H1',
    status: 'closed',
    result: 'tp2_hit',
    pnlValue: 255, // +255 pips
    createdAt: '۱۴۰۳/۰۷/۱۰ - ساعت ۰۹:۳۰',
    closedAt: '۱۴۰۳/۰۷/۱۰ - ساعت ۱۴:۱۵',
    notes: 'بریک‌اوت خط روند نزولی و تثبیت بالای میانگین متحرک ۵۰ در سشن لندن.',
    sentToTelegram: true,
    source: 'manual',
  },
  {
    id: 'sig-102',
    pair: 'BTC/USDT',
    market: 'crypto',
    type: 'BUY',
    entryPrice: 62400,
    stopLoss: 60900,
    tp1: 63800,
    tp2: 65200,
    tp3: 67000,
    timeframe: 'H4',
    status: 'active',
    result: 'tp1_hit',
    pnlValue: 1400, // +$1400 / profit
    createdAt: '۱۴۰۳/۰۷/۱۱ - ساعت ۱۱:۰۰',
    notes: 'تثبیت حمایت در سطح فیبوناچی ۰.۶۱۸ با واگرایی مثبت در RSI ۴ ساعته.',
    sentToTelegram: true,
    source: 'automated',
  },
  {
    id: 'sig-103',
    pair: 'EUR/USD',
    market: 'forex',
    type: 'SELL',
    entryPrice: 1.0965,
    stopLoss: 1.1010,
    tp1: 1.0920,
    tp2: 1.0875,
    timeframe: 'M30',
    status: 'active',
    result: 'pending',
    pnlValue: 18, // +18 pips in progress
    createdAt: '۱۴۰۳/۰۷/۱۱ - ساعت ۱۵:۲۰',
    notes: 'تست مجدد مقاومت کلیدی پیش از داده‌های اقتصادی ایالات متحده.',
    sentToTelegram: true,
    source: 'manual',
  },
  {
    id: 'sig-104',
    pair: 'ETH/USDT',
    market: 'crypto',
    type: 'SELL',
    entryPrice: 2480,
    stopLoss: 2535,
    tp1: 2410,
    tp2: 2340,
    timeframe: 'H1',
    status: 'closed',
    result: 'tp1_hit',
    pnlValue: 70, // +$70
    createdAt: '۱۴۰۳/۰۷/۰۹ - ساعت ۲۱:۴۵',
    closedAt: '۱۴۰۳/۰۷/۱۰ - ساعت ۰۴:۱۰',
    notes: 'ریجکت سنگین از سقف کانال نزولی با حجم فروش بالا.',
    sentToTelegram: true,
    source: 'automated',
  },
  {
    id: 'sig-105',
    pair: 'GBP/JPY',
    market: 'forex',
    type: 'BUY',
    entryPrice: 191.20,
    stopLoss: 190.50,
    tp1: 192.10,
    tp2: 193.00,
    timeframe: 'H1',
    status: 'closed',
    result: 'sl_hit',
    pnlValue: -70, // -70 pips
    createdAt: '۱۴۰۳/۰۷/۰۸ - ساعت ۱۲:۱۵',
    closedAt: '۱۴۰۳/۰۷/۰۸ - ساعت ۱۶:۳۰',
    notes: 'واکنش معکوس به اخبار بانک مرکزی انگلستان و لمس حد ضرر.',
    sentToTelegram: true,
    source: 'manual',
  },
];

export const INITIAL_TELEGRAM_CONFIG: TelegramConfig = {
  botToken: '6892348123:AAHkL9qB7y_d3W0eZ9xP2mQ4n1rT6y8u0vW',
  channelId: '@Analytix_VIP_Signals',
  channelTitle: 'کانال سیگنال‌های تحلیلی VIP',
  autoSendNewSignals: true,
  autoSendResultUpdates: true,
  signalTemplate: `🔔 سیگنال معاملاتی جدید: {TYPE} {PAIR}
📊 تایم‌فریم: {TIMEFRAME}
📍 نقطه ورود: {ENTRY}
🛑 حد ضرر (SL): {SL}
🎯 هدف اول (TP1): {TP1}
🎯 هدف دوم (TP2): {TP2}
📝 تحلیل: {NOTES}
⚡ پلتفرم اختصاصی کارآزما (AnalytixHire)`,
  resultTemplate: `🎯 به‌روزرسانی نتیجه سیگنال: {PAIR}
وضعیت جدید: {RESULT}
سود / پیپ ثبت‌شده: {PNL}
تاریخ رویداد: {DATE}`,
  status: 'connected',
  lastPingTime: 'لحظاتی پیش (200 OK)',
};

export const INITIAL_AUTOMATION_CONFIG: AutomationConfig = {
  mode: 'semi_auto', // دستی، نیمه‌خودکار یا خودکار
  webhookSecret: 'sec_krmz_9f563d50_2026',
  webhookEndpoint: 'https://api.karamazma.ir/v1/signals/webhook',
  autoCalculateRR: true,
  tradingViewAlertsEnabled: true,
  metatraderBridgeEnabled: false,
  autoTrailingStop: true,
};

export const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: '123',
};
