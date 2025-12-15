import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Loader2, CheckCircle2, Clock, Activity, UserPlus, FileText } from 'lucide-react';
import { HINTS, MOCK_LOGS } from '../lib/mockData';
import { VoiceLog } from '../types';

const BolkarRecorder: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'success'>('idle');
  const [timer, setTimer] = useState(0);
  const [hintIndex, setHintIndex] = useState(0);
  const [localLogs, setLocalLogs] = useState<VoiceLog[]>(MOCK_LOGS);
  const timerRef = useRef<number | null>(null);

  // Rotate hints
  useEffect(() => {
    if (status !== 'idle') return;
    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % HINTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [status]);

  // Timer logic
  useEffect(() => {
    if (status === 'listening') {
      timerRef.current = window.setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  const handleStopRecording = () => {
    setStatus('processing');
    
    // Simulate processing delay and list update
    setTimeout(() => {
      const newLog: VoiceLog = {
          id: `log_${Date.now()}`,
          userId: 'currentUser',
          timestamp: new Date().toISOString(),
          durationSeconds: timer,
          status: 'queued', // Simulating offline queue
          transcript: 'New voice command recorded...',
          intent: 'add_lead' // Default mock intent
      };
      
      setLocalLogs(prev => [newLog, ...prev]);
      setStatus('success');
      
      setTimeout(() => {
        setStatus('idle');
        setTimer(0);
      }, 1500);
    }, 1500);
  };

  // Helper to format mock timestamps
  const formatTimeAgo = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMins = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 60000));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const hours = Math.floor(diffMins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getLogIcon = (intent: string | undefined) => {
      switch(intent) {
          case 'add_lead': return <UserPlus size={18} />;
          case 'log_visit': return <FileText size={18} />;
          default: return <Activity size={18} />;
      }
  };

  const getLogColor = (intent: string | undefined) => {
      switch(intent) {
          case 'add_lead': return 'bg-green-50 text-green-600';
          case 'log_visit': return 'bg-purple-50 text-purple-600';
          default: return 'bg-blue-50 text-blue-600';
      }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      
      {/* TOP HALF: Input Area (Command Center) */}
      <div className="flex-none bg-white rounded-b-[2.5rem] shadow-sm z-10 pb-8 pt-4 px-6 flex flex-col items-center relative overflow-hidden">
        
        {/* Decorative ambient gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-50"></div>

        {/* Status Badge */}
         <div className="mb-6 h-8 flex items-center justify-center bg-slate-50 rounded-full px-4 py-1 border border-slate-100">
            {status === 'idle' && (
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ready to Record</span>
            )}
            {status === 'listening' && (
                <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    REC {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </div>
            )}
            {status === 'processing' && (
                <span className="text-blue-600 font-bold text-xs uppercase flex items-center gap-2">
                    <Loader2 size={12} className="animate-spin" /> Processing
                </span>
            )}
            {status === 'success' && (
                <span className="text-green-600 font-bold text-xs uppercase flex items-center gap-2">
                    <CheckCircle2 size={12} /> Saved to Queue
                </span>
            )}
        </div>

        {/* Mic Button Interaction */}
        <div className="relative mb-8">
             {status === 'listening' && (
            <>
              <div className="absolute inset-0 rounded-full bg-red-100 animate-pulse-ring opacity-75"></div>
              <div className="absolute inset-0 rounded-full bg-red-200 animate-pulse-dot opacity-50"></div>
            </>
          )}

          <button
            onClick={status === 'listening' ? handleStopRecording : () => { setStatus('listening'); setTimer(0); }}
            disabled={status === 'processing' || status === 'success'}
            className={`relative z-10 h-24 w-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
              status === 'listening' 
                ? 'bg-red-500 text-white scale-110 shadow-red-200' 
                : status === 'processing'
                ? 'bg-slate-100 text-slate-300'
                : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-blue-200 hover:scale-105 active:scale-95'
            }`}
          >
             {status === 'listening' ? (
              <Square size={28} fill="currentColor" className="rounded-sm" />
            ) : status === 'processing' ? (
              <Activity size={32} className="animate-bounce" />
            ) : (
              <Mic size={36} />
            )}
          </button>
        </div>

        {/* Hints Carousel */}
        <div className="h-12 w-full max-w-xs text-center">
            {status === 'idle' ? (
                 <div key={hintIndex} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Command Hint</p>
                    <p className="text-sm text-slate-700 font-medium italic">
                        "{HINTS[hintIndex]}"
                    </p>
                 </div>
            ) : (
                <p className="text-slate-400 text-xs font-medium">
                    {status === 'listening' ? 'Tap button to finish' : 'Securing your voice note...'}
                </p>
            )}
        </div>
      </div>

      {/* BOTTOM HALF: Recent List */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 backdrop-blur-sm sticky top-0 z-0 flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recent Voice Commands</h2>
            <Clock size={14} className="text-slate-400" />
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {localLogs.length === 0 && (
                <div className="text-center py-10 opacity-50">
                    <Activity size={32} className="mx-auto mb-2 text-slate-400" />
                    <p className="text-sm text-slate-400">No voice logs yet.</p>
                </div>
            )}
            
            {localLogs.map((log) => (
                <div key={log.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4 animate-in slide-in-from-bottom-4 duration-300">
                    <div className={`flex-none h-10 w-10 rounded-full flex items-center justify-center ${getLogColor(log.intent)}`}>
                        {getLogIcon(log.intent)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                            {log.transcript || "Processing Audio..."}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-400 font-medium">{formatTimeAgo(log.timestamp)}</span>
                            <span className="text-[10px] text-slate-300">•</span>
                             <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-1 ${
                                log.status === 'processed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${log.status === 'processed' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                {log.status}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BolkarRecorder;