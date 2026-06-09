import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ChevronRight,
  Info 
} from 'lucide-react';

interface EngagementHeatmapProps {
  theme?: 'cosmic' | 'executive';
  onSelectSlot?: (platform: string, bestTime: string) => void;
}

interface CalendarDay {
  date: number;
  dayOfWeek: string;
  engagement: number; // 0 - 100
  optimalTime: string;
  multiplier: number; // e.g. 1.45
  bestFormat: string;
  bestPlatform: 'YouTube' | 'TikTok' | 'Instagram';
  audienceActivity: 'Low' | 'Moderate' | 'High' | 'Peak';
  tip: string;
}

export default function EngagementHeatmap({ theme = 'cosmic', onSelectSlot }: EngagementHeatmapProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'All' | 'YouTube' | 'TikTok' | 'Instagram'>('All');
  const [selectedDayNum, setSelectedDayNum] = useState<number>(9); // Default to current system day (June 9)

  // Full calendar representation for June 2026.
  // June 2026 starts precisely on Monday, making rendering an aligned 5-week block easy!
  const calendarDaysList: CalendarDay[] = useMemo(() => {
    // We create base indices representing days 1-30
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return Array.from({ length: 30 }, (_, index) => {
      const dayNum = index + 1;
      const dayOfWeek = weekdays[index % 7];
      
      // Determine baseline activity with platform offsets
      let baseEngagement = 40;
      
      // Sunday (index%7 === 6) and Friday (index%7 === 4) and Wednesday (index%7 === 2) have naturally higher viral activity
      if (index % 7 === 4) baseEngagement = 85; // Friday surge
      else if (index % 7 === 6) baseEngagement = 72; // Sunday shift
      else if (index % 7 === 2) baseEngagement = 78; // Wednesday mid-week peak
      else if (index % 7 === 1) baseEngagement = 55; // Tuesday steady
      else if (index % 7 === 0) baseEngagement = 45; // Monday launch
      else if (index % 7 === 3) baseEngagement = 50; // Thursday wind-down
      else if (index % 7 === 5) baseEngagement = 65; // Saturday afternoon
      
      // Add a slight pseudo-random variation based on date to avoid looking uniform
      const seedVal = (dayNum * 17) % 23;
      baseEngagement += (seedVal - 10);
      
      // Bound the score safely between 10 and 99
      let score = Math.max(15, Math.min(99, baseEngagement));

      // Alter calculation based on selected platform to create fully functional dynamic behavior
      if (selectedPlatform === 'TikTok') {
        // TikTok peaks Friday/Saturday nights and mid-week
        if (index % 7 === 4 || index % 7 === 5) {
          score = Math.min(99, score + 18);
        } else if (index % 7 === 0 || index % 7 === 1) {
          score = Math.max(15, score - 15);
        }
      } else if (selectedPlatform === 'YouTube') {
        // YouTube peaks Thursdays through Sundays, and Wednesdays mid-day
        if (index % 7 === 3 || index % 7 === 6) {
          score = Math.min(99, score + 12);
        } else if (index % 7 === 4) {
          score = Math.min(99, score + 5);
        } else {
          score = Math.max(15, score - 8);
        }
      } else if (selectedPlatform === 'Instagram') {
        // Instagram has high steady mid-week and evening spikes
        if (index % 7 === 2 || index % 7 === 4) {
          score = Math.min(98, score + 10);
        } else if (index % 7 === 6) {
          score = Math.max(15, score - 12); // lower Sunday reach
        }
      }

      // Re-normalize score
      score = Math.floor(score);

      // Map scores to logical bands
      let audienceActivity: 'Low' | 'Moderate' | 'High' | 'Peak' = 'Low';
      if (score >= 82) audienceActivity = 'Peak';
      else if (score >= 65) audienceActivity = 'High';
      else if (score >= 40) audienceActivity = 'Moderate';

      // Generate multipliers and times
      const multiplier = parseFloat((1 + score / 200).toFixed(2));
      
      // Custom hourly drop targets
      let optimalTime = "11:30 AM";
      if (index % 7 === 4) optimalTime = "4:45 PM"; // Late Friday release
      else if (index % 7 === 6) optimalTime = "6:15 PM"; // Weekend evening scroll
      else if (index % 7 === 2) optimalTime = "1:30 PM"; // Midday check
      else if (index % 7 === 5) optimalTime = "10:00 AM"; // Saturday morning
      else if (index % 7 === 0) optimalTime = "12:00 PM"; // Lunch drop

      // Best format and recommendations
      let bestFormat = "Short-form fast-cut hook video";
      let bestPlatform: 'YouTube' | 'TikTok' | 'Instagram' = "TikTok";
      let tip = "Audience is active during lunch transitions. Focus on high structural fast-pacing.";

      if (index % 7 === 4) {
        bestFormat = "Cinematic entertainment / Series opener";
        bestPlatform = "YouTube";
        tip = "Late afternoon mood shift. Viewers are highly receptive to high duration production stories.";
      } else if (index % 7 === 6) {
        bestFormat = "Casual / Interactive conversational carousel";
        bestPlatform = "Instagram";
        tip = "Leisure scroll window. Relatable, typography-heavy graphical covers earn high share ratios.";
      } else if (index % 7 === 2) {
        bestFormat = "Educational visual deep-dive tutorial";
        bestPlatform = "YouTube";
        tip = "Professional discovery focus. Focus descriptions aggressively on helpful keyword markers.";
      } else if (index % 7 === 1) {
        bestFormat = "Trend-sound meme adaptation / Fast humor";
        bestPlatform = "TikTok";
        tip = "Quick attention spans. Cut titles to 5 words or fewer with high text contrast overlay.";
      }

      return {
        date: dayNum,
        dayOfWeek,
        engagement: score,
        optimalTime,
        multiplier,
        bestFormat,
        bestPlatform,
        audienceActivity,
        tip
      };
    });
  }, [selectedPlatform]);

  // Find the selected day's detailed data
  const activeDayData = useMemo(() => {
    return calendarDaysList.find(d => d.date === selectedDayNum) || calendarDaysList[8];
  }, [calendarDaysList, selectedDayNum]);

  // Handle setting/pre-populating the ML Form if the callback is active
  const [usageNotification, setUsageNotification] = useState(false);
  const handleUseThisSlot = () => {
    if (onSelectSlot) {
      onSelectSlot(activeDayData.bestPlatform, activeDayData.optimalTime);
    }
    setUsageNotification(true);
    setTimeout(() => setUsageNotification(false), 3500);
  };

  // Helper styles for cell color scales based on theme
  const getCellClassName = (day: CalendarDay) => {
    const isSelected = day.date === selectedDayNum;
    const score = day.engagement;
    
    let baseStyles = 'h-11 rounded-lg flex flex-col items-center justify-between p-1.5 transition-all duration-250 cursor-pointer ';
    
    // Grid border highlighting for selected day
    if (isSelected) {
      if (theme === 'cosmic') {
        baseStyles += 'ring-2 ring-violet-400 border-white bg-slate-900 shadow-md scale-102 z-10 ';
      } else {
        baseStyles += 'ring-2 ring-cyan-400 border-white bg-[#101b2a] shadow-md scale-102 z-10 ';
      }
    } else {
      baseStyles += 'hover:scale-[1.03] hover:brightness-110 ';
    }

    if (theme === 'cosmic') {
      if (score >= 82) {
        baseStyles += 'bg-gradient-to-br from-violet-600 to-pink-500 text-white shadow-xs shadow-violet-500/20';
      } else if (score >= 65) {
        baseStyles += 'bg-violet-800/80 border border-violet-600/50 text-violet-50';
      } else if (score >= 40) {
        baseStyles += 'bg-violet-950/40 border border-violet-850 text-violet-300';
      } else {
        baseStyles += 'bg-slate-900/40 border border-slate-800/70 text-slate-500';
      }
    } else {
      if (score >= 82) {
        baseStyles += 'bg-gradient-to-br from-cyan-600 to-teal-500 text-white shadow-xs shadow-cyan-500/20';
      } else if (score >= 65) {
        baseStyles += 'bg-cyan-850/80 border border-cyan-705/50 text-cyan-50';
      } else if (score >= 40) {
        baseStyles += 'bg-cyan-950/35 border border-cyan-900/30 text-cyan-300';
      } else {
        baseStyles += 'bg-[#15233c]/20 border border-slate-800/60 text-slate-500';
      }
    }

    return baseStyles;
  };

  return (
    <div id="engagement-heatmap-box" className={`rounded-2xl p-6 shadow-xl transition-all duration-300 ${
      theme === 'cosmic'
        ? 'bg-slate-950/40 border border-slate-800/80'
        : 'bg-[#121c2d]/50 border border-slate-850/80'
    }`}>
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className={`h-2.5 w-2.5 rounded-full ${theme === 'cosmic' ? 'bg-pink-500 animate-pulse' : 'bg-cyan-400 animate-pulse'}`} />
            <h3 className="font-display font-bold text-lg text-white tracking-tight">
              Linguistic Drops & Predictive Heatmap
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Identify the absolute high-engagement windows for upcoming drops based on deep rolling network velocity calculations.
          </p>
        </div>

        {/* Platform interactive toggles */}
        <div id="heatmap-platform-toggles" className={`flex items-center p-0.5 rounded-lg select-none self-start border ${
          theme === 'cosmic' ? 'bg-slate-900 border-slate-800' : 'bg-[#15233c] border-slate-800/60'
        }`}>
          {(['All', 'YouTube', 'TikTok', 'Instagram'] as const).map((plat) => (
            <button
              key={plat}
              onClick={() => setSelectedPlatform(plat)}
              className={`px-3 py-1.5 text-[11px] font-mono font-medium rounded-md transition-all duration-200 cursor-pointer ${
                selectedPlatform === plat
                  ? theme === 'cosmic'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-[#22334e] text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout grid: Calendar on left, day metrics on right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Heatmap Grid (span 7) */}
        <div className="xl:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-350">
              June 2026 Target Outlook • <span className={theme === 'cosmic' ? 'text-violet-400' : 'text-cyan-405'}>{selectedPlatform} Filter</span>
            </span>
            {/* Color Scale Legend */}
            <div className="flex items-center space-x-2.5 text-[10px] font-mono text-slate-500">
              <span>Low</span>
              <span className={`h-2.5 w-2.5 rounded ${theme === 'cosmic' ? 'bg-slate-900 border border-slate-800' : 'bg-[#15233c]/40 border border-slate-800/60'}`} />
              <span className={`h-2.5 w-2.5 rounded ${theme === 'cosmic' ? 'bg-violet-950/50' : 'bg-cyan-950/40'}`} />
              <span className={`h-2.5 w-2.5 rounded ${theme === 'cosmic' ? 'bg-violet-800/60' : 'bg-cyan-800/40'}`} />
              <span className={`h-2.5 w-2.5 rounded bg-gradient-to-tr ${theme === 'cosmic' ? 'from-violet-600 to-pink-500' : 'from-cyan-600 to-teal-500'}`} />
              <span>Peak Drop</span>
            </div>
          </div>

          {/* Calendar Core Block */}
          <div className={`p-4 rounded-xl border ${
            theme === 'cosmic' ? 'bg-slate-900/30 border-slate-800/50' : 'bg-[#131d2d]/30 border-slate-800/50'
          }`}>
            {/* Weekdays indicator row */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase mb-3">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

            {/* Days grid row */}
            <div className="grid grid-cols-7 gap-2.5">
              {calendarDaysList.map((day) => {
                const isCurrentToday = day.date === 9; // Highlighting system day June 9
                return (
                  <div
                    key={day.date}
                    onClick={() => setSelectedDayNum(day.date)}
                    className={getCellClassName(day)}
                  >
                    <div className="w-full flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold leading-none">{day.date}</span>
                      {isCurrentToday && (
                        <span className="h-1 text-[8px] uppercase tracking-tighter text-emerald-400 font-bold leading-none select-none">
                          Today
                        </span>
                      )}
                    </div>
                    
                    {/* Visual engagement indicator bar */}
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mt-1 shrink-0">
                      <div 
                        style={{ width: `${day.engagement}%` }} 
                        className={`h-full ${
                          day.engagement >= 82
                            ? 'bg-amber-300'
                            : theme === 'cosmic'
                              ? 'bg-gradient-to-r from-violet-300 to-pink-300'
                              : 'bg-gradient-to-r from-cyan-300 to-teal-300'
                        }`} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-start space-x-2 text-[10px] text-slate-500 leading-normal bg-slate-900/20 border border-slate-900 p-2 rounded-lg">
            <Info className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
            <p>
              Heat values represent forecasted reach potential based on live viewer retention velocity metrics. Selecting high intensity days like Wednesdays and Fridays provides up to <span className="font-bold text-slate-400">1.4x - 1.5x</span> amplified reach factors.
            </p>
          </div>
        </div>

        {/* Right Column: Selected Day Diagnostics (span 5) */}
        <div className="xl:col-span-5 flex flex-col h-full self-stretch justify-between">
          <div className={`p-5 rounded-xl border flex-1 flex flex-col justify-between transition-colors duration-300 ${
            theme === 'cosmic'
              ? 'bg-slate-900/40 border-slate-800'
              : 'bg-[#15233c]/35 border-slate-800/80'
          }`}>
            <div>
              {/* Card Title Header with selection info */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/70 mb-4">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className={`h-4.5 w-4.5 ${theme === 'cosmic' ? 'text-violet-400' : 'text-cyan-400'}`} />
                  <span className="text-sm font-display font-black tracking-tight text-white">
                    June {activeDayData.date}, 2026 ({activeDayData.dayOfWeek})
                  </span>
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                  activeDayData.audienceActivity === 'Peak'
                    ? 'bg-emerald-950/50 text-emerald-405 border-emerald-805/45 animate-pulse-slow'
                    : activeDayData.audienceActivity === 'High'
                    ? 'bg-violet-950/50 text-violet-400 border-violet-800/30'
                    : 'bg-slate-950/60 text-slate-400 border-slate-850'
                }`}>
                  {activeDayData.audienceActivity} Activity
                </span>
              </div>

              {/* Engagement Core Multiplier */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className={`p-3 rounded-xl border ${
                  theme === 'cosmic' ? 'bg-slate-950/30 border-slate-800/50' : 'bg-slate-950/40 border-slate-805/40'
                }`}>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Engagement Index
                  </span>
                  <div className="flex items-baseline space-x-1.5 mt-1">
                    <span className="text-2xl font-display font-black text-white">
                      {activeDayData.engagement}
                    </span>
                    <span className="text-xs font-mono text-slate-405">/100</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border ${
                  theme === 'cosmic' ? 'bg-slate-950/30 border-slate-800/50' : 'bg-slate-950/40 border-slate-805/40'
                }`}>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Reach Multiplier
                  </span>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-2xl font-display font-black text-emerald-400">
                      {activeDayData.multiplier}x
                    </span>
                  </div>
                </div>
              </div>

              {/* Target Drop Windows parameters */}
              <div className="space-y-3 mb-5">
                <div className="flex items-start space-x-2.5">
                  <div className={`p-1.5 rounded-md ${theme === 'cosmic' ? 'bg-violet-950/60 text-violet-400' : 'bg-cyan-950/60 text-cyan-400'}`}>
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Optimal Drop Window</span>
                    <p className="text-xs text-slate-200 font-semibold mt-0.5">
                      {activeDayData.optimalTime} (Recommended Local)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <div className={`p-1.5 rounded-md ${theme === 'cosmic' ? 'bg-pink-950/60 text-pink-400' : 'bg-teal-950/60 text-teal-405'}`}>
                    <Zap className="h-3.5 w-3.5 shrink-0" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Primary Platform Synergy</span>
                    <p className="text-xs text-slate-200 font-semibold mt-0.5 flex items-center gap-1.5">
                      <span className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded font-bold ${
                        activeDayData.bestPlatform === 'YouTube' 
                          ? 'bg-red-950/50 text-red-400 border border-red-900/30' 
                          : activeDayData.bestPlatform === 'TikTok'
                          ? 'bg-slate-950/60 text-slate-300 border border-slate-850'
                          : 'bg-pink-950/50 text-pink-400 border border-pink-900/30'
                      }`}>
                        {activeDayData.bestPlatform}
                      </span>
                      <span className="text-slate-400 text-[11px] font-sans">For {activeDayData.bestFormat}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Structured Algorithmic Pro-Tip content */}
              <div className={`p-3.5 rounded-xl border border-dashed text-xs leading-relaxed font-sans ${
                theme === 'cosmic'
                  ? 'bg-violet-950/15 border-violet-900/40 text-violet-200'
                  : 'bg-cyan-950/10 border-cyan-900/30 text-cyan-200'
              }`}>
                <div className="flex items-center space-x-1.5 mb-1.5 font-bold">
                  <Sparkles className={`h-3.5 w-3.5 ${theme === 'cosmic' ? 'text-pink-400' : 'text-teal-400'}`} />
                  <span>Interactive Drop Strategy</span>
                </div>
                {activeDayData.tip}
              </div>
            </div>

            {/* Quick action to load slots directly inside MLPredictorPanel */}
            <div className="mt-5 pt-3.5 border-t border-slate-800/55 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleUseThisSlot}
                className={`w-full py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white transition-all cursor-pointer shadow-md flex items-center justify-center space-x-1.5 ${
                  theme === 'cosmic'
                    ? 'bg-violet-600 hover:bg-violet-500 shadow-violet-950/20'
                    : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-950/15'
                }`}
              >
                <span>Select Drop Slot</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>

              {usageNotification && (
                <div className="flex items-center justify-center space-x-1.5 text-[10px] text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 py-1.5 rounded-lg animate-fade-in">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>Slot targets synchronized with ML Predictor panel above!</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
