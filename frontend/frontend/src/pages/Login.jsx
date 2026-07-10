import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Eye, EyeOff, ArrowRight, Apple } from "lucide-react";

/**
 * LoginPage
 * Companion to SignupPage — same illustrated dusk-dune scene on the left,
 * a sign-in form on the right, both wrapped in one rounded card.
 */
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [activeDot, setActiveDot] = useState(0);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      setIsSubmitting(true);
      await login(formData);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0E0C14] flex items-center justify-center p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Sora', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="w-full max-w-[1050px] bg-[#17141F] rounded-[28px] overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-black/40 border border-white/[0.06]">
        {/* Left panel — illustrated scene */}
        <div className="relative lg:w-[46%] min-h-[300px] lg:min-h-[640px] p-6 flex flex-col">
          <div className="relative flex-1 rounded-[20px] overflow-hidden">
            {/* sky gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#2B2560] via-[#4B3E86] to-[#7C6BB8]" />
            {/* distant sun/star */}
            <div className="absolute top-[14%] left-[26%] w-2 h-2 rounded-full bg-[#FF6B5E] shadow-[0_0_12px_4px_rgba(255,107,94,0.5)]" />
            {/* soft haze band */}
            <div className="absolute inset-x-0 top-[38%] h-24 bg-gradient-to-b from-white/[0.06] to-transparent blur-md" />

            {/* dune layers */}
            <svg
              className="absolute bottom-0 left-0 w-full"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <path
                d="M0,150 C60,110 140,170 200,140 C270,105 330,150 400,120 L400,300 L0,300 Z"
                fill="#5C4E8C"
                opacity="0.55"
              />
              <path
                d="M0,200 C80,160 150,210 230,175 C300,145 350,190 400,165 L400,300 L0,300 Z"
                fill="#332B54"
                opacity="0.85"
              />
              <path
                d="M0,240 C70,200 160,255 240,220 C310,192 360,230 400,210 L400,300 L0,300 Z"
                fill="#1A1530"
              />
            </svg>

            {/* logo */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-sm bg-white" />
              </div>
              <span className="font-display text-white text-[15px] font-semibold tracking-wide">
                YoChat
              </span>
            </div>

            {/* back to website pill */}
            <button className="font-body absolute top-6 right-6 flex items-center gap-1.5 bg-white/10 hover:bg-white/[0.16] backdrop-blur-sm text-white text-xs font-medium px-3.5 py-2 rounded-full transition-colors">
              Back to website
              <ArrowRight size={13} />
            </button>

            {/* caption */}
            <div className="absolute bottom-8 left-7 right-7">
              <h2 className="font-display text-white text-[26px] leading-snug font-semibold mb-5">
                Welcome back to
                <br />
                YoChat....
              </h2>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDot(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      activeDot === i ? "w-6 bg-white" : "w-2.5 bg-white/35"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex-1 px-8 sm:px-12 py-10 lg:py-14 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="font-display text-white text-[32px] font-semibold mb-2">
              Sign in to your account
            </h1>
            <p className="font-body text-sm text-[#8B8798] mb-8">
              Don't have an account?{" "}
              <Link
                to="/"
                className="text-[#B9A8F5] hover:text-white underline underline-offset-2 transition-colors"
              >
                Sign up
              </Link>
            </p>

            <form className="space-y-3.5" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="font-body w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#6E6A7C] outline-none transition-colors focus:border-[#8A73E8]/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#8A73E8]/15"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="font-body w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder:text-[#6E6A7C] outline-none transition-colors focus:border-[#8A73E8]/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#8A73E8]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6E6A7C] hover:text-[#B9A8F5] transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="peer sr-only"
                  />
                  <span className="w-[18px] h-[18px] rounded-md border border-white/20 bg-white/[0.05] flex items-center justify-center peer-checked:bg-[#8A73E8] peer-checked:border-[#8A73E8] transition-colors shrink-0">
                    <svg
                      viewBox="0 0 12 12"
                      className="w-2.5 h-2.5"
                      style={{ opacity: remember ? 1 : 0 }}
                    >
                      <path
                        d="M2 6l2.5 2.5L10 3"
                        fill="none"
                        stroke="#17141F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-body text-sm text-[#8B8798]">
                    Remember me
                  </span>
                </label>

                <a
                  href="#"
                  className="font-body text-sm text-[#B9A8F5] hover:text-white underline underline-offset-2 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {error && (
                <p className="text-red-400 text-sm font-body">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="font-body w-full mt-2 bg-[#7C5CFC] hover:bg-[#8E71FD] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl py-3.5 transition-colors"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-7">
              <div className="h-px flex-1 bg-white/[0.08]" />
              <span className="font-body text-xs text-[#6E6A7C] whitespace-nowrap">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-white/[0.08]" />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <button className="font-body flex items-center justify-center gap-2 border border-white/[0.1] rounded-xl py-3 text-sm text-white hover:bg-white/[0.05] transition-colors">
                <svg width="16" height="16" viewBox="0 0 48 48">
                  <path
                    fill="#FFC107"
                    d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6c-2 1.5-4.6 2.4-7.7 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.6 5.6C41.7 36 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"
                  />
                </svg>
                Google
              </button>
              <button className="font-body flex items-center justify-center gap-2 border border-white/[0.1] rounded-xl py-3 text-sm text-white hover:bg-white/[0.05] transition-colors">
                <Apple size={16} className="fill-white" />
                Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
