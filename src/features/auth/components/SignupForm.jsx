import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, AtSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';
import { Input, Button } from '../../../shared/components/ui';
import GoogleAuthButton from './GoogleAuthButton';

export default function SignupForm({ onSuccess, onToggleMode, googleRedirectTo }) {
  const navigate = useNavigate();
  const { signup, googleLogin, isLoading, error: authError } = useAuthStore();

  // Form local states
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  // Field validation errors
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    const tempErrors = {};
    if (!fullName.trim()) {
      tempErrors.fullName = 'Full Name is required';
    }
    
    if (!username.trim()) {
      tempErrors.username = 'Username is required';
    } else if (username.trim().length < 3) {
      tempErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
      tempErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters';
    }

    if (!agreed) {
      tempErrors.agreed = 'You must agree to the Terms of Service';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    const success = await signup(fullName, username, email, password);
    if (success) {
      if (onSuccess) {
        onSuccess();
      } else {
        // Redirect successfully authenticated users directly to explore!
        navigate('/explore');
      }
    }
  };

  const handleGoogleAuth = async () => {
    await googleLogin(googleRedirectTo);
  };

  return (
    <div className="w-full max-w-[32rem] mx-auto">
      {/* Form Headline Header */}
      <div className="text-left mb-6">
        <h2 className="text-2xl font-poppins font-extrabold text-brand-900 leading-tight mb-1.5 flex items-center gap-2">
          <span>Create Your Account</span>
          <svg className="w-5 h-5 text-brand-500 fill-brand-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2C6.5 2 2 6.5 2 12C2 14.5 3 16.8 4.7 18.5L2 22L5.5 19.3C7.2 21 9.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" />
            <path d="M12 8C9.8 8 8 9.8 8 12C8 13.5 8.8 14.8 10 15.5" />
          </svg>
        </h2>
        <p className="text-text-secondary text-xs md:text-sm font-inter">
          Join Neargrab and explore your neighborhood.
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
        {/* Full Name input */}
        <Input
          label="Full Name"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          error={errors.fullName}
          required
          leftElement={<User className="w-4 h-4 text-text-muted" />}
        />

        {/* Username input */}
        <Input
          label="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
          placeholder="Choose a unique username"
          error={errors.username}
          required
          leftElement={<AtSign className="w-4 h-4 text-text-muted" />}
        />

        {/* Email Address */}
        <Input
          label="Email Address"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          error={errors.email}
          required
          leftElement={<Mail className="w-4 h-4 text-text-muted" />}
        />

        {/* Password */}
        <Input
          label="Password"
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a strong password"
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

        {/* Checkbox: terms agreement */}
        <div className="flex flex-col gap-1 mt-1 text-left">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-brand-900 bg-neutral-50 border-neutral-300 focus:ring-brand-500"
            />
            <span className="text-[10px] md:text-xs font-medium text-text-secondary leading-tight font-inter">
              I agree to the{' '}
              <Link to="/terms" className="text-brand-500 font-semibold hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-brand-500 font-semibold hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreed && (
            <p className="text-[10px] text-red-500 font-medium font-inter">{errors.agreed}</p>
          )}
        </div>

        {/* Submit signup button */}
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full mt-2 bg-[#0B3B2C] hover:bg-[#082a20] text-white py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs md:text-sm font-bold tracking-wide shadow-md"
        >
          <span>Create Account</span>
        </Button>
      </form>

      {/* Redirection trigger link */}
      <div className="mt-5 text-center">
        <p className="text-xs font-medium text-text-secondary font-inter">
          Already have an account?{' '}
          {onToggleMode ? (
            <button
              type="button"
              onClick={onToggleMode}
              className="text-brand-500 hover:text-brand-700 font-extrabold hover:underline inline-flex items-center gap-1 transition-all cursor-pointer bg-transparent border-none p-0 align-baseline"
            >
              <span>Log in</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Link
              to="/login"
              className="text-brand-500 hover:text-brand-700 font-extrabold hover:underline inline-flex items-center gap-1 transition-all"
            >
              <span>Log in</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </p>
      </div>

      {/* Safety reassurance badge footer */}
      <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-text-muted text-[10px] md:text-xs font-semibold font-inter">
        <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0" />
        <span>Your data is safe and secure with us.</span>
      </div>
    </div>
  );
}
