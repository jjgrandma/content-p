import { useState, useMemo } from 'react';
import { SidebarTab, Video, ChartDataPoint, MetricSummary } from './types';
import { mockVideos, mockSummary, mockChartData } from './data';
import Sidebar from './components/Sidebar';
import DashboardMetrics from './components/DashboardMetrics';
import AnalyticsCharts from './components/AnalyticsCharts';
import VideoList from './components/VideoList';
import MLPredictorPanel from './components/MLPredictorPanel';
import SettingsView from './components/SettingsView';
import VideoInsightsView from './components/VideoInsightsView';
import { 
  Menu, 
  X, 
  Sparkles, 
  Zap, 
  ShieldAlert, 
  RefreshCw, 
  ArrowLeft,
  Tv,
  Eye,
  Clock,
  Calendar,
  Layers,
  Cpu
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<SidebarTab>('dashboard');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Derive active summary statistics depending on selected video filter
  const activeSummary = useMemo<MetricSummary>(() => {
    if (!selectedVideo) {
      return mockSummary;
    }

    // Calculate simulated metrics for a single selected video view
    const commentsWeight = selectedVideo.comments * 8;
    const sharesWeight = selectedVideo.shares * 12;
    const engagementScoreNum = Math.min(Math.floor((selectedVideo.likes + commentsWeight + sharesWeight) / (selectedVideo.views || 1) * 100), 98) || 82;

    return {
      totalViews: selectedVideo.views,
      avgWatchTime: selectedVideo.watchTime,
      avgEngagementRate: selectedVideo.engagementRate,
      aiPredictiveScoreAvg: engagementScoreNum,
      totalEngagements: selectedVideo.likes,
      totalComments: selectedVideo.comments,
      totalShares: selectedVideo.shares
    };
  }, [selectedVideo]);

  // Derive chart dataset depending on selected video filter
  const activeChartData = useMemo<ChartDataPoint[]>(() => {
    if (!selectedVideo) {
      return mockChartData;
    }

    // Scaled analytics arc representing single video propagation over 30 days
    return mockChartData.map((d, index) => {
      const stepFactor = (index + 1) / 30;
      // Beautiful sigmoid-inspired S curve starting at 0 scaling up to video views
      const curveFactor = Math.sin((stepFactor * Math.PI) / 2);
      const viewsCurve = Math.floor(selectedVideo.views * curveFactor);
      
      // Engagement fluctuation derived from selected video specs
      const baseEngagement = (selectedVideo.views * (selectedVideo.engagementRate / 100)) / 30;
      const noise = (Math.sin(index * 2.3) + 1.2) * 0.45; // custom sin fluctuation noise
      const engagementVolume = Math.floor(baseEngagement * (1 + noise));

      return {
        day: d.day,
        views: viewsCurve,
        engagement: Math.max(engagementVolume, 5),
        shares: d.shares
      };
    });
  }, [selectedVideo]);

  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
    // Auto-navigate to dashboard to show telemetry details if selected elsewhere
    if (currentTab !== 'dashboard' && currentTab !== 'insights') {
      setCurrentTab('dashboard');
    }
  };

  const handleTabChange = (tab: SidebarTab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col lg:flex-row antialiased font-sans">
      
      {/* 1. Mobile top navigation header */}
      <header className="lg:hidden bg-slate-950/90 border-b border-slate-800 px-5 py-3.5 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center space-x-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center">
            <Tv className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="font-display font-black text-sm text-slate-100 tracking-tight">
            SOCIALVISION <span className="text-pink-400 text-[10px] font-bold">PRO</span>
          </span>
        </div>

        {/* Hamburger dropdown toggle */}
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-850"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* 2. Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 flex">
          {/* Overlay mask */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu core sheet */}
          <div className="relative flex flex-col w-4/5 max-w-sm bg-slate-950 border-r border-slate-850">
            <Sidebar currentTab={currentTab} onTabChange={handleTabChange} />
          </div>
        </div>
      )}

      {/* 3. Static Side Navigation Column (Desktop only) */}
      <aside className="hidden lg:block w-[280px] shrink-0 border-r border-slate-800 h-screen sticky top-0">
        <Sidebar currentTab={currentTab} onTabChange={handleTabChange} />
      </aside>

      {/* 4. Principal Content Frame */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* Main section top content bar */}
        <div className="bg-slate-950/20 border-b border-slate-900 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono bg-violet-950/60 text-violet-400 font-bold tracking-wider px-2 py-0.5 rounded border border-violet-800/40">
                ACTIVE LAB SESSION
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-500">Live Calibration OK</span>
            </div>
            
            <h2 className="font-display font-extrabold text-2xl text-slate-100 tracking-tight mt-1">
              {currentTab === 'dashboard' && 'Core Operations Center'}
              {currentTab === 'insights' && 'Deep Video Analytics'}
              {currentTab === 'ml-tool' && 'Simulated Linguistic Tool'}
              {currentTab === 'settings' && 'Systems Calibration'}
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Analyze metrics, configure AI predictors, and visualize historical media arcs.
            </p>
          </div>

          {/* Context sensitive action header / user details */}
          <div className="flex items-center space-x-3 self-start">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-1.5 text-xs text-slate-400 font-sans flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-violet-400 shrink-0" />
              <span className="font-mono text-slate-350">Time Frame: 2026-06-09</span>
            </div>
          </div>
        </div>

        {/* Global workspace panel */}
        <div className="flex-1 p-6 space-y-6">
          
          {/* Active filter banner alerting users they are looking at single-video telemetry */}
          {selectedVideo && currentTab === 'dashboard' && (
            <div className="bg-gradient-to-r from-violet-950/40 to-slate-950/20 border border-violet-850 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg select-none">
              <div className="flex items-start sm:items-center space-x-3.5">
                <div className="p-2.5 bg-violet-900/40 rounded-xl border border-violet-800/40 shrink-0 text-violet-400">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">
                    Filtered view active — <span className="text-violet-400">Analyzing: {selectedVideo.title}</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                    Stats cards and views trends calculations are dynamically scoped to this video's performance arc.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 hover:text-white text-xs font-semibold text-slate-300 rounded-lg border border-slate-800 transition-colors shrink-0"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-slate-400" />
                <span>Return to General Stats</span>
              </button>
            </div>
          )}

          {/* Main Switch router rendering contents based on currentTab */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Row A: Total Views, Watch Time, Engagement, AI Predictive metrics cards */}
              <DashboardMetrics summary={activeSummary} />

              {/* Row B: Dual Axis Analytics trend diagram */}
              <AnalyticsCharts data={activeChartData} />

              {/* Row C: Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Column: List of social videos */}
                <div className="lg:col-span-5 h-[620px] shrink-0">
                  <VideoList 
                    videos={mockVideos} 
                    selectedVideoId={selectedVideo?.id || null} 
                    onSelectVideo={handleSelectVideo} 
                  />
                </div>

                {/* Right Column: Simulated Machine Learning Prediction tool */}
                <div className="lg:col-span-7">
                  <MLPredictorPanel />
                </div>

              </div>
            </div>
          )}

          {currentTab === 'insights' && (
            <VideoInsightsView 
              videos={mockVideos} 
              onSelectVideo={handleSelectVideo} 
            />
          )}

          {currentTab === 'ml-tool' && (
            <div className="max-w-4xl">
              <MLPredictorPanel />
            </div>
          )}

          {currentTab === 'settings' && (
            <SettingsView />
          )}

        </div>

        {/* Global Footer credits */}
        <footer className="bg-slate-950/20 border-t border-slate-900/60 px-6 py-4.5 text-[11px] text-slate-500 font-mono flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left shadow-inner">
          <span>SOCIALVISION ML ENGINE V2.4.0 • COLD CONSOLE ENCRYPTED</span>
          <span className="flex items-center justify-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-violet-500" />
            Designed using atomic Tailwind core architecture & React hooks
          </span>
        </footer>

      </main>

    </div>
  );
}
