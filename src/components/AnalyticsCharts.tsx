import { useState, useMemo } from 'react';
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ChartDataPoint } from '../types';
import { mockChartData } from '../data';
import { TrendingUp, Award, Calendar, CircleUser } from 'lucide-react';

interface AnalyticsChartsProps {
  data?: ChartDataPoint[];
}

export default function AnalyticsCharts({ data = mockChartData }: AnalyticsChartsProps) {
  const [timeframe, setTimeframe] = useState<'30d' | '14d' | '7d'>('30d');

  // Filter mock data dynamically based on selected timeframe
  const filteredData = useMemo(() => {
    switch (timeframe) {
      case '14d':
        return data.slice(-14);
      case '7d':
        return data.slice(-7);
      case '30d':
      default:
        return data;
    }
  }, [timeframe, data]);

  // Format large numbers into human-readable strings
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return num.toString();
  };

  // Custom tooltips with matching indicator circles and modern styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/95 border border-slate-800 backdrop-blur-md rounded-xl p-4 shadow-xl z-50">
          <div className="flex items-center space-x-2 pb-2 mb-2 border-b border-slate-800/80">
            <Calendar className="h-4 w-4 text-violet-400" />
            <h4 className="font-display font-semibold text-sm text-slate-100">{label}</h4>
          </div>
          <div className="space-y-2.5">
            {payload.map((item: any, idx: number) => {
              const isViews = item.dataKey === 'views';
              const dotColor = isViews ? 'bg-violet-500' : 'bg-emerald-400';
              const textColor = isViews ? 'text-violet-300' : 'text-emerald-300';
              const labelText = isViews ? 'Accumulated Views' : 'Daily Engagement';
              
              return (
                <div key={idx} className="flex items-center justify-between gap-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${dotColor}`} />
                    <span className="text-xs text-slate-400 font-sans">{labelText}</span>
                  </div>
                  <span className={`text-xs font-mono font-bold ${textColor}`}>
                    {item.value.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-2.5 pt-1.5 border-t border-slate-800/40 flex items-center justify-between text-[10px] text-slate-500">
            <span>Viral Growth Arc</span>
            <span>Est. Confidence: 98.4%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="analytics-charts" className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col h-[420px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
            <h3 className="font-display font-bold text-lg text-white tracking-tight">
              Video Performance Trends
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dual-axis graph illustrating active view velocity and community interactive volume.
          </p>
        </div>

        {/* Timeframe selector controls */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-lg select-none self-start">
          {(['7d', '14d', '30d'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 text-xs font-mono font-medium rounded-md transition-all duration-200 ${
                timeframe === t
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Dual Axis Area-Bar Chart */}
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={filteredData}
            margin={{ top: 10, right: -5, left: -15, bottom: 0 }}
          >
            {/* Smooth Royal Gradient for Area Chart */}
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.15}
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
            />

            {/* Left Y Axis for cumulative views */}
            <YAxis
              yAxisId="left"
              stroke="#8b5cf6"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatNumber}
            />

            {/* Right Y Axis for daily engagement metrics */}
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#34d399"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatNumber}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconSize={8}
              iconType="circle"
              wrapperStyle={{
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                paddingTop: '16px',
              }}
            />

            {/* Area Chart: View Growth Over Time */}
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="views"
              name="Accumulated Views"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#viewsGradient)"
            />

            {/* Bar Chart: Daily Engagement Overlaid */}
            <Bar
              yAxisId="right"
              dataKey="engagement"
              name="Engagement Velocity"
              fill="#34d399"
              radius={[4, 4, 0, 0]}
              barSize={8}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
