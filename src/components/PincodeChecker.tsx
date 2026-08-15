import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PincodeChecker: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'warning'>('idle');
  const [resultMessage, setResultMessage] = useState('');

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (!clean || clean.length !== 6 || !clean.startsWith('600')) {
      setStatus('warning');
      setResultMessage('Please enter a valid 6-digit Chennai pincode starting with 600xxx');
      return;
    }

    // Chennai popular ranges
    setStatus('success');
    setResultMessage(`⚡ Express Delivery Available: Hot bakes delivered within 60–90 mins to Pincode ${clean}!`);
  };

  return (
    <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 rounded-3xl p-5 sm:p-6 text-white shadow-lg my-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white shrink-0">
            <Zap className="w-6 h-6 text-yellow-200" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg font-serif">
              Chennai Express Delivery Check
            </h3>
            <p className="text-xs text-amber-100 font-medium">
              Enter your Chennai Pincode (e.g. 600017, 600004, 600040) to check slot availability
            </p>
          </div>
        </div>

        <form onSubmit={checkPincode} className="w-full md:w-auto flex items-center gap-2">
          <div className="relative flex-1 md:w-56">
            <MapPin className="w-4 h-4 text-amber-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              maxLength={6}
              placeholder="e.g. 600017"
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value.replace(/\D/g, ''));
                setStatus('idle');
              }}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white text-amber-950 font-bold focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-amber-400"
            />
          </div>
          <Button
            type="submit"
            className="bg-amber-950 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl shrink-0"
          >
            Check Slot
          </Button>
        </form>
      </div>

      {status === 'success' && (
        <div className="mt-3.5 bg-white/20 backdrop-blur border border-white/30 rounded-2xl p-2.5 flex items-center gap-2 text-xs font-bold text-yellow-100">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{resultMessage}</span>
        </div>
      )}

      {status === 'warning' && (
        <div className="mt-3.5 bg-rose-900/60 border border-rose-300/40 rounded-2xl p-2.5 flex items-center gap-2 text-xs font-bold text-rose-100">
          <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
          <span>{resultMessage}</span>
        </div>
      )}
    </div>
  );
};