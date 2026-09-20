import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { requestPasswordReset } from '../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await requestPasswordReset(email.trim());
      setIsSent(true);
      toast.success('Password reset link sent to your email.');
    } catch (error) {
      const message = error.message || 'Unable to send the reset link. Please try again.';
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[80vh] flex items-center justify-center py-16 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto p-8 border border-gray-100"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-2xl text-secondary" />
            </div>
            <h1 className="text-3xl font-extrabold text-primary">Forgot Password?</h1>
            <p className="text-gray-500 text-sm mt-2">
              Enter your email and we will send you a secure password reset link.
            </p>
          </div>

          {isSent ? (
            <div className="text-center" role="status">
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                Password reset link sent to your email. Please check your inbox.
              </div>
              <Link
                to="/login"
                className="mt-6 inline-flex items-center justify-center gap-2 text-secondary font-semibold hover:underline"
              >
                <FaArrowLeft className="text-sm" />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg text-center" role="alert">
                  {errorMsg}
                </div>
              )}

              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    id="reset-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : <>Send Reset Link <FaArrowRight className="text-sm" /></>}
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm text-secondary font-semibold hover:underline">
                  <FaArrowLeft className="text-xs" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
