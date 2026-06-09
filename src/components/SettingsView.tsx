import { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Sliders, 
  Database, 
  Link2, 
  RefreshCw, 
  Key, 
  BellRing, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Brain, 
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Video
} from 'lucide-react';

interface SettingsViewProps {
  theme?: 'cosmic' | 'executive';
}

export default function SettingsView({ theme = 'cosmic' }: SettingsViewProps) {
  const [modelWeight, setModelWeight] = useState(85);
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const [isAlertEnabled, setIsAlertEnabled] = useState(true);
  const [apiKeyStatus, setApiKeyStatus] = useState('configured');
  const [selectedRecommendedModel, setSelectedRecommendedModel] = useState<string | null>('prophet');

  return (
    <div id="settings-container" className="space-y-6 max-w-4xl animate-fade-in font-sans">
      <div className="flex items-center space-x-2.5">
        <div className={`p-2 border rounded-lg transition-colors duration-300 ${
          theme === 'cosmic' ? 'bg-slate-900 border-slate-800' : 'bg-[#15233c] border-slate-800/60'
        }`}>
          <Settings className={`h-5 w-5 ${theme === 'cosmic' ? 'text-violet-400' : 'text-cyan-400'}`} />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-white">
            System Configuration
          </h3>
          <p className="text-xs text-slate-400">
            Define prediction sensitivities, active network models, and pipeline configurations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ML Calibration card */}
        <div className={`border rounded-xl p-5 space-y-4 transition-colors duration-300 ${
          theme === 'cosmic'
            ? 'bg-slate-950/40 border-slate-800'
            : 'bg-[#121c2d]/50 border-slate-850/80'
        }`}>
          <div className={`flex items-center space-x-2 pb-3 border-b ${
            theme === 'cosmic' ? 'text-violet-400 border-slate-900' : 'text-cyan-400 border-slate-900/65'
          }`}>
            <Sliders className="h-4.5 w-4.5" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">Model Tuning & Heuristics</h4>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-350 mb-1">
                <span>Engagement Influence Velocity</span>
                <span className={`font-mono font-bold ${theme === 'cosmic' ? 'text-violet-400' : 'text-cyan-400'}`}>{modelWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={modelWeight}
                onChange={(e) => setModelWeight(parseInt(e.target.value))}
                className={`w-full h-1 rounded-lg appearance-none cursor-pointer ${
                  theme === 'cosmic' ? 'bg-slate-800 accent-violet-600' : 'bg-[#15233c] accent-cyan-500'
                }`}
              />
              <span className="text-[10px] text-slate-500 block mt-1 leading-normal">Impact multiplier of thumbnail visual factors relative to title copy.</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-350 mb-1">
                <span>Target Confidence Threshold</span>
                <span className={`font-mono font-bold ${theme === 'cosmic' ? 'text-pink-400' : 'text-teal-405'}`}>{confidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                className={`w-full h-1 rounded-lg appearance-none cursor-pointer ${
                  theme === 'cosmic' ? 'bg-slate-800 accent-pink-500' : 'bg-[#15233c] accent-teal-400'
                }`}
              />
              <span className="text-[10px] text-slate-500 block mt-1 leading-normal">Minimum statistical threshold for predictive optimization diagnostics.</span>
            </div>
          </div>
        </div>

        {/* Integration Hub card */}
        <div className={`border rounded-xl p-5 space-y-4 transition-colors duration-300 ${
          theme === 'cosmic'
            ? 'bg-slate-950/40 border-slate-800'
            : 'bg-[#121c2d]/50 border-slate-850/80'
        }`}>
          <div className={`flex items-center space-x-2 pb-3 border-b ${
            theme === 'cosmic' ? 'text-pink-405 border-slate-900' : 'text-teal-405 border-slate-900/65'
          }`}>
            <Database className="h-4.5 w-4.5" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">Integration API Pipelines</h4>
          </div>

          <div className="space-y-3">
            {/* YouTube active badge */}
            <div className={`flex items-center justify-between p-2.5 rounded-lg border ${
              theme === 'cosmic' ? 'border-slate-850 bg-slate-900/10' : 'border-slate-800/80 bg-[#15233c]/30'
            }`}>
              <div className="flex items-center space-x-3">
                <Link2 className="h-4 w-4 text-slate-500" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-200">Google Workspace Integrator</span>
                  <span className="text-[10px] text-slate-500">Auto-pull post schedule logs</span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                Synchronized
              </span>
            </div>

            {/* Platform credential keys */}
            <div className={`flex items-center justify-between p-2.5 rounded-lg border ${
              theme === 'cosmic' ? 'border-slate-850 bg-slate-900/10' : 'border-slate-800/80 bg-[#15233c]/30'
            }`}>
              <div className="flex items-center space-x-3">
                <Key className="h-4 w-4 text-slate-500" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-200">Gemini Neural Core</span>
                  <span className="text-[10px] text-slate-500">Advanced prediction vector APIs</span>
                </div>
              </div>
              <button 
                onClick={() => setApiKeyStatus(t => t === 'configured' ? 'inactive' : 'configured')}
                className={`text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded border transition-all cursor-pointer ${
                  apiKeyStatus === 'configured' 
                    ? theme === 'cosmic'
                      ? 'text-violet-400 bg-violet-950/45 border-violet-800/40' 
                      : 'text-cyan-400 bg-cyan-950/45 border-cyan-800/40'
                    : 'text-slate-500 bg-slate-900 border-slate-800'
                }`}
              >
                {apiKeyStatus === 'configured' ? 'Active System Key' : 'Input Key'}
              </button>
            </div>
          </div>
        </div>

        {/* GUIDES CARD: Quick Guide to Existing Trained Models (Recommended architectures) */}
        <div className={`md:col-span-2 border rounded-xl p-5 space-y-4 transition-colors duration-300 ${
          theme === 'cosmic'
            ? 'bg-slate-950/40 border-slate-800'
            : 'bg-[#121c2d]/50 border-slate-850/80'
        }`}>
          <div className={`flex items-center justify-between pb-3 border-b ${
            theme === 'cosmic' ? 'border-slate-900' : 'border-slate-900/65'
          }`}>
            <div className="flex items-center space-x-2 text-indigo-400">
              <BookOpen className={`h-4.5 w-4.5 ${theme === 'cosmic' ? 'text-violet-400' : 'text-cyan-400'}`} />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                Quick Guide to Existing Trained Models
              </h4>
            </div>
            <span className={`text-[10px] font-mono border px-2 py-0.5 rounded-md ${
              theme === 'cosmic'
                ? 'bg-violet-950/20 border-violet-900/30 text-violet-300'
                : 'bg-cyan-950/20 border-cyan-900/30 text-cyan-300'
            }`}>
              Production Architecture Roadmap
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-3xl">
            When you bridge your React.js frontend to a real backend database, use these already-trained, industry-standard models instead of wasting computing power building your own from block zero:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Model Option 1: Prophet */}
            <button
              type="button"
              onClick={() => setSelectedRecommendedModel('prophet')}
              className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between h-48 cursor-pointer ${
                selectedRecommendedModel === 'prophet'
                  ? theme === 'cosmic'
                    ? 'bg-violet-950/15 border-violet-500 shadow-md ring-1 ring-violet-500/20'
                    : 'bg-cyan-950/15 border-cyan-500 shadow-md ring-1 ring-cyan-500/20'
                  : theme === 'cosmic'
                    ? 'bg-slate-900/25 border-slate-850 hover:bg-slate-900/50 hover:border-slate-700'
                    : 'bg-[#15233c]/20 border-slate-800/60 hover:bg-[#15233c]/40 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${theme === 'cosmic' ? 'bg-violet-950/55 text-violet-405' : 'bg-cyan-950/55 text-cyan-405'}`}>
                    <TrendingUp className="h-4 w-4 shrink-0" />
                  </div>
                  <span className="text-[9px] uppercase font-mono font-bold py-0.5 px-2 bg-emerald-950 text-emerald-400 rounded">
                    Pre-Trained
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white font-sans mt-1">
                  View & Engagement
                </h5>
                <p className="text-[11px] text-slate-400 leading-normal mt-1 flex flex-wrap">
                  Utilize Meta's <span className={`font-mono font-semibold ml-1 ${theme === 'cosmic' ? 'text-violet-300' : 'text-cyan-305'}`}>Prophet Model</span>.
                </p>
              </div>
              <span className="text-[10px] text-slate-500 font-sans border-t border-slate-800/55 pt-2 mt-auto w-full flex items-center justify-between">
                <span>Time-Series Outlook</span>
                <ChevronRight className="h-3 w-3 text-slate-500 shrink-0" />
              </span>
            </button>

            {/* Model Option 2: Video Intelligence */}
            <button
              type="button"
              onClick={() => setSelectedRecommendedModel('video-intelligence')}
              className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between h-48 cursor-pointer ${
                selectedRecommendedModel === 'video-intelligence'
                  ? theme === 'cosmic'
                    ? 'bg-violet-950/15 border-violet-500 shadow-md ring-1 ring-violet-500/20'
                    : 'bg-cyan-950/15 border-cyan-500 shadow-md ring-1 ring-cyan-500/20'
                  : theme === 'cosmic'
                    ? 'bg-slate-900/25 border-slate-850 hover:bg-slate-900/50 hover:border-slate-700'
                    : 'bg-[#15233c]/20 border-slate-800/60 hover:bg-[#15233c]/40 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${theme === 'cosmic' ? 'bg-pink-950/55 text-pink-405' : 'bg-teal-950/55 text-teal-405'}`}>
                    <Video className="h-4 w-4 shrink-0" />
                  </div>
                  <span className="text-[9px] uppercase font-mono font-bold py-0.5 px-2 bg-pink-950 text-pink-400 rounded">
                    Cloud Core API
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white font-sans mt-1">
                  Video Content Analysis
                </h5>
                <p className="text-[11px] text-slate-400 leading-normal mt-1 flex flex-wrap">
                  Integrate GCP <span className={`font-mono font-semibold ml-1 ${theme === 'cosmic' ? 'text-pink-300' : 'text-teal-300'}`}>Video Intelligence</span>.
                </p>
              </div>
              <span className="text-[10px] text-slate-500 font-sans border-t border-slate-800/55 pt-2 mt-auto w-full flex items-center justify-between">
                <span>Object & Motion Classifiers</span>
                <ChevronRight className="h-3 w-3 text-slate-500 shrink-0" />
              </span>
            </button>

            {/* Model Option 3: Transformers */}
            <button
              type="button"
              onClick={() => setSelectedRecommendedModel('transformers')}
              className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between h-48 cursor-pointer ${
                selectedRecommendedModel === 'transformers'
                  ? theme === 'cosmic'
                    ? 'bg-violet-950/15 border-violet-500 shadow-md ring-1 ring-violet-500/20'
                    : 'bg-cyan-950/15 border-cyan-500 shadow-md ring-1 ring-cyan-500/20'
                  : theme === 'cosmic'
                    ? 'bg-slate-900/25 border-slate-850 hover:bg-slate-900/50 hover:border-slate-700'
                    : 'bg-[#15233c]/20 border-slate-800/60 hover:bg-[#15233c]/40 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${theme === 'cosmic' ? 'bg-amber-950/55 text-amber-400' : 'bg-teal-950/55 text-teal-400'}`}>
                    <MessageSquare className="h-4 w-4 shrink-0" />
                  </div>
                  <span className="text-[9px] uppercase font-mono font-bold py-0.5 px-2 bg-indigo-950 text-indigo-400 rounded">
                    NLP Core
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white font-sans mt-1">
                  Text & Caption Analysis
                </h5>
                <p className="text-[11px] text-slate-400 leading-normal mt-1 flex flex-wrap">
                  Leverage Hugging Face <span className={`font-mono font-semibold ml-1 ${theme === 'cosmic' ? 'text-amber-305' : 'text-teal-300'}`}>Transformers</span>.
                </p>
              </div>
              <span className="text-[10px] text-slate-500 font-sans border-t border-slate-800/55 pt-2 mt-auto w-full flex items-center justify-between">
                <span>Sentiment & Tone Vectors</span>
                <ChevronRight className="h-3 w-3 text-slate-500 shrink-0" />
              </span>
            </button>
          </div>

          {/* Interactive dynamic info drawer depending on active recommendation */}
          <div className={`p-4 rounded-xl border transition-all duration-300 font-sans ${
            theme === 'cosmic'
              ? 'bg-slate-900/50 border-slate-800/80 text-violet-100'
              : 'bg-[#15233c]/40 border-slate-800/60 text-cyan-50'
          }`}>
            {selectedRecommendedModel === 'prophet' && (
              <div className="space-y-1 animate-fade-in text-xs">
                <div className="flex items-center space-x-2 font-bold mb-1.5 text-white font-display">
                  <TrendingUp className={`h-4 w-4 ${theme === 'cosmic' ? 'text-violet-405' : 'text-cyan-405'}`} />
                  <span>Meta's Prophet Model Forecasting Suite</span>
                </div>
                <p className="text-slate-350 leading-relaxed">
                  Meta's Prophet is an open-source, pre-trained time-series forecasting model optimized for seasonal trends. When coupled with a historical database (like Cloud SQL/Spanner), it is perfect for predicting future video view counts, subscriber thresholds, and rolling user counts based on past historical uploads.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 text-[10px] font-mono text-slate-400">
                  <div>
                    <span className="block text-slate-500 uppercase">Input Layer</span>
                    <span>Upload History logs</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 uppercase">Output Core</span>
                    <span>Trend lines & limits</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 uppercase">Typical Latency</span>
                    <span>~30ms per client turn</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 uppercase">System Cost</span>
                    <span>Fully open-source</span>
                  </div>
                </div>
              </div>
            )}

            {selectedRecommendedModel === 'video-intelligence' && (
              <div className="space-y-1 animate-fade-in text-xs">
                <div className="flex items-center space-x-2 font-bold mb-1.5 text-white font-display">
                  <Video className={`h-4 w-4 ${theme === 'cosmic' ? 'text-pink-400' : 'text-teal-400'}`} />
                  <span>Google Cloud Video Intelligence AI API</span>
                </div>
                <p className="text-slate-350 leading-relaxed">
                  The pre-trained Video Intelligence API is designed to inspect uploaded video binaries automatically. It detects change transitions, indexes on-screen text, labels thousands of visual assets/activities, and flags brand safety. Integrate this so users can map visual themes directly to real retention curves.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 text-[10px] font-mono text-slate-400">
                  <div>
                    <span className="block text-slate-500 uppercase">Feature detection</span>
                    <span>Motion tracking, Labeling</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 uppercase">Integration type</span>
                    <span>Server-side REST/gRPC</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 uppercase">Processing Speed</span>
                    <span>Asynchronous analysis</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 uppercase">Ideal for</span>
                    <span>Automated categorization</span>
                  </div>
                </div>
              </div>
            )}

            {selectedRecommendedModel === 'transformers' && (
              <div className="space-y-1 animate-fade-in text-xs">
                <div className="flex items-center space-x-2 font-bold mb-1.5 text-white font-display">
                  <MessageSquare className={`h-4 w-4 ${theme === 'cosmic' ? 'text-amber-400' : 'text-teal-400'}`} />
                  <span>Hugging Face Pre-Trained Transformers</span>
                </div>
                <p className="text-slate-350 leading-relaxed">
                  Linguistic optimization relies heavily on text semantics. Instead of training complex text blocks from scratch, load pre-trained transformers like <span className="font-semibold text-slate-200">RoBERTa</span> or <span className="font-semibold text-slate-200">FinBERT</span>. These allow you to extract keyword weightings, check caption hook frequencies, and sentiment-analyze viewers' comments instantly.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 text-[10px] font-mono text-slate-400">
                  <div>
                    <span className="block text-slate-500 uppercase">Model Size</span>
                    <span>~125M parameters</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 uppercase">Tasks supported</span>
                    <span>Sentiment, Intent, Tags</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 uppercase">Deployment</span>
                    <span>Pipelines API / server-side</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 uppercase">Analysis accuracy</span>
                    <span>&ge; 92.4% validation score</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security and notification settings */}
        <div className={`border rounded-xl p-5 space-y-4 md:col-span-2 transition-colors duration-300 ${
          theme === 'cosmic'
            ? 'bg-slate-950/40 border-slate-800'
            : 'bg-[#121c2d]/50 border-slate-850/80'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-sidebar-divider">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Shield className="h-4.5 w-4.5" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">System Preferences</h4>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-805/30">Secure Encryption AES-GCM</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-1">
              <div>
                <h5 className="font-semibold text-slate-200">Slack & Discord Notification Sync</h5>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">Send alert blocks to marketing channels when target videos hit "Viral" index clusters</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAlertEnabled(!isAlertEnabled)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isAlertEnabled 
                    ? theme === 'cosmic' ? 'bg-violet-600' : 'bg-cyan-600'
                    : 'bg-slate-800'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    isAlertEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-900 text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <BellRing className="h-4 w-4 text-amber-400 shrink-0" />
                Latest optimization rule sets synced
              </span>
              <button className={`flex items-center space-x-1.5 text-xs px-3 py-1.5 border rounded-lg transition-colors cursor-pointer ${
                theme === 'cosmic'
                  ? 'text-violet-400 hover:text-violet-350 bg-slate-900 hover:bg-slate-850 border-slate-800'
                  : 'text-cyan-400 hover:text-cyan-300 bg-[#15233c] hover:bg-[#182946] border-slate-800/80'
              }`}>
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Check Updates</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
