import { Video, ChartDataPoint, MetricSummary } from './types';

// Mock list of uploaded videos
export const mockVideos: Video[] = [
  {
    id: 'vid-1',
    title: '10 Tech Hacks That Will Save You 100+ Hours',
    publishDate: '2026-05-28',
    platform: 'YouTube',
    duration: 642, // 10m 42s
    views: 482900,
    likes: 38200,
    comments: 1840,
    shares: 12500,
    watchTime: '6m 12s',
    engagementRate: 10.9,
    thumbnailUrl: 'gradient-indigo-purple',
    tone: 'Educational',
    status: 'Viral'
  },
  {
    id: 'vid-2',
    title: 'A chaotic day in my life as an indie dev ☕️💻',
    publishDate: '2026-06-03',
    platform: 'TikTok',
    duration: 52, // 52s
    views: 310500,
    likes: 45600,
    comments: 2980,
    shares: 18400,
    watchTime: '44s',
    engagementRate: 21.6,
    thumbnailUrl: 'gradient-emerald-cyan',
    tone: 'Casual',
    status: 'Viral'
  },
  {
    id: 'vid-3',
    title: 'Why standard business advice is dangerously wrong',
    publishDate: '2026-06-05',
    platform: 'Instagram',
    duration: 59, // 59s
    views: 189200,
    likes: 12400,
    comments: 920,
    shares: 7300,
    watchTime: '41s',
    engagementRate: 10.9,
    thumbnailUrl: 'gradient-rose-orange',
    tone: 'Energetic',
    status: 'Steady'
  },
  {
    id: 'vid-4',
    title: 'Mastering React 19 Compiler in 8 Minutes ⚡️',
    publishDate: '2026-06-01',
    platform: 'YouTube',
    duration: 495, // 8m 15s
    views: 124000,
    likes: 9800,
    comments: 420,
    shares: 3100,
    watchTime: '5m 18s',
    engagementRate: 10.7,
    thumbnailUrl: 'gradient-blue-violet',
    tone: 'Educational',
    status: 'Steady'
  },
  {
    id: 'vid-5',
    title: 'My mechanical keyboard setup sounds like absolute heaven 🎹',
    publishDate: '2026-06-07',
    platform: 'TikTok',
    duration: 18, // 18s
    views: 95400,
    likes: 18100,
    comments: 1100,
    shares: 4800,
    watchTime: '17.5s',
    engagementRate: 25.1,
    thumbnailUrl: 'gradient-amber-rose',
    tone: 'Casual',
    status: 'Viral'
  },
  {
    id: 'vid-6',
    title: 'The AI design pattern that will replace standard SaaS dashboards',
    publishDate: '2026-05-24',
    platform: 'Instagram',
    duration: 88, // 1m 28s
    views: 63200,
    likes: 3100,
    comments: 280,
    shares: 890,
    watchTime: '45s',
    engagementRate: 6.7,
    thumbnailUrl: 'gradient-fuchsia-violet',
    tone: 'Professional',
    status: 'Needs Work'
  },
  {
    id: 'vid-7',
    title: 'CSS Grid magic that seems completely illegal 🧙‍♂️✨',
    publishDate: '2026-06-08',
    platform: 'TikTok',
    duration: 35,
    views: 42100,
    likes: 5200,
    comments: 190,
    shares: 920,
    watchTime: '29s',
    engagementRate: 15.0,
    thumbnailUrl: 'gradient-cyan-indigo',
    tone: 'Energetic',
    status: 'Steady'
  }
];

// Calculated statistics for the overview cards
export const mockSummary: MetricSummary = {
  totalViews: 1307300,
  avgWatchTime: '68%',
  avgEngagementRate: 13.7,
  aiPredictiveScoreAvg: 87,
  totalEngagements: 161870,
  totalComments: 8670,
  totalShares: 47910
};

// 30-day analytics data showing performance of viral videos (views as cumulative curve, engagement as daily volume spikes)
export const mockChartData: ChartDataPoint[] = [
  { day: 'Day 1', views: 25000, engagement: 2100, shares: 450 },
  { day: 'Day 2', views: 48000, engagement: 3800, shares: 820 },
  { day: 'Day 3', views: 82100, engagement: 5100, shares: 1100 },
  { day: 'Day 4', views: 110000, engagement: 4200, shares: 950 },
  { day: 'Day 5', views: 155000, engagement: 6800, shares: 1400 },
  { day: 'Day 6', views: 210400, engagement: 9100, shares: 2100 },
  { day: 'Day 7', views: 280000, engagement: 12400, shares: 3200 },
  { day: 'Day 8', views: 330200, engagement: 8300, shares: 1900 },
  { day: 'Day 9', views: 385000, engagement: 7900, shares: 1800 },
  { day: 'Day 10', views: 450000, engagement: 10200, shares: 2400 },
  { day: 'Day 11', views: 520000, engagement: 11400, shares: 2800 },
  { day: 'Day 12', views: 590000, engagement: 14800, shares: 3900 },
  { day: 'Day 13', views: 680000, engagement: 18100, shares: 4800 },
  { day: 'Day 14', views: 760000, engagement: 12100, shares: 3100 },
  { day: 'Day 15', views: 820000, engagement: 9800, shares: 2300 },
  { day: 'Day 16', views: 875000, engagement: 8900, shares: 2100 },
  { day: 'Day 17', views: 924000, engagement: 10400, shares: 2500 },
  { day: 'Day 18', views: 978000, engagement: 12000, shares: 3000 },
  { day: 'Day 19', views: 1035000, engagement: 15600, shares: 4200 },
  { day: 'Day 20', views: 1110000, engagement: 20100, shares: 5800 },
  { day: 'Day 21', views: 1180000, engagement: 14500, shares: 3600 },
  { day: 'Day 22', views: 1235000, engagement: 11200, shares: 2700 },
  { day: 'Day 23', views: 1272000, engagement: 9400, shares: 2100 },
  { day: 'Day 24', views: 1315000, engagement: 10800, shares: 2500 },
  { day: 'Day 25', views: 1358000, engagement: 13900, shares: 3400 },
  { day: 'Day 26', views: 1412000, engagement: 17200, shares: 4600 },
  { day: 'Day 27', views: 1478000, engagement: 22400, shares: 6400 },
  { day: 'Day 28', views: 1520000, engagement: 16100, shares: 4200 },
  { day: 'Day 29', views: 1555000, engagement: 11900, shares: 2900 },
  { day: 'Day 30', views: 1582000, engagement: 13100, shares: 3200 }
];

// Thumbnail gradients lookup object for visual display
export const getThumbnailGradient = (style: string): string => {
  switch (style) {
    case 'gradient-indigo-purple':
      return 'from-indigo-600 to-purple-600 border-indigo-400/20';
    case 'gradient-emerald-cyan':
      return 'from-emerald-500 to-cyan-500 border-emerald-400/20';
    case 'gradient-rose-orange':
      return 'from-rose-500 to-orange-500 border-rose-400/20';
    case 'gradient-blue-violet':
      return 'from-blue-600 to-violet-600 border-blue-400/20';
    case 'gradient-amber-rose':
      return 'from-amber-500 to-rose-500 border-amber-400/20';
    case 'gradient-fuchsia-violet':
      return 'from-fuchsia-600 to-violet-700 border-fuchsia-400/20';
    case 'gradient-cyan-indigo':
      default:
      return 'from-cyan-500 to-indigo-600 border-cyan-400/20';
  }
};
