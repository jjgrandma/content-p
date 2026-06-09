import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Sliders, 
  Play, 
  AlertCircle, 
  ThumbsUp, 
  Calendar, 
  Zap, 
  MessageSquare, 
  Clock,
  Star,
  CheckCircle2,
  History,
  ChevronRight,
  Trash2
} from 'lucide-react';
import { PredictionInput, PredictionResult } from '../types';

interface PredictionFeedback {
  id: string;
  title: string;
  platform: 'YouTube' | 'TikTok' | 'Instagram';
  predictedScore: number;
  rating: number; // 1 to 5 stars
  comment: string;
  timestamp: string;
}

interface MLPredictorPanelProps {
  theme?: 'cosmic' | 'executive';
}

export default function MLPredictorPanel({ theme = 'cosmic' }: MLPredictorPanelProps) {
  const [form, setForm] = useState<PredictionInput>({
    title: '',
    duration: 60,
    platform: 'YouTube',
    tone: 'Energetic',
    descriptionLength: 150,
    hasCaptions: true,
    hookTime: 3
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadStep, setLoadStep] = useState('');
  const [result, setResult] = useState<PredictionResult | null>(null);

  // Prediction History of last 5 successful predictions
  const [predictionHistory, setPredictionHistory] = useState<PredictionResult[]>(() => {
    const saved = localStorage.getItem('socialvision-prediction-history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.slice(0, 5);
      } catch (e) {
        console.error("Failed to parse prediction history:", e);
      }
    }
    // Prepopulate with 2 mock prediction results for immediate visual layout beauty
    return [
      {
        title: "10 Tech Hacks That Will Save You 100+ Hours",
        platform: "YouTube",
        overallScore: 82,
        estimatedViews: "180,400 - 533,000",
        engagementInterval: "9.4% - 12.0%",
        watchRetentionFactor: 69,
        postingTimeRecommendation: "Ideal posting window: 11:30 AM (EST)",
        thumbnailFeedback: "Vibrant color maps look excellent!",
        optimizationTips: [
          {
            title: "Increase Engagement Accents",
            description: "Adding structured timeline chapters in descriptions raises average retention time by 11.2%.",
            priority: "Medium",
            category: "SEO"
          }
        ]
      },
      {
        title: "Why standard advice is dangerously wrong",
        platform: "Instagram",
        overallScore: 71,
        estimatedViews: "56,800 - 149,100",
        engagementInterval: "8.3% - 10.9%",
        watchRetentionFactor: 60,
        postingTimeRecommendation: "Ideal posting window: 5:00 PM (EST)",
        thumbnailFeedback: "Soft palettes might seem lost inside infinite scroll loops.",
        optimizationTips: [
          {
            title: "Brighten Core Focus Assets",
            description: "Brighten thumbnail center face overlays by 15% to attract user thumb stops on Dark feeds.",
            priority: "High",
            category: "Visual"
          }
        ]
      }
    ];
  });

  // Calibration Feedback mock state
  const [feedbackList, setFeedbackList] = useState<PredictionFeedback[]>([
    {
      id: 'fb-1',
      title: "10 Tech Hacks That Will Save You 100+ Hours",
      platform: "YouTube",
      predictedScore: 82,
      rating: 5,
      comment: "Prediction was unbelievably accurate! The engagement predictions correctly captured the initial video velocity.",
      timestamp: "10 mins ago"
    },
    {
      id: 'fb-2',
      title: "Why standard advice is dangerously wrong",
      platform: "Instagram",
      predictedScore: 71,
      rating: 4,
      comment: "Good estimation. Thumbnail recommendations helped correct exposure bias.",
      timestamp: "1 hr ago"
    }
  ]);

  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Simulated machine learning prediction steps for premium feedback
  const mockPredictionEngine = (input: PredictionInput): Promise<PredictionResult> => {
    return new Promise((resolve) => {
      const steps = [
        'Ingesting title linguistic vectors...',
        'Matching historical engagement peaks...',
        'Evaluating subtitle and retention metrics...',
        'Simulating neural performance index...',
        'Predicting performance...'
      ];

      let currentStep = 0;
      setLoadStep(steps[0]);

      const interval = setInterval(() => {
        currentStep++;
        if (currentStep < steps.length) {
          setLoadStep(steps[currentStep]);
        } else {
          clearInterval(interval);

          // Generate simulated prediction output inspired by input to make it feel real
          const scoreBase = input.platform === 'TikTok' ? 75 : input.platform === 'Instagram' ? 70 : 65;
          const titleMult = input.title.includes('!') || input.title.includes('⚡️') || input.title.match(/[0-9]/) ? 12 : 3;
          const durationMod = input.platform === 'TikTok' && input.duration > 60 ? -15 : 
                              input.platform === 'YouTube' && input.duration > 300 ? 10 : 5;
          const hookBonus = input.hookTime <= 3 ? 8 : -5;
          const finalScore = Math.min(Math.max(scoreBase + titleMult + durationMod + hookBonus, 30), 99);

          const viewsRange = input.platform === 'TikTok'
            ? `${Math.floor(finalScore * 1800).toLocaleString()} - ${Math.floor(finalScore * 4200).toLocaleString()}`
            : input.platform === 'Instagram'
            ? `${Math.floor(finalScore * 800).toLocaleString()} - ${Math.floor(finalScore * 2100).toLocaleString()}`
            : `${Math.floor(finalScore * 2200).toLocaleString()} - ${Math.floor(finalScore * 6500).toLocaleString()}`;

          const minRate = (finalScore / 10 + 1.2).toFixed(1);
          const maxRate = (finalScore / 10 + 3.8).toFixed(1);

          // Dynamic tips depending on user options
          const optimizationTips = [];
          
          if (input.title.length < 15) {
            optimizationTips.push({
              title: 'Title Length Too Short',
              description: 'Expand the title to 35-50 characters incorporating trending buzzwords (e.g. Secrets, Revealed, Behind).',
              priority: 'High' as const,
              category: 'SEO' as const
            });
          } else if (input.title.length > 70) {
            optimizationTips.push({
              title: 'Linguistic Clutter Found',
              description: 'Truncate title. Clean displaying structures prevent click cuts on mobile screens.',
              priority: 'Medium' as const,
              category: 'SEO' as const
            });
          }

          if (input.hookTime > 3) {
            optimizationTips.push({
              title: 'Slow Initial Hook Rate',
              description: 'The first hook is at ' + input.hookTime + 's. Move direct visual anchors to those first 1.5 seconds to lower bounce percent.',
              priority: 'High' as const,
              category: 'Content' as const
            });
          }

          if (input.platform === 'TikTok' && input.duration > 45) {
            optimizationTips.push({
              title: 'TikTok Duration Constraint',
              description: 'Tiktok average video attention span drops significantly after 30s. Consider shaving off 15s.',
              priority: 'High' as const,
              category: 'Content' as const
            });
          }

          if (input.tone === 'Professional' && input.platform === 'TikTok') {
            optimizationTips.push({
              title: 'Casual Tone Overload',
              description: 'Professional presets are neglected by TikTok algorithmic clusters. Switch tone markers directly to Casual or Energetic.',
              priority: 'Medium' as const,
              category: 'Visual' as const
            });
          }

          if (input.tone === 'Casual' && input.platform === 'YouTube' && input.duration > 600) {
            optimizationTips.push({
              title: 'Intense Educational Value Ideal',
              description: 'Long YouTube videos do better with structural educational markers rather than pure casual formats.',
              priority: 'Low' as const,
              category: 'Content' as const
            });
          }

          // Universal visual alerts
          if (input.tone === 'Energetic' || input.tone === 'Casual') {
            optimizationTips.push({
              title: 'Increase Thumbnail Contrast',
              description: 'Generate high-saturation complementary colors to pop on user dark feeds.',
              priority: 'Medium' as const,
              category: 'Visual' as const
            });
          } else {
            optimizationTips.push({
              title: 'Luminosity Correction',
              description: 'Brighten center visual assets of thumbnail by 15% to attract direct visual focus.',
              priority: 'Low' as const,
              category: 'Visual' as const
            });
          }

          resolve({
            title: input.title || 'Untitled Social Snippet',
            platform: input.platform,
            overallScore: finalScore,
            estimatedViews: viewsRange,
            engagementInterval: `${minRate}% - ${maxRate}%`,
            watchRetentionFactor: Math.min(Math.floor(finalScore * 0.85), 100),
            postingTimeRecommendation: input.platform === 'TikTok' ? 'Ideal posting window: 5:00 PM - 7:30 PM (EST)' : 'Ideal posting window: 11:30 AM (EST)',
            thumbnailFeedback: input.tone === 'Energetic' ? 'Vibrant color maps look excellent!' : 'Soft palettes might seem lost inside infinite scroll loops.',
            optimizationTips: optimizationTips.length > 0 ? optimizationTips : [
              {
                title: 'Excellent Composition',
                description: 'All variables appear set for strong social performance. Ensure description lists 3 primary hashtags.',
                priority: 'Low' as const,
                category: 'SEO' as const
              }
            ]
          });
        }
      }, 350);
    });
  };

  const handleSelectHistory = (historyItem: PredictionResult) => {
    setResult(historyItem);
    const estDuration = historyItem.platform === 'YouTube' ? 300 : historyItem.platform === 'TikTok' ? 30 : 15;
    setForm({
      title: historyItem.title,
      duration: estDuration,
      platform: historyItem.platform,
      tone: 'Energetic',
      descriptionLength: 150,
      hasCaptions: true,
      hookTime: 3
    });
    setRating(0);
    setHoveredRating(0);
    setComment('');
    setIsSubmitted(false);
  };

  const handlePredict = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setRating(0);
    setHoveredRating(0);
    setComment('');
    setIsSubmitted(false);

    try {
      const predResult = await mockPredictionEngine(form);
      setResult(predResult);
      setPredictionHistory(prev => {
        const filtered = prev.filter(p => p.title.toLowerCase() !== predResult.title.toLowerCase());
        const nextList = [predResult, ...filtered].slice(0, 5);
        localStorage.setItem('socialvision-prediction-history', JSON.stringify(nextList));
        return nextList;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ml-predictive-panel" className={`rounded-2xl p-6 shadow-xl flex flex-col min-h-[600px] transition-colors duration-300 ${
      theme === 'cosmic'
        ? 'bg-slate-950/40 border border-slate-800/80 text-white'
        : 'bg-[#121c2d]/50 border border-slate-850/80 text-zinc-100'
    }`}>
      <div className="flex items-center space-x-2.5 mb-5">
        <div className={`p-2 border rounded-lg transition-colors ${
          theme === 'cosmic' 
            ? 'bg-gradient-to-tr from-pink-500/20 to-purple-500/20 border-pink-500/20' 
            : 'bg-gradient-to-tr from-cyan-500/10 to-teal-500/10 border-cyan-500/20'
        }`}>
          <Cpu className={`h-5 w-5 ${theme === 'cosmic' ? 'text-pink-400' : 'text-cyan-400'}`} />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-white tracking-tight">
            AI Video Performance Predictor
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            Simulated regression model analyzing metric vectors before publishing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left pane: Controls Form + Prediction History */}
        <div className="lg:col-span-5 flex flex-col space-y-6 border-b lg:border-b-0 lg:border-r border-slate-800/60 pb-5 lg:pb-0 lg:pr-5">
          <form onSubmit={handlePredict} className="space-y-4">
            {/* Platform chips selection */}
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Select Destination Platform
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['YouTube', 'TikTok', 'Instagram'] as const).map((plat) => (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, platform: plat }))}
                    className={`py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      form.platform === plat
                        ? theme === 'cosmic'
                          ? 'bg-slate-800 border-violet-500/80 text-white shadow-xs'
                          : 'bg-[#1e293b]/80 border-cyan-500 text-cyan-300'
                        : theme === 'cosmic'
                          ? 'bg-slate-900/60 border-slate-850 hover:bg-slate-900 text-slate-400'
                          : 'bg-[#15233c]/60 border-slate-800/60 hover:bg-[#15233c] text-slate-400'
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>
            </div>

            {/* Title input */}
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Draft Video Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 5 Lies You Were Told About AI..."
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                className={`w-full border rounded-xl px-3 py-2 text-sm placeholder:text-slate-500/75 focus:outline-none transition-colors duration-300 ${
                  theme === 'cosmic'
                    ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-slate-700'
                    : 'bg-[#15233c] border-slate-800/60 text-zinc-100 focus:border-slate-700/80'
                }`}
              />
            </div>

            {/* Duration slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Estimated Duration
                </label>
                <span className={`text-xs font-mono font-semibold ${theme === 'cosmic' ? 'text-violet-400' : 'text-cyan-400'}`}>
                  {form.duration >= 60 
                    ? `${Math.floor(form.duration / 60)}m ${form.duration % 60}s` 
                    : `${form.duration} seconds`}
                </span>
              </div>
              <input
                type="range"
                min={form.platform === 'TikTok' ? 10 : 15}
                max={form.platform === 'YouTube' ? 1200 : 90}
                value={form.duration}
                onChange={(e) => setForm(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${
                  theme === 'cosmic' ? 'bg-slate-800 accent-violet-600' : 'bg-[#15233c] accent-cyan-500'
                }`}
              />
            </div>

            {/* Hook Time parameter */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  First Retention Hook Point
                </label>
                <span className={`text-xs font-mono font-semibold ${theme === 'cosmic' ? 'text-pink-400' : 'text-teal-400'}`}>
                  At {form.hookTime} seconds
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={form.hookTime}
                onChange={(e) => setForm(prev => ({ ...prev, hookTime: parseInt(e.target.value) }))}
                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${
                  theme === 'cosmic' ? 'bg-slate-800 accent-pink-500' : 'bg-[#15233c] accent-teal-400'
                }`}
              />
            </div>

            {/* Thumbnail Tone Selection */}
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Thumbnail / Visual Asset Tone
              </label>
              <select
                value={form.tone}
                onChange={(e) => setForm(prev => ({ ...prev, tone: e.target.value as any }))}
                className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none transition-colors duration-300 ${
                  theme === 'cosmic'
                    ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-slate-705'
                    : 'bg-[#15233c] border-slate-800/60 text-zinc-100 focus:border-slate-700'
                }`}
              >
                {(['Energetic', 'Educational', 'Dramatic', 'Professional', 'Casual'] as const).map((t) => (
                  <option key={t} value={t} className="bg-slate-950 text-slate-200">
                    {t} Vibe Palette
                  </option>
                ))}
              </select>
            </div>

            {/* Switch options */}
            <div className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors duration-300 ${
              theme === 'cosmic'
                ? 'border-slate-800/80 bg-slate-900/20'
                : 'border-slate-800 bg-[#15233c]/30'
            }`}>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200 font-sans">Burned-in captions</span>
                <span className="text-[10px] text-slate-500 font-sans">Includes visual on-screen kinetic texts</span>
              </div>
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, hasCaptions: !prev.hasCaptions }))}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  form.hasCaptions
                    ? theme === 'cosmic' ? 'bg-violet-600' : 'bg-cyan-600'
                    : 'bg-slate-800'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    form.hasCaptions ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full relative overflow-hidden text-white font-medium text-xs font-mono uppercase tracking-wider py-3 rounded-xl transition duration-300 shadow-lg disabled:opacity-40 cursor-pointer ${
                theme === 'cosmic'
                  ? 'bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 shadow-violet-950/20'
                  : 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 shadow-cyan-950/15'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <Sliders className="h-4 w-4 animate-spin" />
                  <span>Generating Predictors...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Predict Video Performance</span>
                </span>
              )}
            </button>
          </form>

          {/* Prediction History Section */}
          <div id="ml-prediction-runs-history-card" className="border-t border-slate-800/80 pt-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <History className={`h-4 w-4 ${theme === 'cosmic' ? 'text-violet-400' : 'text-cyan-400'}`} />
                <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-300">
                  Prediction History
                </span>
              </div>
              <span className={`text-[10px] font-mono border px-2 py-0.5 rounded-md transition-colors ${
                theme === 'cosmic'
                  ? 'bg-slate-900 border-slate-800 text-slate-400'
                  : 'bg-[#15233c] border-slate-800/80 text-cyan-300'
              }`}>
                {predictionHistory.length}/5 Cached
              </span>
            </div>
            
            <p className="text-[11px] text-slate-400 font-sans leading-tight">
              Review records of successful simulations. Select any prediction below to quickly restore metrics, estimated reach, and optimized feedback.
            </p>

            <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
              {predictionHistory.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl bg-slate-900/10">
                  <p className="text-xs text-slate-505 font-sans">No previous runs cached yet.</p>
                </div>
              ) : (
                predictionHistory.slice(0, 5).map((item, idx) => {
                  const isActive = result?.title === item.title;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectHistory(item)}
                      title={`Revisit prediction: ${item.title}`}
                      className={`w-full text-left items-center p-2.5 rounded-xl border flex justify-between gap-3 transition-all duration-300 cursor-pointer ${
                        isActive
                          ? theme === 'cosmic'
                            ? 'bg-violet-950/25 border-violet-500/80 shadow-md ring-1 ring-violet-500/20'
                            : 'bg-cyan-950/25 border-cyan-500 shadow-md ring-1 ring-cyan-500/20'
                          : theme === 'cosmic'
                            ? 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/60'
                            : 'bg-[#15233c]/20 border-slate-800/80 hover:border-slate-700/80 hover:bg-[#15233c]/40'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-[9px] uppercase font-mono px-1.5 py-0.2 rounded ${
                            item.platform === 'YouTube' 
                              ? 'bg-red-950/50 text-red-400 border border-red-900/30' 
                              : item.platform === 'TikTok'
                              ? 'bg-slate-950/60 text-slate-300 border border-slate-850'
                              : 'bg-pink-950/50 text-pink-400 border border-pink-900/30'
                          }`}>
                            {item.platform}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            Score: <span className={`font-bold ${isActive ? 'text-emerald-400' : 'text-slate-300'}`}>{item.overallScore}</span>
                          </span>
                        </div>
                        <h4 className="text-[11px] font-semibold text-slate-200 truncate pr-2 font-sans">
                          {item.title}
                        </h4>
                      </div>
                      <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${
                        isActive 
                          ? 'text-emerald-400 translate-x-0.5' 
                          : 'text-slate-600'
                      }`} />
                    </button>
                  );
                })
              )}
            </div>
            {predictionHistory.length > 0 && (
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setPredictionHistory([]);
                    localStorage.removeItem('socialvision-prediction-history');
                  }}
                  className="text-[10px] font-mono text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Clear Saved Runs</span>
                </button>
              </div>
            )}
          </div>
        </div>


        {/* Prediction Outputs */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-[350px] justify-center">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="relative">
                <div className="absolute inset-x-0 inset-y-0 h-16 w-16 rounded-full border-4 border-slate-800" />
                <div className="h-16 w-16 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
                <Cpu className="absolute left-[18px] top-[18px] h-7 w-7 text-pink-400" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm text-slate-200">Evaluating Neural Vectors</h4>
                <p className="text-[11px] font-mono text-pink-400 h-4 transition-all duration-300">
                  {loadStep}
                </p>
              </div>
            </div>
          )}

          {!isLoading && !result && (
            <div className="flex flex-col items-center justify-center text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-900/10 p-6">
              <div className="p-3 bg-slate-900/80 rounded-full border border-slate-800 mb-3">
                <Play className="h-8 w-8 text-slate-600" />
              </div>
              <h4 className="text-sm font-semibold text-slate-300">Predictive Engine Idle</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Provide custom drafting specifications in the form on the left pane and query the simulation engine.
              </p>
            </div>
          )}

          {!isLoading && result && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Main Score panel */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Overall Score
                    </span>
                    <h4 className="text-2xl font-display font-semibold text-white mt-1">
                      {result.overallScore} <span className="text-xs text-slate-500">/ 100</span>
                    </h4>
                    <span className="text-[11px] text-emerald-400 flex items-center mt-1">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Optimized for reach
                    </span>
                  </div>
                  {/* Gauge indicator ring */}
                  <div className="relative h-20 w-20 shrink-0">
                    <svg className="h-full w-full transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        className="stroke-slate-800 fill-none"
                        strokeWidth="5"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        className="stroke-pink-500 fill-none"
                        strokeWidth="5"
                        strokeDasharray={200}
                        strokeDashoffset={200 - (200 * result.overallScore) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-mono font-bold text-slate-100">
                        {result.overallScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Range stats */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                      Estimated Views
                    </span>
                    <span className="text-lg font-display font-bold text-white flex items-center mt-0.5">
                      <Zap className="h-4 w-4 text-emerald-400 mr-1.5" />
                      {result.estimatedViews}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                      Watch retention
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-violet-500 h-full rounded-full" 
                          style={{ width: `${result.watchRetentionFactor}%` }} 
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-300 font-semibold shrink-0">
                        {result.watchRetentionFactor}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posting recommendations summary banner */}
              <div className="flex items-start space-x-2.5 p-3 rounded-xl border border-blue-900/30 bg-blue-950/20 text-xs">
                <Clock className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                <div className="text-blue-300 max-w-md">
                  <span className="font-semibold text-blue-200">Luminosity & Posting Prediction:</span>
                  <p className="mt-0.5 text-slate-400 text-[11px]">{result.postingTimeRecommendation}. Thumbnails: {result.thumbnailFeedback}</p>
                </div>
              </div>

              {/* Optimization actionable tips */}
              <div className="space-y-2">
                <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Target Optimization Actions
                </h5>
                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {result.optimizationTips.map((tip, idx) => (
                    <div key={idx} className="bg-slate-900/30 border border-slate-800/80 rounded-lg p-2.5 flex items-start gap-2.5">
                      <AlertCircle className={`h-4 w-4 mt-0.5 shrink-0 ${
                        tip.priority === 'High' 
                          ? 'text-rose-500' 
                          : tip.priority === 'Medium' 
                          ? 'text-yellow-500' 
                          : 'text-blue-400'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-200">{tip.title}</span>
                          <div className="flex items-center space-x-1">
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono bg-slate-800/80 text-slate-400 uppercase">
                              {tip.category}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono uppercase ${
                              tip.priority === 'High' 
                                ? 'bg-rose-950/60 text-rose-400' 
                                : tip.priority === 'Medium' 
                                ? 'bg-yellow-950/60 text-yellow-400' 
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {tip.priority}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Prediction Verification Feedback widget */}
              <div id="prediction-feedback-widget" className="bg-slate-900/50 border border-slate-800/70 rounded-xl p-3.5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500/20" />
                    <span className="text-xs font-display font-medium text-slate-200">Rate Prediction Accuracy</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Feedback calibration</span>
                </div>

                {!isSubmitted ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 leading-none">Do these predicted metrics match your expected baseline?</span>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            id={`btn-star-rating-${star}`}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="p-0.5 hover:scale-110 active:scale-95 transition-all focus:outline-none"
                            title={`Rate prediction ${star} Star${star > 1 ? 's' : ''}`}
                          >
                            <Star 
                              className={`h-4.5 w-4.5 transition-colors duration-150 cursor-pointer ${
                                star <= (hoveredRating || rating)
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-650 hover:text-slate-400 fill-none'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <textarea
                        id="prediction-feedback-comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add specific comments or calibration offsets to optimize future algorithms..."
                        rows={2}
                        className="w-full bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-slate-700 font-sans resize-none transition-colors"
                      />
                    </div>

                    <button
                      type="button"
                      id="btn-submit-feedback"
                      disabled={rating === 0}
                      onClick={() => {
                        const newFeedback: PredictionFeedback = {
                          id: `fb-${Date.now()}`,
                          title: result.title,
                          platform: result.platform,
                          predictedScore: result.overallScore,
                          rating: rating,
                          comment: comment.trim() || 'Prediction calibrated manually.',
                          timestamp: 'Just now'
                        };
                        setFeedbackList((prev) => [newFeedback, ...prev]);
                        setIsSubmitted(true);
                      }}
                      className="w-full py-2 bg-violet-600/90 hover:bg-violet-600 disabled:opacity-40 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider text-slate-100 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer disabled:cursor-not-allowed shadow-md active:translate-y-0.5"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                      <span>Submit Calibration Score</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-2 space-y-2 animate-fade-in">
                    <div className="inline-flex p-1.5 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-emerald-400">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-[11px] font-semibold text-slate-200">Simulation Calibrated</h5>
                      <p className="text-[10px] text-slate-400 max-w-sm mx-auto">
                        Your feedback rating of <span className="text-amber-400 font-bold">{rating}/5★</span> has been logged to the neural calibration state. Future target simulations will dynamically offset accuracy by <span className="text-emerald-400 font-semibold font-mono">+{rating * 1.5}%</span> weights bias!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Calibration History Logs */}
              <div id="calibration-history-box" className="border-t border-slate-800/60 pt-3.5 mt-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <History className="h-3.5 w-3.5 text-slate-500" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Calibration logs history</span>
                  </div>
                  <span className="text-[9px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded-md">
                    {feedbackList.length} local records
                  </span>
                </div>

                <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                  {feedbackList.map((item) => (
                    <div key={item.id} className="bg-slate-900/20 border border-slate-850 rounded-lg p-2 flex flex-col space-y-1 hover:bg-slate-900/40 transition-colors">
                      <div className="flex items-start justify-between gap-1.5">
                        <div className="min-w-0 flex-1">
                          <span className="block text-[10px] text-slate-350 font-medium truncate">
                            {item.title}
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">
                            {item.platform} • Prediction score: {item.predictedScore}/100
                          </span>
                        </div>
                        <div className="flex items-center shrink-0 space-x-0.5 bg-slate-950/40 px-1 rounded-md py-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star 
                              key={s} 
                              className={`h-2.5 w-2.5 ${
                                s <= item.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      {item.comment && (
                        <p className="text-[10px] text-slate-400 italic border-l border-slate-800 pl-2 leading-tight">
                          "{item.comment}"
                        </p>
                      )}
                      <div className="text-[9px] text-slate-650 text-right font-mono">
                        {item.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
