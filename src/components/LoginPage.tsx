import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  BarChart2, 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { DEFAULT_CREDENTIALS } from '../data/mockData';

interface LoginPageProps {
  onLoginSuccess: (username: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('لطفاً نام کاربری و رمز عبور را وارد نمایید.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Allow any non-empty or preset
      onLoginSuccess(username.trim());
    }, 400);
  };

  const handleQuickLogin = () => {
    setUsername(DEFAULT_CREDENTIALS.username);
    setPassword(DEFAULT_CREDENTIALS.password);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('مدیر سیستم (Admin)');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white" dir="rtl">
      
      {/* Background soft ambient glow */}
      <div className="absolute top-1/4 right-1/3 -z-10 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 -z-10 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        {/* Brand Icon */}
        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
          <BarChart2 className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          کارآزما · AnalytixHire
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          میز کار اختصاصی ثبت، رهگیری و ارسال خودکار سیگنال‌ها به تلگرام
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6 text-right">
          
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              ورود به حساب مدیریت
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              جهت دسترسی به دیتابیس سیگنال‌ها و اتصال وب‌هوک ربات تلگرام وارد شوید.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                نام کاربری
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="مثال: admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-3 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-colors"
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                کلمه عبور
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                <span>{isLoading ? 'در حال تایید هویت...' : 'ورود به پنل کاربری'}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

          </form>

          {/* Quick Demo One-Click Access Box */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between">
              <div>
                <span className="font-bold block">ورود سریع با مشخصات پیش‌فرض:</span>
                <span className="text-[11px] font-mono text-blue-700">admin / 123</span>
              </div>
              <button
                type="button"
                onClick={handleQuickLogin}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                ورود تک‌کلیک
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>پایگاه داده محلی و ایمن · نشست کاربری تک‌نفره</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
