/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setLoginSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50 blur-3xl opacity-60" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-3xl opacity-60" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[440px] relative"
      >
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          {/* Header Section */}
          <div className="px-8 pt-10 pb-6 text-center">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-600 text-white mb-6 shadow-lg shadow-indigo-200"
            >
              <ShieldCheck size={32} />
            </motion.div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Chào mừng trở lại</h1>
            <p className="text-slate-500 mt-2 text-sm">Đăng nhập vào hệ thống quản trị của bạn</p>
          </div>

          {/* Form Section */}
          <div className="px-8 pb-10">
            <AnimatePresence mode="wait">
              {!loginSuccess ? (
                <motion.form 
                  key="login-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                >
                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 ml-1">Email</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`w-full pl-11 pr-4 py-3 bg-slate-50 border ${errors.email ? 'border-red-300 focus:ring-red-100' : 'border-slate-200 focus:ring-indigo-100'} rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:border-indigo-500 transition-all duration-200`}
                        placeholder="admin@company.com"
                      />
                    </div>
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs font-medium text-red-500 flex items-center gap-1 mt-1 ml-1"
                      >
                        <AlertCircle size={12} /> {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-sm font-medium text-slate-700">Mật khẩu</label>
                      <button type="button" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                        Quên mật khẩu?
                      </button>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <Lock size={18} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors({ ...errors, password: undefined });
                        }}
                        className={`w-full pl-11 pr-12 py-3 bg-slate-50 border ${errors.password ? 'border-red-300 focus:ring-red-100' : 'border-slate-200 focus:ring-indigo-100'} rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:border-indigo-500 transition-all duration-200`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs font-medium text-red-500 flex items-center gap-1 mt-1 ml-1"
                      >
                        <AlertCircle size={12} /> {errors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center gap-2 ml-1">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer select-none">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Đăng nhập
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={32} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Đăng nhập thành công!</h2>
                  <p className="text-slate-500 mt-2">Đang chuyển hướng đến trang dashboard...</p>
                  <button 
                    onClick={() => setLoginSuccess(false)}
                    className="mt-6 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Quay lại trang đăng nhập
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Section */}
          <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Chưa có tài khoản?{" "}
              <button className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Yêu cầu quyền truy cập
              </button>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-slate-400 text-xs mt-8">
          &copy; 2026 Admin Dashboard System. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
