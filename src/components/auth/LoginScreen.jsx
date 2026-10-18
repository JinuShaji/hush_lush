import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../utils/validation';

export const LoginScreen = ({ onShowTerms, onShowPrivacy }) => {
  const { login, loginAsGuest, loginWithSocial, isLoading } = useAuth();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMode, setLoginMode] = useState('email');

  // Error & Feedback State
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Field validation on blur
  const handleEmailBlur = () => {
    if (loginMode === 'email') {
      const result = validateEmail(email);
      setEmailError(result.isValid ? null : result.error);
    } else {
      const cleanPhone = email.replace(/\D/g, '');
      if (cleanPhone.length < 8) {
        setEmailError('Please enter a valid mobile number.');
      } else {
        setEmailError(null);
      }
    }
  };

  const handlePasswordBlur = () => {
    const result = validatePassword(password);
    setPasswordError(result.isValid ? null : result.error);
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    // 1. Strict Format Validation
    let isEmailValid = true;
    let isPasswordValid = true;

    if (loginMode === 'email') {
      const emailRes = validateEmail(email);
      if (!emailRes.isValid) {
        setEmailError(emailRes.error);
        isEmailValid = false;
      } else {
        setEmailError(null);
      }
    } else {
      if (email.replace(/\D/g, '').length < 8) {
        setEmailError('Please enter a valid mobile number.');
        isEmailValid = false;
      } else {
        setEmailError(null);
      }
    }

    const passRes = validatePassword(password);
    if (!passRes.isValid) {
      setPasswordError(passRes.error);
      isPasswordValid = false;
    } else {
      setPasswordError(null);
    }

    if (!isEmailValid || !isPasswordValid) {
      triggerShake();
      return;
    }

    // 2. Strict Authentication Execution
    const response = await login(email, password);
    if (response.success) {
      setIsSuccess(true);
    } else {
      setAuthError(response.error || 'Authentication failed. Please check your credentials.');
      triggerShake();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 w-full">
      {/* Centered Clean Square Card Container */}
      <div
        className={`w-full max-w-[440px] bg-white rounded-3xl p-6 sm:p-9 shadow-xl border border-slate-100 flex flex-col justify-between transition-all duration-300 ${
          isShaking ? 'ring-2 ring-red-400' : ''
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-3 mb-5">
          {/* Stylized Red HL Monogram with Wings */}
          <div className="w-14 h-14 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <path
                d="M18 16 h14 v28 h24 v-28 h14 v68 h-14 v-28 h-24 v28 h-14 z"
                fill="#E52E2E"
              />
              <path
                d="M48 16 C66 4, 84 10, 92 24 C76 22, 64 30, 58 40 Z"
                fill="#E52E2E"
              />
              <path
                d="M56 58 h16 v14 h22 v12 h-38 z"
                fill="#E52E2E"
              />
            </svg>
          </div>

          <div className="w-[1px] h-11 bg-slate-300" />

          <div className="flex flex-col">
            <h1 className="font-serif text-[26px] font-bold tracking-tight text-[#1A1A1A] leading-tight">
              Hush Lush
            </h1>
            <span className="text-[9px] font-bold tracking-[0.16em] text-primary uppercase">
              ADVERTISING & TECHNOLOGIES
            </span>
          </div>
        </div>

        {/* Subtitle / Tagline */}
        <p className="text-center text-[13px] text-slate-600 font-medium px-2 leading-relaxed mb-6">
          Warely Pass Grants Access to Log in at any of Our Partnered Restaurants.
        </p>

        {/* Auth Error Banner */}
        {authError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block">Access Denied:</span>
              <span>{authError}</span>
            </div>
          </div>
        )}

        {/* Auth Success Banner */}
        {isSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Credentials verified! Accessing restaurant menu...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email / Mobile Field */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">
              {loginMode === 'email' ? 'Email' : 'Mobile Number'}
            </label>
            <div className="relative">
              <input
                type={loginMode === 'email' ? 'email' : 'tel'}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                  if (authError) setAuthError(null);
                }}
                onBlur={handleEmailBlur}
                placeholder={loginMode === 'email' ? 'Mail ID' : '+971 50 123 4567'}
                className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                  emailError
                    ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                    : 'border-slate-200 focus:border-primary focus:ring-2 focus:ring-red-100'
                }`}
                disabled={isLoading}
              />
            </div>
            {emailError && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{emailError}</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError(null);
                  if (authError) setAuthError(null);
                }}
                onBlur={handlePasswordBlur}
                placeholder="Password"
                className={`w-full pl-4 pr-11 py-3 bg-white border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                  passwordError
                    ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                    : 'border-slate-200 focus:border-primary focus:ring-2 focus:ring-red-100'
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordError && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{passwordError}</span>
              </p>
            )}

            {/* Switch between Email and Mobile ID */}
            <div className="flex justify-end mt-1.5">
              <button
                type="button"
                onClick={() => {
                  setLoginMode(loginMode === 'email' ? 'mobile' : 'email');
                  setEmail('');
                  setEmailError(null);
                  setAuthError(null);
                }}
                className="text-xs text-primary hover:underline font-medium cursor-pointer"
              >
                {loginMode === 'email' ? 'Use Mobile Number Instead' : 'Use Email-ID Instead'}
              </button>
            </div>
          </div>

          {/* Divider: Or */}
          <div className="relative py-1 flex items-center justify-center">
            <span className="text-slate-400 text-xs font-medium">Or</span>
          </div>

          {/* Social Icons Row */}
          <div className="flex justify-center items-center gap-3">
            {/* Facebook */}
            <button
              type="button"
              onClick={() => loginWithSocial('facebook')}
              disabled={isLoading}
              className="w-14 h-11 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all shadow-2xs hover:border-slate-300 cursor-pointer"
              title="Sign in with Facebook"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="24" height="24" rx="4" fill="#1877F2" />
                <path
                  d="M16.5 12h-2.5v9h-3.5v-9h-2v-3h2v-2c0-2 1-3.5 3.5-3.5h2.5v3h-1.5c-0.8 0-1 0.4-1 1v1.5h2.5l-0.5 3z"
                  fill="#ffffff"
                />
              </svg>
            </button>

            {/* Telegram */}
            <button
              type="button"
              onClick={() => loginWithSocial('telegram')}
              disabled={isLoading}
              className="w-14 h-11 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all shadow-2xs hover:border-slate-300 cursor-pointer"
              title="Sign in with Telegram"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="11" fill="#229ED9" />
                <path
                  d="M17.5 7L5.5 11.5l3.5 1.5 1.5 4.5 2-2 3.5 2.5 1.5-10.5z"
                  fill="#ffffff"
                />
              </svg>
            </button>

            {/* Google */}
            <button
              type="button"
              onClick={() => loginWithSocial('google')}
              disabled={isLoading}
              className="w-14 h-11 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all shadow-2xs hover:border-slate-300 cursor-pointer"
              title="Sign in with Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.9c2.28-2.1 3.64-5.2 3.64-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.73-2.1-6.67-4.93H1.28v3.13C3.25 21.3 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.33 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.6H1.28C.46 8.23 0 10.06 0 12s.46 3.77 1.28 5.4l4.05-3.13z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.7 1.28 6.6l4.05 3.13c.94-2.83 3.57-4.98 6.67-4.98z"
                />
              </svg>
            </button>
          </div>

          {/* Terms & Agreement Disclaimer */}
          <p className="text-center text-[11px] text-slate-600 leading-snug pt-2 px-1">
            By ordering, You have Read and Agreement to Our{' '}
            <button
              type="button"
              onClick={onShowTerms}
              className="text-primary underline font-medium cursor-pointer"
            >
              Terms of Use
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={onShowPrivacy}
              className="text-primary underline font-medium cursor-pointer"
            >
              Privacy Policy
            </button>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-red-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>

          {/* Sign as Guest Button */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={loginAsGuest}
              disabled={isLoading}
              className="text-sm font-medium text-slate-800 hover:text-primary underline underline-offset-4 cursor-pointer transition-colors"
            >
              Sign as Guest
            </button>
          </div>
        </form>

        {/* Bottom Branding Footer */}
        <div className="relative pt-6 mt-4 text-center border-t border-slate-100 flex items-center justify-center gap-1">
          <span className="text-[11px] text-slate-500 font-medium">Powered By</span>
          <span className="font-serif italic text-primary font-bold text-xs">Hush Lush</span>
        </div>
      </div>
    </div>
  );
};
