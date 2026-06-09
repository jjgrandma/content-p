import { useState, useMemo } from 'react';
import { Video } from '../types';
import { 
  ArrowUpDown, 
  Search, 
  Youtube, 
  Instagram, 
  Music, 
  Download, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { getThumbnailGradient } from '../data';

interface VideoInsightsViewProps {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
  theme?: 'cosmic' | 'executive';
}

type SortField = 'views' | 'likes' | 'comments' | 'shares' | 'engagementRate' | 'duration';
type SortOrder = 'asc' | 'desc';

export default function VideoInsightsView({ videos, onSelectVideo, theme = 'cosmic' }: VideoInsightsViewProps) {
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState<'All' | 'YouTube' | 'TikTok' | 'Instagram'>('All');
  const [sortField, setSortField] = useState<SortField>('views');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Trigger spreadsheet sorting or reverse
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Filter & sort list of videos
  const processedVideos = useMemo(() => {
    let result = videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase());
      const matchesPlatform = platform === 'All' || video.platform === platform;
      return matchesSearch && matchesPlatform;
    });

    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [videos, search, platform, sortField, sortOrder]);

  const PlatformIcon = ({ p }: { p: Video['platform'] }) => {
    switch (p) {
      case 'YouTube': return <Youtube className="h-4 w-4 text-red-500" />;
      case 'Instagram': return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'TikTok': return <Music className="h-4 w-4 text-cyan-400" />;
    }
  };

  return (
    <div id="video-insights-view" className="space-y-5 animate-fade-in font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-semibold text-lg text-white">
            Performance Core Telemetry
          </h3>
          <p className="text-xs text-slate-400">
            Interactive tabular listing. Click on any row to load granular graph views.
          </p>
        </div>
        
        {/* CSV export button simulation */}
        <button className="flex items-center space-x-1.5 self-start text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3.5 py-1.8 hover:bg-slate-850 rounded-xl transition duration-150 shadow-xs">
          <Download className="h-4 w-4 text-slate-400" />
          <span>Export telemetry CSV</span>
        </button>
      </div>

      <div className={`border rounded-2xl p-5 shadow-xl space-y-4 transition-colors duration-300 ${
        theme === 'cosmic'
          ? 'bg-slate-950/40 border-slate-800'
          : 'bg-[#121c2d]/50 border border-slate-850/80'
      }`}>
        {/* Table Filters control row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-905 pb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search table by header or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full border rounded-lg pl-9 pr-4 py-2 text-xs placeholder:text-slate-550 focus:outline-none transition-colors duration-305 ${
                theme === 'cosmic'
                  ? 'bg-slate-900 border-slate-855 text-slate-100 focus:border-slate-700'
                  : 'bg-[#15233c] border-slate-800/60 text-zinc-100 focus:border-slate-700'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 animate-fade-in">
            <SlidersHorizontal className="h-4 w-4 text-slate-500 shrink-0" />
            <div className={`border p-0.5 rounded-lg select-none flex ${
              theme === 'cosmic' ? 'bg-slate-900 border-slate-850' : 'bg-[#15233c] border-slate-800/60'
            }`}>
              {(['All', 'YouTube', 'TikTok', 'Instagram'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-3 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                    platform === p
                      ? theme === 'cosmic'
                        ? 'bg-slate-850 text-white'
                        : 'bg-[#22334e] text-cyan-300'
                      : 'text-slate-400 hover:text-slate-205'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabular Grid */}
        <div className="overflow-x-auto rounded-xl border border-slate-900 bg-slate-950/20">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-900 text-[10px] font-mono text-slate-400 uppercase tracking-wider bg-slate-950/40 select-none">
                <th className="py-3 px-4">Draft Video Title</th>
                <th className="py-3 px-3 cursor-pointer hover:text-slate-200 transition-colors" onClick={() => handleSort('duration')}>
                  <span className="flex items-center gap-1">Duration <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="py-3 px-3 cursor-pointer hover:text-slate-200 transition-colors text-right" onClick={() => handleSort('views')}>
                  <span className="flex items-center gap-1 justify-end">Views <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="py-3 px-3 cursor-pointer hover:text-slate-200 transition-colors text-right" onClick={() => handleSort('likes')}>
                  <span className="flex items-center gap-1 justify-end">Likes <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="py-3 px-3 cursor-pointer hover:text-slate-200 transition-colors text-right" onClick={() => handleSort('comments')}>
                  <span className="flex items-center gap-1 justify-end">Comments <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="py-3 px-3 cursor-pointer hover:text-slate-200 transition-colors text-right" onClick={() => handleSort('engagementRate')}>
                  <span className="flex items-center gap-1 justify-end">Rate <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="py-3 px-4 text-center">Diagnostics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-xs text-slate-300">
              {processedVideos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-sans">
                    No matching records resolved within the active query parameters.
                  </td>
                </tr>
              ) : (
                processedVideos.map((video) => {
                  const gradient = getThumbnailGradient(video.thumbnailUrl);
                  return (
                    <tr 
                      key={video.id} 
                      onClick={() => onSelectVideo(video)}
                      className="hover:bg-slate-900/35 transition-colors cursor-pointer"
                    >
                      {/* Video info thumbnail col */}
                      <td className="py-3 px-4 max-w-sm">
                        <div className="flex items-center space-x-3">
                          <div className={`h-8 w-14 shrink-0 rounded bg-gradient-to-tr border ${gradient}`} />
                          <div className="min-w-0">
                            <span className="block font-medium text-slate-200 leading-snug truncate">
                              {video.title}
                            </span>
                            <div className="flex items-center space-x-1.5 mt-0.5">
                              <PlatformIcon p={video.platform} />
                              <span className="text-[10px] font-mono text-slate-550">{video.publishDate}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Duration col */}
                      <td className="py-3 px-3 font-mono text-slate-400">
                        {video.duration >= 60 ? `${Math.floor(video.duration/60)}m ${video.duration%60}s` : `${video.duration}s`}
                      </td>

                      {/* Views col */}
                      <td className="py-3 px-3 text-right font-mono font-medium text-slate-100">
                        {video.views.toLocaleString()}
                      </td>

                      {/* Likes cols */}
                      <td className="py-3 px-3 text-right font-mono text-slate-350">
                        {video.likes.toLocaleString()}
                      </td>

                      {/* Comments col */}
                      <td className="py-3 px-3 text-right font-mono text-slate-350">
                        {video.comments.toLocaleString()}
                      </td>

                      {/* Engagement Rate col */}
                      <td className="py-3 px-3 text-right font-mono font-semibold text-emerald-400">
                        {video.engagementRate}%
                      </td>

                      {/* View Link col */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={(e) => { e.stopPropagation(); onSelectVideo(video); }}
                          className="inline-flex items-center space-x-1 text-[11px] font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                        >
                          <span>Load Dashboard</span>
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
