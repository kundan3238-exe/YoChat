import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Github, Globe } from 'lucide-react';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Client-side UI error & loading states
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Client-side basic validation (UX validation only, no API or mock authentication)
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    // Interactive button state simulation for UI polish
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setError('Authentication is disabled in presentation mode.');
    }, 1200);
  };
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-[#09090b] text-[#f4f4f5] overflow-hidden select-none font-sans">
      
      {/* 1. Grid Background Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-30" 
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      {/* 2. Soft Blurred Flowing Gradient Blobs (Ambient Lights) */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none animate-float-slow z-0" />
      <div className="absolute bottom-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-sky-600/10 blur-[130px] pointer-events-none animate-float-medium z-0" />
      <div className="absolute top-[35%] left-[40%] w-[35vw] h-[35vw] rounded-full bg-indigo-600/5 blur-[100px] pointer-events-none animate-float-fast z-0" />
      {/* 3. Outer Interactive Container */}
      <div className="w-full max-w-[460px] z-10 animate-fade-in py-8">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-500 shadow-lg shadow-cyan-500/20 mb-3 group transition-transform duration-300 hover:scale-105">
            {/* Double ring light glow on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <svg 
              className="w-6 h-6 text-zinc-950 relative z-10" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m8 9 3 3-3 3" />
              <path d="M16 18h.01" />
              <rect width="20" height="20" x="2" y="2" rx="5" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-extrabold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400">
            YoChat
          </h1>
          <p className="text-sm text-zinc-500 mt-1 font-medium tracking-wide">
            Designed for high-performance teams
          </p>
        </div>
        {/* 4. Glassmorphic Login Card */}
        <div className="glass-card rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-zinc-800/80 p-8 md:p-10 transition-all duration-300 hover:border-zinc-700/60 relative overflow-hidden group">
          
          {/* Subtle top reflection line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-display text-white tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Enter your details to sign in to your workspace.
            </p>
          </div>
          {/* Form wrapper */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="email" 
                className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="h-4.5 w-4.5 transition-colors duration-200 group-focus-within:text-cyan-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none"
                  placeholder="name@company.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="password" 
                  className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block"
                >
                  Password
                </label>
                <a 
                  href="#forgot" 
                  onClick={(e) => e.preventDefault()} 
                  className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors focus:outline-none focus:underline"
                >
                  Forgot Password?
                </a>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  className="glass-input w-full pl-10 pr-11 py-2.5 rounded-xl text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                
                {/* Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 focus:outline-none transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
            </div>
            {/* Remember Me */}
            <div className="flex items-center">
              <label className="relative flex items-center cursor-pointer select-none text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 rounded border border-zinc-700 bg-zinc-950/60 peer-checked:bg-cyan-500 peer-checked:border-cyan-400 transition-all flex items-center justify-center mr-2 peer-focus:ring-2 peer-focus:ring-cyan-500/30">
                  <svg 
                    className="w-2.5 h-2.5 text-zinc-950 font-bold opacity-0 peer-checked:opacity-100 transition-opacity" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="3.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                Remember this device
              </label>
            </div>
            {/* Error Message Section */}
            {error && (
              <div 
                className="flex items-start gap-2.5 p-3 rounded-lg border border-red-950/40 bg-red-950/20 text-red-400 text-xs font-medium animate-shake"
                role="alert"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full overflow-hidden inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-zinc-950 font-semibold text-sm py-2.5 rounded-xl shadow-[0_4px_20px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.45)] focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 transform active:scale-[0.98] outline-none cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-zinc-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1.5 w-full">
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              )}
            </button>
          </form>
          {/* 5. Divider with Enterprise note */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-zinc-800/80"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-semibold">
              <span className="bg-[#0f172a]/80 px-2.5 text-zinc-500 flex items-center gap-1 backdrop-blur-sm">
                <ShieldCheck className="h-3 w-3 text-cyan-500/60" /> SECURE DISPATCH
              </span>
            </div>
          </div>
          {/* Social SSO Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-zinc-800/70 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/60 transition-all duration-200 text-sm text-zinc-300 hover:text-white cursor-pointer focus:ring-1 focus:ring-zinc-700/50"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-zinc-800/70 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/60 transition-all duration-200 text-sm text-zinc-300 hover:text-white cursor-pointer focus:ring-1 focus:ring-zinc-700/50"
            >
              <Globe className="h-4 w-4" />
              <span>SSO Gate</span>
            </button>
          </div>
          {/* Footer - Sign up */}
          <div className="text-center">
            <p className="text-xs text-zinc-400">
              Don't have an account?{' '}
              <a 
                href="#register" 
                onClick={(e) => e.preventDefault()} 
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-all hover:underline"
              >
                Create Workspace
              </a>
            </p>
          </div>
        </div>
        {/* Subtle decorative bottom link & system metadata */}
        <div className="flex items-center justify-between px-2 mt-4 text-[10px] text-zinc-600 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            YoChat Cloud: Connected
          </span>
          <span>v1.0.4-prod</span>
        </div>
      </div>
    </div>
  );
}
export default Login;
