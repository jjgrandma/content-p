import { useState, useMemo } from 'react';
import { Video } from '../types';
import { getThumbnailGradient } from '../data';
import { 
  Youtube, 
  Instagram, 
  Music, 
  Eye, 
  Zap, 
  Search, 
  Filter, 
  Clock, 
  Calendar,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface VideoListProps {
  videos: Video[];
  selectedVideoId: string | null;
  onSelectVideo: (video: Video) => void;
  theme?: 'cosmic' | 'executive';
}

export default function VideoList({ videos, selectedVideoId, onSelectVideo, theme = 'cosmic' }: VideoListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'All' | 'YouTube' | 'TikTok' | 'Instagram'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Viral' | 'Steady' | 'Needs Work'>('All');

  // Search and filter logic
  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform = platformFilter === 'All' || video.platform === platformFilter;
      const matchesStatus = statusFilter === 'All' || video.status === statusFilter;
      return matchesSearch && matchesPlatform && matchesStatus;
    });
  }, [videos, searchQuery, platformFilter, statusFilter]);

  // Transform duration in seconds to descriptive text
  const formatDuration = (secs: number): string => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    if (mins === 0) return `${remainingSecs}s`;
    return `${mins}m ${remainingSecs}s`;
  };

  // Icon mapping helper
  const PlatformIcon = ({ platform }: { platform: Video['platform'] }) => {
    switch (platform) {
      case 'YouTube':
        return <Youtube className="h-4 w-4 text-red-500 fill-red-500/10" />;
      case 'Instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'TikTok':
        return <Music className="h-4 w-4 text-cyan-400" />;
    }
  };

  return (
    <div id="video-list-panel" className={`p-5 shadow-xl flex flex-col h-[600px] rounded-2xl transition-colors duration-300 ${
      theme === 'cosmic'
        ? 'bg-slate-950/40 border border-slate-800/80'
        : 'bg-[#121c2d]/50 border border-slate-850/80'
    }`}>
      {/* Header and Counters */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-lg text-white tracking-tight">
            Published Content
          </h3>
          <p className="text-xs text-slate-405">
            Select a video below to view precise interactive telemetry.
          </p>
        </div>
        <div className={`border px-2.5 py-1 rounded-md text-xs font-mono transition-colors duration-300 ${
          theme === 'cosmic' 
            ? 'bg-slate-900 border-slate-800 text-violet-400' 
            : 'bg-[#15233c] border-slate-800/80 text-cyan-400'
        }`}>
          Showing {filteredVideos.length}/{videos.length}
        </div>
      </div>

      {/* Action bar: Search Input */}
      <div className="relative mb-3 animate-fade-in">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search videos by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full border rounded-xl pl-9 pr-4 py-2 text-sm placeholder:text-slate-500 focus:outline-none font-sans transition-colors duration-300 ${
            theme === 'cosmic'
              ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-slate-700'
              : 'bg-[#15233c] border-slate-800/60 text-zinc-100 focus:border-slate-700/80'
          }`}
        />
      </div>

      {/* Filter Chips row */}
      <div className="flex flex-wrap gap-1.5 mb-4 border-b border-slate-800/50 pb-3">
        <button
          onClick={() => setPlatformFilter('All')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
            platformFilter === 'All'
              ? 'bg-slate-800 text-white'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/40 hover:bg-slate-900'
          }`}
        >
          All Platforms
        </button>
        {(['YouTube', 'TikTok', 'Instagram'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPlatformFilter(p)}
            className={`flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
              platformFilter === p
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/40 hover:bg-slate-900'
            }`}
          >
            <PlatformIcon platform={p} />
            <span>{p}</span>
          </button>
        ))}
      </div>

      {/* Scrollable video items container */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-2">
        {filteredVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 border border-dashed border-slate-800 rounded-2xl p-6 text-center">
            <Filter className="h-8 w-8 text-slate-600 mb-2" />
            <h4 className="text-sm font-semibold text-slate-400">No active videos match filters</h4>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your query or platform filters.</p>
            <button 
              onClick={() => { setSearchQuery(''); setPlatformFilter('All'); setStatusFilter('All'); }}
              className="mt-3 flex items-center space-x-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset parameters</span>
            </button>
          </div>
        ) : (
          filteredVideos.map((video) => {
            const isSelected = selectedVideoId === video.id;
            const gradientStyle = getThumbnailGradient(video.thumbnailUrl);
            
            return (
              <div
                key={video.id}
                onClick={() => onSelectVideo(video)}
                className={`flex items-start gap-3 bg-slate-900/40 border p-3 rounded-xl cursor-pointer hover:bg-slate-900/80 transition-all duration-200 select-none ${
                  isSelected 
                    ? 'border-violet-600/90 bg-slate-900/90 shadow-[0_0_15px_rgba(124,58,237,0.1)]' 
                    : 'border-slate-800/80'
                }`}
              >
                {/* Simulated Thumbnail */}
                <div className={`relative h-[68px] w-[110px] shrink-0 rounded-lg overflow-hidden border bg-gradient-to-tr ${gradientStyle}`}>
                  {/* Decorative Play Ring overlay */}
                  <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
                    <div className="h-6 w-6 rounded-full bg-black/40 border border-white/20 flex items-center justify-center backdrop-blur-xs">
                      <PlatformIcon platform={video.platform} />
                    </div>
                  </div>
                  {/* Duration overlay badge */}
                  <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-xs px-1 py-0.5 rounded text-[9px] text-slate-200 font-mono flex items-center space-x-0.5">
                    <Clock className="h-2.5 w-2.5" />
                    <span>{formatDuration(video.duration)}</span>
                  </div>
                </div>

                {/* Content details Column */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center space-x-1">
                      <PlatformIcon platform={video.platform} />
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        {video.platform}
                      </span>
                    </div>
                    {/* Status marker */}
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase ${
                      video.status === 'Viral' 
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                        : video.status === 'Steady'
                        ? 'bg-blue-950/80 text-blue-400 border border-blue-800/50'
                        : 'bg-rose-950/80 text-rose-400 border border-rose-800/50'
                    }`}>
                      {video.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-display font-semibold text-slate-200 leading-snug line-clamp-2 hover:text-white transition-colors">
                    {video.title}
                  </h4>

                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400 font-sans">
                    {/* View Count */}
                    <div className="flex items-center space-x-1 shrink-0">
                      <Eye className="h-3 w-3 text-slate-500" />
                      <span className="font-mono text-slate-300 font-medium">
                        {video.views >= 1000 ? `${(video.views/1000).toFixed(0)}k` : video.views}
                      </span>
                    </div>
                    {/* Engagement Count */}
                    <div className="flex items-center space-x-1 shrink-0">
                      <Zap className="h-3 w-3 text-emerald-400" />
                      <span className="font-mono text-slate-300 font-medium">
                        {video.engagementRate}%
                      </span>
                    </div>
                    {/* Publish Date */}
                    <div className="flex items-center space-x-1 ml-auto text-slate-500">
                      <Calendar className="h-2.5 w-2.5" />
                      <span>{video.publishDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Selected state info footer */}
      {selectedVideoId && (
        <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 bg-slate-900/20 p-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
            <span>Interactive analytics active</span>
          </div>
          <button 
            onClick={() => onSelectVideo(null as any)}
            className="text-[10px] font-medium text-slate-500 hover:text-slate-300 uppercase tracking-wider"
          >
            Deselect
          </button>
        </div>
      )}
    </div>
  );
}
