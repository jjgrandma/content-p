import { SidebarTab } from '../types';
import { 
  BarChart3, 
  Video, 
  Cpu, 
  Settings, 
  Terminal, 
  Github, 
  ChevronRight,
  Sparkles,
  Mail,
  User,
  ShieldCheck,
  Tv
} from 'lucide-react';

interface SidebarProps {
  currentTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  userEmail?: string;
}

export default function Sidebar({ currentTab, onTabChange, userEmail = 'grandmaofme551@gmail.com' }: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard' as SidebarTab,
      label: 'Main Dashboard',
      description: 'Global views & metrics',
      icon: BarChart3,
    },
    {
      id: 'insights' as SidebarTab,
      label: 'Video Analytics',
      description: 'Platform metrics database',
      icon: Video,
    },
    {
      id: 'ml-tool' as SidebarTab,
      label: 'Predictive Sandbox',
      description: 'Linguistic ML regressor',
      icon: Cpu,
    },
    {
      id: 'settings' as SidebarTab,
      label: 'Configuration',
      description: 'System thresholds & APIs',
      icon: Settings,
    },
  ];

  return (
    <div id="app-sidebar" className="h-full flex flex-col justify-between bg-slate-950/70 border-r border-slate-800 p-5 font-sans select-none z-30">
      <div className="space-y-6">
        {/* Branding header */}
        <div className="flex items-center space-x-3 pb-5 border-b border-slate-800">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-950/30">
            <Tv className="h-5.5 w-5.5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base text-slate-100 tracking-tight flex items-center gap-1.5">
              SOCIALVISION <span className="bg-pink-500/20 text-pink-400 text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase border border-pink-400/20 tracking-wide">Pro</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">ML VIDEO VECTOR CORE</span>
          </div>
        </div>

        {/* Navigation list */}
        <div className="space-y-1.5">
          <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 pl-2 mb-2">
            Navigation Hub
          </span>
          {menuItems.map((item) => {
            const IconComp = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full group flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-slate-900 to-slate-900/50 border-l-[3px] border-violet-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 border-l-[3px] border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-1.5 rounded-lg border transition-colors ${
                    isActive 
                      ? 'bg-slate-950 border-slate-800 text-violet-400' 
                      : 'bg-transparent border-transparent text-slate-500 group-hover:text-slate-400'
                  }`}>
                    <IconComp className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">{item.label}</span>
                    <span className="text-[9px] text-slate-500 font-sans tracking-wide leading-tight mt-0.5">
                      {item.description}
                    </span>
                  </div>
                </div>
                <ChevronRight className={`h-3 w-3 text-slate-600 transition-transform ${
                  isActive ? 'translate-x-0.5 text-violet-400' : 'group-hover:translate-x-0.5'
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile & Developer specs */}
      <div className="pt-4 border-t border-slate-800 space-y-4">
        {/* User profile row */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-3 rounded-xl flex items-center space-x-2.5">
          {/* Avatar sphere */}
          <div className="relative h-9 w-9 rounded-lg bg-pink-950/60 border border-pink-800/60 flex items-center justify-center shrink-0">
            <User className="h-4 w-4 text-pink-400" />
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-slate-950" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-[11px] font-semibold text-slate-200 truncate leading-none mb-1">
              Social Manager
            </span>
            <span className="block text-[9px] font-mono text-slate-505 truncate flex items-center gap-1">
              <Mail className="h-2.5 w-2.5 text-slate-600 shrink-0" />
              <span className="text-slate-500 text-ellipsis overflow-hidden">{userEmail}</span>
            </span>
          </div>
        </div>

        {/* Integration Credentials footer */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-600">
          <span className="flex items-center">
            <ShieldCheck className="h-3 w-3 text-violet-500/80 mr-1" />
            Active Core Secure
          </span>
          <span>v2.4.0</span>
        </div>
      </div>
    </div>
  );
}
