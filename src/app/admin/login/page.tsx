"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Admin Login Page
 * 
 * Features:
 * - Dark theme with gold accents (#E9C349)
 * - Framer Motion animations
 * - Lucide icons for UI feedback
 * - Handles authentication via /api/auth/login
 * - Redirects to /admin on successful session authorization
 */
export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
      } else {
        setError("Invalid credentials. Access denied.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.98)),url('/backgroundPicHero.png')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-full flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#E9C349]/10 rounded-full flex items-center justify-center mb-4 border border-[#E9C349]/20">
              <ShieldCheck className="w-8 h-8 text-[#E9C349]" />
            </div>
            <h1 className="text-2xl font-black uppercase italic tracking-tighter text-white">
              Admin <span className="text-[#E9C349]">Login</span>
            </h1>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1 text-center">
              Restricted Backoffice Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-2">
                <User className="w-3 h-3 text-[#E9C349]" /> Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-white/10 focus:border-[#E9C349] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-700"
                placeholder="Enter admin username"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-2">
                <Lock className="w-3 h-3 text-[#E9C349]" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 focus:border-[#E9C349] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-700"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-xs font-bold text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E9C349] hover:bg-[#FFF9D2] disabled:opacity-50 disabled:cursor-not-allowed text-black font-black uppercase italic tracking-widest py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(233,195,73,0.15)] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                "Authorize Session"
              )}
            </button>
          </form>

          {/* Footer Branding */}
          <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
            <div className="flex items-center gap-2 text-[9px] font-mono text-gray-600">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              STATUS: ENCRYPTED_CONNECTION
            </div>
          </div>
        </div>
        
        {/* Decorative Glow Aura */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#E9C349]/5 blur-[80px] rounded-full pointer-events-none" />
      </motion.div>
    </main>
  );
}
