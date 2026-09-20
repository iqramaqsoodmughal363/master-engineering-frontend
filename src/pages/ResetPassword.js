import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'https://master-engineering-api.vercel.app';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to reset your password.');
      toast.success('Password reset successful.');
      navigate('/login');
    } catch (error) {
      setErrorMsg(error.message || 'Unable to reset your password.');
      toast.error(error.message || 'Unable to reset your password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex items-center justify-center py-16 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLock className="text-2xl text-secondary" />
          </div>
          <h1 className="text-3xl font-extrabold text-primary">Set New Password</h1>
          <p className="text-gray-500 text-sm mt-2">Choose a new password for your account.</p>
        </div>

        {errorMsg && <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg text-center" role="alert">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength="6"
            autoComplete="new-password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength="6"
            autoComplete="new-password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
          <button type="submit" disabled={isSubmitting} className="w-full bg-secondary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
            {isSubmitting ? 'Updating...' : <>Update Password <FaArrowRight className="text-sm" /></>}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          <Link to="/login" className="text-secondary font-semibold hover:underline">Back to Sign In</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
