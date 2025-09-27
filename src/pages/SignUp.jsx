// src/components/SignupPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaCheck, FaShieldAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const emailRef = useRef(null);

  // Auto-focus on email field
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleClose = () => {
    navigate("/");
  };

  // Password strength calculation
  useEffect(() => {
    const calculateStrength = (password) => {
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
      if (password.match(/\d/)) strength += 25;
      if (password.match(/[^a-zA-Z\d]/)) strength += 25;
      return strength;
    };

    setPasswordStrength(calculateStrength(formData.password));
  }, [formData.password]);

  // Form validation
  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (currentStep === 2) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (!formData.acceptTerms) {
        newErrors.acceptTerms = "Please accept the terms and conditions";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate("/chat");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/chat");
    }, 1500);
  };

  const benefits = [
    "Access to 50K+ global ARGO floats",
    "AI-powered data conversations", 
    "Real-time ocean insights",
    "Publication-ready visualizations"
  ];

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "bg-red-400";
    if (passwordStrength < 75) return "bg-yellow-400";
    return "bg-green-400";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Weak";
    if (passwordStrength < 50) return "Fair";
    if (passwordStrength < 75) return "Good";
    return "Strong";
  };

  return (
    // FIXED: Force full viewport width and height
    <div className="fixed inset-0 w-screen h-screen flex bg-gradient-to-br from-gray-900 via-slate-900 to-black overflow-hidden">
      {/* Background Effects - FIXED: Cover entire viewport */}
      <div aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl animate-pulse" />
      </div>

      {/* Left Side - Benefits */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-8 xl:p-12">
        <div className="max-w-lg w-full">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                🌊
              </div>
              <h1 className="text-3xl font-bold text-white">ARGO FloatChat</h1>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Transform Ocean Data into <span className="text-cyan-400">Intelligence</span>
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Join thousands of researchers using AI to unlock insights from global oceanographic data.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-gray-300"
              >
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <FaCheck className="w-3 h-3 text-cyan-400" />
                </div>
                {benefit}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="w-4 h-4 text-green-400" />
              Enterprise Security
            </div>
            <div className="flex items-center gap-2">
              <HiSparkles className="w-4 h-4 text-cyan-400" />
              AI-Powered
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 relative overflow-y-auto">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 lg:p-8 my-4"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 z-10"
              aria-label="Close signup form"
            >
              <IoClose size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              {/* Mobile logo */}
              <div className="lg:hidden mb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white">
                    🌊
                  </div>
                  <span className="text-xl font-bold text-white">ARGO FloatChat</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                {step === 1 ? "Create your account" : "Secure your account"}
              </h2>
              
              <p className="text-gray-300">
                {step === 1 
                  ? "Join the future of ocean research" 
                  : "Choose a strong password to protect your data"
                }
              </p>

              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className={`w-8 h-2 rounded-full transition-colors ${
                  step >= 1 ? 'bg-cyan-400' : 'bg-gray-600'
                }`} />
                <div className={`w-8 h-2 rounded-full transition-colors ${
                  step >= 2 ? 'bg-cyan-400' : 'bg-gray-600'
                }`} />
              </div>
            </div>

            {/* Social Login (Step 1 only) */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 mb-6"
                >
                  <button
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl 
                             bg-white text-gray-900 hover:bg-gray-50 font-medium
                             transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaGoogle className="w-5 h-5" />
                    Continue with Google
                  </button>

                  <button
                    onClick={() => handleSocialLogin('github')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl 
                             bg-gray-800 text-white hover:bg-gray-700 font-medium border border-gray-600
                             transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaGithub className="w-5 h-5" />
                    Continue with GitHub
                  </button>

                  {/* Divider */}
                  <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-600"></div>
                    <span className="mx-4 text-gray-400 text-sm">or continue with email</span>
                    <div className="flex-1 h-px bg-gray-600"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        ref={emailRef}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-gray-400 
                                   focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.email 
                            ? 'border-red-500 focus:ring-red-500/50' 
                            : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/50'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !formData.email}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 
                               text-white font-semibold hover:from-cyan-400 hover:to-blue-500
                               transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                               flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Continue
                          <HiLightningBolt className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Create a strong password"
                          className={`w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border text-white placeholder-gray-400 
                                     focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.password 
                              ? 'border-red-500 focus:ring-red-500/50' 
                              : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/50'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                        </button>
                      </div>
                      
                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-400">Password strength</span>
                            <span className={`font-medium ${
                              passwordStrength < 50 ? 'text-red-400' : 
                              passwordStrength < 75 ? 'text-yellow-400' : 'text-green-400'
                            }`}>
                              {getPasswordStrengthText()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                              style={{ width: `${passwordStrength}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {errors.password && (
                        <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-gray-400 
                                   focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.confirmPassword 
                            ? 'border-red-500 focus:ring-red-500/50' 
                            : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/50'
                        }`}
                      />
                      {errors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-400">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Terms Acceptance */}
                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-cyan-600 bg-white/10 border-white/20 rounded 
                                 focus:ring-cyan-500 focus:ring-2"
                      />
                      <label htmlFor="acceptTerms" className="text-sm text-gray-300 leading-relaxed">
                        I agree to the{" "}
                        <Link to="/terms" className="text-cyan-400 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-cyan-400 hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {errors.acceptTerms && (
                      <p className="text-sm text-red-400">{errors.acceptTerms}</p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 py-3 px-4 rounded-xl bg-white/10 border border-white/20 
                                 text-white font-medium hover:bg-white/20 transition-all duration-200"
                      >
                        Back
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isLoading || !formData.password || !formData.confirmPassword || !formData.acceptTerms}
                        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 
                                 text-white font-semibold hover:from-cyan-400 hover:to-blue-500
                                 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
                                 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Create Account
                            <HiSparkles className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6 pt-6 border-t border-white/10">
              <p className="text-gray-300">
                Already have an account?{" "}
                <Link to="/login" className="text-cyan-400 font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
