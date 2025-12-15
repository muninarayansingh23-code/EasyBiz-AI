import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { user, loading: authLoading, login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit number');
      return;
    }

    setIsSubmitting(true);
    
    // MOCK OTP REQUEST (Phase 1 Requirement)
    // We simulate the network delay and success to avoid Firebase Phone Auth configuration issues at this stage.
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      console.log("Mock OTP Sent: Use 123456");
    }, 1000);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (otp.length !== 6) return;

    setIsSubmitting(true);

    try {
      // MOCK OTP VERIFICATION
      if (otp === '123456') {
        // Authenticate using the Context (which uses Anonymous Auth for Phase 1)
        await login(`+91${phone}`);
        // Redirect handled by useEffect
      } else {
        throw new Error('Invalid OTP. Please enter 123456.');
      }
    } catch (err: any) {
      console.error("OTP Verification Error:", err);
      setIsSubmitting(false);
      setError(err.message || 'Verification failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative">
        
        <div className="p-8 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="h-14 w-14 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
              <span className="text-white font-bold text-2xl">EB</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">
            EazyBiz AI
          </h1>
          <p className="text-center text-slate-500 mb-8 text-sm font-medium">
            Smart Growth OS for Real Estate
          </p>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3 animate-in slide-in-from-top-2">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-red-700 break-words">{error}</p>
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handleGetOtp} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                  Enter Mobile Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none bg-slate-50 rounded-l-lg border-r border-slate-200">
                    <span className="text-slate-600 font-bold">+91</span>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="block w-full pl-16 pr-4 py-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-medium tracking-wide transition-all outline-none bg-slate-50 focus:bg-white"
                    placeholder="98765 43210"
                    maxLength={10}
                    required
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2 text-center">
                    Development Mode: OTP will be simulated.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || phone.length < 10}
                className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-200 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Get OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="otp" className="block text-sm font-medium text-slate-700">
                    Verification Code
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setStep('phone')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-500 uppercase tracking-wide"
                  >
                    Change
                  </button>
                </div>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="block w-full text-center py-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-3xl tracking-[0.5em] font-bold transition-all outline-none bg-slate-50 focus:bg-white"
                  placeholder="123456"
                  maxLength={6}
                  required
                  autoFocus
                />
                <p className="text-xs text-slate-400 mt-2 text-center">
                    Hint: Use code <b>123456</b>
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otp.length < 6}
                className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-200 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : (
                  <span className="flex items-center">
                    Verify & Login <ArrowRight size={18} className="ml-2" />
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;