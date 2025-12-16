import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

interface OTPScreenProps {
  phone: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
  isLoading: boolean;
}

const OTPScreen: React.FC<OTPScreenProps> = ({ phone, onVerify, onBack, isLoading }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length === 6) {
      onVerify(fullOtp);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white animate-in slide-in-from-right duration-300">
      <button 
        onClick={onBack}
        className="self-start p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 mb-4"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="flex-1 flex flex-col items-center max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Verify Account</h1>
        <p className="text-slate-500 text-center mb-8">
          We sent a code to <span className="font-bold text-slate-900">+91 {phone}</span>
        </p>

        <div className="flex gap-2 justify-between w-full mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-12 h-14 text-center text-2xl font-bold rounded-lg border-2 outline-none transition-all ${
                digit 
                  ? 'border-blue-600 bg-blue-50 text-blue-600' 
                  : 'border-slate-200 bg-white text-slate-900 focus:border-blue-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={otp.join('').length < 6 || isLoading}
          className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-xl shadow-slate-200 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:transform-none transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>Verifying <Loader2 className="animate-spin" /></>
          ) : (
            <>Verify & Proceed <CheckCircle2 size={20} /></>
          )}
        </button>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">Didn't receive code?</p>
          <button className="text-blue-600 font-bold text-sm mt-1 hover:underline">
            Resend in 0:24
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPScreen;