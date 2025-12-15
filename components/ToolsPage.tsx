import React, { useState } from 'react';
import { 
  Plus, MessageCircle, CheckCircle2, Image as ImageIcon, Mic, 
  ChevronLeft, Wand2, Globe, ThumbsUp, MessageSquare, Share2, 
  Rocket, IndianRupee, ArrowRight, X 
} from 'lucide-react';

const ToolsPage: React.FC = () => {
  const [mode, setMode] = useState<'dashboard' | 'wizard'>('dashboard');
  const [wizardStep, setWizardStep] = useState(1);
  
  // Wizard State
  const [adContext, setAdContext] = useState('');
  const [budget, setBudget] = useState(500);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock Data for Preview
  const PREVIEW_COPY = "🔥 Just Listed! Premium 3BHK in Andheri West.\n\n✨ Sea Facing Deck\n✨ 2 Car Parks\n✨ Zero Brokerage\n\nBook your site visit today! limited inventory left.";

  const handleStartWizard = () => {
    setMode('wizard');
    setWizardStep(1);
  };

  const handleBack = () => {
    if (wizardStep === 1) setMode('dashboard');
    else setWizardStep(prev => prev - 1);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setWizardStep(2);
    }, 1500);
  };

  const handlePublish = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setWizardStep(4); // Success state
    }, 2000);
  };

  // --- RENDER HELPERS ---

  const renderDashboard = () => (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Growth Studio</h1>
        <p className="text-sm text-slate-500">Marketing tools to boost your sales.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Create Ad Card */}
        <button 
          onClick={handleStartWizard}
          className="col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg shadow-blue-200 flex flex-col items-start gap-4 active:scale-[0.98] transition-transform"
        >
          <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Plus size={24} />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold">Create New Ad</h3>
            <p className="text-blue-100 text-sm opacity-90">Launch FB/IG ads in 3 steps</p>
          </div>
        </button>

        {/* WhatsApp Blast */}
        <button className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 active:scale-[0.98] transition-transform">
          <div className="h-10 w-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
            <MessageCircle size={20} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-slate-800">WhatsApp Blast</h3>
            <p className="text-xs text-slate-500">Bulk sender</p>
          </div>
        </button>

        {/* Green Tick */}
        <button className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3 active:scale-[0.98] transition-transform">
          <div className="h-10 w-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-slate-800">Green Tick</h3>
            <p className="text-xs text-slate-500">Apply for verification</p>
          </div>
        </button>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="p-4 flex flex-col h-full">
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">What are you selling?</h2>
          <p className="text-sm text-slate-500">Provide details for the AI to generate your ad.</p>
        </div>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer">
          <div className="h-12 w-12 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-600">
            <ImageIcon size={24} />
          </div>
          <p className="text-sm font-semibold text-slate-600">Tap to upload image</p>
        </div>

        {/* Context Input */}
        <div className="relative">
          <label className="block text-sm font-bold text-slate-700 mb-2">Ad Context</label>
          <textarea
            value={adContext}
            onChange={(e) => setAdContext(e.target.value)}
            className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px] resize-none text-slate-700"
            placeholder="e.g. Luxurious 3BHK in Bandra with sea view, gym, pool. Starting at 5Cr."
          />
          <button className="absolute bottom-4 right-4 h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
            <Mic size={16} />
          </button>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating || adContext.length < 5}
        className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 mt-4"
      >
        {isGenerating ? (
          <>
            <Wand2 className="animate-spin" size={20} /> Generating Magic...
          </>
        ) : (
          <>
            Generate Preview <ArrowRight size={20} />
          </>
        )}
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="p-4 flex flex-col h-full">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Ad Preview</h2>
      
      {/* Mock Facebook Ad */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-6">
        {/* Header */}
        <div className="p-3 flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
            EB
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 leading-none">EazyBiz Realty</p>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
              <span>Sponsored</span>
              <Globe size={10} />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="px-3 pb-3">
          <p className="text-sm text-slate-800 whitespace-pre-line leading-relaxed">
            {PREVIEW_COPY}
          </p>
        </div>

        {/* Image */}
        <div className="h-64 bg-slate-200 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                 <p className="text-white font-bold text-lg">Luxury Living Awaits</p>
             </div>
             <ImageIcon size={48} className="text-slate-400 opacity-50" />
        </div>

        {/* CTA Bar */}
        <div className="bg-slate-50 p-3 flex items-center justify-between border-t border-slate-100">
           <div>
               <p className="text-xs text-slate-500 uppercase font-bold">Whatsapp</p>
               <p className="text-sm font-bold text-slate-900">Send Message</p>
           </div>
           <button className="px-4 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded border border-slate-300">
               Learn More
           </button>
        </div>

        {/* Social Proof */}
        <div className="px-3 py-2 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs">
           <div className="flex items-center gap-1">
               <ThumbsUp size={14} /> <span>245</span>
           </div>
           <div className="flex items-center gap-3">
               <div className="flex items-center gap-1">
                   <MessageSquare size={14} /> <span>12</span>
               </div>
               <div className="flex items-center gap-1">
                   <Share2 size={14} /> <span>Share</span>
               </div>
           </div>
        </div>
      </div>

      <div className="mt-auto flex gap-3">
        <button 
           onClick={() => setWizardStep(1)}
           className="flex-1 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          Edit
        </button>
        <button 
           onClick={() => setWizardStep(3)}
           className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="p-4 flex flex-col h-full">
      <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Set Daily Budget</h2>
          <p className="text-sm text-slate-500 mb-8">How much do you want to spend per day?</p>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center mb-8">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Daily Budget</p>
              <div className="flex items-center justify-center gap-1 text-4xl font-black text-slate-900 mb-6">
                 <IndianRupee size={32} strokeWidth={2.5} />
                 {budget}
              </div>

              <input 
                type="range" 
                min="100" 
                max="5000" 
                step="100" 
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-2 text-xs text-slate-400 font-bold">
                  <span>₹100</span>
                  <span>₹5,000</span>
              </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-4">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Globe size={20} />
              </div>
              <div>
                  <p className="text-sm font-bold text-blue-900">Estimated Reach</p>
                  <p className="text-xs text-blue-700 font-medium">
                      ~{Math.floor(budget * 1.5)} to {Math.floor(budget * 4.2)} people / day
                  </p>
              </div>
          </div>
      </div>

       <button
        onClick={handlePublish}
        disabled={isGenerating}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
      >
        {isGenerating ? <Wand2 className="animate-spin" /> : (
            <>
                <Rocket size={20} /> Launch Campaign
            </>
        )}
      </button>
    </div>
  );

  const renderSuccess = () => (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300">
        <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={40} strokeWidth={3} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Campaign Launched!</h2>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto">
            Your ad is now in review. It will go live within 24 hours. Good luck!
        </p>
        
        <div className="w-full bg-slate-100 p-4 rounded-xl mb-8 text-left border border-slate-200">
            <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Budget</span>
                <span className="font-bold text-slate-900">₹{budget}/day</span>
            </div>
             <div className="flex justify-between text-sm">
                <span className="text-slate-500">Status</span>
                <span className="font-bold text-amber-600">In Review</span>
            </div>
        </div>

        <button 
            onClick={() => { setMode('dashboard'); setWizardStep(1); setAdContext(''); }}
            className="w-full py-3 bg-white border border-slate-300 text-slate-900 font-bold rounded-xl"
        >
            Back to Tools
        </button>
    </div>
  );

  // --- MAIN RENDER ---

  if (mode === 'dashboard') return renderDashboard();

  return (
    <div className="flex flex-col h-full bg-slate-50">
        {/* Wizard Header */}
        {wizardStep < 4 && (
            <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 flex-none sticky top-0 z-20">
                <button 
                    onClick={handleBack}
                    className="h-10 w-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-full"
                >
                    {wizardStep === 1 ? <X size={20} /> : <ChevronLeft size={24} />}
                </button>
                <div className="flex gap-1">
                    {[1, 2, 3].map(s => (
                        <div 
                            key={s} 
                            className={`h-1.5 w-8 rounded-full transition-colors ${s <= wizardStep ? 'bg-blue-600' : 'bg-slate-200'}`} 
                        />
                    ))}
                </div>
                <div className="w-10" /> {/* Spacer for centering */}
            </div>
        )}

        <div className="flex-1 overflow-y-auto">
            {wizardStep === 1 && renderStep1()}
            {wizardStep === 2 && renderStep2()}
            {wizardStep === 3 && renderStep3()}
            {wizardStep === 4 && renderSuccess()}
        </div>
    </div>
  );
};

export default ToolsPage;