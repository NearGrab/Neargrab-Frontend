import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';
import { Input, Button } from '../../../shared/components/ui';
import GoogleAuthButton from './GoogleAuthButton';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, googleLogin, isLoading, error: authError } = useAuthStore();

  // Form local states
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Field validation errors
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    const tempErrors = {};
    if (!usernameOrEmail.trim()) {
      tempErrors.usernameOrEmail = 'Username or Email is required';
    }
    if (!password) {
      tempErrors.password = 'Password is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    const success = await login(usernameOrEmail, password);
    if (success) {
      // Redirect successfully authenticated users directly to explore!
      navigate('/explore');
    }
  };

  const handleGoogleAuth = async () => {
    await googleLogin();
  };

  return (
    <div className="w-full max-w-[32rem] mx-auto">
      {/* Form Headline Header */}
      <div className="text-left mb-6">
        <h2 className="text-2xl font-poppins font-extrabold text-brand-900 leading-tight mb-1.5 flex items-center gap-2">
          <span>Welcome Back!</span>
          <span className="animate-bounce inline-block">👋</span>
        </h2>
        <p className="text-text-secondary text-xs md:text-sm font-inter">
          Log in to continue exploring local shops near you.
        </p>
      </div>

      {/* Social Google OAuth trigger */}
      <GoogleAuthButton onClick={handleGoogleAuth} disabled={isLoading} />

      {/* Aesthetic OR horizontal separators */}
      <div className="flex items-center my-5">
        <div className="flex-grow h-px bg-neutral-200"></div>
        <span className="px-4 text-[11px] font-bold text-text-muted uppercase font-poppins">or</span>
        <div className="flex-grow h-px bg-neutral-200"></div>
      </div>

      {/* Auth Errors message block */}
      {authError && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-left text-xs font-semibold text-red-600 font-inter">
          {authError}
        </div>
      )}

      {/* Core input fields */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
        {/* Username or Email input */}
        <Input
          label="Username or Email"
          id="usernameOrEmail"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          placeholder="Enter your username or email"
          error={errors.usernameOrEmail}
          required
          leftElement={<User className="w-4 h-4 text-text-muted" />}
        />

        {/* Password input */}
        <Input
          label="Password"
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          error={errors.password}
          required
          leftElement={<Lock className="w-4 h-4 text-text-muted" />}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-text-muted hover:text-brand-900 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        {/* Row: Remember Me & Forgot Password hyperlink */}
        <div className="flex items-center justify-between text-left mt-1 text-[11px] md:text-xs select-none">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-brand-900 bg-neutral-50 border-neutral-300 focus:ring-brand-500"
            />
            <span className="font-medium text-text-secondary font-inter">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-brand-500 font-bold hover:text-brand-700 hover:underline transition-colors font-inter"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit login button */}
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full mt-2 bg-[#0B3B2C] hover:bg-[#082a20] text-white py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs md:text-sm font-bold tracking-wide shadow-md"
          rightIcon={<ArrowRight className="w-4 h-4 text-white" />}
        >
          <span>Log In</span>
        </Button>
      </form>

      {/* Verification info safety box inside soft green bg */}
      <div className="mt-6 p-3 bg-[#E6F4EA]/40 rounded-xl border border-brand-100/30 flex items-center justify-center gap-2 text-brand-900 text-[10px] md:text-xs font-semibold font-inter">
        <ShieldCheck className="w-4.5 h-4.5 text-brand-900 shrink-0" />
        <span>Your data is safe and secure with us.</span>
      </div>

      {/* Redirection trigger link */}
      <div className="mt-6 text-center">
        <p className="text-xs font-medium text-text-secondary font-inter">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-brand-500 hover:text-brand-700 font-extrabold hover:underline inline-flex items-center gap-1 transition-all"
          >
            <span>Sign up</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}
