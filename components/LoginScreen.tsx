import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Smartphone, Loader2, AlertCircle } from 'lucide-react';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface LoginScreenProps {
  onGetOtp: (phone: string, verifier: RecaptchaVerifier | null) => void;
  isLoading: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onGetOtp, isLoading }) => {
  const [phone, setPhone] = useState('');
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const verifierRef = useRef<RecaptchaVerifier | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Recaptcha with React 18 safety
  useEffect(() => {
    let mounted = true;

    const initRecaptcha = async () => {
      if (!containerRef.current || verifierRef.current) return;

      try {
        containerRef.current.innerHTML = ''; // Clear previous instances
        
        const verifier = new RecaptchaVerifier(auth, containerRef.current, {
          'size': 'invisible',
          'callback': () => {
             console.log("Recaptcha verified");
             if (mounted) setError(null);
          },
          'expired-callback': () => {
             if(mounted) {
               setIsRecaptchaReady(false);
               setError("Security check expired. Refresh page.");
             }
          }
        });

        await verifier.render();
        if (mounted) {
            verifierRef.current = verifier;
            setIsRecaptchaReady(true);
        }
      } catch (err: any) {
        if (mounted) {
            console.error("Recaptcha init failed:", err);
            setError(`Security init failed: ${err.message}. Please check allowed domains.`);
        }
      }
    };

    // Small delay to ensure DOM is ready and Auth is initialized
    const timer = setTimeout(initRecaptcha, 500);

    return () => {
        mounted = false;
        clearTimeout(timer);
        if (verifierRef.current) {
            try { verifierRef.current.clear(); } catch(e) {}
            verifierRef.current = null;
        }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (phone.length < 10) {
        setError("Please enter a valid 10-digit mobile number.");
        return;
    }

    if (!isRecaptchaReady || !verifierRef.current) {
        setError("Security check unavailable. Please refresh the page.");
        return;
    }

    onGetOtp(phone, verifierRef.current);
  };

  const isButtonDisabled = (phone.replace(/\D/g, '').length < 10 || isLoading) || !isRecaptchaReady;

  return (
    <div className="flex flex-col h-full justify-center p-6 bg-white animate-in slide-in-from-right duration-300">
      <div className="flex justify-center mb-8">
        <div className="h-20 w-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-blue-200 shadow-xl transform rotate-6">
          <Smartphone size={40} className="text-white" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">Welcome Back</h1>
      <p className="text-center text-slate-500 mb-10">Enter your mobile number to login</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-6">
        {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-sm text-red-600 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
            </div>
        )}

        <div className="relative group">
          <label className="text-xs font-bold text-blue-600 uppercase tracking-wider ml-1 mb-1 block">Mobile Number</label>
          <div className="flex items-center border-b-2 border-slate-200 focus-within:border-blue-600 transition-colors bg-slate-50 rounded-t-lg pt-1">
            <div className="px-4 py-3 flex items-center gap-2 border-r border-slate-200">
              <img 
                src="https://flagcdn.com/w40/in.png" 
                alt="India" 
                className="h-5 w-8 object-cover rounded shadow-sm"
              />
              <span className="font-bold text-slate-700 text-lg">+91</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              className="flex-1 bg-transparent px-4 py-3 text-lg font-bold text-slate-900 outline-none placeholder:text-slate-300 placeholder:font-normal"
              placeholder="98765 43210"
              maxLength={10}
              autoFocus
            />
          </div>
        </div>

        <button
          id="sign-in-button" 
          type="submit"
          disabled={isButtonDisabled}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-4"
        >
          {isLoading ? (
            <>Sending OTP... <Loader2 size={20} className="animate-spin" /></>
          ) : !isRecaptchaReady ? (
            <>Loading Security... <Loader2 size={20} className="animate-spin" /></>
          ) : (
            <>Get OTP <ArrowRight size={20} /></>
          )}
        </button>
        
        {/* Recaptcha Container */}
        <div ref={containerRef} className="mt-4 flex justify-center min-h-[1px]"></div>

        <p className="text-xs text-center text-slate-400 mt-6">
          By continuing, you agree to our Terms of Service & Privacy Policy.
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;