import { Eye, Clock, Zap, Cpu, ArrowUpRight, TrendingUp } from 'lucide-react';
import { MetricSummary } from '../types';

interface DashboardMetricsProps {
  summary: MetricSummary;
}

export default function DashboardMetrics({ summary }: DashboardMetricsProps) {
  const cards = [
    {
      id: 'metric-views',
      title: 'Total Views',
      value: summary.totalViews.toLocaleString(),
      change: '+14.2%',
      isPositive: true,
      description: 'across active channels',
      icon: Eye,
      colorClass: 'text-violet-400 bg-violet-950/40 border-violet-800/40',
      glowClass: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]',
    },
    {
      id: 'metric-watchtime',
      title: 'Avg. Retention',
      value: summary.avgWatchTime,
      change: '+3.1%',
      isPositive: true,
      description: 'avg. watch time percent',
      icon: Clock,
      colorClass: 'text-blue-400 bg-blue-950/40 border-blue-800/40',
      glowClass: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    },
    {
      id: 'metric-engagement',
      title: 'Engagement Rate',
      value: `${summary.avgEngagementRate}%`,
      change: '+5.4%',
      isPositive: true,
      description: 'likes, shares, comments ratio',
      icon: Zap,
      colorClass: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40',
      glowClass: 'group-hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]',
    },
    {
      id: 'metric-ai-score',
      title: 'AI Predictive Index',
      value: `${summary.aiPredictiveScoreAvg}/100`,
      change: 'Optimal',
      isPositive: true,
      description: 'pre-publish model simulation',
      icon: Cpu,
      colorClass: 'text-pink-400 bg-pink-950/40 border-pink-800/40',
      glowClass: 'group-hover:shadow-[0_0_20px_rgba(244,114,182,0.15)]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            id={card.id}
            className={`group relative overflow-hidden bg-slate-900/90 border border-slate-800 rounded-xl p-5 transition-all duration-300 hover:border-slate-700/80 hover:-translate-y-0.5 ${card.glowClass}`}
          >
            {/* Soft decorative background glow */}
            <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-slate-800/20 transition-all duration-300 group-hover:bg-slate-800/40" />
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 font-medium text-sm font-sans">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-lg border ${card.colorClass} transition-colors duration-300`}>
                <IconComponent className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-display font-bold text-white tracking-tight">
                {card.value}
              </span>
              <span className="flex items-center text-xs font-mono font-semibold text-emerald-400">
                <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
                {card.change}
              </span>
            </div>

            <div className="flex items-center mt-2">
              <span className="text-xs text-slate-500 font-sans">
                {card.description}
              </span>
              <TrendingUp className="h-3.5 w-3.5 ml-1.5 text-slate-600" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
