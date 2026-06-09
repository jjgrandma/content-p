/**
 * Types and interfaces for the Social Video Tracker app
 */

export type SidebarTab = 'dashboard' | 'insights' | 'ml-tool' | 'settings';

export interface Video {
  id: string;
  title: string;
  publishDate: string;
  platform: 'YouTube' | 'TikTok' | 'Instagram';
  duration: number; // in seconds
  views: number;
  likes: number;
  comments: number;
  shares: number;
  watchTime: string; // e.g. "4m 12s" or percentage
  engagementRate: number; // e.g. 5.6 for 5.6%
  thumbnailUrl: string; // custom generated color/pattern code
  tone: 'Energetic' | 'Educational' | 'Dramatic' | 'Professional' | 'Casual';
  status: 'Viral' | 'Steady' | 'Needs Work';
}

export interface PredictionInput {
  title: string;
  duration: number; // in seconds
  platform: 'YouTube' | 'TikTok' | 'Instagram';
  tone: 'Energetic' | 'Educational' | 'Dramatic' | 'Professional' | 'Casual';
  descriptionLength: number; // characters
  hasCaptions: boolean;
  hookTime: number; // first hook in seconds (e.g. 3s)
}

export interface ModelExecutionLog {
  modelName: string;
  category: 'Forecasting' | 'Video Analysis' | 'Text Analysis';
  confidence: number;
  runtimeMs: number;
  signalsDetected: string[];
}

export interface PredictionResult {
  title: string;
  platform: 'YouTube' | 'TikTok' | 'Instagram';
  overallScore: number; // 0 - 100
  estimatedViews: string; // range
  engagementInterval: string; // e.g. "5.4% - 7.2%"
  watchRetentionFactor: number; // 0 - 100
  postingTimeRecommendation: string;
  thumbnailFeedback: string;
  optimizationTips: {
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    category: 'Content' | 'Visual' | 'SEO';
  }[];
  modelLogs?: ModelExecutionLog[];
}

export interface ChartDataPoint {
  day: string; // e.g. "Day 1", "Day 2"... or date
  views: number; // View growth over time (cumulative/active)
  engagement: number; // Daily engagement volume
  shares: number;
}

export interface MetricSummary {
  totalViews: number;
  avgWatchTime: string;
  avgEngagementRate: number;
  aiPredictiveScoreAvg: number;
  totalEngagements: number;
  totalComments: number;
  totalShares: number;
}
