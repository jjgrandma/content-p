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
  Cpu,
  Download
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'cosmic' | 'executive'>(() => {
    const saved = localStorage.getItem('socialvision-theme');
    return (saved === 'cosmic' || saved === 'executive') ? saved : 'cosmic';
  });

  const handleSetTheme = (newTheme: 'cosmic' | 'executive') => {
    setTheme(newTheme);
    localStorage.setItem('socialvision-theme', newTheme);
  };

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

  const handleDownloadCSV = () => {
    // 1. Column headers for general descriptors
    const metaHeaders = ["Metric Type", "Value", "Platform", "Published Date / Status"];
    const metaRows = [
      ["Export Context", selectedVideo ? selectedVideo.title : "Global Channel Aggregate Metrics", selectedVideo ? selectedVideo.platform : "All Platforms", selectedVideo ? selectedVideo.status : "Overall Active"],
      ["Total Views", activeSummary.totalViews.toLocaleString(), "", ""],
      ["Avg Retention / Watch Time", activeSummary.avgWatchTime, "", ""],
      ["Engagement Rate (%)", activeSummary.avgEngagementRate.toString(), "", ""],
      ["AI Predictive Score", activeSummary.aiPredictiveScoreAvg.toString(), "", ""],
      ["Total Likes", activeSummary.totalEngagements.toLocaleString(), "", ""],
      ["Total Comments", activeSummary.totalComments.toLocaleString(), "", ""],
      ["Total Shares", activeSummary.totalShares.toLocaleString(), "", ""],
    ];

    // 2. Trend data
    const trendHeaders = ["Day Index", "Cumulative Views", "Daily Engagement Volume"];
    const trendRows = activeChartData.map((d) => [
      d.day,
      d.views.toString(),
      d.engagement.toString()
    ]);

    // Build overall CSV string ensuring values with potential commas are properly quoted
    const escapeCSV = (val: string) => {
      const formatted = val.replace(/"/g, '""');
      return formatted.includes(',') || formatted.includes('\n') || formatted.includes('"') 
        ? `"${formatted}"` 
        : formatted;
    };

    let csvContent = "";
    
    // Add Metadata sector
    csvContent += "=== VIDEO PERFORMANCE OVERVIEW ===\n";
    csvContent += metaHeaders.map(escapeCSV).join(",") + "\n";
    metaRows.forEach(row => {
      csvContent += row.map(escapeCSV).join(",") + "\n";
    });
    
    csvContent += "\n=== 30-DAY INGESTION VELOCITY TRENDS ===\n";
    csvContent += trendHeaders.map(escapeCSV).join(",") + "\n";
    trendRows.forEach(row => {
      csvContent += row.map(escapeCSV).join(",") + "\n";
    });

    // Generate Blob and download trigger
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    // Custom file name
    const filename = selectedVideo
      ? `socialvision_video_${selectedVideo.id}_telemetry.csv`
      : "socialvision_global_channel_telemetry.csv";
      
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row antialiased font-sans transition-colors duration-300 ${
      theme === 'cosmic' 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-[#090d16] text-zinc-100'
    }`}>
      
      {/* 1. Mobile top navigation header */}
      <header className={`lg:hidden border-b px-5 py-3.5 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md transition-colors duration-300 ${
        theme === 'cosmic' ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-950/95 border-zinc-900'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            theme === 'cosmic' 
              ? 'bg-gradient-to-tr from-violet-600 to-pink-500 shadow-md shadow-violet-950/20' 
              : 'bg-gradient-to-tr from-cyan-600 to-teal-500 shadow-md shadow-cyan-950/10 border border-cyan-500/30'
          }`}>
            <Tv className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="font-display font-black text-sm tracking-tight">
            SOCIALVISION <span className={theme === 'cosmic' ? 'text-pink-400 font-bold text-[10px]' : 'text-cyan-400 font-bold text-[10px]'}>
              {theme === 'cosmic' ? 'PRO' : 'CORP'}
            </span>
          </span>
        </div>

        {/* Hamburger dropdown toggle */}
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className={`p-2 border rounded-lg transition-colors cursor-pointer ${
            theme === 'cosmic' 
              ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' 
              : 'bg-[#151f30] border-slate-850 text-slate-300 hover:text-cyan-300'
          }`}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* 2. Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 flex animate-fade-in">
          {/* Overlay mask */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu core sheet */}
          <div className="relative flex flex-col w-4/5 max-w-sm bg-slate-950 border-r border-slate-850">
            <Sidebar currentTab={currentTab} onTabChange={handleTabChange} theme={theme} setTheme={handleSetTheme} />
          </div>
        </div>
      )}

      {/* 3. Static Side Navigation Column (Desktop only) */}
      <aside className={`hidden lg:block w-[280px] shrink-0 border-r h-screen sticky top-0 transition-colors duration-300 ${
        theme === 'cosmic' ? 'border-slate-800' : 'border-zinc-805/80'
      }`}>
        <Sidebar currentTab={currentTab} onTabChange={handleTabChange} theme={theme} setTheme={handleSetTheme} />
      </aside>

      {/* 4. Principal Content Frame */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* Main section top content bar */}
        <div className={`border-b px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors duration-300 ${
          theme === 'cosmic' ? 'bg-slate-950/20 border-slate-900' : 'bg-slate-950/30 border-zinc-900/40'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded border transition-colors duration-300 ${
                theme === 'cosmic'
                  ? 'bg-violet-950/65 text-violet-405 border-violet-800/40'
                  : 'bg-cyan-950/45 text-cyan-405 border-cyan-800/50'
              }`}>
                ACTIVE LAB SESSION
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-500">Live Calibration OK</span>
            </div>
            
            <h2 className="font-display font-extrabold text-2xl tracking-tight mt-1">
              {currentTab === 'dashboard' && 'Core Operations Center'}
              {currentTab === 'insights' && 'Deep Video Analytics'}
              {currentTab === 'ml-tool' && 'Simulated Linguistic Tool'}
              {currentTab === 'settings' && 'Systems Calibration'}
            </h2>
            <p className="text-xs text-slate-450 font-sans mt-0.5">
              Analyze metrics, configure AI predictors, and visualize historical media arcs.
            </p>
          </div>

          {/* Context sensitive action header / user details */}
          <div className="flex items-center space-x-3 self-start">
            <button
              onClick={handleDownloadCSV}
              id="btn-download-csv"
              title="Export current metrics and trends as a CSV file"
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-xl border transition-all cursor-pointer shadow-md active:translate-y-0.5 select-none ${
                theme === 'cosmic'
                  ? 'bg-violet-600 hover:bg-violet-500 text-white border-violet-500 shadow-violet-950/20'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-555 shadow-cyan-950/20'
              }`}
            >
              <Download className="h-4 w-4 shrink-0" />
              <span>Download CSV</span>
            </button>
            <div className={`border rounded-xl px-3.5 py-1.5 text-xs font-sans flex items-center space-x-2 transition-colors duration-300 ${
              theme === 'cosmic' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-[#121c2c] border-slate-800/70 text-slate-300'
            }`}>
              <Calendar className={`h-4 w-4 shrink-0 ${theme === 'cosmic' ? 'text-violet-400' : 'text-cyan-450'}`} />
              <span className="font-mono">Time Frame: 2026-06-09</span>
            </div>
          </div>
        </div>

        {/* Global workspace panel */}
        <div className="flex-1 p-6 space-y-6">
          
          {/* Active filter banner alerting users they are looking at single-video telemetry */}
          {selectedVideo && currentTab === 'dashboard' && (
            <div className={`border p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg select-none transition-all duration-300 ${
              theme === 'cosmic'
                ? 'bg-gradient-to-r from-violet-950/40 to-slate-950/20 border-violet-850 text-violet-400'
                : 'bg-gradient-to-r from-cyan-950/30 to-slate-950/20 border-cyan-900/60 text-cyan-400'
            }`}>
              <div className="flex items-start sm:items-center space-x-3.5">
                <div className={`p-2.5 rounded-xl border shrink-0 transition-colors ${
                  theme === 'cosmic'
                    ? 'bg-violet-900/40 border-violet-800/40 text-violet-400'
                    : 'bg-cyan-900/40 border-cyan-800/40 text-cyan-400'
                }`}>
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">
                    Filtered view active — <span className={theme === 'cosmic' ? 'text-violet-450' : 'text-cyan-405'}>Analyzing: {selectedVideo.title}</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                    Stats cards and views trends calculations are dynamically scoped to this video's performance arc.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  theme === 'cosmic'
                    ? 'bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-300 border-slate-800'
                    : 'bg-[#101b2a] hover:bg-[#16253a] hover:text-white text-slate-305 border-slate-800'
                }`}
              >
                <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
                <span>Return to General Stats</span>
              </button>
            </div>
          )}

          {/* Main Switch router rendering contents based on currentTab */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {/* Row A: Total Views, Watch Time, Engagement, AI Predictive metrics cards */}
              <DashboardMetrics summary={activeSummary} theme={theme} />

              {/* Row B: Dual Axis Analytics trend diagram */}
              <AnalyticsCharts data={activeChartData} theme={theme} />

              {/* Row C: Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Column: List of social videos */}
                <div className="lg:col-span-5 h-[620px] shrink-0">
                  <VideoList 
                    videos={mockVideos} 
                    selectedVideoId={selectedVideo?.id || null} 
                    onSelectVideo={handleSelectVideo} 
                    theme={theme}
                  />
                </div>

                {/* Right Column: Simulated Machine Learning Prediction tool */}
                <div className="lg:col-span-7">
                  <MLPredictorPanel theme={theme} />
                </div>

              </div>
            </div>
          )}

          {currentTab === 'insights' && (
            <div className="animate-fade-in animate-duration-300">
              <VideoInsightsView 
                videos={mockVideos} 
                onSelectVideo={handleSelectVideo} 
                theme={theme}
              />
            </div>
          )}

          {currentTab === 'ml-tool' && (
            <div className="max-w-4xl animate-fade-in">
              <MLPredictorPanel theme={theme} />
            </div>
          )}

          {currentTab === 'settings' && (
            <div className="animate-fade-in animate-duration-300">
              <SettingsView theme={theme} />
            </div>
          )}

        </div>

        {/* Global Footer credits */}
        <footer className={`border-t px-6 py-4.5 text-[11px] text-slate-500 font-mono flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left shadow-inner transition-colors duration-300 ${
          theme === 'cosmic' ? 'bg-slate-950/20 border-slate-900/60' : 'bg-slate-950/50 border-zinc-900/50'
        }`}>
          <span>SOCIALVISION {theme === 'cosmic' ? 'PRO' : 'CORP'} ML ENGINE V2.4.0 • COLD CONSOLE ENCRYPTED</span>
          <span className="flex items-center justify-center gap-1">
            <Sparkles className={`h-3.5 w-3.5 ${theme === 'cosmic' ? 'text-violet-500' : 'text-cyan-500'}`} />
            Designed using atomic Tailwind core architecture & React hooks
          </span>
        </footer>

      </main>

    </div>
  );
}
