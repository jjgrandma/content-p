import React, { useState } from 'react';
import { Cpu, Sparkles, Sliders, Play, AlertCircle, ThumbsUp, Calendar, Zap, MessageSquare, Clock } from 'lucide-react';
import { PredictionInput, PredictionResult } from '../types';

export default function MLPredictorPanel() {
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

  const handlePredict = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const predResult = await mockPredictionEngine(form);
      setResult(predResult);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ml-predictive-panel" className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col min-h-[600px]">
      <div className="flex items-center space-x-2.5 mb-5">
        <div className="p-2 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 border border-pink-500/20 rounded-lg">
          <Cpu className="h-5 w-5 text-pink-400" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-white tracking-tight">
            AI Video Performance Predictor
          </h3>
          <p className="text-xs text-slate-400">
            Simulated regression model analyzing metric vectors before publishing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Parameters form */}
        <form onSubmit={handlePredict} className="space-y-4 lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-800/60 pb-5 lg:pb-0 lg:pr-5">
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
                  className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    form.platform === plat
                      ? 'bg-slate-800 border-violet-500/80 text-white shadow-xs'
                      : 'bg-slate-900/60 border-slate-850 hover:bg-slate-900 text-slate-400'
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
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500/75 focus:outline-none focus:border-slate-700"
            />
          </div>

          {/* Duration slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Estimated Duration
              </label>
              <span className="text-xs font-mono font-semibold text-violet-400">
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
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
          </div>

          {/* Hook Time parameter */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                First Retention Hook Point
              </label>
              <span className="text-xs font-mono font-semibold text-pink-400">
                At {form.hookTime} seconds
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={form.hookTime}
              onChange={(e) => setForm(prev => ({ ...prev, hookTime: parseInt(e.target.value) }))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
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
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-700"
            >
              {(['Energetic', 'Educational', 'Dramatic', 'Professional', 'Casual'] as const).map((t) => (
                <option key={t} value={t} className="bg-slate-950 text-slate-200">
                  {t} Vibe Palette
                </option>
              ))}
            </select>
          </div>

          {/* Switch options */}
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-800/80 bg-slate-900/20">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-200">Burned-in captions</span>
              <span className="text-[10px] text-slate-500">Includes visual on-screen kinetic texts</span>
            </div>
            <button
              type="button"
              onClick={() => setForm(prev => ({ ...prev, hasCaptions: !prev.hasCaptions }))}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                form.hasCaptions ? 'bg-violet-600' : 'bg-slate-800'
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
            className="w-full relative overflow-hidden bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-medium text-xs font-mono uppercase tracking-wider py-3 rounded-xl transition duration-300 shadow-lg shadow-violet-950/20 disabled:opacity-40"
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
                <div className="space-y-2 max-h-[188px] overflow-y-auto pr-1">
                  {result.optimizationTips.map((tip, idx) => (
                    <div key={idx} className="bg-slate-900/30 border border-slate-800 rounded-lg p-2.5 flex items-start gap-2.5">
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
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono bg-slate-800 text-slate-400 uppercase">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
