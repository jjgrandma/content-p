import { useState } from 'react';
import { Settings, Shield, Sliders, Database, Link2, RefreshCw, Key, BellRing, Sparkles } from 'lucide-react';

export default function SettingsView() {
  const [modelWeight, setModelWeight] = useState(85);
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const [isAlertEnabled, setIsAlertEnabled] = useState(true);
  const [apiKeyStatus, setApiKeyStatus] = useState('configured');

  return (
    <div id="settings-container" className="space-y-6 max-w-4xl animate-fade-in font-sans">
      <div className="flex items-center space-x-2.5">
        <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
          <Settings className="h-5 w-5 text-violet-400" />
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
        <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-violet-400 pb-3 border-b border-slate-900">
            <Sliders className="h-4.5 w-4.5" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">Model Tuning & Heuristics</h4>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-350 mb-1">
                <span>Engagement Influence Velocity</span>
                <span className="font-mono text-violet-400">{modelWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={modelWeight}
                onChange={(e) => setModelWeight(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
              />
              <span className="text-[10px] text-slate-550 block mt-1">Impact multiplier of thumbnail visual factors relative to title copy.</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-350 mb-1">
                <span>Target Confidence Threshold</span>
                <span className="font-mono text-pink-400">{confidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <span className="text-[10px] text-slate-550 block mt-1">Minimum statistical threshold for predictive optimization diagnostics.</span>
            </div>
          </div>
        </div>

        {/* Integration Hub card */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-pink-400 pb-3 border-b border-slate-900">
            <Database className="h-4.5 w-4.5" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">Integration API Pipelines</h4>
          </div>

          <div className="space-y-3">
            {/* YouTube active badge */}
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-850 bg-slate-900/10">
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
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-850 bg-slate-900/10">
              <div className="flex items-center space-x-3">
                <Key className="h-4 w-4 text-slate-500" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-200">Gemini Neural Core</span>
                  <span className="text-[10px] text-slate-500">Advanced prediction vector APIs</span>
                </div>
              </div>
              <button 
                onClick={() => setApiKeyStatus(t => t === 'configured' ? 'inactive' : 'configured')}
                className={`text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded border transition-all ${
                  apiKeyStatus === 'configured' 
                    ? 'text-violet-400 bg-violet-950/45 border-violet-800/40' 
                    : 'text-slate-500 bg-slate-900 border-slate-800'
                }`}
              >
                {apiKeyStatus === 'configured' ? 'Active System Key' : 'Input Key'}
              </button>
            </div>
          </div>
        </div>

        {/* Security and notification settings */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-5 space-y-4 md:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-900">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Shield className="h-4.5 w-4.5" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">System Preferences</h4>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">Secure Encryption AES-GCM</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-1">
              <div>
                <h5 className="font-semibold text-slate-200">Slack & Discord Notification Sync</h5>
                <p className="text-[10px] text-slate-500 mt-0.5">Send alert blocks to marketing channels when target videos hit "Viral" index clusters</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAlertEnabled(!isAlertEnabled)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isAlertEnabled ? 'bg-violet-600' : 'bg-slate-800'
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
              <span className="text-slate-400 flex items-center gap-1">
                <BellRing className="h-4 w-4 text-yellow-500" />
                Latest optimization rule sets synced
              </span>
              <button className="flex items-center space-x-1.5 text-xs text-violet-400 hover:text-violet-350 bg-slate-900 hover:bg-slate-850 px-3 py-1.5 border border-slate-800 rounded-lg transition-colors">
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
