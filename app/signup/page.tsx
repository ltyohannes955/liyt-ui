"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { registerUser, clearError } from "@/lib/features/auth/authSlice";

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  // Clear Redux error on mount only
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    const result = await dispatch(registerUser({
      email: formData.email,
      password: formData.password,
      businessName: formData.company,
    }));

    if (registerUser.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#E4FF2C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#E4FF2C]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="LIYT"
              width={140}
              height={56}
              className="h-14 w-auto mx-auto"
              priority
            />
          </Link>
        </div>

        {/* Signup Card */}
        <div className="bg-[#141414] border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
            <p className="text-white/50">Join thousands of logistics professionals</p>
          </div>

          {(error || validationError) && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm">{error || validationError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name - Kept in UI but optional (not sent to backend yet) */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">
                Full Name <span className="text-white/30">(Optional)</span>
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  disabled={isLoading}
                  className="pl-12 bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30 h-12 focus:border-[#E4FF2C] focus:ring-[#E4FF2C]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email Address <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  disabled={isLoading}
                  className="pl-12 bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30 h-12 focus:border-[#E4FF2C] focus:ring-[#E4FF2C]"
                />
              </div>
            </div>

            {/* Company/Business - Required by backend */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-white">
                Company / Business Name <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <Input
                  id="company"
                  type="text"
                  placeholder="Your business name"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  required
                  disabled={isLoading}
                  className="pl-12 bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30 h-12 focus:border-[#E4FF2C] focus:ring-[#E4FF2C]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  disabled={isLoading}
                  minLength={6}
                  className="pl-12 pr-12 bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30 h-12 focus:border-[#E4FF2C] focus:ring-[#E4FF2C]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-white/30 text-xs">
                Must be at least 6 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                  disabled={isLoading}
                  className={`pl-12 pr-12 bg-[#1a1a1a] text-white placeholder:text-white/30 h-12 focus:ring-[#E4FF2C] ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-500 focus:border-red-500'
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-white/10 focus:border-[#E4FF2C]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && (
                <p className={`text-xs ${
                  formData.password === formData.confirmPassword 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}>
                  {formData.password === formData.confirmPassword 
                    ? 'Passwords match' 
                    : 'Passwords do not match'}
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreeTerms: checked as boolean })
                }
                required
                disabled={isLoading}
                className="mt-1 border-white/20 data-[state=checked]:bg-[#E4FF2C] data-[state=checked]:border-[#E4FF2C]"
              />
              <Label
                htmlFor="terms"
                className="text-white/70 text-sm leading-relaxed cursor-pointer"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-[#E4FF2C] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#E4FF2C] hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !formData.agreeTerms}
              className="w-full bg-[#E4FF2C] text-[#0a0a0a] hover:bg-[#E4FF2C]/90 font-bold h-12 rounded-xl disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <Separator className="bg-white/10" />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#141414] px-4 text-white/50 text-sm">
              or sign up with
            </span>
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              className="bg-transparent border-white/10 text-white hover:bg-white/5 h-12 px-4 py-3 rounded-xl"
            >
              <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="whitespace-nowrap">Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              className="bg-transparent border-white/10 text-white hover:bg-white/5 h-12 px-4 py-3 rounded-xl"
            >
              <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="whitespace-nowrap">GitHub</span>
            </Button>
          </div>

          {/* Login Link */}
          <p className="text-center mt-8 text-white/50">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#E4FF2C] hover:text-[#E4FF2C]/80 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <p className="text-center mt-8 text-white/30 text-sm">
          <Link href="/" className="hover:text-white/50 transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
