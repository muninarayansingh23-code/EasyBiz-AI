import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginScreen from './LoginScreen';
import OTPScreen from './OTPScreen';
import { RecaptchaVerifier } from 'firebase/auth';

const Login: React.FC = () => {
  const { userStatus, loading: authLoading, loginWithPhone, verifyOTP } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If already logged in and active, redirect
    if (!authLoading && userStatus === 'ACTIVE') {
      navigate('/app/dashboard');
    }
  }, [userStatus, authLoading, navigate]);

  const handleGetOtp = async (phoneNumber: string, verifier: RecaptchaVerifier | null) => {
    setIsLoading(true);
    try {
      await loginWithPhone(`+91${phoneNumber}`, verifier);
      setPhone(phoneNumber);
      setStep('otp');
    } catch (err: any) {
      console.error(err);
      alert(`Failed to send OTP: ${err.message || 'Unknown error'}`);
      // Only reload if we suspect Recaptcha issues (and not using bypass)
      if (verifier) {
          window.location.reload(); 
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (otp: string) => {
    setIsLoading(true);
    try {
      const status = await verifyOTP(otp);
      
      if (status === 'ACTIVE') {
        navigate('/app/dashboard');
      } else if (status === 'NEW_USER' || status === 'INVITED') {
        navigate('/onboarding');
      }
    } catch (err: any) {
      console.error(err);
      alert('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto h-screen bg-white shadow-2xl relative overflow-hidden">
        {step === 'phone' ? (
          <LoginScreen onGetOtp={handleGetOtp} isLoading={isLoading} />
        ) : (
          <OTPScreen 
            phone={phone} 
            onVerify={handleVerify} 
            onBack={() => setStep('phone')} 
            isLoading={isLoading} 
          />
        )}
      </div>
    </div>
  );
};

export default Login;